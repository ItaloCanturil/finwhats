
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      location: "São Paulo, SP",
      text: "Consegui finalmente sair das dívidas! O atendimento pelo WhatsApp é super prático e o consultor sempre me ajuda com dicas personalizadas. Em 6 meses já estava no azul!",
      rating: 5,
      highlight: "Saiu das dívidas em 6 meses"
    },
    {
      name: "João Santos",
      location: "Rio de Janeiro, RJ",
      text: "Aprendi a poupar sem sacrifícios! Antes eu não conseguia guardar nem R$ 50 por mês, agora já tenho uma reserva de emergência. É muito prático e didático.",
      rating: 5,
      highlight: "Criou reserva de emergência"
    },
    {
      name: "Ana Costa",
      location: "Belo Horizonte, MG",
      text: "O melhor investimento que fiz foi na minha educação financeira. Agora sei exatamente para onde vai cada real e consegui comprar minha casa própria!",
      rating: 5,
      highlight: "Conquistou a casa própria"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Histórias de Sucesso
          </h2>
          <p className="text-xl opacity-90">
            Veja como nossos clientes transformaram suas vidas financeiras
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white text-foreground p-8 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="mt-3 bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">
                    🎯 {testimonial.highlight}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Mais de 500 clientes já transformaram suas finanças
            </h3>
            <p className="text-lg opacity-90">
              Junte-se a eles e comece sua jornada rumo à independência financeira hoje mesmo!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
