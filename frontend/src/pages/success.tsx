import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { useLocation } from "wouter";
import { FaWhatsapp } from "react-icons/fa";

export default function Success() {
  const [, navigate] = useLocation();
  const [countdown, setCountdown] = useState(10);
  const [whatsappLink, setWhatsappLink] = useState<string>("");

  useEffect(() => {
    // Busca configuração pública no backend (link do WhatsApp)
    (async () => {
      try {
        const res = await fetch("/api/config");
        if (res.ok) {
          const data = await res.json();
          if (data?.whatsappGroupUrl) {
            setWhatsappLink(data.whatsappGroupUrl as string);
          }
        }
      } catch (e) {
        // Silencia erros de rede; o botão manual continuará disponível
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!whatsappLink) return; // só inicia contagem quando link disponível

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = whatsappLink;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [whatsappLink]);

  return (
    <div
      style={{
        background: "#170F0B",
        color: "#FFFFFF",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
      className="px-4 md:px-8 py-16 flex items-center justify-center"
    >
      <div className="container mx-auto max-w-2xl">
        {/* Barra de Progresso Finalizada */}
        <div className="mb-12 space-y-2">
          <div className="flex justify-between text-sm font-medium text-[#DBA86F]">
            <span>Progresso</span>
            <span>100%</span>
          </div>
          <div className="h-2 w-full bg-[#1B1310] rounded-full overflow-hidden border border-[#372507]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D19756] to-[#EFD5A7]"
              initial={{ width: "80%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <motion.div
          className="rounded-2xl border border-[#372507] bg-[#1B1310] p-8 md:p-12 relative overflow-hidden text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-20 h-20 bg-[#DBA86F]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#DBA86F]/40"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#DBA86F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </motion.div>

          <motion.h1
            className="nail-h2 mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
          >
            Cadastro Concluído!
          </motion.h1>

          <motion.p
            className="nail-subtitle mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.4 }}
          >
            Parabéns! Suas respostas foram enviadas. Agora, para não perder nenhum aviso importante e garantir seu bônus, entre no nosso grupo exclusivo.
          </motion.p>

          <div className="space-y-4">
            <div className="inline-block relative group w-full max-w-md" style={{ padding: "6px" }}>
              <a
                href={whatsappLink || "#"}
                onClick={(e) => {
                  if (!whatsappLink) e.preventDefault();
                }}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "cta-button justify-center w-full",
                  !whatsappLink ? "pointer-events-none opacity-60" : "",
                ].join(" ")}
                aria-disabled={!whatsappLink}
              >
                ENTRAR NO GRUPO EXCLUSIVO
                <FaWhatsapp size={24} className="text-black flex-shrink-0" />
              </a>
              <BorderBeam size={100} duration={3} colorFrom="#D19756" colorTo="#F1EEE1" beamBorderRadius={12} />
            </div>

            {whatsappLink ? (
              <p className="text-[#DBA86F]/60 text-sm font-medium animate-pulse">
                Redirecionando para Grupo Exclusivo em {countdown} segundos...
              </p>
            ) : (
              <p className="text-[#DBA86F]/60 text-sm font-medium">
                Carregando link seguro do grupo...
              </p>
            )}

            <button
              onClick={() => navigate("/")}
              className="text-white/30 hover:text-[#DBA86F] text-xs transition-colors block mx-auto pt-6"
            >
              Voltar para a página inicial
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
