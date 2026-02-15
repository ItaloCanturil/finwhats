import { Button } from "@/components/ui/Button";
import { Check, CreditCard, Zap } from "lucide-react";

const planFeatures = [
	"Acesso ilimitado via WhatsApp",
	"Painel de controle completo",
	"Relatórios mensais detalhados",
	"Metas financeiras ilimitadas",
	"IA para categorização automática",
	"Suporte prioritário",
] as const;

const PricingSection = () => {
	return (
		<section id="pricing" className="w-full py-20 sm:py-28 bg-background">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center space-y-4 mb-16">
					<p className="text-sm font-semibold uppercase tracking-widest text-[var(--finwhats-emerald)]">
						Preços
					</p>
					<h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
						Um plano simples, sem surpresas
					</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						Teste grátis por 7 dias. Cancele a qualquer momento.
					</p>
				</div>

				{/* Pricing Card */}
				<div className="mx-auto max-w-md">
					<div className="relative overflow-hidden rounded-3xl border-2 border-[var(--whatsapp-green)]/30 bg-card shadow-xl">
						{/* Popular badge */}
						<div className="absolute top-0 right-0">
							<div className="flex items-center gap-1.5 bg-[var(--whatsapp-green)] text-white text-xs font-semibold px-4 py-1.5 rounded-bl-xl">
								<Zap className="size-3" />
								Mais popular
							</div>
						</div>

						<div className="p-8 sm:p-10">
							{/* Plan name */}
							<div className="space-y-2">
								<h3 className="text-2xl font-bold">Plano Premium</h3>
								<p className="text-muted-foreground">Controle total das suas finanças pelo WhatsApp</p>
							</div>

							{/* Price */}
							<div className="mt-8 flex items-baseline gap-2">
								<span className="text-5xl font-bold tracking-tight">R$ 19</span>
								<span className="text-muted-foreground text-lg">/mês</span>
							</div>
							<p className="mt-1 text-sm text-muted-foreground">ou R$ 190/ano (economize 17%)</p>

							{/* Features */}
							<ul className="mt-8 space-y-4">
								{planFeatures.map((feature) => (
									<li key={feature} className="flex items-start gap-3">
										<div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--whatsapp-green)]/10 mt-0.5">
											<Check className="size-3 text-[var(--whatsapp-green)]" />
										</div>
										<span className="text-sm">{feature}</span>
									</li>
								))}
							</ul>

							{/* CTA */}
							<div className="mt-10 space-y-3">
								<Button
									className="w-full h-12 text-base font-semibold bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-dark)] text-white shadow-lg shadow-[var(--whatsapp-green)]/25"
									size="lg"
								>
									<CreditCard className="size-5" />
									Assinar agora via Stripe
								</Button>
								<p className="text-center text-xs text-muted-foreground">
									Pagamento seguro via Stripe. Cancele quando quiser.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PricingSection;
