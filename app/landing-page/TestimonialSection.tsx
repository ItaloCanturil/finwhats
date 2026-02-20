'use client';
import Image from 'next/image';

const TestimonialSection = () => {
  return (
    <section className="w-full bg-secondary-background">
      <div className="w-full bg-secondary-background pt-[56px] sm:pt-[84px] lg:pt-[112px] pb-[56px] sm:pb-[84px] lg:pb-[112px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-8 lg:gap-0 mb-[56px] sm:mb-[84px] lg:mb-[112px]">
            <h2 className="text-[22px] sm:text-[33px] lg:text-2xl font-medium leading-[26px] sm:leading-[39px] lg:leading-4xl text-left text-primary-text self-center w-full lg:w-[46%]" style={{ fontFamily: 'Manrope' }}>
              Descubra como Zaza transforma sua rotina com praticidade e eficiência.
            </h2>
            <p className="text-md font-normal leading-xl text-left text-primary-text w-full lg:w-[46%]" style={{ fontFamily: 'Inter' }}>
              Com Zaza, você ganha tempo ao gerenciar suas tarefas diárias de forma simples e rápida. Nossa assistente virtual no WhatsApp oferece conveniência ao permitir que você consulte saldo, agende compromissos e muito mais, tudo em um só lugar. Experimente a facilidade de uso e veja como sua vida pode ser mais organizada.
            </p>
          </div>

          {/* Testimonial */}
          <div className="flex flex-col gap-[19px] sm:gap-[29px] lg:gap-[38px] justify-start items-center w-full pr-[28px] sm:pr-[42px] lg:pr-[56px] pl-[28px] sm:pl-[42px] lg:pl-[56px] mt-[7px] sm:mt-[10px] lg:mt-[14px]">
            <Image
              src="/images/img_logo.svg"
              alt="Zaza Logo"
              width={114}
              height={18}
              className="w-[57px] sm:w-[86px] lg:w-[114px] h-[9px] sm:h-[14px] lg:h-[18px]"
            />

            <blockquote className="text-[14px] sm:text-[21px] lg:text-xl font-medium leading-[20px] sm:leading-[29px] lg:leading-3xl text-center text-primary-text w-full max-w-[768px]" style={{ fontFamily: 'Manrope' }}>
              &ldquo;Zaza transformou a maneira como organizo meu dia a dia. Agora, consigo gerenciar meus compromissos com facilidade e eficiência.&rdquo;
            </blockquote>

            <div className="flex flex-col gap-4 lg:gap-[16px] justify-start items-center w-full max-w-[316px]">
              <Image
                src="/images/img_avatar_image.png"
                alt="Ana Silva"
                width={64}
                height={64}
                className="w-[64px] h-[64px] rounded-lg"
              />
              <div className="flex flex-col gap-[1px] sm:gap-[2px] lg:gap-[2px] justify-center items-center w-full pr-[28px] sm:pr-[42px] lg:pr-[56px] pl-[28px] sm:pl-[42px] lg:pl-[56px]">
                <cite className="text-sm font-semibold leading-sm text-center text-primary-text not-italic" style={{ fontFamily: 'Inter' }}>
                  Ana Silva
                </cite>
                <p className="text-sm font-normal leading-sm text-center text-primary-text" style={{ fontFamily: 'Inter' }}>
                  Gerente, Empresa XYZ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
