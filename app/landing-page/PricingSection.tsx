"use client";
import Button from "@/components/ui/IButton";
import Image from "next/image";

const PricingSection = () => {
	const handleComeceMensal = () => {
		// Handle monthly plan signup
		window.open(
			"https://wa.me/your-whatsapp-number?text=Quero%20o%20plano%20mensal",
			"_blank"
		);
	};

	const handleComeceAnual = () => {
		window.open(
			"https://wa.me/your-whatsapp-number?text=Quero%20o%20plano%20anual",
			"_blank"
		);
	};

	return (
		<section id="pricing" className="w-full bg-background-teal-lighter">
			<div className="w-full bg-background-teal-lighter pt-[56px] sm:pt-[84px] lg:pt-[112px] pb-[56px] sm:pb-[84px] lg:pb-[112px]">
				<div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pr-[28px] sm:pr-[42px] lg:pr-[56px] pl-[28px] sm:pl-[42px] lg:pl-[56px]">
					<div className="flex flex-col gap-[39px] sm:gap-[59px] lg:gap-[78px] justify-start items-center w-full">
						<div className="flex flex-col gap-3 lg:gap-[12px] justify-start items-center w-full max-w-[768px] mx-auto">
							<div className="flex flex-col gap-2 lg:gap-[8px] justify-start items-center w-full pr-[28px] sm:pr-[42px] lg:pr-[56px] pl-[28px] sm:pl-[42px] lg:pl-[56px]">
								<h2
									className="text-[26px] sm:text-[39px] lg:text-3xl font-medium leading-[36px] sm:leading-[54px] lg:leading-6xl text-center text-primary-text"
									style={{ fontFamily: "Manrope" }}
								>
									Planos de Preço
								</h2>
								<p
									className="text-md font-normal leading-md text-center text-primary-text"
									style={{ fontFamily: "Inter" }}
								>
									Escolha o plano que melhor se adapta a você
								</p>
							</div>
						</div>

						{/* Pricing Cards */}
						<div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-[32px] w-full max-w-[1064px] mx-auto">
							{/* Monthly Plan */}
							<div className="flex flex-col gap-[63px] sm:gap-[95px] lg:gap-[126px] justify-start items-center w-full lg:w-[496px] h-auto bg-background-teal-light rounded-md pt-[16px] sm:pt-[24px] lg:pt-[32px] pr-[16px] sm:pr-[24px] lg:pr-[32px] pb-[16px] sm:pb-[24px] lg:pb-[32px] pl-[16px] sm:pl-[24px] lg:pl-[32px]">
								<div className="flex flex-col gap-4 sm:gap-5 lg:gap-[18px] justify-start items-center w-full">
									<div className="flex flex-col justify-start items-center w-full pr-[28px] sm:pr-[42px] lg:pr-[56px] pl-[28px] sm:pl-[42px] lg:pl-[56px]">
										<h3
											className="text-lg font-medium leading-2xl text-center text-primary-text"
											style={{ fontFamily: "Manrope" }}
										>
											Plano Mensal
										</h3>
										<div
											className="text-[36px] sm:text-[54px] lg:text-4xl font-medium leading-[50px] sm:leading-[74px] lg:leading-8xl text-center text-primary-text"
											style={{ fontFamily: "Manrope" }}
										>
											R$10
										</div>
									</div>

									<div className="flex flex-col gap-4 lg:gap-[16px] justify-center items-center w-full pt-[3px] sm:pt-[4px] lg:pt-[6px] pb-[3px] sm:pb-[4px] lg:pb-[6px]">
										<div className="flex justify-start items-center w-full">
											<Image
												src="/images/img_check.svg"
												alt="Check"
												width={24}
												height={24}
												className="w-[24px] h-[24px]"
											/>
											<span
												className="text-sm font-normal leading-sm text-left text-primary-text ml-[16px]"
												style={{ fontFamily: "Inter" }}
											>
												Acesso ao assistente
											</span>
										</div>
										<div className="flex justify-start items-center w-full">
											<Image
												src="/images/img_check.svg"
												alt="Check"
												width={24}
												height={24}
												className="w-[24px] h-[24px]"
											/>
											<span
												className="text-sm font-normal leading-sm text-left text-primary-text ml-[16px]"
												style={{ fontFamily: "Inter" }}
											>
												Consultas de saldo
											</span>
										</div>
										<div className="flex justify-start items-center w-full">
											<Image
												src="/images/img_check.svg"
												alt="Check"
												width={24}
												height={24}
												className="w-[24px] h-[24px]"
											/>
											<span
												className="text-sm font-normal leading-sm text-left text-primary-text ml-[16px]"
												style={{ fontFamily: "Inter" }}
											>
												Lembretes de agenda
											</span>
										</div>
									</div>
								</div>

								<Button
									text="Comece agora"
									variant="primary"
									className="w-full pt-[10px] pr-[17px] sm:pr-[25px] lg:pr-[34px] pb-[10px] pl-[17px] sm:pl-[25px] lg:pl-[34px]"
									onClick={handleComeceMensal}
								/>
							</div>

							{/* Annual Plan */}
							<div className="flex flex-col gap-[63px] sm:gap-[95px] lg:gap-[126px] justify-start items-center w-full lg:w-[496px] h-auto bg-background-teal-light rounded-md pt-[16px] sm:pt-[24px] lg:pt-[32px] pr-[16px] sm:pr-[24px] lg:pr-[32px] pb-[16px] sm:pb-[24px] lg:pb-[32px] pl-[16px] sm:pl-[24px] lg:pl-[32px]">
								<div className="flex flex-col gap-4 sm:gap-5 lg:gap-[18px] justify-start items-center w-full">
									<div className="flex flex-col justify-start items-center w-full pr-[28px] sm:pr-[42px] lg:pr-[56px] pl-[28px] sm:pl-[42px] lg:pl-[56px]">
										<h3
											className="text-lg font-medium leading-2xl text-center text-primary-text"
											style={{ fontFamily: "Manrope" }}
										>
											Plano Anual
										</h3>
										<div
											className="text-[36px] sm:text-[54px] lg:text-4xl font-medium leading-[50px] sm:leading-[74px] lg:leading-8xl text-center text-primary-text"
											style={{ fontFamily: "Manrope" }}
										>
											R$100
										</div>
									</div>

									<div className="flex flex-col gap-4 lg:gap-[16px] justify-start items-center w-full pt-[3px] sm:pt-[4px] lg:pt-[6px] pb-[3px] sm:pb-[4px] lg:pb-[6px]">
										<div className="flex justify-start items-center w-full">
											<Image
												src="/images/img_check.svg"
												alt="Check"
												width={24}
												height={24}
												className="w-[24px] h-[24px]"
											/>
											<span
												className="text-sm font-normal leading-sm text-left text-primary-text ml-[16px]"
												style={{ fontFamily: "Inter" }}
											>
												Acesso ao assistente
											</span>
										</div>
										<div className="flex justify-start items-center w-full">
											<Image
												src="/images/img_check.svg"
												alt="Check"
												width={24}
												height={24}
												className="w-[24px] h-[24px]"
											/>
											<span
												className="text-sm font-normal leading-sm text-left text-primary-text ml-[16px]"
												style={{ fontFamily: "Inter" }}
											>
												Consultas de saldo
											</span>
										</div>
										<div className="flex justify-start items-center w-full">
											<Image
												src="/images/img_check.svg"
												alt="Check"
												width={24}
												height={24}
												className="w-[24px] h-[24px]"
											/>
											<span
												className="text-sm font-normal leading-sm text-left text-primary-text ml-[16px]"
												style={{ fontFamily: "Inter" }}
											>
												Relatórios personalizados
											</span>
										</div>
									</div>
								</div>

								<div className="flex justify-center items-center w-full bg-primary-background rounded-sm shadow-[0px_1px_2px_#0700000c] pt-[8px] pr-[8px] pb-[8px] pl-[8px]">
									<button
										onClick={handleComeceAnual}
										className="text-sm font-medium leading-sm text-left text-button-primary-text self-end"
										style={{ fontFamily: "Inter" }}
									>
										Comece agora
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PricingSection;
