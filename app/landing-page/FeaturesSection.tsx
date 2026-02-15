import { Sparkles, Shield, Target, PieChart } from "lucide-react";

const benefits = [
	{
		icon: Sparkles,
		title: "IA Inteligente",
		description: "Entende linguagem natural. Diga \"café 8\" ou \"uber pra casa 25\" e a IA categoriza tudo automaticamente.",
		gradient: "from-amber-500/10 to-orange-500/10",
		iconColor: "text-amber-500",
	},
	{
		icon: Shield,
		title: "Privacidade Total",
		description: "Seus dados financeiros são criptografados e seguros. Ninguém além de você tem acesso.",
		gradient: "from-blue-500/10 to-indigo-500/10",
		iconColor: "text-blue-500",
	},
	{
		icon: Target,
		title: "Metas Financeiras",
		description: "Defina objetivos mensais e receba alertas inteligentes quando estiver perto do limite.",
		gradient: "from-[var(--whatsapp-green)]/10 to-emerald-500/10",
		iconColor: "text-[var(--whatsapp-green)]",
	},
	{
		icon: PieChart,
		title: "Relatórios Simples",
		description: "Visualize onde seu dinheiro está indo em segundos com gráficos claros e categorizados.",
		gradient: "from-purple-500/10 to-pink-500/10",
		iconColor: "text-purple-500",
	},
] as const;

const FeaturesSection = () => {
	return (
		<section id="features" className="w-full py-20 sm:py-28 bg-background">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center space-y-4 mb-16">
					<p className="text-sm font-semibold uppercase tracking-widest text-[var(--finwhats-emerald)]">
						Benefícios
					</p>
					<h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
						Tudo o que você precisa para organizar suas finanças
					</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						Funcionalidades poderosas em uma interface que você já conhece: o WhatsApp.
					</p>
				</div>

				{/* Benefits Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
					{benefits.map((benefit) => (
						<div
							key={benefit.title}
							className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:shadow-lg hover:-translate-y-1"
						>
							{/* Background gradient */}
							<div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

							<div className="relative space-y-4">
								<div className={`flex size-12 items-center justify-center rounded-xl bg-muted ${benefit.iconColor}`}>
									<benefit.icon className="size-6" />
								</div>
								<h3 className="text-xl font-semibold">{benefit.title}</h3>
								<p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
