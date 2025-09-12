'use client';
import Link from'../ui/Link';
 import List from'../ui/List';
 import Line from'../ui/Line';
 import Image from'next/image';

const Footer = () => {
  return (
    <footer className="w-full bg-secondary-background">
      {/* FAQ Section */}
      <div className="w-full bg-secondary-background">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-[54px] sm:pt-[81px] lg:pt-[108px] pb-[54px] sm:pb-[81px] lg:pb-[108px]">
          <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-8 lg:gap-0">
            {/* Left Column - FAQ Title */}
            <div className="flex flex-col justify-start items-start w-full lg:w-[38%]">
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-medium leading-4xl sm:leading-5xl lg:leading-6xl text-left text-primary-text" style={{ fontFamily: 'Manrope' }}>
                Perguntas
              </h2>
              <p className="text-md font-normal leading-xl text-left text-primary-text w-full mt-[6px]" style={{ fontFamily: 'Inter' }}>
                Descubra como utilizar Zaza para facilitar sua vida no WhatsApp com nossas perguntas frequentes.
              </p>
              <Link
                href="/contact"
                className="text-sm font-medium leading-sm text-left text-primary-text bg-button-secondary-background shadow-[0px_1px_2px_#0700000c] rounded-sm pt-[10px] pr-[24px] pb-[10px] pl-[24px] mt-[16px] sm:mt-[24px] lg:mt-[32px] hover:bg-background-overlay-medium transition-colors"
                style={{ fontFamily: 'Inter' }}
              >
                Contato
              </Link>
            </div>

            {/* Right Column - FAQ Items */}
            <div className="flex flex-col gap-8 sm:gap-12 lg:gap-[48px] justify-start items-center self-center w-full lg:w-[54%]">
              {/* FAQ Item 1 */}
              <div className="flex flex-col gap-4 lg:gap-[16px] justify-center items-start w-full">
                <h3 className="text-md font-bold leading-md text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                  Como usar Zaza?
                </h3>
                <p className="text-sm font-normal leading-lg text-left text-primary-text w-full" style={{ fontFamily: 'Inter' }}>
                  Para usar Zaza, basta enviar uma mensagem no WhatsApp. Você pode consultar seu saldo, agendar compromissos e muito mais. É simples e prático!
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[14px] justify-center items-start w-full">
                <h3 className="text-md font-bold leading-md text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                  Quais serviços Zaza oferece?
                </h3>
                <p className="text-sm font-normal leading-lg text-left text-primary-text w-full" style={{ fontFamily: 'Inter' }}>
                  Zaza oferece uma variedade de serviços, incluindo consulta de saldo e agendamento de lembretes. Você pode gerenciar suas tarefas diárias diretamente pelo WhatsApp. É como ter um assistente pessoal sempre à mão!
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[14px] justify-center items-start w-full">
                <h3 className="text-md font-bold leading-md text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                  Zaza é gratuito?
                </h3>
                <p className="text-sm font-normal leading-lg text-left text-primary-text w-full" style={{ fontFamily: 'Inter' }}>
                  Sim, o uso de Zaza é gratuito. Você pode aproveitar todos os serviços sem custo adicional. Basta ter uma conta no WhatsApp para começar!
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[14px] justify-center items-start w-full">
                <h3 className="text-md font-bold leading-md text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                  Como agendar um lembrete?
                </h3>
                <p className="text-sm font-normal leading-lg text-left text-primary-text w-full" style={{ fontFamily: 'Inter' }}>
                  Para agendar um lembrete, envie uma mensagem com a data e hora desejadas. Zaza confirmará seu agendamento e enviará um lembrete na hora certa. É fácil e eficiente!
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[14px] justify-center items-start w-full">
                <h3 className="text-md font-bold leading-md text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                  Zaza funciona em qualquer dispositivo?
                </h3>
                <p className="text-sm font-normal leading-lg text-left text-primary-text w-full" style={{ fontFamily: 'Inter' }}>
                  Sim, Zaza funciona em qualquer dispositivo que tenha o WhatsApp instalado. Isso inclui smartphones e tablets. Você pode acessar seus serviços de qualquer lugar!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="w-full bg-secondary-background">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-[40px] sm:pt-[60px] lg:pt-[80px] pb-[40px] sm:pb-[60px] lg:pb-[80px]">
          <div className="flex flex-col gap-[40px] sm:gap-[60px] lg:gap-[80px] justify-start items-center w-full">
            {/* Footer Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-8 lg:gap-0">
              {/* Left Column - Company Info */}
              <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[32px] justify-start items-start self-center w-full lg:w-[64%]">
                <Image
                  src="/images/img_company_logo.svg"
                  alt="Company Logo"
                  width={84}
                  height={36}
                  className="w-[42px] sm:w-[63px] lg:w-[84px] h-[18px] sm:h-[27px] lg:h-[36px]"
                />
                
                <List variant="navigation" className="justify-start items-start w-auto">
                  <List.Item>
                    <span className="text-xs font-semibold leading-xs text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                      Endereço:
                    </span>
                  </List.Item>
                  <List.Item className="mt-[4px]">
                    <Link href="#" variant="underline" className="text-xs font-normal leading-xs text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                      Nível 1, 12 Rua Exemplo, Sydney NSW 2000
                    </Link>
                  </List.Item>
                  
                  <List.Item className="mt-[24px]">
                    <div className="flex flex-col gap-[6px] justify-start items-start w-auto">
                      <span className="text-xs font-semibold leading-xs text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                        Contato:
                      </span>
                      <List as="ul" variant="horizontal" className="gap-[8px] justify-start items-center w-auto">
                        <List.Item>
                          <Link href="tel:1800" variant="underline" className="text-xs font-normal leading-xs text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                            1800
                          </Link>
                        </List.Item>
                        <List.Item>
                          <Link href="tel:123" variant="underline" className="text-xs font-normal leading-xs text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                            123
                          </Link>
                        </List.Item>
                        <List.Item>
                          <Link href="tel:4567" variant="underline" className="text-xs font-normal leading-xs text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                            4567
                          </Link>
                        </List.Item>
                      </List>
                    </div>
                  </List.Item>
                  
                  <List.Item>
                    <Link href="mailto:email@exemplo.com" variant="underline" className="text-xs font-normal leading-xs text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                      email@exemplo.com
                    </Link>
                  </List.Item>
                </List>

                {/* Social Media Icons */}
                <div className="flex gap-3 lg:gap-[12px] justify-start items-center w-auto">
                  <Link href="#" external>
                    <Image
                      src="/images/img_facebook.svg"
                      alt="Facebook"
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <Link href="#" external>
                    <Image
                      src="/images/img_instagram.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <Link href="#" external>
                    <Image
                      src="/images/img_x.svg"
                      alt="X (Twitter)"
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <Link href="#" external>
                    <Image
                      src="/images/img_linkedin.svg"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <Link href="#" external>
                    <Image
                      src="/images/img_youtube.svg"
                      alt="YouTube"
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] hover:opacity-80 transition-opacity"
                    />
                  </Link>
                </div>
              </div>

              {/* Right Column - Footer Links */}
              <div className="flex flex-col sm:flex-row gap-6 lg:gap-[24px] justify-center items-center w-full lg:w-[30%]">
                {/* First Column of Links */}
                <List variant="navigation" className="justify-start items-center w-full">
                  <List.Item className="pt-[8px] pb-[8px]">
                    <div className="flex justify-start items-center w-full">
                      <Link href="#" className="text-xs font-semibold leading-xs text-left text-primary-text hover:text-primary-background transition-colors" style={{ fontFamily: 'Inter' }}>
                        Link Um
                      </Link>
                    </div>
                  </List.Item>
                  <List.Item className="pt-[8px] pb-[8px]">
                    <div className="flex justify-start items-center w-full">
                      <Link href="#" className="text-xs font-semibold leading-xs text-left text-primary-text hover:text-primary-background transition-colors" style={{ fontFamily: 'Inter' }}>
                        Link Dois
                      </Link>
                    </div>
                  </List.Item>
                  <List.Item className="pt-[8px] pb-[8px]">
                    <div className="flex justify-start items-center w-full">
                      <Link href="#" className="text-xs font-semibold leading-xs text-left text-primary-text hover:text-primary-background transition-colors" style={{ fontFamily: 'Inter' }}>
                        Link Três
                      </Link>
                    </div>
                  </List.Item>
                  <List.Item className="pt-[8px] pb-[8px]">
                    <div className="flex justify-start items-center w-full">
                      <Link href="#" className="text-xs font-semibold leading-xs text-left text-primary-text hover:text-primary-background transition-colors" style={{ fontFamily: 'Inter' }}>
                        Link Quatro
                      </Link>
                    </div>
                  </List.Item>
                  <List.Item className="pt-[8px] pb-[8px]">
                    <div className="flex justify-start items-center w-full">
                      <Link href="#" className="text-xs font-semibold leading-xs text-left text-primary-text hover:text-primary-background transition-colors" style={{ fontFamily: 'Inter' }}>
                        Link Cinco
                      </Link>
                    </div>
                  </List.Item>
                </List>

                {/* Second Column of Links */}
                <List variant="navigation" className="justify-start items-center w-full">
                  <List.Item className="pt-[8px] pb-[8px]">
                    <div className="flex justify-start items-center w-full">
                      <Link href="#" className="text-xs font-semibold leading-xs text-left text-primary-text hover:text-primary-background transition-colors" style={{ fontFamily: 'Inter' }}>
                        Link Seis
                      </Link>
                    </div>
                  </List.Item>
                  <List.Item className="pt-[8px] pb-[8px]">
                    <div className="flex justify-start items-center w-full">
                      <Link href="#" className="text-xs font-semibold leading-xs text-left text-primary-text hover:text-primary-background transition-colors" style={{ fontFamily: 'Inter' }}>
                        Link Sete
                      </Link>
                    </div>
                  </List.Item>
                  <List.Item className="pt-[8px] pb-[8px]">
                    <div className="flex justify-start items-center w-full">
                      <Link href="#" className="text-xs font-semibold leading-xs text-left text-primary-text hover:text-primary-background transition-colors" style={{ fontFamily: 'Inter' }}>
                        Link Oito
                      </Link>
                    </div>
                  </List.Item>
                  <List.Item className="pt-[8px] pb-[8px]">
                    <div className="flex justify-start items-center w-full">
                      <Link href="#" className="text-xs font-semibold leading-xs text-left text-primary-text hover:text-primary-background transition-colors" style={{ fontFamily: 'Inter' }}>
                        Link Nove
                      </Link>
                    </div>
                  </List.Item>
                  <List.Item className="pt-[8px] pb-[8px]">
                    <div className="flex justify-start items-center w-full">
                      <Link href="#" className="text-xs font-semibold leading-xs text-left text-primary-text hover:text-primary-background transition-colors" style={{ fontFamily: 'Inter' }}>
                        Link Dez
                      </Link>
                    </div>
                  </List.Item>
                </List>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[30px] justify-start items-center w-full">
              <Line width="full" height="1px" variant="medium" />
              
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 sm:gap-0">
                <p className="text-xs font-normal leading-xs text-left text-primary-text" style={{ fontFamily: 'Inter' }}>
                  © 2025 Relume. Todos os direitos reservados.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-[24px] justify-center items-center w-auto">
                  <Link href="/privacy" variant="underline" className="text-xs font-normal leading-xs text-left text-primary-text self-end" style={{ fontFamily: 'Inter' }}>
                    Política de Privacidade
                  </Link>
                  <Link href="/terms" variant="underline" className="text-xs font-normal leading-xs text-left text-primary-text self-end" style={{ fontFamily: 'Inter' }}>
                    Termos de Serviço
                  </Link>
                  <Link href="/cookies" variant="underline" className="text-xs font-normal leading-xs text-left text-primary-text self-end" style={{ fontFamily: 'Inter' }}>
                    Configurações de Cookies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer