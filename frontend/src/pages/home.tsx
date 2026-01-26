import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { BorderBeam } from "@/components/ui/border-beam";
import { motion, type Variants } from "motion/react";
import { AiFillSpotify } from "react-icons/ai";
import { FaHeadphones, FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt, FaPinterest, FaSnapchatGhost } from "react-icons/fa";
import { RiNetflixFill } from "react-icons/ri";

// Componente de vídeo otimizado com Intersection Observer
const IntersectionVideoPlayer = ({
  src,
  poster,
  className,
  style,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  children,
  ...props
}: React.VideoHTMLAttributes<HTMLVideoElement> & { src?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Ignorar erros de autoplay se houver
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 } // Inicia quando 10% do vídeo está visível
    );

    observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      style={style}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload="none"
      {...props}
    >
      {children}
    </video>
  );
};

// Componente auxiliar para ícones do celular
const IconWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-300 to-neutral-200 dark:from-neutral-700 dark:to-neutral-900">
      {children}
    </div>
  );
};

// Variantes de animação do celular
const phoneVariant: Variants = {
  open: {
    y: -36,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  close: {
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const notificationVariant: Variants = {
  open: {
    y: 48,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.1,
    },
  },
  close: {
    y: -72,
    scale: 0.75,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const lockVariant: Variants = {
  open: {
    backgroundColor: "#EF5024",
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  close: {
    backgroundColor: "#262626",
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

const lockLightVariant: Variants = {
  open: {
    backgroundColor: "#EF5024",
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  close: {
    backgroundColor: "#a3a3a3",
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

const hoverLift = {
  y: -8,
  transition: { duration: 0.3, ease: "easeOut" as const }
};

const mobileHoverLift = {
  y: 0,
  transition: { duration: 0.3, ease: "easeOut" as const }
};

// Variante de animação blur text minimalista e moderna
const blurText: Variants = {
  hidden: { 
    opacity: 0, 
    filter: "blur(8px)", // Reduzido de 10px para 8px
    y: 10 // Reduzido de 20 para 10
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { 
      duration: 0.6, // Reduzido de 0.8 para 0.6
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

const blurTextStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Reduzido de 0.1 para 0.08
      delayChildren: 0.05 // Reduzido de 0.1 para 0.05
    }
  }
};

// Componente do celular
const PhoneComponent = () => {
  return (
    <motion.div
      variants={phoneVariant}
      className="relative mx-auto h-full w-full rounded-[44px] bg-neutral-300 p-1.5 dark:bg-neutral-800"
    >
      <div className="relative h-full overflow-hidden rounded-[38px] bg-neutral-200 dark:bg-neutral-950/50">
        <div className="absolute left-8 top-3.5 text-[9px] text-neutral-500">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <motion.div
          variants={lockVariant}
          className="absolute left-[112px] top-2 hidden h-6 w-6 items-center justify-center rounded-full dark:flex"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4">
            <g fill="#545454">
              <path d="M3 8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"></path>
              <path d="M8 3a2.5 2.5 0 0 0-2.5 2.5V9h-1V5.5a3.5 3.5 0 1 1 7 0V9h-1V5.5A2.5 2.5 0 0 0 8 3Z"></path>
            </g>
          </svg>
        </motion.div>
        <motion.div
          variants={lockLightVariant}
          className="absolute left-[112px] top-2 flex h-6 w-6 items-center justify-center rounded-full dark:hidden"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4">
            <g fill="#404040">
              <path d="M3 8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"></path>
              <path d="M8 3a2.5 2.5 0 0 0-2.5 2.5V9h-1V5.5a3.5 3.5 0 1 1 7 0V9h-1V5.5A2.5 2.5 0 0 0 8 3Z"></path>
            </g>
          </svg>
        </motion.div>
        <motion.div
          variants={notificationVariant}
          className="absolute left-3.5 z-10 h-12 w-[90%] overflow-hidden rounded-md bg-neutral-300 shadow-lg dark:bg-neutral-800"
        >
          <div className="relative flex h-full items-center gap-3 px-2">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-200 shadow-lg dark:bg-neutral-700">
              <img
                src="https://res.cloudinary.com/dopp0v9eq/image/upload/v1762983841/hotmart_rgwrhr.png"
                alt="Hotmart"
                loading="lazy"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "contain"
                }}
              />
            </div>
            <div className="flex-1">
              <div className="flex w-full flex-col">
                <div className="relative flex w-full items-start justify-between">
                  <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                    Hotmart
                  </p>
                  <span className="absolute right-0 top-0 text-[9px] text-neutral-500">
                    2h atrás
                  </span>
                </div>
                <p className="mt-1 text-start text-[10px] text-neutral-600 dark:text-neutral-400" style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                  Acesso liberado! Vamos começar?
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="absolute top-10 flex h-full w-full flex-col items-center gap-3 px-4 pt-4">
          <div className="flex w-full items-center gap-5">
            <IconWrapper>
              <FaPhoneAlt className="size-5 text-neutral-500" />
            </IconWrapper>
            <IconWrapper>
              <FaPinterest className="size-5 text-neutral-500" />
            </IconWrapper>
            <IconWrapper>
              <AiFillSpotify className="size-5 text-neutral-500" />
            </IconWrapper>
            <IconWrapper>
              <FaHeadphones className="size-5 text-neutral-500" />
            </IconWrapper>
          </div>
          <div className="flex w-full items-center gap-5">
            <IconWrapper>
              <RiNetflixFill className="size-5 text-neutral-500" />
            </IconWrapper>
            <IconWrapper>
              <img
                src="https://res.cloudinary.com/dopp0v9eq/image/upload/v1762983841/hotmart_rgwrhr.png"
                alt="Hotmart"
                loading="lazy"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "contain"
                }}
              />
              <motion.div
                variants={lockVariant}
                className="absolute -left-1 -top-1 hidden h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] text-neutral-500 dark:flex"
              >
                1
              </motion.div>
              <motion.div
                variants={lockLightVariant}
                className="absolute -left-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] text-neutral-700 dark:hidden"
              >
                1
              </motion.div>
            </IconWrapper>
            <IconWrapper>
              <FaXTwitter className="size-5 text-neutral-500" />
            </IconWrapper>
            <IconWrapper>
              <FaSnapchatGhost className="size-5 text-neutral-500" />
            </IconWrapper>
          </div>
          <div className="flex w-full items-center gap-5">
            <IconWrapper />
            <IconWrapper />
            <IconWrapper />
            <IconWrapper />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Componente do PDF
const PDFComponent = () => {
  return (
    <motion.div
      className="relative mx-auto h-full w-full"
      variants={blurText}
      initial="hidden"
      animate="visible"
    >
      <div className="relative h-full w-full flex items-center justify-center">
        {/* Documento PDF */}
        <div className="relative bg-white dark:bg-neutral-100 rounded-lg shadow-2xl" style={{ width: "85%", height: "90%", transform: "perspective(1000px) rotateY(-5deg) rotateX(2deg)" }}>
          {/* Folha do documento */}
          <div className="absolute inset-0 bg-white rounded-lg shadow-inner" style={{ padding: "12px" }}>
            {/* Cabeçalho do PDF */}
            <div className="h-8 rounded-t flex items-center justify-center mb-2" style={{ background: "linear-gradient(90deg, #D19756 0%, #EFD5A7 50%, #F1EEE1 100%)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black opacity-20"></div>
                <div className="w-2 h-2 rounded-full bg-black opacity-20"></div>
                <div className="w-2 h-2 rounded-full bg-black opacity-20"></div>
              </div>
            </div>

            {/* Conteúdo do PDF */}
            <div className="space-y-2">
              <div className="h-3 bg-neutral-300 rounded w-3/4"></div>
              <div className="h-3 bg-neutral-300 rounded w-full"></div>
              <div className="h-3 bg-neutral-300 rounded w-5/6"></div>
              <div className="h-3 bg-neutral-300 rounded w-4/5 mt-3"></div>
              <div className="h-3 bg-neutral-300 rounded w-full"></div>
              <div className="h-3 bg-neutral-300 rounded w-3/4"></div>
              <div className="h-3 bg-neutral-300 rounded w-5/6 mt-3"></div>
              <div className="h-3 bg-neutral-300 rounded w-full"></div>
              <div className="h-3 bg-neutral-300 rounded w-4/5"></div>
            </div>
          </div>

          {/* Ícone PDF no canto */}
          <div className="absolute bottom-2 right-2 w-8 h-8 rounded flex items-center justify-center" style={{ background: "linear-gradient(90deg, #D19756 0%, #EFD5A7 50%, #F1EEE1 100%)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  // State to defer rendering of off-screen or heavy components on mobile
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    
    // Defer non-critical rendering using RequestIdleCallback if available
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => setIsReady(true), { timeout: 2000 });
    } else {
      const timer = setTimeout(() => setIsReady(true), 150);
      return () => clearTimeout(timer);
    }

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Smooth scroll handler for anchor links
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link && link.getAttribute('href') === '#tudo-que-voce-precisa') {
        e.preventDefault();
        const targetElement = document.getElementById('tudo-que-voce-precisa');
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  const faqs = [
    {
      question: "Como vou acessar o curso?",
      answer:
        "Assim que o pagamento for confirmado, você receberá por email seus dados de acesso à plataforma. Todas as aulas ficam disponíveis na área de membros, que você pode acessar de qualquer dispositivo.",
    },
    {
      question: "O acesso é por quanto tempo?",
      answer:
        "Você terá acesso por 12 meses a todo o conteúdo do curso, podendo assistir quantas vezes quiser, no seu ritmo.",
    },
    {
      question: "Quanto uma nail designer consegue faturar aplicando o conteúdo?",
      answer:
        "Se você aplicar o conteúdo do curso com dedicação, poderá alcançar um faturamento médio de R$ 6.000,00 por mês.",
    },
    {
      question: "O curso tem garantia?",
      answer:
        "Sim! Você tem 7 dias de garantia incondicional. Se por qualquer motivo você não ficar satisfeita, devolvemos 100% do seu dinheiro, sem burocracia.",
    },
    {
      question: "Preciso ter experiência para começar?",
      answer:
        "Não! O curso foi desenhado tanto para iniciantes do absoluto zero quanto para profissionais que já atuam e desejam aperfeiçoar suas técnicas e elevar o nível do seu trabalho.",
    },
    {
      question: "Quais as formas de pagamento?",
      answer:
        "Você pode realizar sua inscrição via Cartão de Crédito (com parcelamento em até 12x), Pix ou Boleto Bancário. No cartão e Pix, o acesso é liberado imediatamente.",
    },
    {
      question: "O curso serve para quem já é manicure?",
      answer:
        "Com certeza! Se você já é manicure, este curso é o próximo passo ideal para você se especializar em alongamentos de alto padrão e aumentar consideravelmente o valor do seu serviço.",
    },
    {
      question: "O curso oferece certificado?",
      answer:
        "Sim! Ao concluir todas as aulas do curso, você receberá um certificado de conclusão oficial, atestando seu domínio nas técnicas ensinadas e valorizando ainda mais seu currículo profissional.",
    },
    {
      question: "Como tiro minhas dúvidas durante o curso?",
      answer:
        "Além da nossa comunidade exclusiva no WhatsApp, você pode deixar suas dúvidas logo abaixo de cada aula na plataforma de membros. Nossa equipe e a própria Raira dão suporte às alunas.",
    },
    {
      question: "O curso oferece algum material de apoio?",
      answer:
        "Sim! Além das videoaulas, você terá acesso a materiais complementares em PDF, como guias de estudo, listas de materiais e modelos de fichas de anamnese para baixar e utilizar no seu dia a dia.",
    },
    {
      question: "As aulas são ao vivo ou gravadas?",
      answer:
        "As aulas são 100% gravadas em altíssima qualidade. Isso permite que você assista no seu próprio horário, pause, volte e reveja quantas vezes precisar durante os 12 meses de acesso.",
    },
    {
      question: "Posso assistir pelo celular?",
      answer:
        "Com certeza! A plataforma é totalmente responsiva e você também pode utilizar o aplicativo da Hotmart (Sparkle) para assistir às aulas offline, de onde estiver.",
    },
    {
      question: "O pagamento é seguro?",
      answer:
        "Totalmente seguro. Utilizamos a plataforma da Hotmart, a maior rede de produtos digitais da América Latina, que garante a proteção total dos seus dados e a entrega imediata do seu acesso.",
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
      {/* Hero Section */}
      <header className="text-center lg:text-left relative overflow-hidden">
        {/* Full-width Background Images */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          {isMobile ? (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/images/raira-nails-background.webp')",
                backgroundSize: "130%",
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
              }}
            />
          ) : (
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                backgroundImage: "url('/images/raira-nails-background-desktop.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center left",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
        </div>

        {/* Background Decorative Elements - OPTIMIZED */}
        <div className="absolute inset-0 pointer-events-none">
          {!isMobile && (
            <motion.div
              className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px]"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(219, 168, 111, 0.25) 0%, rgba(219, 168, 111, 0.15) 30%, transparent 70%)",
                filter: "blur(40px)",
                willChange: "transform, opacity",
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }
              }
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {!isMobile && (
            <motion.div
              className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px]"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(219, 168, 111, 0.2) 0%, rgba(209, 151, 86, 0.12) 40%, transparent 70%)",
                filter: "blur(40px)",
                willChange: "transform, opacity",
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.6, 0.4],
                  }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Dot pattern - static for performance */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(219, 168, 111, 0.8) 1.5px, transparent 1.5px)",
              backgroundSize: "40px 40px",
            }}
          />

          {!isMobile && !prefersReducedMotion &&
            [...Array(4)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: "rgba(219, 168, 111, 0.8)",
                  boxShadow: "0 0 8px rgba(219, 168, 111, 0.6)",
                  left: `${15 + i * 20}%`,
                  top: `${25 + i * 15}%`,
                  willChange: "transform, opacity",
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -40, -80],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeOut",
                }}
              />
            ))}

          {/* Grid overlay - static */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(219, 168, 111, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(219, 168, 111, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Mobile/Tablet Layout (até md) */}
          <div
            className="relative w-full lg:hidden overflow-visible min-h-[600px] md:min-h-[850px]"
            style={{
              paddingTop: "80px",
            }}
          >
            <div className="absolute bottom-[-240px] md:bottom-[-140px] left-0 right-0 pb-8 md:pb-8 px-4 md:px-8">
              <motion.h1
                className="nail-hero-title mb-0"
                data-testid="text-hero-title"
                variants={blurText}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                Conquiste sua{" "}
                <span className="gradient-text">Independência Financeira</span>{" "}
                como Nail Designer.
              </motion.h1>
              <motion.p
                className="nail-subtitle mb-8 md:mb-8 mt-10 md:mt-8"
                data-testid="text-hero-subtitle"
                variants={blurText}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                Fature +R$6.000/Mês como Nail Designer, Dominando as Técnicas
                que as Clientes Amam!
              </motion.p>
            </div>
          </div>

          {/* Desktop Layout (lg+) */}
          <div className="hidden lg:block relative w-full min-h-[1000px]">

            {/* Textos sobrepostos à esquerda - LARGURA AUMENTADA */}
            <div className="relative z-10 flex items-center min-h-[1000px]">
              <div className="max-w-[700px] px-8">
                <motion.div
                  className="inline-flex items-center gap-4 mb-6 text-left"
                  data-testid="text-hero-badge-desktop"
                  variants={blurText}
                  initial="hidden"
                  animate="visible"
                >
                  <img
                    src="/images/logo-icon.webp"
                    alt="Logo"
                    className="w-10 h-10"
                    {...({ fetchpriority: "high" } as any)}
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    data-testid="img-logo-icon-hero-desktop"
                  />
                  <p
                    className="text-white uppercase m-0"
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      opacity: 0.7,
                      maxWidth: "150px",
                      lineHeight: "1.1",
                      whiteSpace: "normal",
                    }}
                  >
                    INSCRIÇÕES ABERTAS<br />POR TEMPO LIMITADO
                  </p>
                </motion.div>
                <motion.h1
                  className="nail-hero-title mb-8"
                  data-testid="text-hero-title-desktop"
                  variants={blurText}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  Conquiste sua{" "}
                  <span className="gradient-text">
                    Independência Financeira
                  </span>{" "}
                  como Nail Designer.
                </motion.h1>
                <motion.p
                  className="nail-subtitle mb-12"
                  data-testid="text-hero-subtitle-desktop"
                  variants={blurText}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  Fature +6.000/Mês como Nail Designer, Dominando as Técnicas
                  que as Clientes Amam!
                </motion.p>
                <motion.div
                  className="inline-block relative group z-20"
                  style={{ padding: "6px" }}
                  variants={blurText}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <a
                    href="#tudo-que-voce-precisa"
                    className="cta-button"
                    data-testid="button-cta-hero-desktop"
                  >
                    Quero me Tornar uma Nail Designer
                    <HiOutlineArrowUpRight
                      size={24}
                      className="text-black flex-shrink-0"
                    />
                  </a>
                  <BorderBeam
                    size={100}
                    duration={3}
                    colorFrom="#D19756"
                    colorTo="#F1EEE1"
                    beamBorderRadius={12}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Botão Mobile/Tablet */}
          <div className="lg:hidden px-4 md:px-8 pt-48 md:pt-40 pb-20">
            <motion.div
              className="inline-block relative group"
              style={{ padding: "6px" }}
              variants={blurText}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <a
                href="#tudo-que-voce-precisa"
                className="cta-button"
                data-testid="button-cta-hero"
              >
                Quero me Tornar uma Nail Designer
                <HiOutlineArrowUpRight
                  size={24}
                  className="text-black flex-shrink-0"
                />
              </a>
              <BorderBeam
                size={100}
                duration={3}
                colorFrom="#D19756"
                colorTo="#F1EEE1"
                beamBorderRadius={12}
              />
            </motion.div>
            <motion.p
              className="text-white uppercase mt-6 text-center"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                opacity: 0.7,
              }}
              data-testid="text-hero-badge"
              variants={blurText}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              INSCRIÇÕES ABERTAS POR TEMPO LIMITADO
            </motion.p>
          </div>
        </div>
      </header>
      {/* Divisória com degradê */}
      <div className="w-full px-4 md:px-8 lg:px-16 relative z-20">
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, #1A0F05 0%, #372507 15%, #372507 85%, #1A0F05 100%)",
            margin: "0 auto",
            boxShadow: "0 0 4px rgba(219, 168, 111, 0.15), 0 0 2px rgba(239, 213, 167, 0.1)",
            position: "relative",
          }}
        />
      </div>

      {/* Problem Section */}
      <section className="pt-16 px-4 md:px-8 text-center relative z-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 mb-6 rounded-full"
            style={{
              background: "linear-gradient(90deg, #170F0B 0%, #382607 100%)",
            }}
            variants={blurText}
          >
            <img
              src="/images/logo-icon.webp"
              alt="Logo"
              loading="lazy"
              className="w-4 h-4"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
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
          </motion.div>
          <motion.h2
            className="nail-h2 mb-4 mx-auto lg:max-w-3xl"
            data-testid="text-problem-title"
            variants={blurText}
            transition={{ delay: 0.1 }}
          >
            Cansada de trabalhar muito{" "}
            <br className="hidden lg:block" />
            <span
              className="gradient-text"
              style={{
                fontFamily: "var(--font-titulos)",
                fontWeight: 400,
              }}
            >
              e sentir que não sai do lugar?
            </span>
          </motion.h2>
          <motion.p
            className="nail-body mx-auto max-w-xl mb-16"
            style={{ lineHeight: "1.1" }}
            data-testid="text-problem-subtitle"
            variants={blurText}
            transition={{ delay: 0.2 }}
          >
            Esta formação é o seu plano de fuga,<br className="md:hidden" />{" "}
            <span style={{ fontWeight: 700 }}>desenhada para você que:</span>
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-2 max-w-6xl mx-auto mb-12"
            variants={blurTextStagger}
          >
            <motion.div
              variants={blurText}
              whileHover={isMobile ? mobileHoverLift : hoverLift}
              className="nail-card text-left md:col-span-3"
              style={{
                minHeight: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background:
                  "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)",
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
                Em um emprego CLT que paga pouco, não te reconhece e rouba todo
                o seu tempo, sem nenhuma perspectiva de crescimento.
              </p>
            </motion.div>

            <motion.div
              variants={blurText}
              whileHover={isMobile ? mobileHoverLift : hoverLift}
              className="nail-card text-left md:col-span-4"
              style={{
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background:
                  "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)",
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
                De fazer seus próprios horários, poder levar seu filho na escola
                ou ir à academia, sem ter que "bater ponto" ou pedir permissão.
              </p>
            </motion.div>

            <motion.div
              variants={blurText}
              whileHover={isMobile ? mobileHoverLift : hoverLift}
              className="nail-card text-left md:col-span-5"
              style={{
                minHeight: "190px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background:
                  "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)",
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
                E vê o potencial de ganhar R$ 3.000, R$ 6.000 ou mais por mês,
                trabalhando para si mesma, com suas próprias regras.
              </p>
            </motion.div>

            <motion.div
              variants={blurText}
              whileHover={isMobile ? mobileHoverLift : hoverLift}
              className="nail-card text-left md:col-span-5"
              style={{
                minHeight: "195px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background:
                  "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)",
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
                E finalmente parar de receber ordens, lidando diretamente com
                suas clientes e construindo algo que é seu de verdade.
              </p>
            </motion.div>

            <motion.div
              variants={blurText}
              whileHover={isMobile ? mobileHoverLift : hoverLift}
              className="nail-card text-left md:col-span-4"
              style={{
                minHeight: "185px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background:
                  "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)",
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
                Você olha o mercado de unhas e parece muito difícil, com muitos
                materiais e técnicas, e tem medo de investir e não dar certo.
              </p>
            </motion.div>

            <motion.div
              variants={blurText}
              whileHover={isMobile ? mobileHoverLift : hoverLift}
              className="nail-card text-left md:col-span-3"
              style={{
                minHeight: "205px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background:
                  "linear-gradient(to top right, #170F0B 0%, #170F0B 55%, #261816 100%)",
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
                De largar um emprego "seguro" (mesmo que ruim) para começar algo
                novo que sua família talvez não entenda como uma "profissão de
                verdade".
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 max-w-6xl mx-auto"
            variants={blurTextStagger}
          >
            <motion.p
              className="nail-body leading-relaxed text-center md:text-left md:max-w-md"
              style={{ fontWeight: 500 }}
              data-testid="text-problem-conclusion"
              variants={blurText}
            >
              Se você está decidida a construir uma nova realidade financeira
              para você e sua família... Esta formação é para você.
            </motion.p>

            <motion.div
              className="relative group flex-shrink-0"
              style={{ padding: "6px" }}
              variants={blurText}
            >
              <a
                href="#tudo-que-voce-precisa"
                className="cta-button"
                data-testid="button-cta-target-audience"
              >
                QUERO ME TORNAR ALUNA
                <HiOutlineArrowUpRight
                  size={24}
                  className="text-black flex-shrink-0"
                />
              </a>
              <BorderBeam
                size={100}
                duration={3}
                colorFrom="#D19756"
                colorTo="#F1EEE1"
                beamBorderRadius={12}
              />
            </motion.div>
          </motion.div>
        </div>
        <div className="pb-20"></div>
        {/* Divisória com degradê */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div
            style={{
              height: "1px",
              background:
              "linear-gradient(90deg, #1A0F05 0%, #372507 15%, #372507 85%, #1A0F05 100%)",
              margin: "0 auto",
              boxShadow: "0 0 4px rgba(219, 168, 111, 0.15), 0 0 2px rgba(239, 213, 167, 0.1)",
              position: "relative",
            }}
          />
        </div>
      </section>

      {/* Platform Access Section */}
      <section className="pt-16 px-4 md:px-8 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            className="flex justify-center lg:justify-start mb-6"
            variants={blurText}
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: "linear-gradient(90deg, #170F0B 0%, #382607 100%)",
              }}
            >
              <img
                src="/images/logo-icon.webp"
                alt="Logo"
                loading="lazy"
                className="w-4 h-4"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
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
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center overflow-visible">
            {/* Lado Esquerdo - Conteúdo */}
            <motion.div
              variants={blurTextStagger}
              className="lg:col-span-2"
            >
              <motion.h2
                className="nail-h2 mb-6 text-center lg:text-left"
                data-testid="text-access-title"
                variants={blurText}
              >
                Conheça sua Escola de Unhas{" "}
                <span className="gradient-text nail-h2-highlight">
                  por dentro
                </span>
              </motion.h2>

              {/* Imagem Mobile - aparece só no mobile abaixo do título */}
              {isMobile && (
                <motion.div
                  className="lg:hidden relative mb-8"
                  variants={blurText}
                >
                  <img
                    src="/images/platform-raira.webp"
                    alt="Plataforma da Escola de Unhas"
                    className="w-full h-auto rounded-2xl"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    data-testid="img-platform-raira-mobile"
                  />
                </motion.div>
              )}

              <motion.p
                id="text-platform-description"
                className="nail-body leading-relaxed mb-8 text-center lg:text-left"
                data-testid="text-access-description"
                variants={blurText}
              >
                Nossa plataforma oferece um{" "}
                <span style={{ fontWeight: 700 }}>
                  ambiente de aprendizado completo
                </span>
                , criado para transformar você do zero em uma profissional
                requisitada.
              </motion.p>

              {/* Lista de Benefícios */}
              <motion.div
                className="space-y-6 mb-10"
                variants={blurTextStagger}
              >
                <motion.div
                  variants={blurText}
                  className="flex items-stretch"
                  data-testid="benefit-access-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #261403 0%, #170F0B 100%)",
                  }}
                >
                  <div
                    className="w-1.5 flex-shrink-0"
                    style={{ background: "#D49D5E" }}
                  />
                  <div className="py-4 px-6">
                    <p
                      className="nail-body font-semibold mb-1"
                      style={{ color: "#DBA86F" }}
                    >
                      Acesso imediato por 12 meses
                    </p>
                    <p
                      className="nail-body leading-relaxed max-w-none"
                      style={{ opacity: 0.85 }}
                    >
                      Para você ver e rever as técnicas no seu ritmo, até
                      dominar cada detalhe.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={blurText}
                  className="flex items-stretch"
                  data-testid="benefit-access-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #261403 0%, #170F0B 100%)",
                  }}
                >
                  <div
                    className="w-1.5 flex-shrink-0"
                    style={{ background: "#D49D5E" }}
                  />
                  <div className="py-4 px-6">
                    <p
                      className="nail-body font-semibold mb-1"
                      style={{ color: "#DBA86F" }}
                    >
                      Assista em qualquer dispositivo
                    </p>
                    <p
                      className="nail-body leading-relaxed max-w-none"
                      style={{ opacity: 0.85 }}
                    >
                      No celular, tablet ou computador, na hora que for melhor
                      para você.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={blurText}
                  className="flex items-stretch"
                  data-testid="benefit-access-3"
                  style={{
                    background:
                      "linear-gradient(90deg, #261403 0%, #170F0B 100%)",
                  }}
                >
                  <div
                    className="w-1.5 flex-shrink-0"
                    style={{ background: "#D49D5E" }}
                  />
                  <div className="py-4 px-6">
                    <p
                      className="nail-body font-semibold mb-1"
                      style={{ color: "#DBA86F" }}
                    >
                      Suporte direto com nossa equipe
                    </p>
                    <p
                      className="nail-body leading-relaxed max-w-none"
                      style={{ opacity: 0.85 }}
                    >
                      Para tirar dúvidas técnicas sobre os módulos, materiais e
                      procedimentos.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* CTA Button */}
              <motion.div 
                className="flex justify-center lg:justify-start"
                variants={blurText}
              >
                <div
                  className="inline-block relative group"
                  style={{ padding: "6px" }}
                >
                  <a
                    href="#tudo-que-voce-precisa"
                    className="cta-button"
                    data-testid="button-cta-access"
                  >
                    QUERO ME TORNAR ALUNA
                    <HiOutlineArrowUpRight
                      size={24}
                      className="text-black flex-shrink-0"
                    />
                  </a>
                  <BorderBeam
                    size={100}
                    duration={3}
                    colorFrom="#D19756"
                    colorTo="#F1EEE1"
                    beamBorderRadius={12}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Lado Direito - Imagem */}
            {!isMobile && isReady && (
              <motion.div
                className="hidden lg:block relative lg:col-span-3"
                style={{ marginTop: "80px" }}
                variants={blurText}
              >
                <img
                  src="/images/platform-raira.webp"
                  alt="Plataforma da Escola de Unhas"
                  className="w-full h-auto rounded-2xl"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  data-testid="img-platform-raira"
                />
              </motion.div>
            )}
          </div>
        </div>
        <div className="pb-20"></div>
        {/* Divisória com degradê */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div
            style={{
              height: "1px",
              background:
              "linear-gradient(90deg, #1A0F05 0%, #372507 15%, #372507 85%, #1A0F05 100%)",
              margin: "0 auto",
              boxShadow: "0 0 4px rgba(219, 168, 111, 0.15), 0 0 2px rgba(239, 213, 167, 0.1)",
              position: "relative",
            }}
          />
        </div>
      </section>

      {/* E Tem Mais Section */}
      <section className="pt-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="flex justify-center mb-6"
            variants={blurText}
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: "linear-gradient(90deg, #170F0B 0%, #382607 100%)",
              }}
            >
              <img
                src="/images/logo-icon.webp"
                alt="Logo"
                className="w-4 h-4"
                draggable="false"
                loading="lazy"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
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
          </motion.div>

          <motion.h2 
            className="nail-h2 mb-12" 
            data-testid="text-extras-title"
            variants={blurText}
            transition={{ delay: 0.1 }}
          >
            Além disso,{" "}
            <span className="gradient-text nail-h2-highlight">
              você também terá acesso a:
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* Card 1 - Formação Completa */}
            <motion.div
              whileHover={isMobile ? mobileHoverLift : hoverLift}
              variants={blurText}
              className="rounded-2xl p-6 border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 lg:col-span-2 text-center flex flex-col items-center justify-end lg:justify-center min-h-[360px] lg:min-h-[480px] relative overflow-hidden"
              style={{
                background: "linear-gradient(to bottom, #261816 0%, #170F0B 70%)",
              }}
              data-testid="card-extra-0"
            >
                {/* Vídeo grudado no topo com largura máxima */}
                <div
                  className="absolute top-0"
                  style={{
                    left: "-24px",
                    right: "-24px",
                    width: "calc(100% + 48px)",
                    height: "100%",
                    zIndex: 0
                  }}
                >
                  <IntersectionVideoPlayer
                    src={isMobile ? undefined : "/images/more-raira-nail-1.webm"}
                    poster="/images/more-raira-nail-1.webp"
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      pointerEvents: "none"
                    }}
                  />
                </div>

              {/* Gradiente de fade na parte inferior - mais forte e subindo mais */}
              <div
                className="absolute"
                style={{
                  bottom: 0,
                  left: "-24px",
                  right: "-24px",
                  width: "calc(100% + 48px)",
                  height: "60%",
                  background: "linear-gradient(to top, #170F0B 0%, #170F0B 25%, rgba(23, 15, 11, 0.95) 45%, rgba(23, 15, 11, 0.7) 70%, rgba(23, 15, 11, 0.3) 85%, transparent 100%)",
                  pointerEvents: "none",
                  zIndex: 5
                }}
              />

              {/* Conteúdo */}
              <div className="relative z-10 mt-0 lg:mt-[200px] pb-4">
                <h3 className="text-3xl lg:text-[34px] font-bold mb-0">
                  <span className="gradient-text">Aulas</span>
                  <br />
                  <span className="nail-h2-highlight" style={{ color: '#FFFFFF' }}>Práticas</span>
                </h3>
              </div>
            </motion.div>

            {/* Card 2 - Comunidade VIP */}
            <motion.div
              whileHover={isMobile ? mobileHoverLift : hoverLift}
              variants={blurText}
              transition={{ delay: 0.1 }}
              className="rounded-2xl p-6 border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 lg:col-span-2 text-center flex flex-col items-center justify-end lg:justify-center min-h-[360px] lg:min-h-[480px] relative overflow-hidden"
              style={{
                background: "linear-gradient(to bottom, #261816 0%, #170F0B 70%)",
              }}
              data-testid="card-extra-1"
            >
              {/* Imagem grudada no topo com largura máxima */}
              <div
                className="absolute top-0"
                style={{
                  left: "-24px",
                  right: "-24px",
                  width: "calc(100% + 48px)",
                  height: "100%",
                  zIndex: 0
                }}
              >
                <img
                  src="/images/more-raira-nail-2.webp"
                  alt="Comunidade de Alunas no WhatsApp"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              </div>

              {/* Gradiente de fade na parte inferior - mais forte e subindo mais */}
              <div
                className="absolute"
                style={{
                  bottom: 0,
                  left: "-24px",
                  right: "-24px",
                  width: "calc(100% + 48px)",
                  height: "60%",
                  background: "linear-gradient(to top, #170F0B 0%, #170F0B 25%, rgba(23, 15, 11, 0.95) 45%, rgba(23, 15, 11, 0.7) 70%, rgba(23, 15, 11, 0.3) 85%, transparent 100%)",
                  pointerEvents: "none",
                  zIndex: 5
                }}
              />

              {/* Conteúdo */}
              <div className="relative z-10 mt-0 lg:mt-[200px] pb-4">
                <h3 className="text-3xl lg:text-[34px] font-bold mb-0">
                  <span className="gradient-text">Comunidade de Alunas</span>
                  <br />
                  <span className="nail-h2-highlight" style={{ color: '#FFFFFF' }}>no WhatsApp</span>
                </h3>
              </div>
            </motion.div>

            {/* Card 3 - Garantia */}
            <motion.div
              whileHover={isMobile ? mobileHoverLift : hoverLift}
              variants={blurText}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 lg:col-span-2 text-center flex flex-col items-center justify-end lg:justify-center min-h-[360px] lg:min-h-[480px] relative overflow-hidden"
              style={{
                background: "linear-gradient(to bottom, #261816 0%, #170F0B 70%)",
              }}
              data-testid="card-extra-2"
            >
              {/* Imagem grudada no topo com largura máxima */}
              <div
                className="absolute top-0"
                style={{
                  left: "-24px",
                  right: "-24px",
                  width: "calc(100% + 48px)",
                  height: "100%",
                  zIndex: 0
                }}
              >
                <img
                  src="/images/more-raira-nail-3.webp"
                  alt="Garantia de 7 Dias"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 30%",
                    display: "block"
                  }}
                />
              </div>

              {/* Gradiente de fade na parte inferior - mais forte e subindo mais */}
              <div
                className="absolute"
                style={{
                  bottom: 0,
                  left: "-24px",
                  right: "-24px",
                  width: "calc(100% + 48px)",
                  height: "60%",
                  background: "linear-gradient(to top, #170F0B 0%, #170F0B 25%, rgba(23, 15, 11, 0.95) 45%, rgba(23, 15, 11, 0.7) 70%, rgba(23, 15, 11, 0.3) 85%, transparent 100%)",
                  pointerEvents: "none",
                  zIndex: 5
                }}
              />

              {/* Conteúdo */}
              <div className="relative z-10 mt-0 lg:mt-[200px] pb-4">
                <h3 className="text-3xl lg:text-[34px] font-bold mb-0">
                  <span className="gradient-text">Certificado</span>
                  <br />
                  <span className="nail-h2-highlight" style={{ color: '#FFFFFF' }}>Incluso</span>
                </h3>
              </div>
            </motion.div>

            {/* Card 4 - Apostilas e Listas */}
            <motion.div
              whileHover={hoverLift}
              variants={blurText}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-6 border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 lg:col-span-3 relative overflow-hidden min-h-[320px] lg:min-h-[280px]"
              style={{
                background: "linear-gradient(to top right, #170F0B 0%, #261816 100%)",
              }}
              data-testid="card-extra-3"
            >
              {/* PDF - Mobile: centralizado, Desktop: à esquerda */}
              <motion.div
                initial="open"
                animate="open"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.15,
                    },
                  },
                }}
                className="absolute lg:hidden"
                style={{
                  width: "95%",
                  maxWidth: "280px",
                  height: "320px",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  zIndex: 0
                }}
              >
                <PDFComponent />
              </motion.div>

              {/* Gradiente mobile - vindo de baixo no centro */}
              <div
                className="absolute lg:hidden"
                style={{
                  bottom: 0,
                  left: "-24px",
                  right: "-24px",
                  width: "calc(100% + 48px)",
                  height: "60%",
                  background: "linear-gradient(to top, #170F0B 0%, #170F0B 25%, rgba(23, 15, 11, 0.95) 45%, rgba(23, 15, 11, 0.7) 70%, rgba(23, 15, 11, 0.3) 85%, transparent 100%)",
                  pointerEvents: "none",
                  zIndex: 5
                }}
              />

              {/* PDF - Desktop: à esquerda, grande escala, metade fora */}
              <motion.div
                initial="open"
                animate="open"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.15,
                    },
                  },
                }}
                className="absolute hidden lg:block"
                style={{
                  width: "700px",
                  height: "550px",
                  bottom: "-300px",
                  left: "-350px",
                  transform: "scale(1)",
                  pointerEvents: "none",
                  zIndex: 0
                }}
              >
                <PDFComponent />
              </motion.div>

              {/* Gradiente sobreposto ao PDF - vindo do canto inferior esquerdo */}
              <div
                className="absolute hidden lg:block"
                style={{
                  width: "700px",
                  height: "550px",
                  bottom: "-300px",
                  left: "-280px",
                  background: "radial-gradient(ellipse 180% 110% at left bottom, #170F0B 0%, rgba(23, 15, 11, 0.98) 12%, rgba(23, 15, 11, 0.85) 25%, rgba(23, 15, 11, 0.65) 40%, rgba(23, 15, 11, 0.4) 58%, rgba(23, 15, 11, 0.2) 75%, rgba(23, 15, 11, 0.08) 88%, transparent 100%)",
                  pointerEvents: "none",
                  zIndex: 1
                }}
              />

              {/* Conteúdo - Desktop: à direita, Mobile: centralizado */}
              <div className="relative z-10 flex flex-col justify-end lg:justify-center h-full lg:items-end items-center text-center pb-6 lg:pb-4">
                <h3 className="text-3xl lg:text-[34px] font-bold mb-0 text-center">
                  <span className="gradient-text">Material de Apoio</span>
                  <br />
                  <span className="nail-h2-highlight" style={{ color: '#FFFFFF' }}>em PDF</span>
                </h3>
              </div>
            </motion.div>

            {/* Card 5 - Liberação Imediata */}
            <motion.div
              whileHover={hoverLift}
              variants={blurText}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-6 border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 lg:col-span-3 relative overflow-hidden min-h-[320px] lg:min-h-[280px]"
              style={{
                background: "linear-gradient(to bottom right, #261816 0%, #170F0B 70%)",
              }}
              data-testid="card-extra-4"
            >
              {/* Celular - Mobile: centralizado, Desktop: à direita */}
              <motion.div
                initial="open"
                animate="open"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.15,
                    },
                  },
                }}
                className="absolute lg:hidden"
                style={{
                  width: "95%",
                  maxWidth: "264px",
                  height: "270px",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  zIndex: 0
                }}
              >
                <PhoneComponent />
              </motion.div>

              {/* Gradiente mobile - vindo de baixo no centro */}
              <div
                className="absolute lg:hidden"
                style={{
                  bottom: 0,
                  left: "-24px",
                  right: "-24px",
                  width: "calc(100% + 48px)",
                  height: "60%",
                  background: "linear-gradient(to top, #170F0B 0%, #170F0B 25%, rgba(23, 15, 11, 0.95) 45%, rgba(23, 15, 11, 0.7) 70%, rgba(23, 15, 11, 0.3) 85%, transparent 100%)",
                  pointerEvents: "none",
                  zIndex: 5
                }}
              />

              {/* Celular - Desktop: à direita, grande escala, metade fora */}
              <motion.div
                initial="open"
                animate="open"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.15,
                    },
                  },
                }}
                className="absolute hidden lg:block"
                style={{
                  width: "600px",
                  height: "450px",
                  bottom: "-250px",
                  right: "-360px",
                  transform: "scale(1)",
                  pointerEvents: "none",
                  zIndex: 0
                }}
              >
                <PhoneComponent />
              </motion.div>

              {/* Gradiente sobreposto ao celular - vindo do canto inferior direito */}
              <div
                className="absolute hidden lg:block"
                style={{
                  width: "600px",
                  height: "450px",
                  bottom: "-250px",
                  right: "-360px",
                  background: "radial-gradient(ellipse 180% 110% at right bottom, #170F0B 0%, rgba(23, 15, 11, 0.98) 12%, rgba(23, 15, 11, 0.85) 25%, rgba(23, 15, 11, 0.65) 40%, rgba(23, 15, 11, 0.4) 58%, rgba(23, 15, 11, 0.2) 75%, rgba(23, 15, 11, 0.08) 88%, transparent 100%)",
                  pointerEvents: "none",
                  zIndex: 1
                }}
              />

              {/* Conteúdo - Desktop: à esquerda, Mobile: centralizado */}
              <div className="relative z-10 flex flex-col justify-end lg:justify-center h-full lg:items-start items-center text-center pb-6 lg:pb-4">
                <h3 className="text-3xl lg:text-[34px] font-bold mb-0 text-center">
                  <span className="gradient-text">Liberação Imediata</span>
                  <br />
                  <span className="nail-h2-highlight" style={{ color: '#FFFFFF' }}>Após a Compra</span>
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="pb-20"></div>
        {/* Divisória com degradê */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div
            style={{
              height: "1px",
              background:
              "linear-gradient(90deg, #1A0F05 0%, #372507 15%, #372507 85%, #1A0F05 100%)",
              margin: "0 auto",
              boxShadow: "0 0 4px rgba(219, 168, 111, 0.15), 0 0 2px rgba(239, 213, 167, 0.1)",
              position: "relative",
            }}
          />
        </div>
      </section>


      {/* Banner Section - Tudo que você precisa */}
      <section
        id="tudo-que-voce-precisa"
        className="w-full relative pt-4 md:pt-0"
        style={{
          width: "100%",
          margin: "0",
          padding: "0",
        }
        }
      >
        <div
          className="w-full relative"
          style={{
            background: "linear-gradient(90deg, #D19756 0%, #EFD5A7 50%, #F1EEE1 100%)",
            padding: "40px 20px 50px 20px",
            borderTop: "1px solid #372507",
            borderBottom: "1px solid #372507",
            width: "100%",
            position: "relative",
            zIndex: 1,
            boxShadow: "inset 0 1px 0 0 rgba(219, 168, 111, 0.15), inset 0 -1px 0 0 rgba(219, 168, 111, 0.15), 0 1px 0 0 rgba(239, 213, 167, 0.1), 0 -1px 0 0 rgba(239, 213, 167, 0.1)",
            paddingBottom: "60px",
          }}
        >
          <motion.div 
            className="text-center"
            variants={blurText}
          >
            <p
              style={{
                color: "#1A1212",
                fontSize: "30px",
                fontWeight: 600,
                lineHeight: "1.0",
                margin: "0 auto",
                maxWidth: "800px",
                fontFamily: "var(--font-texts)",
              }}
            >
              Tudo o que você precisa para começar,<br className="hidden md:block" /> incluso em uma única inscrição:
            </p>
          </motion.div>
        </div>

        {/* Lombadinha arredondada com a seta */}
        <div
          className="absolute"
          style={{
            bottom: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "40px",
            background: "#170F0B",
            borderTopLeftRadius: "40px",
            borderTopRightRadius: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: "#FFFFFF" }}
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Pricing Card Section */}
      <section className="pt-16 px-4 md:px-8 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Pricing Card */}
            <motion.div
              variants={blurText}
              className="rounded-2xl overflow-hidden relative"
              style={{
                background: "#261816",
                border: "1px solid #332A2A",
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 z-0"
                style={{
                  background: "radial-gradient(circle at center, rgba(219, 168, 111, 0.15) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                {/* Top Banner */}
                <div
                  className="w-full text-center py-4"
                  style={{
                    background: "#FFE6BF",
                  }}
                >
                  <p
                    style={{
                      color: "#1A1212",
                      fontSize: "14px",
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                      margin: 0,
                    }}
                  >
                    ACESSO ANUAL
                  </p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  {/* Price */}
                  <div className="text-center mb-8">
                    <p
                      style={{
                        color: "#FFFFFF",
                        fontSize: "52px",
                        fontWeight: 700,
                        margin: "0 0 8px 0",
                        lineHeight: "1.1",
                        letterSpacing: "-0.04em",
                        fontFamily: "var(--font-texts)",
                      }}
                    >
                      R$41,90<span style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "normal", fontFamily: "var(--font-texts)" }}>/POR MÊS</span>
                    </p>
                    <p
                      style={{
                        color: "#DBA86F",
                        fontSize: "18px",
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      OU R$497 À VISTA NO PIX
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="flex justify-center mb-8">
                    <div className="space-y-4" style={{ maxWidth: "100%", width: "fit-content" }}>
                      <div className="flex items-center gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#DBA86F"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p
                          style={{
                            color: "#FFFFFF",
                            fontSize: "16px",
                            lineHeight: "1.1",
                            margin: 0,
                            opacity: 0.9,
                            textAlign: "left",
                          }}
                        >
                          Aulas práticas de técnicas profissionais
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#DBA86F"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p
                          style={{
                            color: "#FFFFFF",
                            fontSize: "16px",
                            lineHeight: "1.1",
                            margin: 0,
                            opacity: 0.9,
                            textAlign: "left",
                          }}
                        >
                          Acesso por 12 meses à plataforma completa
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#DBA86F"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p
                          style={{
                            color: "#FFFFFF",
                            fontSize: "16px",
                            lineHeight: "1.1",
                            margin: 0,
                            opacity: 0.9,
                            textAlign: "left",
                          }}
                        >
                          Comunidade VIP de alunas no WhatsApp
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#DBA86F"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p
                          style={{
                            color: "#FFFFFF",
                            fontSize: "16px",
                            lineHeight: "1.1",
                            margin: 0,
                            opacity: 0.9,
                            textAlign: "left",
                          }}
                        >
                          Certificado de Conclusão oficial
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#DBA86F"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p
                          style={{
                            color: "#FFFFFF",
                            fontSize: "16px",
                            lineHeight: "1.1",
                            margin: 0,
                            opacity: 0.9,
                            textAlign: "left",
                          }}
                        >
                          Garantia incondicional de 7 dias
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#DBA86F"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p
                          style={{
                            color: "#FFFFFF",
                            fontSize: "16px",
                            lineHeight: "1.1",
                            margin: 0,
                            opacity: 0.9,
                            textAlign: "left",
                          }}
                        >
                          Material de apoio em PDF
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#DBA86F"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p
                          style={{
                            color: "#FFFFFF",
                            fontSize: "16px",
                            lineHeight: "1.1",
                            margin: 0,
                            opacity: 0.9,
                            textAlign: "left",
                          }}
                        >
                          Acesso imediato após a compra
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#DBA86F"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p
                          style={{
                            color: "#FFFFFF",
                            fontSize: "16px",
                            lineHeight: "1.1",
                            margin: 0,
                            opacity: 0.9,
                            textAlign: "left",
                          }}
                        >
                          Suporte direto com nossa equipe
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#DBA86F"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p
                          style={{
                            color: "#FFFFFF",
                            fontSize: "16px",
                            lineHeight: "1.1",
                            margin: 0,
                            opacity: 0.9,
                            textAlign: "left",
                          }}
                        >
                          Sem fidelidade
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#DBA86F"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p
                          style={{
                            color: "#FFFFFF",
                            fontSize: "16px",
                            lineHeight: "1.1",
                            margin: 0,
                            opacity: 0.9,
                            textAlign: "left",
                          }}
                        >
                          Melhor custo x benefício
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <div
                      className="inline-block relative group"
                      style={{ padding: "6px", width: "100%", maxWidth: "100%" }}
                    >
                      <a
                        href="https://pay.hotmart.com/L103255436T?checkoutMode=10"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-button"
                        style={{ width: "100%" }}
                      >
                        GARANTIR OFERTA
                        <HiOutlineArrowUpRight
                          size={24}
                          className="text-black flex-shrink-0"
                        />
                      </a>
                      <BorderBeam
                        size={100}
                        duration={3}
                        colorFrom="#D19756"
                        colorTo="#F1EEE1"
                        beamBorderRadius={12}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Guarantee Card */}
            <motion.div
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background: "#170F0B",
              }}
              variants={blurText}
              transition={{ delay: 0.2 }}
            >
              <div className="p-8 md:p-10 flex flex-col items-center justify-center w-full">
                {/* Logo and Main Text */}
                <div className="flex flex-col items-center text-center mb-6">
                  <img
                    src="/images/raira-garantia.webp"
                    alt="Garantia 7 dias"
                    className="mb-6"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ maxWidth: "200px", height: "auto" }}
                  />
                </div>

                {/* Description Text */}
                <p
                  style={{
                    color: "#FFFFFF",
                    fontSize: isMobile ? "16px" : "26px",
                    lineHeight: "1.1",
                    margin: 0,
                    opacity: 0.85,
                    textAlign: "center",
                    maxWidth: isMobile ? "400px" : "600px",
                  }}
                >
                  Caso você se arrependa de ter feito sua matrícula dentro de 7 dias, nós vamos devolver seu dinheiro.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="pb-20"></div>
        {/* Divisória com degradê */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div
            style={{
              height: "1px",
              background:
              "linear-gradient(90deg, #1A0F05 0%, #372507 15%, #372507 85%, #1A0F05 100%)",
              margin: "0 auto",
              boxShadow: "0 0 4px rgba(219, 168, 111, 0.15), 0 0 2px rgba(239, 213, 167, 0.1)",
              position: "relative",
            }}
          />
        </div>
      </section>

      {/* Prazer, sou a Raira Section */}
      <section className="pt-4 md:pt-8 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center md:justify-items-center">
            <motion.div 
              className="order-1 lg:hidden"
              variants={blurText}
            >
              <h2 className="nail-h2 mb-4 text-center md:text-center" style={{ fontSize: "48px" }}>
                Prazer, <span className="gradient-text nail-h2-highlight">eu sou a Raira.</span>
              </h2>
            </motion.div>

            <div className="order-2 lg:order-1 justify-self-center lg:justify-self-start transform scale-[0.92] md:scale-100 origin-top md:origin-top-left">
              <motion.div
                className="grid grid-cols-3 gap-2"
                variants={blurTextStagger}
              >
                <motion.div
                  variants={blurText}
                  className="rounded-2xl overflow-hidden border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 h-[120px] md:h-[150px]"
                  style={{ background: "linear-gradient(to bottom, #261816 0%, #170F0B 70%)" }}
                >
                  <IntersectionVideoPlayer
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ width: "100%", height: "120%", objectFit: "cover", objectPosition: "top", pointerEvents: "none", transform: "translateY(-10%)" }}
                  >
                    <source src="/images/me-raira-1.webm" type="video/webm" />
                    Seu navegador não suporta vídeos.
                  </IntersectionVideoPlayer>
                </motion.div>
                <motion.div
                  variants={blurText}
                  className="rounded-2xl overflow-hidden border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 h-[120px] md:h-[150px]"
                  style={{ background: "linear-gradient(to bottom, #261816 0%, #170F0B 70%)" }}
                >
                  <IntersectionVideoPlayer
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ width: "100%", height: "140%", objectFit: "cover", objectPosition: "center", pointerEvents: "none", transform: "translateY(-20%)" }}
                  >
                    <source src="/images/me-raira-2.webm" type="video/webm" />
                    Seu navegador não suporta vídeos.
                  </IntersectionVideoPlayer>
                </motion.div>
                <motion.div
                  variants={blurText}
                  className="rounded-2xl overflow-hidden border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 h-[120px] md:h-[150px]"
                  style={{ background: "linear-gradient(to bottom, #261816 0%, #170F0B 70%)" }}
                >
                  <IntersectionVideoPlayer
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ width: "100%", height: "140%", objectFit: "cover", objectPosition: "center", pointerEvents: "none", transform: "translateY(-20%)" }}
                  >
                    <source src="/images/me-raira-3.webm" type="video/webm" />
                    Seu navegador não suporta vídeos.
                  </IntersectionVideoPlayer>
                </motion.div>
                <motion.div
                  variants={blurText}
                  className="rounded-2xl overflow-hidden border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 row-span-2 col-span-1 h-[308px] md:h-[372px]"
                  style={{ background: "linear-gradient(to bottom, #261816 0%, #170F0B 70%)" }}
                >
                  <IntersectionVideoPlayer
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ width: "100%", height: "140%", objectFit: "cover", objectPosition: "center", pointerEvents: "none", transform: "translateY(-20%)" }}
                  >
                    <source src="/images/me-raira-4.webm" type="video/webm" />
                    Seu navegador não suporta vídeos.
                  </IntersectionVideoPlayer>
                </motion.div>
                <div
                  className="rounded-2xl overflow-hidden border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 col-span-2 h-[150px] md:h-[180px]"
                  style={{ background: "linear-gradient(to bottom, #261816 0%, #170F0B 70%)" }}
                >
                  <IntersectionVideoPlayer
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ width: "100%", height: "140%", objectFit: "cover", objectPosition: "top", pointerEvents: "none", transform: "translateY(-25%)" }}
                  >
                    <source src="/images/me-raira-5.webm" type="video/webm" />
                    Seu navegador não suporta vídeos.
                  </IntersectionVideoPlayer>
                </div>
                <div
                  className="rounded-2xl overflow-hidden border border-[#332A2A] hover:border-[#DBA86F] transition-all duration-300 col-span-2 h-[150px] md:h-[180px]"
                  style={{ background: "linear-gradient(to bottom, #261816 0%, #170F0B 70%)" }}
                >
                  <IntersectionVideoPlayer
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ width: "100%", height: "140%", objectFit: "cover", objectPosition: "center", pointerEvents: "none", transform: "translateY(-20%)" }}
                  >
                    <source src="/images/me-raira-6.webm" type="video/webm" />
                    Seu navegador não suporta vídeos.
                  </IntersectionVideoPlayer>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="hidden lg:block lg:order-2 lg:col-start-2"
              variants={blurTextStagger}
            >
              <motion.h2 
                className="nail-h2 mb-6" 
                style={{ textAlign: "left" }}
                variants={blurText}
              >
                Prazer, <span className="gradient-text nail-h2-highlight">eu sou a Raira.</span>
              </motion.h2>
              <div className="space-y-3">
                <motion.p 
                  className="nail-body leading-relaxed max-w-none" 
                  style={{ opacity: 0.85 }}
                  variants={blurText}
                >
                  Meu propósito vai muito além de ensinar a fazer unhas. Eu acredito que essa profissão é uma das ferramentas mais poderosas de independência financeira que uma mulher pode ter.
                </motion.p>
                <motion.p 
                  className="nail-body leading-relaxed max-w-none" 
                  style={{ opacity: 0.85 }}
                  variants={blurText}
                >
                  Comecei minha jornada buscando liberdade de tempo e de dinheiro. O que descobri foi uma carreira que me permitiu ser minha própria chefe e ditar minhas regras.
                </motion.p>
                <motion.p 
                  className="nail-body leading-relaxed max-w-none" 
                  style={{ opacity: 0.85 }}
                  variants={blurText}
                >
                  Hoje, minha missão é elevar o nível do nosso mercado. Eu me dedico a formar profissionais de elite, que não sabem apenas a técnica, mas que sabem comandar seus próprios negócios.
                </motion.p>
                <motion.p 
                  className="nail-body leading-relaxed max-w-none" 
                  style={{ opacity: 0.85 }}
                  variants={blurText}
                >
                  Por isso, decidi reunir todo o meu conhecimento em um único lugar.
                </motion.p>
                <motion.p 
                  className="nail-body leading-relaxed max-w-none" 
                  style={{ opacity: 0.85 }}
                  variants={blurText}
                >
                  Assim, nasceu nosso curso — um método pensado para guiar outras mulheres na mesma jornada de transformação que um dia eu vivi, ensinando o caminho exato para construir uma carreira lucrativa e ser dona da sua própria história.
                </motion.p>
              </div>
              <motion.div 
                className="mt-6 flex justify-start"
                variants={blurText}
              >
                <div className="inline-block relative group" style={{ padding: "6px" }}>
                  <a href="#tudo-que-voce-precisa" className="cta-button">
                    QUERO ME TORNAR ALUNA
                    <HiOutlineArrowUpRight size={24} className="text-black flex-shrink-0" />
                  </a>
                  <BorderBeam size={100} duration={3} colorFrom="#D19756" colorTo="#F1EEE1" beamBorderRadius={12} />
                </div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="order-3 lg:hidden w-full flex flex-col items-center justify-center mx-auto"
              variants={blurTextStagger}
            >
              <style dangerouslySetInnerHTML={{
                __html: `
                      @media (max-width: 767px) {
                        .raira-text-container {
                          text-align: left !important;
                          width: 92% !important;
                          max-width: 92% !important;
                        }
                        .raira-text-container p {
                          text-align: left !important;
                        }
                      }
                      @media (min-width: 768px) and (max-width: 1023px) {
                        .raira-text-container {
                          text-align: center !important;
                          width: 100% !important;
                          max-width: 100% !important;
                          margin: 0 auto !important;
                        }
                        .raira-text-container p {
                          text-align: center !important;
                          margin-left: auto !important;
                          margin-right: auto !important;
                        }
                      }
                    `
              }} />
              <div className="space-y-3 raira-text-container w-full">
                <motion.p 
                  className="nail-body leading-relaxed" 
                  style={{ opacity: 0.85 }}
                  variants={blurText}
                >
                  Meu propósito vai muito além de ensinar a fazer unhas. Eu acredito que essa profissão é uma das ferramentas mais poderosas de independência financeira que uma mulher pode ter.
                </motion.p>
                <motion.p 
                  className="nail-body leading-relaxed" 
                  style={{ opacity: 0.85 }}
                  variants={blurText}
                >
                  Comecei minha jornada buscando liberdade de tempo e de dinheiro. O que descobri foi uma carreira que me permitiu ser minha própria chefe e ditar minhas regras.
                </motion.p>
                <motion.p 
                  className="nail-body leading-relaxed" 
                  style={{ opacity: 0.85 }}
                  variants={blurText}
                >
                  Hoje, minha missão é elevar o nível do nosso mercado. Eu me dedico a formar profissionais de elite, que não sabem apenas a técnica, mas que sabem comandar seus próprios negócios.
                </motion.p>
                <motion.p 
                  className="nail-body leading-relaxed" 
                  style={{ opacity: 0.85 }}
                  variants={blurText}
                >
                  Por isso, decidi reunir todo o meu conhecimento em um único lugar.
                </motion.p>
                <motion.p 
                  className="nail-body leading-relaxed" 
                  style={{ opacity: 0.85 }}
                  variants={blurText}
                >
                  Assim, nasceu nosso curso — um método pensado para guiar outras mulheres na mesma jornada de transformação que um dia eu vivi, ensinando o caminho exato para construir uma carreira lucrativa e ser dona da sua própria história.
                </motion.p>
              </div>
              <motion.div 
                className="mt-8 flex justify-center w-full"
                variants={blurText}
              >
                <div className="inline-block relative group" style={{ padding: "6px" }}>
                  <a href="#tudo-que-voce-precisa" className="cta-button">
                    QUERO ME TORNAR ALUNA
                    <HiOutlineArrowUpRight size={24} className="text-black flex-shrink-0" />
                  </a>
                  <BorderBeam size={100} duration={3} colorFrom="#D19756" colorTo="#F1EEE1" beamBorderRadius={12} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="pb-20"></div>
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div
            style={{
              height: "1px",
              background:
              "linear-gradient(90deg, #1A0F05 0%, #372507 15%, #372507 85%, #1A0F05 100%)",
              margin: "0 auto",
            }}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="pt-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 
            className="nail-h2" 
            data-testid="text-faq-title"
            variants={blurText}
          >
            Perguntas Frequentes
          </motion.h2>
          <motion.div
            variants={blurTextStagger}
          >
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
          </motion.div>
        </div>
        <div className="pb-20"></div>
        {/* Divisória com degradê */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div
            style={{
              height: "1px",
              background:
              "linear-gradient(90deg, #1A0F05 0%, #372507 15%, #372507 85%, #1A0F05 100%)",
              margin: "0 auto",
              boxShadow: "0 0 4px rgba(219, 168, 111, 0.15), 0 0 2px rgba(239, 213, 167, 0.1)",
              position: "relative",
            }}
          />
        </div>
      </section>

      {/* Footer */}
      <footer
        id="footer-section"
        className="py-8 px-4 md:px-8 text-center"
        style={{ 
          borderTop: "1px solid #372507",
          boxShadow: "inset 0 1px 0 0 rgba(219, 168, 111, 0.15), 0 1px 0 0 rgba(239, 213, 167, 0.1)"
        }}
      >
        <div className="container mx-auto">
          <p className="nail-footer" data-testid="text-footer-copyright">
            © 2025 Monfily Digital. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
