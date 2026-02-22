import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email("Digite um email válido"),
    password: z.string().min(1, "Senha é obrigatória"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z
    .object({
        name: z.string().min(2, "Nome precisa ter pelo menos 2 caracteres"),
        email: z.string().email("Digite um email válido"),
        phone: z
            .string()
            .min(10, "Número precisa ter pelo menos 10 dígitos")
            .regex(
                /^[+]?[1-9][\d\s\-\(\)]{8,}$/,
                "Digite um número de telefone válido"
            ),
        password: z.string().min(8, "Senha precisa ter pelo menos 8 caracteres"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não conferem",
        path: ["confirmPassword"],
    });

export type SignUpFormData = z.infer<typeof signUpSchema>;
