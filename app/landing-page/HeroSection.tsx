"use client";

import { Button } from "@/components/ui/Button";
import { MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
	return (
		<section id="hero" className="relative w-full overflow-hidden bg-gradient-to-br from-background via-background to-[var(--finwhats-emerald-light)]">
			{/* Subtle grid pattern */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
				<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
					{/* Left Content */}
					<div className="flex-1 text-center lg:text-left space-y-8">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 rounded-full border border-[var(--whatsapp-green)]/20 bg-[var(--whatsapp-green)]/5 px-4 py-1.5 text-sm font-medium text-[var(--whatsapp-dark)]">
							<MessageSquare className="size-3.5" />
							<span>Novo: Controle financeiro via WhatsApp</span>
						</div>

						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
							Controle suas finanças{" "}
							<span className="bg-gradient-to-r from-[var(--whatsapp-green)] to-[var(--finwhats-emerald)] bg-clip-text text-transparent">
								pelo WhatsApp.
							</span>
						</h1>

						<p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
							Sem baixar apps. Sem planilhas chatas. Apenas mande uma mensagem e nossa IA cuida do resto.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
							<Button
								size="lg"
								className="bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-dark)] text-white h-12 px-8 text-base font-semibold shadow-lg shadow-[var(--whatsapp-green)]/25 transition-all hover:shadow-xl hover:shadow-[var(--whatsapp-green)]/30 hover:-translate-y-0.5"
								onClick={() => window.open("https://wa.me/your-number", "_blank")}
							>
								<MessageSquare className="size-5" />
								Começar agora no WhatsApp
								<ArrowRight className="size-4" />
							</Button>
							<Button variant="outline" size="lg" className="h-12 px-8 text-base" asChild>
								<a href="#how-it-works">Saiba mais</a>
							</Button>
						</div>

						{/* Trust signals */}
						<div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
							<span className="flex items-center gap-1.5">
								<CheckCircle2 className="size-4 text-[var(--whatsapp-green)]" />
								Sem cadastro
							</span>
							<span className="flex items-center gap-1.5">
								<CheckCircle2 className="size-4 text-[var(--whatsapp-green)]" />
								100% seguro
							</span>
							<span className="flex items-center gap-1.5">
								<CheckCircle2 className="size-4 text-[var(--whatsapp-green)]" />
								Grátis para testar
							</span>
						</div>
					</div>

					{/* Right: Phone Mockup */}
					<div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
						<div className="relative mx-auto w-[280px] sm:w-[320px]">
							{/* Phone shell */}
							<div className="rounded-[40px] border-[3px] border-neutral-800 bg-neutral-900 p-2 shadow-2xl">
								{/* Notch */}
								<div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-neutral-800 rounded-b-2xl z-10" />

								{/* Screen */}
								<div className="rounded-[32px] bg-[#E5DDD5] overflow-hidden">
									{/* WhatsApp header */}
									<div className="bg-[#075E54] px-4 py-3 pt-9 flex items-center gap-3">
										<div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
											<MessageSquare className="size-4 text-white" />
										</div>
										<div>
											<p className="text-white text-sm font-semibold">FinWhats IA</p>
											<p className="text-white/70 text-xs">online</p>
										</div>
									</div>

									{/* Chat messages */}
									<div className="px-3 py-4 space-y-2.5 min-h-[340px]">
										{/* User message */}
										<div className="flex justify-end">
											<div className="bg-[var(--whatsapp-light)] rounded-lg rounded-tr-sm px-3 py-2 max-w-[75%] shadow-sm">
												<p className="text-sm text-neutral-800">Almoço 45</p>
												<p className="text-[10px] text-neutral-500 text-right mt-0.5">12:30</p>
											</div>
										</div>

										{/* Bot response */}
										<div className="flex justify-start">
											<div className="bg-white rounded-lg rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
												<p className="text-sm text-neutral-800">
													✅ <strong>Adicionado!</strong>
												</p>
												<p className="text-xs text-neutral-600 mt-1">
													🍽️ Alimentação — R$ 45,00
												</p>
												<p className="text-[10px] text-neutral-500 text-right mt-0.5">12:30</p>
											</div>
										</div>

										{/* User message 2 */}
										<div className="flex justify-end">
											<div className="bg-[var(--whatsapp-light)] rounded-lg rounded-tr-sm px-3 py-2 max-w-[75%] shadow-sm">
												<p className="text-sm text-neutral-800">Quanto gastei hoje?</p>
												<p className="text-[10px] text-neutral-500 text-right mt-0.5">12:31</p>
											</div>
										</div>

										{/* Bot response 2 */}
										<div className="flex justify-start">
											<div className="bg-white rounded-lg rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
												<p className="text-sm text-neutral-800">
													📊 <strong>Resumo de hoje:</strong>
												</p>
												<p className="text-xs text-neutral-600 mt-1">
													🍽️ Alimentação: R$ 45,00<br />
													🚗 Transporte: R$ 12,00<br />
													<strong>Total: R$ 57,00</strong>
												</p>
												<p className="text-[10px] text-neutral-500 text-right mt-0.5">12:31</p>
											</div>
										</div>
									</div>

									{/* Input bar */}
									<div className="bg-[#F0F0F0] px-2 py-2 flex items-center gap-2">
										<div className="flex-1 bg-white rounded-full px-4 py-2">
											<p className="text-xs text-neutral-400">Enviar mensagem...</p>
										</div>
										<div className="size-9 rounded-full bg-[#075E54] flex items-center justify-center flex-shrink-0">
											<ArrowRight className="size-4 text-white" />
										</div>
									</div>
								</div>
							</div>

							{/* Glow effect */}
							<div className="absolute -inset-4 rounded-[48px] bg-gradient-to-br from-[var(--whatsapp-green)]/20 to-[var(--finwhats-emerald)]/10 blur-2xl -z-10" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
