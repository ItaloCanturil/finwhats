
import { Button } from "@/components/ui/button";
import { Check, MessageCircle, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Básico",
      price: "R$ 97",
      period: "/mês",
      description: "Ideal para quem está começando a organizar as finanças",
      popular: false,
      features: [
        "10 mensagens por dia no WhatsApp",
        "1 análise financeira mensal",
        "Planilha de controle básica",
        "Dicas semanais personalizadas",
        "Suporte de segunda a sexta"
      ],
      cta: "Escolher Plano Básico",
      whatsappMessage: "Olá! Quero assinar o Plano Básico (R$ 97/mês)"
    },
    {
      name: "Premium",
      price: "R$ 197",
      period: "/mês",
      description: "Perfeito para quem quer resultados mais rápidos",
      popular: true,
      features: [
        "Mensagens ilimitadas no WhatsApp",
        "2 análises financeiras mensais",
        "Planilha avançada + dashboard",
        "Dicas diárias personalizadas",
        "Suporte 7 dias por semana",
        "1 call mensal de 30min",
        "Plano para quitação de dívidas"
      ],
      cta: "Assinar Premium",
      whatsappMessage: "Olá! Quero assinar o Plano Premium (R$ 197/mês)"
    },
    {
      name: "VIP",
      price: "R$ 397",
      period: "/mês",
      description: "Para quem busca transformação financeira completa",
      popular: false,
      features: [
        "Tudo do Premium +",
        "Mensagens prioritárias (resposta em 15min)",
        "Análise financeira semanal",
        "Dashboard personalizado",
        "2 calls mensais de 1 hora",
        "Estratégias de investimento",
        "Plano de independência financeira",
        "Acesso a grupo VIP exclusivo"
      ],
      cta: "Escolher Plano VIP",
      whatsappMessage: "Olá! Quero assinar o Plano VIP (R$ 397/mês)"
    }
  ];

  const handlePlanClick = (message: string) => {
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Escolha Seu Plano de Transformação
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Preços transparentes, sem taxas ocultas. Cancele quando quiser.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              Pagamento via Pix ou Cartão
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              Primeira semana grátis
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              Sem fidelidade
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in ${
                plan.popular 
                  ? 'bg-gradient-to-b from-green-50 to-blue-50 border-2 border-green-600' 
                  : 'bg-white border border-border'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Mais Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handlePlanClick(plan.whatsappMessage)}
                className={`w-full py-6 text-lg rounded-xl transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              🎁 Oferta Especial de Lançamento
            </h3>
            <p className="text-lg opacity-90 mb-4">
              Primeira semana GRÁTIS para novos clientes + Bônus exclusivo: 
              <strong> E-book "10 Passos para a Independência Financeira"</strong>
            </p>
            <p className="text-sm opacity-75">
              Válido apenas para os primeiros 100 clientes. Aproveite!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
