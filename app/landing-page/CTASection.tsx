"use client";
import Button from "@/components/ui/IButton";

const CTASection = () => {
	const handleExperimente = () => {
		// Navigate to WhatsApp
		window.open(
			"https://wa.me/your-whatsapp-number?text=Quero%20experimentar%20o%20Zaza",
			"_blank"
		);
	};

	const handleSaibaMais = () => {
		// Navigate to features section
		const featuresSection = document.getElementById("features");
		if (featuresSection) {
			featuresSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			className="w-full bg-secondary-background relative"
			style={{
				backgroundImage: "url(/images/img_.png)",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="absolute inset-0 bg-primary-background opacity-80"></div>
			<div className="relative z-10 w-full pt-[54px] sm:pt-[81px] lg:pt-[108px] pb-[54px] sm:pb-[81px] lg:pb-[108px] pr-[28px] sm:pr-[42px] lg:pr-[56px] pl-[28px] sm:pl-[42px] lg:pl-[56px]">
				<div className="w-full max-w-[1440px] mx-auto">
					<div className="flex flex-col gap-6 sm:gap-8 lg:gap-[30px] justify-center items-center w-full">
						<div className="flex flex-col gap-2 lg:gap-[8px] justify-start items-start w-auto">
							<h2
								className="text-[26px] sm:text-[39px] lg:text-3xl font-medium leading-[36px] sm:leading-[54px] lg:leading-6xl text-left text-secondary-text"
								style={{ fontFamily: "Manrope" }}
							>
								Descubra a Zaza Hoje
							</h2>
							<p
								className="text-md font-normal leading-md text-left text-secondary-text"
								style={{ fontFamily: "Inter" }}
							>
								Experimente a Zaza e transforme sua forma de gerenciar tarefas
								diárias com facilidade.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row justify-start items-center w-full sm:w-auto gap-4 lg:gap-[16px]">
							<div className="flex justify-center items-center w-full sm:w-auto bg-background-gray-light rounded-sm shadow-[0px_1px_2px_#0700000c] pt-[8px] pr-[8px] pb-[8px] pl-[8px]">
								<button
									onClick={handleExperimente}
									className="text-sm font-medium leading-sm text-left text-primary-text self-end"
									style={{ fontFamily: "Inter" }}
								>
									Experimente
								</button>
							</div>
							<Button
								text="Saiba Mais"
								className="w-full sm:w-auto pt-[10px] pr-[24px] pb-[10px] pl-[24px] bg-background-transparent text-secondary-text border border-secondary-text hover:bg-secondary-text hover:text-primary-text transition-colors"
								onClick={handleSaibaMais}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTASection;
