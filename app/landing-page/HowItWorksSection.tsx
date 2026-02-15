import { MessageSquareText, Brain, BarChart3 } from "lucide-react";

const steps = [
    {
        icon: MessageSquareText,
        number: "01",
        title: "Mande uma mensagem",
        description: 'Envie algo como "Mercado 150" ou "Almoço 45" pelo WhatsApp. Simples assim.',
        example: '"Mercado 150"',
    },
    {
        icon: Brain,
        number: "02",
        title: "Nossa IA entende e categoriza",
        description: "A inteligência artificial identifica o gasto, a categoria e o valor automaticamente.",
        example: "🧠 Supermercado → R$ 150",
    },
    {
        icon: BarChart3,
        number: "03",
        title: "Acompanhe no painel web",
        description: "Acesse seu dashboard para ver gráficos, metas e relatórios dos seus gastos.",
        example: "📊 Dashboard completo",
    },
] as const;

const HowItWorksSection = () => {
    return (
        <section id="how-it-works" className="w-full bg-muted/50 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-16">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[var(--finwhats-emerald)]">
                        Como funciona
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Três passos para o controle total
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Sem complicação. Sem curva de aprendizado. Comece em segundos.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative group">
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-border to-border via-[var(--whatsapp-green)]/30" />
                            )}

                            <div className="flex flex-col items-center text-center space-y-5">
                                {/* Icon circle */}
                                <div className="relative">
                                    <div className="flex size-24 items-center justify-center rounded-2xl bg-[var(--whatsapp-green)]/10 border border-[var(--whatsapp-green)]/20 transition-all group-hover:bg-[var(--whatsapp-green)]/15 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[var(--whatsapp-green)]/10">
                                        <step.icon className="size-10 text-[var(--whatsapp-green)]" />
                                    </div>
                                    <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed max-w-xs">{step.description}</p>

                                {/* Example chip */}
                                <div className="inline-flex items-center rounded-full bg-background border px-4 py-1.5 text-sm text-muted-foreground shadow-sm">
                                    {step.example}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
