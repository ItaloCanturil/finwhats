
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, Shield, Users } from "lucide-react";

const FinalCTA = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5511999999999?text=Olá! Não quero perder mais tempo! Quero organizar minhas finanças agora mesmo!", "_blank");
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Não perca mais tempo!<br />
            <span className="text-yellow-300">Organize suas finanças hoje mesmo</span>
          </h2>
          
          <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
            Cada dia que passa sem organização financeira é dinheiro perdido.<br />
            Comece agora e veja a diferença em apenas 30 dias!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <Clock className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-lg font-bold mb-2">Resposta Rápida</h3>
            <p className="text-sm opacity-90">Atendimento em até 1 hora</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <Shield className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-lg font-bold mb-2">100% Seguro</h3>
            <p className="text-sm opacity-90">Informações protegidas</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <Users className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-lg font-bold mb-2">+500 Clientes</h3>
            <p className="text-sm opacity-90">Já transformaram suas vidas</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">
            ⏰ Últimas vagas da promoção especial!
          </h3>
          <p className="text-lg opacity-90 mb-6">
            Apenas <strong className="text-yellow-300">47 vagas restantes</strong> para a primeira semana grátis + e-book exclusivo
          </p>
          
          <Button 
            onClick={handleWhatsAppClick}
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-pulse"
          >
            <MessageCircle className="mr-3 h-8 w-8" />
            QUERO COMEÇAR AGORA!
          </Button>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm opacity-75">
            🔒 Seus dados estão seguros | 📱 Atendimento via WhatsApp | ⭐ Satisfação garantida
          </p>
          <p className="text-xs opacity-60">
            Ao clicar no botão, você será redirecionado para o WhatsApp para iniciar sua jornada financeira
          </p>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-bounce"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
