'use client';
import Button from'@/components/ui/Button';
 import Image from'next/image';

const FeaturesSection = () => {
  const handleSaibaMais = () => {
    // Navigate to pricing section
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleComecar = () => {
    // Navigate to contact or signup
    window.open('https://wa.me/your-whatsapp-number', '_blank')
  }

  return (
    <section id="features" className="w-full bg-secondary-background">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-[56px] sm:pt-[84px] lg:pt-[112px] pb-[56px] sm:pb-[84px] lg:pb-[112px]">
        <div className="flex flex-col gap-[40px] sm:gap-[60px] lg:gap-[80px] justify-start items-center w-full">
          {/* Section Header */}
          <div className="flex flex-col gap-4 lg:gap-[16px] justify-start items-center w-full max-w-[768px] mx-auto">
            <div className="flex justify-center items-center w-auto">
              <span className="text-sm font-semibold leading-sm text-center text-primary-text" style={{ fontFamily: 'Inter' }}>
                Zaza
              </span>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 lg:gap-[22px] justify-start items-center w-full">
              <h2 className="text-[26px] sm:text-[39px] lg:text-3xl font-medium leading-[31px] sm:leading-[47px] lg:leading-5xl text-center text-primary-text w-full" style={{ fontFamily: 'Manrope' }}>
                Descubra as funcionalidades do Zaza
              </h2>
              <p className="text-md font-normal leading-xl text-center text-primary-text w-full" style={{ fontFamily: 'Inter' }}>
                Zaza é o seu assistente pessoal no WhatsApp, projetado para facilitar sua vida. Organize suas finanças e compromissos de forma simples e eficiente.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-[48px] justify-start items-center w-full">
            {/* Left Features Column */}
            <div className="flex flex-col gap-8 sm:gap-12 lg:gap-[64px] justify-start items-center w-full lg:flex-1">
              {/* Financial Organization */}
              <div className="flex flex-col gap-6 lg:gap-[24px] justify-start items-center w-full">
                <Image
                  src="/images/img_finance.svg"
                  alt="Financial Organization"
                  width={48}
                  height={48}
                  className="w-[48px] h-[48px]"
                />
                <div className="flex flex-col gap-4 lg:gap-[16px] justify-start items-center w-full">
                  <h3 className="text-xl font-medium leading-3xl text-center text-primary-text" style={{ fontFamily: 'Manrope' }}>
                    Organização Financeira
                  </h3>
                  <p className="text-sm font-normal leading-lg text-center text-primary-text w-full" style={{ fontFamily: 'Inter' }}>
                    Monitore seus gastos e saldo de forma prática e rápida pelo WhatsApp.
                  </p>
                </div>
              </div>

              {/* Task Management */}
              <div className="flex flex-col gap-6 lg:gap-[24px] justify-start items-center w-full">
                <Image
                  src="/images/img_view_agenda.svg"
                  alt="Task Management"
                  width={48}
                  height={48}
                  className="w-[48px] h-[48px]"
                />
                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[14px] justify-start items-center w-full">
                  <h3 className="text-xl font-medium leading-3xl text-center text-primary-text w-full" style={{ fontFamily: 'Manrope' }}>
                    Agendamento de Compromissos
                  </h3>
                  <p className="text-sm font-normal leading-lg text-center text-primary-text w-full" style={{ fontFamily: 'Inter' }}>
                    Agende lembretes e compromissos diretamente no Google Calendar com facilidade.
                  </p>
                </div>
              </div>
            </div>

            {/* Center Image */}
            <div className="w-full lg:w-[540px] h-[270px] sm:h-[405px] lg:h-[540px] relative">
              <Image
                src="/images/img_placeholder_image_540x540.png"
                alt="Zaza Features Interface"
                fill
                className="object-cover rounded-md"
              />
            </div>

            {/* Right Features Column */}
            <div className="flex flex-col gap-8 sm:gap-12 lg:gap-[64px] justify-start items-center w-full lg:flex-1">
              {/* Task Management */}
              <div className="flex flex-col gap-6 lg:gap-[24px] justify-start items-center w-full">
                <Image
                  src="/images/img_task.svg"
                  alt="Task Management"
                  width={48}
                  height={48}
                  className="w-[48px] h-[48px]"
                />
                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[14px] justify-start items-center w-full">
                  <h3 className="text-xl font-medium leading-3xl text-center text-primary-text w-full" style={{ fontFamily: 'Manrope' }}>
                    Gerenciamento de Tarefas
                  </h3>
                  <p className="text-sm font-normal leading-lg text-center text-primary-text w-full" style={{ fontFamily: 'Inter' }}>
                    Organize suas tarefas pessoais e nunca perca um prazo importante.
                  </p>
                </div>
              </div>

              {/* Experience Zaza */}
              <div className="flex flex-col gap-4 lg:gap-[16px] justify-start items-center w-full">
                <div className="flex flex-col gap-6 lg:gap-[24px] justify-start items-center w-full">
                  <Image
                    src="/images/img_azm.svg"
                    alt="Experience Zaza"
                    width={48}
                    height={48}
                    className="w-[48px] h-[48px]"
                  />
                  <h3 className="text-xl font-medium leading-3xl text-center text-primary-text" style={{ fontFamily: 'Manrope' }}>
                    Experimente o Zaza
                  </h3>
                </div>
                <p className="text-sm font-normal leading-lg text-center text-primary-text w-full" style={{ fontFamily: 'Inter' }}>
                  Transforme sua rotina com a ajuda do Zaza, seu assistente pessoal inteligente.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center w-full sm:w-auto gap-4 sm:gap-0">
            <Button
              text="Saiba Mais"
              variant="secondary"
              className="w-full sm:w-auto pt-[10px] pr-[24px] pb-[10px] pl-[24px]"
              onClick={handleSaibaMais}
            />
            <div className="flex justify-end items-center w-full sm:w-auto sm:ml-4">
              <button
                onClick={handleComecar}
                className="flex items-center gap-2 text-sm font-medium leading-sm text-left text-primary-text hover:text-primary-background transition-colors"
                style={{ fontFamily: 'Inter' }}
              >
                <span>Começar</span>
                <Image
                  src="/images/img_arrow_right.svg"
                  alt="Arrow right"
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection