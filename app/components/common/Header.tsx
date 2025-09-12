"use client";
import { useState } from "react";
import Button from "../ui/IButton";
import Link from "../ui/Link";
import Image from "next/image";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="w-full bg-secondary-background">
			<div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mt-[8px] sm:mt-[12px] lg:mt-[16px] mr-[32px] sm:mr-[48px] lg:mr-[64px] ml-[35px] sm:ml-[52px] lg:ml-[70px]">
					{/* Logo Section */}
					<div className="flex justify-between items-center w-full sm:w-auto">
						<div className="flex justify-center items-center w-auto">
							<div className="flex flex-col justify-start items-start w-full">
								<Image
									src="/images/img_vector.svg"
									alt="Zaza Logo"
									width={14}
									height={8}
									className="w-[14px] h-[8px]"
								/>
								<div className="flex justify-start items-start w-auto mt-[10px] -ml-[1px]">
									<Link href="/">
										<Image
											src="/images/img_vector_black_900.svg"
											alt="Logo part 1"
											width={20}
											height={16}
											className="w-[20px] h-[16px]"
										/>
									</Link>
									<Image
										src="/images/img_vector_black_900_14x18.svg"
										alt="Logo part 2"
										width={18}
										height={14}
										className="w-[18px] h-[14px] -ml-[2px]"
									/>
									<Link href="/">
										<Image
											src="/images/img_vector_black_900_24x18.svg"
											alt="Logo part 3"
											width={18}
											height={24}
											className="w-[18px] h-[24px] self-center -ml-[2px]"
										/>
									</Link>
									<Image
										src="/images/img_vector_black_900_14x18.svg"
										alt="Logo part 4"
										width={18}
										height={14}
										className="w-[18px] h-[14px] -ml-[2px]"
									/>
								</div>
							</div>
						</div>

						{/* Hamburger Menu Icon (Mobile only) */}
						<button
							className="block lg:hidden p-2"
							aria-label="Open menu"
							onClick={() => setMenuOpen(!menuOpen)}
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>

					{/* Navigation Menu */}
					<nav
						className={`${
							menuOpen ? "block" : "hidden"
						} lg:block absolute lg:relative top-full lg:top-auto left-0 lg:left-auto w-full lg:w-auto bg-secondary-background lg:bg-transparent shadow-lg lg:shadow-none z-50 lg:z-auto`}
					>
						<div className="flex flex-col lg:flex-row gap-4 lg:gap-[32px] justify-center items-center p-4 lg:p-0 w-full lg:w-auto">
							<button
								role="menuitem"
								className="text-sm font-normal leading-sm text-left text-header-text hover:text-primary-background transition-colors w-full lg:w-auto text-left lg:text-center py-2 lg:py-0"
								style={{ fontFamily: "Inter" }}
							>
								Início Rápido
							</button>
							<button
								role="menuitem"
								className="text-sm font-normal leading-sm text-left text-header-text hover:text-primary-background transition-colors w-full lg:w-auto text-left lg:text-center py-2 lg:py-0"
								style={{ fontFamily: "Inter" }}
							>
								Serviços Zaza
							</button>
							<button
								role="menuitem"
								className="text-sm font-normal leading-sm text-left text-header-text hover:text-primary-background transition-colors w-full lg:w-auto text-left lg:text-center py-2 lg:py-0"
								style={{ fontFamily: "Inter" }}
							>
								Suporte Técnico
							</button>
							<div className="relative group w-full lg:w-auto">
								<button
									role="menuitem"
									aria-haspopup="true"
									aria-expanded="false"
									className="flex gap-[4px] justify-center items-center w-full lg:w-auto text-left lg:text-center py-2 lg:py-0 hover:text-primary-background transition-colors"
								>
									<span
										className="text-sm font-normal leading-sm text-header-text group-hover:text-primary-background"
										style={{ fontFamily: "Inter" }}
									>
										Mais Opções
									</span>
									<Image
										src="/images/img_arrow_down.svg"
										alt="Arrow down"
										width={24}
										height={24}
										className="w-[24px] h-[24px]"
									/>
								</button>
								{/* Submenu */}
								<ul
									role="menu"
									className="hidden group-hover:block absolute top-full left-0 bg-secondary-background shadow-lg rounded-sm mt-1 min-w-[200px] z-10"
								>
									<li
										role="menuitem"
										className="px-4 py-2 hover:bg-background-overlay-light cursor-pointer"
									>
										<span
											className="text-xs font-normal leading-xs text-header-text"
											style={{ fontFamily: "Inter" }}
										>
											Opção 1
										</span>
									</li>
									<li
										role="menuitem"
										className="px-4 py-2 hover:bg-background-overlay-light cursor-pointer"
									>
										<span
											className="text-xs font-normal leading-xs text-header-text"
											style={{ fontFamily: "Inter" }}
										>
											Opção 2
										</span>
									</li>
									<li
										role="menuitem"
										className="px-4 py-2 hover:bg-background-overlay-light cursor-pointer"
									>
										<span
											className="text-xs font-normal leading-xs text-header-text"
											style={{ fontFamily: "Inter" }}
										>
											Opção 3
										</span>
									</li>
								</ul>
							</div>
						</div>
					</nav>

					{/* Action Buttons */}
					<div
						className={`${
							menuOpen ? "block" : "hidden"
						} lg:block absolute lg:relative top-full lg:top-auto right-0 lg:right-auto w-full lg:w-auto bg-secondary-background lg:bg-transparent shadow-lg lg:shadow-none z-40 lg:z-auto mt-0 lg:mt-0`}
					>
						<div className="flex flex-col lg:flex-row gap-4 lg:gap-[16px] justify-center items-center p-4 lg:p-0 w-full lg:w-auto">
							<Button
								text="Enviar"
								variant="secondary"
								className="w-full lg:w-auto pt-[8px] pr-[20px] pb-[8px] pl-[20px]"
							/>
							<div className="flex justify-center items-center w-full lg:w-auto bg-primary-background rounded-sm shadow-[0px_1px_2px_#0700000c] pt-[8px] pr-[8px] pb-[8px] pl-[8px]">
								<span
									className="text-sm font-medium leading-sm text-left text-button-primary-text"
									style={{ fontFamily: "Inter" }}
								>
									Acessar
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
