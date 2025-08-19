
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Hero = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5511999999999?text=Olá! Quero organizar minhas finanças!", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Assuma o <span className="text-green-600">controle</span> das suas finanças pelo{" "}
            <span className="text-green-600">WhatsApp!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Consultoria financeira descomplicada para você que busca tranquilidade e organização no seu dia a dia.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={handleWhatsAppClick}
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Fale Conosco no WhatsApp
            </Button>
            
            <p className="text-sm text-muted-foreground">
              ✅ Resposta em até 1 hora • ✅ Primeira consulta gratuita
            </p>
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-end animate-scale-in">
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Consultor Financeiro</h3>
                  <p className="text-sm text-green-600">online agora</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <p className="text-sm text-foreground">
                    Olá! 👋 Vamos organizar suas finanças juntos?
                  </p>
                </div>
                
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm text-foreground">
                    Quais são suas dicas para economizar dinheiro?
                  </p>
                </div>
                
                <div className="bg-green-100 p-3 rounded-lg">
                  <p className="text-sm text-foreground">
                    Ótima pergunta! Vou te enviar um plano personalizado baseado no seu perfil. Primeiro, me conta: qual é sua maior dificuldade financeira hoje?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
