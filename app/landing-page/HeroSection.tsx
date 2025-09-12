'use client';
import Button from'@/components/ui/Button';
 import Image from'next/image';

const HeroSection = () => {
  const handleSaibaMais = () => {
    // Navigate to features section
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCadastrese = () => {
    // Navigate to pricing section
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="w-full bg-secondary-background">
      <div className="w-full bg-secondary-background pt-[40px] sm:pt-[60px] lg:pt-[80px] pb-[40px] sm:pt-[60px] lg:pb-[80px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-start items-center w-full bg-background-gray-light rounded-md">
            {/* Left Content */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[32px] justify-start items-center w-full lg:flex-1 pt-[24px] sm:pt-[36px] lg:pt-[48px] pr-[24px] sm:pr-[36px] lg:pr-[48px] pb-[24px] sm:pb-[36px] lg:pb-[48px] pl-[24px] sm:pl-[36px] lg:pl-[48px]">
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-[22px] justify-start items-center w-full">
                <h1 className="text-[36px] sm:text-[54px] lg:text-4xl font-medium leading-[43px] sm:leading-[65px] lg:leading-7xl text-left text-primary-text w-full" style={{ fontFamily: 'Manrope' }}>
                  Zaza: Seu assistente pessoal no WhatsApp
                </h1>
                <p className="text-md font-normal leading-xl text-left text-primary-text w-full" style={{ fontFamily: 'Inter' }}>
                  Zaza é o assistente pessoal de IA que transforma sua experiência no WhatsApp. Com ele, você pode gerenciar seu saldo, agendar compromissos e muito mais, tudo de forma prática e rápida.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-start items-center w-full gap-4 lg:gap-[16px]">
                <Button
                  text="Saiba Mais"
                  variant="primary"
                  className="w-full sm:w-auto pt-[10px] pr-[24px] pb-[10px] pl-[24px]"
                  onClick={handleSaibaMais}
                />
                <Button
                  text="Cadastre-se"
                  variant="secondary"
                  className="w-full sm:w-auto pt-[10px] pr-[24px] pb-[10px] pl-[24px]"
                  onClick={handleCadastrese}
                />
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[640px] h-[320px] sm:h-[480px] lg:h-[640px] relative">
              <Image
                src="/images/img_placeholder_image.png"
                alt="Zaza WhatsApp Assistant Interface"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection