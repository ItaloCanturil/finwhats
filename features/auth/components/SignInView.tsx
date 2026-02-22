"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient, signIn } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleSignButton from "@/components/ui/GoogleSignButton";
import {
    MessageSquare,
    Mail,
    Lock,
    ArrowRight,
    Loader2,
    AlertCircle,
} from "lucide-react";

import { signInSchema, type SignInFormData } from "@/schemas/auth";

export default function SignInView() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>();

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const validatedData = signInSchema.parse(data);

            const result = await signIn.email({
                email: validatedData.email,
                password: validatedData.password,
            });

            if (result.error) {
                throw new Error(result.error.message || "Falha ao entrar");
            }

            router.push("/dashboard");
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.issues[0]?.message ?? "Dados inválidos.");
            } else {
                setError("Ocorreu um erro inesperado. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Falha ao entrar com Google. Tente novamente.");
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
                        Controle suas finanças apenas mandando uma mensagem no WhatsApp.
                    </p>
                    <div className="mt-12 grid grid-cols-2 gap-4 text-sm text-white/70">
                        <div className="flex items-center gap-2">
                            <div className="size-1.5 rounded-full bg-white/50" />
                            Sem baixar apps
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-1.5 rounded-full bg-white/50" />
                            IA inteligente
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-1.5 rounded-full bg-white/50" />
                            100% seguro
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-1.5 rounded-full bg-white/50" />
                            Dashboard web
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel – form */}
            <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
                <div className="w-full max-w-sm space-y-8">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--whatsapp-green)]">
                            <MessageSquare className="size-4 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">
                            Fin<span className="text-[var(--finwhats-emerald)]">Whats</span>
                        </span>
                    </div>

                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight">Bem-vindo de volta</h1>
                        <p className="text-sm text-muted-foreground">
                            Entre na sua conta para acessar o painel
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

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className={`pl-10 ${errors.password ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
                                    {...register("password", {
                                        required: "Senha é obrigatória",
                                    })}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs text-destructive">{errors.password.message}</p>
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
                                    Entrando...
                                </>
                            ) : (
                                <>
                                    Entrar
                                    <ArrowRight className="size-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">ou continue com</span>
                        </div>
                    </div>

                    <GoogleSignButton onClick={handleGoogleLogin} disabled={isLoading} />

                    <p className="text-center text-sm text-muted-foreground">
                        Não tem uma conta?{" "}
                        <Link
                            href="/auth/sign-up"
                            className="font-medium text-[var(--finwhats-emerald)] hover:underline"
                        >
                            Criar conta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
