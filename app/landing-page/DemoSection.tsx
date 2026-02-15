import { Play, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const DemoSection = () => {
    return (
        <section id="demo" className="w-full py-20 sm:py-28 bg-muted/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-12">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[var(--finwhats-emerald)]">
                        Veja na prática
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Simples como mandar uma mensagem
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Veja como é fácil controlar seus gastos em apenas 15 segundos.
                    </p>
                </div>

                {/* Video Placeholder */}
                <div className="relative mx-auto max-w-4xl">
                    <div className="aspect-video rounded-2xl border bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden shadow-2xl">
                        {/* Placeholder content */}
                        <div className="flex flex-col items-center justify-center h-full space-y-6">
                            <div className="flex size-20 items-center justify-center rounded-full bg-[var(--whatsapp-green)] cursor-pointer transition-all hover:scale-110 hover:shadow-lg hover:shadow-[var(--whatsapp-green)]/30">
                                <Play className="size-8 text-white ml-1" />
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-white/90 text-lg font-medium">Demonstração em 15 segundos</p>
                                <p className="text-white/50 text-sm">Clique para assistir como funciona</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative glow */}
                    <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[var(--whatsapp-green)]/10 to-[var(--finwhats-emerald)]/10 blur-xl -z-10" />
                </div>

                {/* Social proof */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-muted-foreground mb-6">Usado por pessoas que querem controle financeiro sem complicação</p>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { metric: "500+", label: "Usuários ativos" },
                            { metric: "10k+", label: "Mensagens processadas" },
                            { metric: "4.9/5", label: "Satisfação" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-2xl sm:text-3xl font-bold text-[var(--whatsapp-green)]">{stat.metric}</p>
                                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoSection;
