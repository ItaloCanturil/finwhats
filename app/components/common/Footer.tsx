import Link from "next/link";
import { MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[var(--whatsapp-green)]">
                <MessageSquare className="size-3.5 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight">
                Fin<span className="text-[var(--finwhats-emerald)]">Whats</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Controle financeiro inteligente via WhatsApp.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </Link>
            <Link href="mailto:contato@finwhats.com" className="hover:text-foreground transition-colors">
              Contato
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FinWhats. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;