import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
    {
        question: "É seguro?",
        answer:
            "Sim! Seus dados financeiros são criptografados e armazenados em servidores seguros. Utilizamos o mesmo nível de segurança dos bancos digitais. Nenhuma informação é compartilhada com terceiros e você pode excluir seus dados a qualquer momento.",
    },
    {
        question: "Como funciona o pagamento?",
        answer:
            "O pagamento da assinatura é feito de forma segura via Stripe, a mesma plataforma utilizada por empresas como Google e Amazon. Aceitamos todos os cartões de crédito. Você pode cancelar a qualquer momento, sem multas ou burocracia.",
    },
    {
        question: "Preciso baixar algum app?",
        answer:
            "Não! Essa é a grande vantagem do FinWhats. Tudo funciona direto pelo WhatsApp, que você já usa todos os dias. O painel de controle é acessado pelo navegador, sem necessidade de instalar nada no celular.",
    },
    {
        question: "Como a IA categoriza meus gastos?",
        answer:
            "Nossa inteligência artificial foi treinada para entender linguagem natural em português. Quando você envia \"Almoço 45\", ela identifica que é um gasto de alimentação no valor de R$ 45. Quanto mais você usa, mais inteligente ela fica.",
    },
    {
        question: "Posso usar em grupo ou família?",
        answer:
            "Por enquanto o FinWhats é individual — cada número do WhatsApp tem sua própria conta e dashboard. Estamos trabalhando em funcionalidades para controle familiar em breve!",
    },
] as const;

const FAQSection = () => {
    return (
        <section id="faq" className="w-full py-20 sm:py-28 bg-muted/50">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-12">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[var(--finwhats-emerald)]">
                        FAQ
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Perguntas frequentes
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Tire suas dúvidas sobre o FinWhats.
                    </p>
                </div>

                {/* Accordion */}
                <Accordion type="single" collapsible className="w-full space-y-3">
                    {faqItems.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="rounded-xl border bg-card px-6 data-[state=open]:shadow-md transition-shadow"
                        >
                            <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default FAQSection;
