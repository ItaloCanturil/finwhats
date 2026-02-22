"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    MessageSquare,
    Mail,
    Lock,
    User,
    Phone,
    ArrowRight,
    Loader2,
    AlertCircle,
} from "lucide-react";

import { signUpSchema, type SignUpFormData } from "@/schemas/auth";

export default function SignUpView() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>();

    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const validatedData = signUpSchema.parse(data);

            const result = await signUp.email({
                email: validatedData.email,
                password: validatedData.password,
                name: validatedData.name,
            });

            if (result.error) {
                throw new Error(result.error.message || "Falha ao criar conta");
            }

            router.push("/dashboard");
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.issues[0].message);
            } else {
                setError("Ocorreu um erro inesperado. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left panel – branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--whatsapp-green)] to-[var(--whatsapp-dark)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
                <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                            <MessageSquare className="size-6 text-white" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight">FinWhats</span>
                    </div>
                    <p className="text-xl font-medium text-center text-white/90 max-w-md leading-relaxed">
                        Comece a controlar seus gastos em minutos. É simples como mandar uma mensagem.
                    </p>
                    <div className="mt-12 space-y-3 text-sm text-white/70">
                        <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white text-xs font-bold">1</div>
                            Crie sua conta
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white text-xs font-bold">2</div>
                            Conecte seu WhatsApp
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white text-xs font-bold">3</div>
                            Comece a enviar gastos
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel – form */}
            <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
                <div className="w-full max-w-sm space-y-6">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--whatsapp-green)]">
                            <MessageSquare className="size-4 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">
                            Fin<span className="text-[var(--finwhats-emerald)]">Whats</span>
                        </span>
                    </div>

                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight">Criar conta</h1>
                        <p className="text-sm text-muted-foreground">
                            Preencha seus dados para começar
                        </p>
                    </div>

                    {/* Error alert */}
                    {error && (
                        <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                            <AlertCircle className="size-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Seu nome"
                                    className={`pl-10 ${errors.name ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
                                    {...register("name", {
                                        required: "Nome é obrigatório",
                                        minLength: {
                                            value: 2,
                                            message: "Nome precisa ter pelo menos 2 caracteres",
                                        },
                                    })}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-xs text-destructive">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    className={`pl-10 ${errors.email ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
                                    {...register("email", {
                                        required: "Email é obrigatório",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Digite um email válido",
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">WhatsApp</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+55 (11) 99999-9999"
                                    className={`pl-10 ${errors.phone ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
                                    {...register("phone", {
                                        required: "Número do WhatsApp é obrigatório",
                                        pattern: {
                                            value: /^[+]?[1-9][\d\s\-\(\)]{8,}$/,
                                            message: "Digite um número válido",
                                        },
                                    })}
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-xs text-destructive">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Mínimo 8 caracteres"
                                    className={`pl-10 ${errors.password ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
                                    {...register("password", {
                                        required: "Senha é obrigatória",
                                        minLength: {
                                            value: 8,
                                            message: "Senha precisa ter pelo menos 8 caracteres",
                                        },
                                    })}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Repita a senha"
                                    className={`pl-10 ${errors.confirmPassword ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
                                    {...register("confirmPassword", {
                                        required: "Confirme sua senha",
                                    })}
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-dark)] text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Criando conta...
                                </>
                            ) : (
                                <>
                                    Criar conta
                                    <ArrowRight className="size-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Já tem uma conta?{" "}
                        <Link
                            href="/auth/sign-in"
                            className="font-medium text-[var(--finwhats-emerald)] hover:underline"
                        >
                            Fazer login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
