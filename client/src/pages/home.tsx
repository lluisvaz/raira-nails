import { ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MoveRightIcon } from "@/components/ui/MoveRightIcon";
import { BorderBeam } from "@/components/ui/border-beam";
const heroImage = "/images/raira-home.png";

export default function Home() {
  const modules = [
    {
      title: "Módulo 0: Comece por Aqui",
      description:
        "Boas-vindas, mentalidade empreendedora e lista de materiais essenciais para iniciar sua jornada como Nail Designer profissional.",
    },
    {
      title: "Módulo 1: A Base de Tudo",
      description:
        "Anatomia da unha, biossegurança, cutilagem perfeita e preparação correta da unha natural. Fundamentos que farão toda a diferença.",
    },
    {
      title: "Módulo 2: Domínio da Fibra de Vidro",
      description:
        "Aprenda a técnica mais lucrativa! Aplicação passo a passo, ponto de tensão, curvatura C perfeita e acabamento profissional.",
    },
    {
      title: "Módulo 3: Versatilidade com Gel",
      description:
        "Expanda seu portfólio com Gel Moldado, Gel na Tip, Blindagem e Banho de Gel. Múltiplas técnicas para atender todas as clientes.",
    },
    {
      title: "Módulo 4: Técnicas Avançadas",
      description:
        "Posicione-se como especialista dominando formatos modernos (Almond, Stiletto, Bailarina) e alongamentos diferenciados.",
    },
  ];

  const bonuses = [
    "BÔNUS 1: Curso de Marketing para Nail Designers (Valor: R$297)",
    "BÔNUS 2: Ficha de Anamnese e Modelos de Logo (Valor: R$97)",
    "BÔNUS 3: Acesso à Comunidade VIP de Alunas (Valor: Incalculável)",
    "BÔNUS 4: Certificado de Conclusão Profissional",
  ];

  const testimonials = [
    {
      text: "O curso é muito didático e completo! Eu nunca tinha trabalhado com alongamento e hoje já estou fazendo trabalhos lindos. As aulas são claras e a professora é muito atenciosa.",
      author: "Juliana S.",
    },
    {
      text: "Meu faturamento dobrou em 3 meses! Aprendi não só as técnicas, mas também como precificar e vender meu trabalho. Hoje tenho agenda cheia e lista de espera.",
      author: "Maria P.",
    },
    {
      text: "Aprendi a cobrar o preço justo pelo meu trabalho e a me posicionar como profissional. O módulo de negócios foi fundamental para minha transformação.",
      author: "Carla F.",
    },
  ];

  const faqs = [
    {
      question: "Como vou acessar o curso?",
      answer:
        "Assim que o pagamento for confirmado, você receberá por email seus dados de acesso à plataforma. Todas as aulas ficam disponíveis na área de membros, que você pode acessar de qualquer dispositivo.",
    },
    {
      question: "O acesso é vitalício?",
      answer:
        "Sim! Você terá acesso vitalício a todo o conteúdo do curso, podendo assistir quantas vezes quiser, no seu ritmo. Além disso, todas as atualizações futuras serão incluídas sem custo adicional.",
    },
    {
      question: "Preciso ter os materiais para começar?",
      answer:
        "Não precisa ter todos os materiais de imediato. No Módulo 0, você recebe uma lista completa e detalhada dos materiais essenciais, com sugestões de fornecedores confiáveis. Você pode começar com o básico e ir expandindo conforme avança.",
    },
    {
      question: "Vou receber certificado?",
      answer:
        "Sim! Ao concluir a formação, você receberá um certificado digital de conclusão que comprova sua qualificação como Nail Designer profissional.",
    },
    {
      question: "Como funciona o suporte?",
      answer:
        "Você terá acesso à comunidade VIP exclusiva de alunas, onde poderá tirar dúvidas, compartilhar seus trabalhos e trocar experiências. Além disso, há suporte direto para questões técnicas sobre o acesso à plataforma.",
    },
  ];

  return (
    <div
      style={{
        background: "#130C0C",
        color: "#FFFFFF",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Hero Section */}
      <header className="glow-section text-center relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="relative w-full">
            <img
              src={heroImage}
              alt="Nail Designer de Sucesso"
              className="w-full h-[500px] md:h-[600px] lg:h-[700px] object-cover object-top"
              data-testid="img-hero"
            />
            <div
              className="absolute bottom-[-280px] md:bottom-[-140px] left-0 right-0 pb-8 md:pb-8 px-4 md:px-8"
              style={{
                background:
                  "linear-gradient(to top, rgba(19, 12, 12, 0.98) 0%, rgba(19, 12, 12, 0.85) 50%, rgba(19, 12, 12, 0.4) 80%, transparent 100%)",
              }}
            >
              <h1 className="nail-hero-title mb-0" data-testid="text-hero-title">
                Conquiste sua{" "}
                <span className="gradient-text">Independência Financeira</span>{" "}
                como Nail Designer de Sucesso.
              </h1>
              <p
                className="nail-subtitle mb-10 md:mb-8 mt-10 md:mt-8"
                data-testid="text-hero-subtitle"
              >
                Fature +R$5.000/Mês como Nail Designer, Dominando as Técnicas
                que as Clientes Amam!
              </p>
            </div>
          </div>
          <div className="px-4 md:px-8 pt-64 md:pt-32">
            <div
              className="inline-block relative group"
              style={{ padding: "6px" }}
            >
              <a
                href="#offer"
                className="cta-button"
                data-testid="button-cta-hero"
              >
                Quero me Tornar uma Nail Designer de Sucesso
                <MoveRightIcon size={24} className="text-black flex-shrink-0" />
              </a>
              <BorderBeam
                size={100}
                duration={3}
                colorFrom="#D19756"
                colorTo="#F1EEE1"
                borderThickness={2}
                beamBorderRadius={12}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="nail-h2" data-testid="text-problem-title">
            Se você se sente{" "}
            <span className="gradient-text nail-h2-highlight">presa</span> em um
            trabalho que não te valoriza...
          </h2>
          <p
            className="nail-body leading-relaxed mx-auto"
            data-testid="text-problem-description"
          >
            Se você se sente presa em um trabalho que não te valoriza, sonha em
            ter sua independência financeira ou já é manicure mas não consegue
            aumentar seu faturamento... eu sei exatamente como você se sente.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="nail-h2" data-testid="text-solution-title">
            Mas imagine ter a Profissão que te dá{" "}
            <span className="gradient-text nail-h2-highlight">Liberdade</span>
          </h2>
          <p
            className="nail-body leading-relaxed mx-auto"
            data-testid="text-solution-description"
          >
            Mas imagine ter uma profissão que te permite ganhar bem, ter
            flexibilidade de horários e ainda trabalhar com a beleza e
            autoestima das mulheres. Essa é a realidade da Nail Designer de
            Sucesso, e eu criei o mapa para você chegar lá.
          </p>
        </div>
      </section>

      {/* Modules Section */}
      <section className="glow-section py-12 md:py-20 px-4 md:px-8 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="nail-h2" data-testid="text-modules-title">
            A Formação{" "}
            <span className="gradient-text nail-h2-highlight">Completa</span> do
            Zero ao Avançado
          </h2>
          <div className="modules-grid">
            {modules.map((module, index) => (
              <div
                key={index}
                className={`nail-card module-card-${index + 1}`}
                data-testid={`card-module-${index}`}
              >
                <h3
                  className="nail-h3 mb-4"
                  data-testid={`text-module-title-${index}`}
                >
                  {module.title}
                </h3>
                <p
                  className="nail-body leading-relaxed max-w-none"
                  data-testid={`text-module-description-${index}`}
                >
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="nail-h2" data-testid="text-bonus-title">
            Você ainda recebe{" "}
            <span className="gradient-text nail-h2-highlight">
              Bônus Exclusivos
            </span>
          </h2>
          <ul className="text-left space-y-5 max-w-2xl mx-auto">
            {bonuses.map((bonus, index) => (
              <li
                key={index}
                className="flex items-start nail-body max-w-none"
                data-testid={`list-bonus-${index}`}
              >
                <span className="bonus-check">✓</span>
                <span>{bonus}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="nail-h2" data-testid="text-testimonials-title">
            Elas Começaram do Zero e Hoje Têm{" "}
            <span className="gradient-text nail-h2-highlight">Sucesso</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="nail-card"
                data-testid={`card-testimonial-${index}`}
              >
                <p
                  className="nail-body leading-relaxed mb-4 max-w-none"
                  data-testid={`text-testimonial-quote-${index}`}
                >
                  "{testimonial.text}"
                </p>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#DBA86F" }}
                  data-testid={`text-testimonial-author-${index}`}
                >
                  - Aluna {testimonial.author}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section
        id="offer"
        className="glow-section py-12 md:py-20 px-4 md:px-8 relative z-10"
      >
        <div
          className="container mx-auto max-w-4xl p-6 md:p-12 text-center"
          style={{ background: "#1A1212", borderRadius: "20px" }}
        >
          <h2 className="nail-h2" data-testid="text-offer-title">
            Tenha{" "}
            <span className="gradient-text nail-h2-highlight">
              Acesso Imediato
            </span>{" "}
            à Formação Completa
          </h2>

          <p
            className="nail-body line-through mb-4 max-w-none"
            style={{ color: "#888" }}
            data-testid="text-price-anchor"
          >
            Tudo isso valeria facilmente R$997
          </p>

          <div
            className="font-bold mb-2"
            style={{
              color: "#FCE9B5",
              fontSize: "clamp(2.5rem, 8vw, 3.75rem)",
            }}
            data-testid="text-price-installment"
          >
            12x de R$ 47,70
          </div>

          <p className="nail-subtitle mb-10" data-testid="text-price-cash">
            ou R$ 497 à vista
          </p>

          <div
            className="inline-block relative group mb-12"
            style={{ padding: "6px" }}
          >
            <a
              href="#checkout"
              className="cta-button"
              data-testid="button-cta-offer"
            >
              Quero Garantir Minha Vaga com Desconto!
              <MoveRightIcon size={24} className="text-black flex-shrink-0" />
            </a>
            <BorderBeam
              size={100}
              duration={3}
              colorFrom="#D19756"
              colorTo="#F1EEE1"
              borderThickness={2}
              beamBorderRadius={12}
            />
          </div>

          <div
            className="mt-8 md:mt-12 p-6 md:p-8 rounded-2xl"
            style={{ background: "#130C0C", border: "2px solid #DBA86F" }}
          >
            <ShieldCheck
              size={64}
              strokeWidth={1.5}
              className="mx-auto mb-4"
              style={{ color: "#DBA86F" }}
              data-testid="icon-guarantee"
            />
            <h3
              className="nail-h3 font-bold mb-3"
              data-testid="text-guarantee-title"
            >
              Garantia de 7 Dias
            </h3>
            <p
              className="nail-body leading-relaxed max-w-none"
              data-testid="text-guarantee-description"
            >
              Seu risco é zero. Se por qualquer motivo não gostar do curso,
              devolvemos 100% do seu dinheiro. Sem perguntas, sem complicação.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="nail-h2" data-testid="text-faq-title">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-0"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger
                  className="faq-trigger hover:no-underline [&>svg]:hidden"
                  data-testid={`faq-question-${index}`}
                >
                  <span>{faq.question}</span>
                  <span className="faq-indicator"></span>
                </AccordionTrigger>
                <AccordionContent className="faq-content p-0">
                  <div
                    className="faq-answer"
                    data-testid={`faq-answer-${index}`}
                  >
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-4 md:px-8 text-center"
        style={{ borderTop: "1px solid #221A2A" }}
      >
        <div className="container mx-auto">
          <p className="nail-footer" data-testid="text-footer-copyright">
            © 2025 Formação Nail Designer de Sucesso. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
