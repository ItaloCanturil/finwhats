"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X, MessageSquare } from "lucide-react";

const navLinks = [
	{ label: "Como funciona", href: "#how-it-works" },
	{ label: "Preços", href: "#pricing" },
	{ label: "Dashboard", href: "/dashboard" },
] as const;

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleNavClick = (href: string) => {
		setMenuOpen(false);
		if (href.startsWith("#")) {
			const el = document.getElementById(href.slice(1));
			el?.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2 group">
					<div className="flex size-8 items-center justify-center rounded-lg bg-[var(--whatsapp-green)] transition-transform group-hover:scale-105">
						<MessageSquare className="size-4 text-white" />
					</div>
					<span className="text-lg font-bold tracking-tight">
						Fin<span className="text-[var(--finwhats-emerald)]">Whats</span>
					</span>
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<button
							key={link.href}
							onClick={() => handleNavClick(link.href)}
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.label}
						</button>
					))}
				</nav>

				{/* CTA Desktop */}
				<div className="hidden md:flex items-center gap-3">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/auth/signin">Entrar</Link>
					</Button>
					<Button
						size="sm"
						className="bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-dark)] text-white"
						asChild
					>
						<Link href="#hero">Começar grátis</Link>
					</Button>
				</div>

				{/* Mobile Toggle */}
				<button
					className="md:hidden p-2 rounded-md hover:bg-accent"
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
				>
					{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
				</button>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="md:hidden border-t bg-background animate-in slide-in-from-top-2">
					<nav className="flex flex-col gap-1 p-4">
						{navLinks.map((link) => (
							<button
								key={link.href}
								onClick={() => handleNavClick(link.href)}
								className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground text-left transition-colors"
							>
								{link.label}
							</button>
						))}
						<div className="mt-3 flex flex-col gap-2 border-t pt-3">
							<Button variant="outline" size="sm" asChild>
								<Link href="/auth/signin">Entrar</Link>
							</Button>
							<Button
								size="sm"
								className="bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-dark)] text-white"
							>
								Começar grátis
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;
