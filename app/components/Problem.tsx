
import { AlertTriangle, Target } from "lucide-react";

const Problem = () => {
  const problems = [
    "Dificuldade para economizar no fim do mês",
    "Compras por impulso que desorganizam o orçamento",
    "Não saber para onde vai o dinheiro",
    "Medo de se endividar ou dificuldade para quitar dívidas",
    "Falta de planejamento para objetivos futuros"
  ];

  const solutions = [
    "Planejamento financeiro personalizado via WhatsApp",
    "Controle de gastos em tempo real",
    "Estratégias práticas para economizar",
    "Orientação para quitação de dívidas",
    "Acompanhamento contínuo e motivacional"
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Você se identifica com esses desafios?
          </h2>
          <p className="text-xl text-muted-foreground">
            Não se preocupe, você não está sozinho nessa jornada
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Problems */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <h3 className="text-2xl font-bold text-foreground">Os Problemas</h3>
            </div>
            
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <span className="text-red-500 font-bold text-lg">❌</span>
                <p className="text-foreground">{problem}</p>
              </div>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center space-x-3 mb-6">
              <Target className="h-8 w-8 text-green-600" />
              <h3 className="text-2xl font-bold text-foreground">Nossa Solução</h3>
            </div>
            
            {solutions.map((solution, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                <span className="text-green-600 font-bold text-lg">✅</span>
                <p className="text-foreground">{solution}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              Transforme sua relação com o dinheiro
            </h3>
            <p className="text-lg opacity-90">
              Através do WhatsApp, oferecemos suporte personalizado, prático e acessível para você conquistar sua independência financeira.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
