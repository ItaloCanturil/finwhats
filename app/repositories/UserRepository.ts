import { user } from "@/_db/schema";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import defaultDb from "@/_db/drizzle";
import { eq, or } from "drizzle-orm";

// Infer types from Drizzle schema
export type User = InferSelectModel<typeof user>;
export type CreateUserData = Omit<InferInsertModel<typeof user>, 'updatedAt'>;
export type UpdateUserData = Partial<CreateUserData>;

export interface UserRepository {
  create(user: CreateUserData): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByUserId(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  findByEmailOrPhone(emailOrPhone: string): Promise<User | null>;
  update(id: string, userData: UpdateUserData): Promise<User | null>;
  delete(id: string): Promise<void>;
  verifyEmail(userId: string): Promise<void>;
}

type Database = PostgresJsDatabase<{
  user: typeof user;
}>

export class DrizzleUserRepository implements UserRepository {
  constructor(private db: Database = defaultDb as unknown as Database) { }

  async create(userData: CreateUserData): Promise<User> {
    const [created] = await this.db
      .insert(user)
      .values({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        emailVerified: userData.emailVerified,
        image: userData.image,
        createdAt: userData.createdAt || new Date()
      })
      .returning();

    return created;
  }

  async findById(id: string): Promise<User | null> {
    const [result] = await this.db
      .select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    return result || null;
  }

  async findByUserId(userId: string): Promise<User | null> {
    const [result] = await this.db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    return result || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [result] = await this.db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    return result || null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const [result] = await this.db
      .select()
      .from(user)
      .where(eq(user.phone, phone))
      .limit(1);

    return result || null;
  }

  async findByEmailOrPhone(emailOrPhone: string): Promise<User | null> {
    const [result] = await this.db
      .select()
      .from(user)
      .where(
        or(
          eq(user.email, emailOrPhone),
          eq(user.phone, emailOrPhone)
        )
      )
      .limit(1);

    return result || null;
  }

  async update(id: string, userData: UpdateUserData): Promise<User | null> {
    const updateData: Record<string, unknown> = {
      ...userData,
      updated_at: new Date()
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const [updated] = await this.db
      .update(user)
      .set(updateData)
      .where(eq(user.id, id))
      .returning();

    return updated || null;
  }

  async delete(id: string): Promise<void> {
    await this.db
      .delete(user)
      .where(eq(user.id, id));
  }

  async verifyEmail(userId: string): Promise<void> {
    await this.db
      .update(user)
      .set({
        emailVerified: true,
        updatedAt: new Date()
      })
      .where(eq(user.id, userId));
  }
}
