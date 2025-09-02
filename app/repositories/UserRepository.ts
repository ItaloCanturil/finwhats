import { users } from "@/_db/schema";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import db from "@/_db/drizzle";
import { eq, or } from "drizzle-orm";

// Infer types from Drizzle schema
export type User = InferSelectModel<typeof users>;
export type CreateUserData = Omit<InferInsertModel<typeof users>, 'id' | 'created_at' | 'updated_at'> & {
  createdAt?: Date; // Optional, will default to now
};
export type UpdateUserData = Partial<Omit<CreateUserData, 'user_id'>>; // Can't update user_id

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
  users: typeof users;
}>

export class DrizzleUserRepository implements UserRepository {
  constructor(private db: Database = db) {}

  async create(user: CreateUserData): Promise<User> {
    const [created] = await this.db
      .insert(users)
      .values({
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        emailVerified: user.emailVerified || false,
        image: user.image,
        created_at: user.createdAt || new Date()
      })
      .returning();
    
    return created;
  }

  async findById(id: string): Promise<User | null> {
    const [result] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    
    return result || null;
  }

  async findByUserId(userId: string): Promise<User | null> {
    const [result] = await this.db
      .select()
      .from(users)
      .where(eq(users.user_id, userId))
      .limit(1);
    
    return result || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [result] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    return result || null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const [result] = await this.db
      .select()
      .from(users)
      .where(eq(users.phone, phone))
      .limit(1);
    
    return result || null;
  }

  async findByEmailOrPhone(emailOrPhone: string): Promise<User | null> {
    const [result] = await this.db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, emailOrPhone),
          eq(users.phone, emailOrPhone)
        )
      )
      .limit(1);
    
    return result || null;
  }

  async update(id: string, userData: UpdateUserData): Promise<User | null> {
    const updateData: any = {
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
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    
    return updated || null;
  }

  async delete(id: string): Promise<void> {
    await this.db
      .delete(users)
      .where(eq(users.id, id));
  }

  async verifyEmail(userId: string): Promise<void> {
    await this.db
      .update(users)
      .set({ 
        emailVerified: true,
        updated_at: new Date()
      })
      .where(eq(users.user_id, userId));
  }
}