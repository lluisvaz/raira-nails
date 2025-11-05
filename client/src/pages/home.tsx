import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { BorderBeam } from "@/components/ui/border-beam";
import { ZapIcon } from "@/components/ui/ZapIcon";
const heroImage = "/images/raira-home.png";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(13 * 60 + 37);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
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
        background: "#170F0B",
        color: "#FFFFFF",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Barra de Oferta com Cronômetro */}
      <div
        style={{
          background: "#F0DEBC",
          width: "100%",
          padding: "14px 16px",
          textAlign: "center",
          position: "relative",
          zIndex: 50,
        }}
        data-testid="offer-bar"
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              margin: 0,
              color: "#1A1212",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ZapIcon size={18} className="text-[#1A1212]" /> OFERTA ESPECIAL EXPIRA EM:
          </span>
          <span
            style={{
              background: "#1A1212",
              color: "#FF4444",
              fontSize: "14px",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "4px",
              letterSpacing: "0.03em",
              fontFamily: "monospace",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
              border: "1.5px solid #FF4444",
            }}
            data-testid="text-offer-timer"
          >
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="text-center lg:text-left relative">
        <div className="container mx-auto max-w-7xl">
          {/* Mobile/Tablet Layout (até md) */}
          <div className="relative w-full lg:hidden overflow-visible" style={{ paddingTop: "80px" }}>
            <img
              src={heroImage}
              alt="Nail Designer de Sucesso"
              className="w-full h-[600px] md:h-[850px] object-cover pointer-events-none select-none"
              style={{ 
                objectPosition: "45% -15%"
              }}
              data-testid="img-hero"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div
              className="absolute bottom-[-240px] md:bottom-[-100px] left-0 right-0 pb-8 md:pb-8 px-4 md:px-8"
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

          {/* Desktop Layout (lg+) */}
          <div className="hidden lg:block relative w-full min-h-[1000px]">
            {/* Imagem alinhada à direita - MUITO MAIOR */}
            <div className="absolute inset-0 flex justify-end items-center">
              <div className="relative" style={{ width: "120%", marginRight: "-40%", marginTop: "0px" }}>
                <img
                  src={heroImage}
                  alt="Nail Designer de Sucesso"
                  className="w-full h-[1500px] object-contain object-right pointer-events-none select-none"
                  data-testid="img-hero-desktop"
                  style={{ background: "#170F0B" }}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </div>

            {/* Textos sobrepostos à esquerda - LARGURA AUMENTADA */}
            <div className="relative z-10 flex items-center min-h-[1000px]">
              <div className="max-w-[700px] px-8">
                <p
                  className="text-white uppercase mb-6 text-left"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    opacity: 0.7,
                  }}
                  data-testid="text-hero-badge-desktop"
                >
                  INSCRIÇÕES ABERTAS POR TEMPO LIMITADO
                </p>
                <h1 className="nail-hero-title mb-8" data-testid="text-hero-title-desktop">
                  Conquiste sua{" "}
                  <span className="gradient-text">Independência Financeira</span>{" "}
                  como Nail Designer de Sucesso.
                </h1>
                <p
                  className="nail-subtitle mb-12"
                  data-testid="text-hero-subtitle-desktop"
                >
                  Fature +R$5.000/Mês como Nail Designer, Dominando as Técnicas
                  que as Clientes Amam!
                </p>
                <div
                  className="inline-block relative group z-20"
                  style={{ padding: "6px" }}
                >
                  <a
                    href="#offer"
                    className="cta-button"
                    data-testid="button-cta-hero-desktop"
                  >
                    Quero me Tornar uma Nail Designer de Sucesso
                    <HiOutlineArrowUpRight size={24} className="text-black flex-shrink-0" />
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
          </div>

          {/* Botão Mobile/Tablet */}
          <div className="lg:hidden px-4 md:px-8 pt-64 md:pt-32 pb-20">
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
                <HiOutlineArrowUpRight size={24} className="text-black flex-shrink-0" />
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
            <p
              className="text-white uppercase mt-6 text-center"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                opacity: 0.7,
              }}
              data-testid="text-hero-badge"
            >
              INSCRIÇÕES ABERTAS POR TEMPO LIMITADO
            </p>
          </div>
        </div>
      </header>
      {/* Divisória com degradê */}
      <div className="w-full px-4 md:px-8 lg:px-16 relative z-20">
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, #170F0B 0%, #261404 15%, #261404 85%, #170F0B 100%)",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Problem Section */}
      <section className="px-4 md:px-8 text-center relative z-20">
        <div className="pt-20"></div>
        <div className="container mx-auto max-w-6xl">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 mb-6 rounded-full"
            style={{
              background: "linear-gradient(90deg, #170F0B 0%, #382607 100%)",
            }}
          >
            <img
              src="/images/logo-icon.png"
              alt="Logo"
              className="w-4 h-4"
              data-testid="img-logo-icon"
            />
            <p
              className="text-white uppercase m-0"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                opacity: 0.7,
              }}
              data-testid="text-problem-badge"
            >
              PARA QUEM É?
            </p>
          </div>
          <h2 className="nail-h2 mb-4 mx-auto lg:max-w-3xl" data-testid="text-problem-title">
            Cansada de trabalhar muito{" "}
            <span
              className="gradient-text"
              style={{
                fontFamily: "var(--font-titulos)",
                fontWeight: 700,
              }}
            >
              e sentir que não sai do lugar?
            </span>
          </h2>
          <p
            className="nail-body leading-relaxed mx-auto max-w-xl mb-16"
            data-testid="text-problem-subtitle"
          >
            Esta formação é o seu plano de fuga,{" "}
            <span style={{ fontWeight: 700 }}>desenhada para você que:</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-6xl mx-auto mb-12">
            <div
              className="nail-card text-left md:col-span-3"
              style={{ 
                minHeight: "180px", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                background: "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)"
              }}
              data-testid="card-target-audience-0"
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#DBA86F" }}
                data-testid="text-target-title-0"
              >
                Sente-se presa...
              </h3>
              <p
                className="nail-body leading-relaxed max-w-none"
                style={{ opacity: 0.85 }}
                data-testid="text-target-description-0"
              >
                Em um emprego CLT que paga pouco, não te reconhece e rouba todo o seu tempo, sem nenhuma perspectiva de crescimento.
              </p>
            </div>

            <div
              className="nail-card text-left md:col-span-4"
              style={{ 
                minHeight: "200px", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                background: "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)"
              }}
              data-testid="card-target-audience-1"
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#DBA86F" }}
                data-testid="text-target-title-1"
              >
                Sonha em ter liberdade...
              </h3>
              <p
                className="nail-body leading-relaxed max-w-none"
                style={{ opacity: 0.85 }}
                data-testid="text-target-description-1"
              >
                De fazer seus próprios horários, poder levar seu filho na escola ou ir à academia, sem ter que "bater ponto" ou pedir permissão.
              </p>
            </div>

            <div
              className="nail-card text-left md:col-span-5"
              style={{ 
                minHeight: "190px", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                background: "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)"
              }}
              data-testid="card-target-audience-2"
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#DBA86F" }}
                data-testid="text-target-title-2"
              >
                Busca uma renda maior...
              </h3>
              <p
                className="nail-body leading-relaxed max-w-none"
                style={{ opacity: 0.85 }}
                data-testid="text-target-description-2"
              >
                E vê o potencial de ganhar R$ 3.000, R$ 5.000 ou mais por mês, trabalhando para si mesma, com suas próprias regras.
              </p>
            </div>

            <div
              className="nail-card text-left md:col-span-5"
              style={{ 
                minHeight: "195px", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                background: "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)"
              }}
              data-testid="card-target-audience-3"
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#DBA86F" }}
                data-testid="text-target-title-3"
              >
                Quer ser a própria chefe...
              </h3>
              <p
                className="nail-body leading-relaxed max-w-none"
                style={{ opacity: 0.85 }}
                data-testid="text-target-description-3"
              >
                E finalmente parar de receber ordens, lidando diretamente com suas clientes e construindo algo que é seu de verdade.
              </p>
            </div>

            <div
              className="nail-card text-left md:col-span-4"
              style={{ 
                minHeight: "185px", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                background: "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)"
              }}
              data-testid="card-target-audience-4"
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#DBA86F" }}
                data-testid="text-target-title-4"
              >
                Mas não sabe por onde começar...
              </h3>
              <p
                className="nail-body leading-relaxed max-w-none"
                style={{ opacity: 0.85 }}
                data-testid="text-target-description-4"
              >
                Você olha o mercado de unhas e parece muito difícil, com muitos materiais e técnicas, e tem medo de investir e não dar certo.
              </p>
            </div>

            <div
              className="nail-card text-left md:col-span-3"
              style={{ 
                minHeight: "205px", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                background: "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)"
              }}
              data-testid="card-target-audience-5"
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#DBA86F" }}
                data-testid="text-target-title-5"
              >
                Tem medo do julgamento...
              </h3>
              <p
                className="nail-body leading-relaxed max-w-none"
                style={{ opacity: 0.85 }}
                data-testid="text-target-description-5"
              >
                De largar um emprego "seguro" (mesmo que ruim) para começar algo novo que sua família talvez não entenda como uma "profissão de verdade".
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 max-w-6xl mx-auto">
            <p
              className="nail-body leading-relaxed text-center md:text-left md:max-w-md"
              style={{ fontWeight: 500 }}
              data-testid="text-problem-conclusion"
            >
              Se você está decidida a construir uma nova realidade financeira para você e sua família... Esta formação é para você.
            </p>

            <div
              className="relative group flex-shrink-0"
              style={{ padding: "6px" }}
            >
              <a
                href="#offer"
                className="cta-button"
                data-testid="button-cta-target-audience"
              >
                QUERO ME TORNAR ALUNA
                <HiOutlineArrowUpRight size={24} className="text-black flex-shrink-0" />
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
        <div className="pb-20"></div>
        {/* Divisória com degradê */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, #170F0B 0%, #261404 15%, #261404 85%, #170F0B 100%)",
              margin: "0 auto",
            }}
          />
        </div>
      </section>

      {/* Platform Access Section */}
      <section className="py-20 px-4 md:px-8 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center lg:justify-start mb-6">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: "linear-gradient(90deg, #170F0B 0%, #382607 100%)",
              }}
            >
              <img
                src="/images/logo-icon.png"
                alt="Logo"
                className="w-4 h-4"
                data-testid="img-logo-icon-access"
              />
              <p
                className="text-white uppercase m-0"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  opacity: 0.7,
                }}
                data-testid="text-access-badge"
              >
                AO QUE VOCÊ TERÁ ACESSO?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-visible">
            {/* Lado Esquerdo - Conteúdo */}
            <div>
              <h2 className="nail-h2 mb-6 text-center lg:text-left" data-testid="text-access-title">
                Conheça sua Escola de Unhas{" "}
                <span className="gradient-text nail-h2-highlight">por dentro</span>
              </h2>

              {/* Vídeo Mobile - aparece só no mobile abaixo do título */}
              <div className="lg:hidden relative mb-8" style={{ padding: "6px" }}>
                <div 
                  className="rounded-2xl overflow-hidden"
                  style={{ 
                    border: "1px solid #DBA86F",
                    height: "300px"
                  }}
                  data-testid="container-platform-video-mobile"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    style={{ 
                      pointerEvents: "none",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    data-testid="video-platform-preview-mobile"
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>
                <BorderBeam
                  size={100}
                  duration={3}
                  colorFrom="#D19756"
                  colorTo="#F1EEE1"
                  borderThickness={2}
                  beamBorderRadius={12}
                />
              </div>

              <p
                id="text-platform-description"
                className="nail-body leading-relaxed mb-8 text-center lg:text-left"
                data-testid="text-access-description"
              >
                Nossa plataforma oferece um{" "}
                <span style={{ fontWeight: 700 }}>ambiente de aprendizado completo</span>, criado para
                transformar você do zero em uma profissional requisitada.
              </p>

              {/* Lista de Benefícios */}
              <div className="space-y-6 mb-10">
                <div 
                  className="flex items-stretch" 
                  data-testid="benefit-access-0"
                  style={{ 
                    background: "linear-gradient(90deg, #261403 0%, #170F0B 100%)"
                  }}
                >
                  <div
                    className="w-1.5 flex-shrink-0"
                    style={{ background: "#D49D5E" }}
                  />
                  <div className="py-4 px-6">
                    <p className="nail-body font-semibold mb-1" style={{ color: "#DBA86F" }}>
                      Acesso imediato por 12 meses
                    </p>
                    <p className="nail-body leading-relaxed max-w-none" style={{ opacity: 0.85 }}>
                      Para você ver e rever as técnicas no seu ritmo, até dominar cada detalhe.
                    </p>
                  </div>
                </div>

                <div 
                  className="flex items-stretch" 
                  data-testid="benefit-access-1"
                  style={{ 
                    background: "linear-gradient(90deg, #261403 0%, #170F0B 100%)"
                  }}
                >
                  <div
                    className="w-1.5 flex-shrink-0"
                    style={{ background: "#D49D5E" }}
                  />
                  <div className="py-4 px-6">
                    <p className="nail-body font-semibold mb-1" style={{ color: "#DBA86F" }}>
                      Certificado Profissional de Conclusão
                    </p>
                    <p className="nail-body leading-relaxed max-w-none" style={{ opacity: 0.85 }}>
                      Para você pendurar no seu espaço e provar sua qualificação para as clientes.
                    </p>
                  </div>
                </div>

                <div 
                  className="flex items-stretch" 
                  data-testid="benefit-access-2"
                  style={{ 
                    background: "linear-gradient(90deg, #261403 0%, #170F0B 100%)"
                  }}
                >
                  <div
                    className="w-1.5 flex-shrink-0"
                    style={{ background: "#D49D5E" }}
                  />
                  <div className="py-4 px-6">
                    <p className="nail-body font-semibold mb-1" style={{ color: "#DBA86F" }}>
                      Assista em qualquer dispositivo
                    </p>
                    <p className="nail-body leading-relaxed max-w-none" style={{ opacity: 0.85 }}>
                      No celular, tablet ou computador, na hora que for melhor para você.
                    </p>
                  </div>
                </div>

                <div 
                  className="flex items-stretch" 
                  data-testid="benefit-access-3"
                  style={{ 
                    background: "linear-gradient(90deg, #261403 0%, #170F0B 100%)"
                  }}
                >
                  <div
                    className="w-1.5 flex-shrink-0"
                    style={{ background: "#D49D5E" }}
                  />
                  <div className="py-4 px-6">
                    <p className="nail-body font-semibold mb-1" style={{ color: "#DBA86F" }}>
                      Suporte direto com nossa equipe
                    </p>
                    <p className="nail-body leading-relaxed max-w-none" style={{ opacity: 0.85 }}>
                      Para tirar dúvidas técnicas sobre os módulos, materiais e procedimentos.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <div
                  className="inline-block relative group"
                  style={{ padding: "6px" }}
                >
                  <a
                    href="#offer"
                    className="cta-button"
                    data-testid="button-cta-access"
                  >
                    QUERO ME TORNAR ALUNA
                    <HiOutlineArrowUpRight size={24} className="text-black flex-shrink-0" />
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

            {/* Lado Direito - Vídeo */}
            <div className="hidden lg:block relative" style={{ padding: "6px", marginTop: "80px" }}>
              <div 
                className="rounded-2xl overflow-hidden"
                style={{ 
                  border: "1px solid #DBA86F",
                  minHeight: "540px"
                }}
                data-testid="container-platform-video"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  style={{ 
                    pointerEvents: "none",
                    width: "100%",
                    height: "540px",
                    objectFit: "cover"
                  }}
                  data-testid="video-platform-preview"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              </div>
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
        <div className="pb-20"></div>
        {/* Divisória com degradê */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, #170F0B 0%, #261404 15%, #261404 85%, #170F0B 100%)",
              margin: "0 auto",
            }}
          />
        </div>
      </section>

      {/* E Tem Mais Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: "linear-gradient(90deg, #170F0B 0%, #382607 100%)",
              }}
            >
              <img
                src="/images/logo-icon.png"
                alt="Logo"
                className="w-4 h-4"
                data-testid="img-logo-icon-extras"
              />
              <p
                className="text-white uppercase m-0"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  opacity: 0.7,
                }}
                data-testid="text-extras-badge"
              >
                E TEM MAIS!
              </p>
            </div>
          </div>

          <h2 className="nail-h2 mb-12" data-testid="text-extras-title">
            Além disso, <span className="gradient-text nail-h2-highlight">você também terá acesso a:</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* Card 1 - Formação Completa */}
            <div
              className="rounded-2xl overflow-hidden border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 lg:col-span-2"
              style={{ background: "linear-gradient(135deg, #1A1212 0%, #2A2020 100%)" }}
              data-testid="card-extra-0"
            >
              <div className="aspect-[4/3] relative bg-gradient-to-br from-[#2A2020] to-[#1A1212] flex items-center justify-center">
                <div className="text-6xl" style={{ color: "#DBA86F", opacity: 0.3 }}>
                  📚
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: "#FCE9B5" }}>
                  Formação Completa (+150 Aulas)
                </h3>
                <p className="nail-body text-sm leading-relaxed" style={{ color: "#E0E0E0", opacity: 0.85 }}>
                  O passo a passo exato para dominar as técnicas mais lucrativas do zero.
                </p>
              </div>
            </div>

            {/* Card 2 - Comunidade VIP */}
            <div
              className="rounded-2xl overflow-hidden border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 lg:col-span-2"
              style={{ background: "linear-gradient(135deg, #1A1212 0%, #2A2020 100%)" }}
              data-testid="card-extra-1"
            >
              <div className="aspect-[4/3] relative bg-gradient-to-br from-[#2A2020] to-[#1A1212] flex items-center justify-center">
                <div className="text-6xl" style={{ color: "#DBA86F", opacity: 0.3 }}>
                  💬
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: "#FCE9B5" }}>
                  Comunidade VIP de Alunas
                </h3>
                <p className="nail-body text-sm leading-relaxed" style={{ color: "#E0E0E0", opacity: 0.85 }}>
                  Um ambiente seguro no WhatsApp para trocar experiências, mostrar treinos e ter apoio.
                </p>
              </div>
            </div>

            {/* Card 3 - Certificado */}
            <div
              className="rounded-2xl overflow-hidden border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 lg:col-span-2"
              style={{ background: "linear-gradient(135deg, #1A1212 0%, #2A2020 100%)" }}
              data-testid="card-extra-2"
            >
              <div className="aspect-[4/3] relative bg-gradient-to-br from-[#2A2020] to-[#1A1212] flex items-center justify-center">
                <div className="text-6xl" style={{ color: "#DBA86F", opacity: 0.3 }}>
                  🏆
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: "#FCE9B5" }}>
                  Certificado Profissional
                </h3>
                <p className="nail-body text-sm leading-relaxed" style={{ color: "#E0E0E0", opacity: 0.85 }}>
                  Ao final do curso, você recebe seu certificado para validar sua qualificação e passar confiança para as clientes.
                </p>
              </div>
            </div>

            {/* Card 4 - Apostilas e Listas */}
            <div
              className="rounded-2xl overflow-hidden border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 lg:col-span-3"
              style={{ background: "linear-gradient(135deg, #1A1212 0%, #2A2020 100%)" }}
              data-testid="card-extra-3"
            >
              <div className="aspect-[4/3] lg:h-40 lg:aspect-auto relative bg-gradient-to-br from-[#2A2020] to-[#1A1212] flex items-center justify-center">
                <div className="text-6xl" style={{ color: "#DBA86F", opacity: 0.3 }}>
                  📄
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: "#FCE9B5" }}>
                  Apostilas e Listas (PDF)
                </h3>
                <p className="nail-body text-sm leading-relaxed" style={{ color: "#E0E0E0", opacity: 0.85 }}>
                  O guia de compras sem desperdício e os checklists de aplicação para você baixar.
                </p>
              </div>
            </div>

            {/* Card 5 - Atualizações */}
            <div
              className="rounded-2xl overflow-hidden border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 lg:col-span-3"
              style={{ background: "linear-gradient(135deg, #1A1212 0%, #2A2020 100%)" }}
              data-testid="card-extra-4"
            >
              <div className="aspect-[4/3] lg:h-40 lg:aspect-auto relative bg-gradient-to-br from-[#2A2020] to-[#1A1212] flex items-center justify-center">
                <div className="text-6xl" style={{ color: "#DBA86F", opacity: 0.3 }}>
                  🔄
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: "#FCE9B5" }}>
                  Atualizações Gratuitas
                </h3>
                <p className="nail-body text-sm leading-relaxed" style={{ color: "#E0E0E0", opacity: 0.85 }}>
                  O mercado de unhas muda rápido. Você terá acesso a todas as novas aulas e técnicas adicionadas ao curso.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-20"></div>
        {/* Divisória com degradê */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, #170F0B 0%, #261404 15%, #261404 85%, #170F0B 100%)",
              margin: "0 auto",
            }}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8">
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
