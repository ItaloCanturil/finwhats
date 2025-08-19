
import { MessageCircle, FileText, Target, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "1. Entre em Contato",
      description: "Mande uma mensagem no WhatsApp e conte sua situação financeira atual",
      benefit: "Atendimento humanizado e confidencial"
    },
    {
      icon: FileText,
      title: "2. Receba Seu Diagnóstico",
      description: "Análise completa da sua situação financeira em até 24 horas",
      benefit: "Relatório personalizado e fácil de entender"
    },
    {
      icon: Target,
      title: "3. Plano Personalizado",
      description: "Estratégia financeira desenhada especialmente para seus objetivos",
      benefit: "Metas realistas e alcançáveis"
    },
    {
      icon: TrendingUp,
      title: "4. Acompanhamento Contínuo",
      description: "Suporte diário via WhatsApp para manter você no caminho certo",
      benefit: "Motivação e ajustes quando necessário"
    }
  ];

  const features = [
    "🔒 Orientação personalizada e confidencial",
    "⚡ Respostas rápidas (em até 1 hora)",
    "📱 Dicas práticas que cabem no seu bolso",
    "📊 Acompanhamento de metas em tempo real",
    "💬 Suporte para negociação de dívidas"
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como Funciona Nossa Consultoria
          </h2>
          <p className="text-xl text-muted-foreground">
            Um processo simples e eficaz para transformar suas finanças
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground mb-3">
                  {step.description}
                </p>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">
                    ✨ {step.benefit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            O que você recebe com nossa consultoria
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <span className="text-2xl">{feature.split(' ')[0]}</span>
                <p className="text-foreground font-medium">{feature.substring(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
