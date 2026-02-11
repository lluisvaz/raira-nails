import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";

interface LeadData {
  fullName: string;
  email: string;
  phone: string;
}

export default function Quiz() {
  const [, navigate] = useLocation();
  const [leadId, setLeadId] = useState<string | null>(null);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Estado do quiz em etapas (uma pergunta por tela, escolha única)
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    mainGoal: "",
    experience: "",
    firstTechnique: "",
    weeklyAvailability: "",
    hasMaterials: "",
    hasClients: "",
    incomeGoal: "",
    goalTimeline: "",
    investmentComfort: "",
    serviceMode: "",
  });

  // Definição das etapas do quiz
  const steps = [
    {
      key: "mainGoal",
      title: "Qual seu principal objetivo com este curso?",
      options: [
        "Aprender do zero",
        "Aperfeiçoar técnicas e cobrar mais",
        "Lotar minha agenda",
        "Abrir/estruturar meu estúdio",
        "Trabalhar de casa com liberdade",
      ],
      map: (v: string) => ({
        "Aprender do zero": "aprender-do-zero",
        "Aperfeiçoar técnicas e cobrar mais": "aperfeicoar-e-cobrar-mais",
        "Lotar minha agenda": "lotar-agenda",
        "Abrir/estruturar meu estúdio": "abrir-estudio",
        "Trabalhar de casa com liberdade": "trabalhar-de-casa",
      }[v] || v),
    },
    {
      key: "experience",
      title: "Sua experiência com alongamento de unhas",
      options: ["Nenhuma", "Iniciante", "Intermediária", "Avançada"],
      map: (v: string) => v.toLowerCase(),
    },
    {
      key: "firstTechnique",
      title: "Qual técnica você quer dominar primeiro?",
      options: [
        "Alongamento em Fibra de Vidro",
        "Gel Moldado/Tip",
        "Manutenção rápida e perfeita",
        "Nail art básica que vende",
        "Preparação e acabamento de alto padrão",
      ],
      map: (v: string) => ({
        "Alongamento em Fibra de Vidro": "fibra-de-vidro",
        "Gel Moldado/Tip": "gel-moldado-tip",
        "Manutenção rápida e perfeita": "manutencao-rapida",
        "Nail art básica que vende": "nail-art-basica",
        "Preparação e acabamento de alto padrão": "preparacao-acabamento",
      }[v] || v),
    },
    {
      key: "weeklyAvailability",
      title: "Disponibilidade semanal para estudar/praticar",
      options: ["Menos de 5h", "5-10h", "10-20h", "20h ou mais"],
      map: (v: string) => ({
        "Menos de 5h": "<5h",
        "5-10h": "5-10h",
        "10-20h": "10-20h",
        "20h ou mais": ">=20h",
      }[v] || v),
    },
    {
      key: "hasMaterials",
      title: "Você já possui materiais básicos?",
      options: ["Sim", "Não"],
      map: (v: string) => (v === "Sim" ? "sim" : "nao"),
    },
    {
      key: "hasClients",
      title: "Você já atende clientes?",
      options: ["Ainda não", "Atendo poucas por mês", "Atendo com frequência"],
      map: (v: string) => ({
        "Ainda não": "nenhum",
        "Atendo poucas por mês": "poucas",
        "Atendo com frequência": "frequente",
      }[v] || v),
    },
    {
      key: "incomeGoal",
      title: "Objetivo de renda mensal",
      options: ["Até R$ 2.000", "R$ 2.000 a R$ 4.000", "R$ 4.000 a R$ 6.000", "R$ 6.000 ou mais"],
      map: (v: string) => ({
        "Até R$ 2.000": "<2k",
        "R$ 2.000 a R$ 4.000": "2-4k",
        "R$ 4.000 a R$ 6.000": "4-6k",
        "R$ 6.000 ou mais": ">=6k",
      }[v] || v),
    },
    {
      key: "goalTimeline",
      title: "Quando você pretende começar a atuar?",
      options: ["Quero começar já", "Em até 30 dias", "Em 1–3 meses", "Estou pesquisando ainda"],
    },
    {
      key: "investmentComfort",
      title: "Como você se sente em relação ao investimento?",
      options: ["Posso investir agora", "Preciso parcelar", "Quero opções gratuitas primeiro"],
    },
    {
      key: "serviceMode",
      title: "Onde você pretende atender?",
      options: ["Em casa (home care)", "A domicílio", "Em salão/parceria", "No meu estúdio"],
      map: (v: string) => ({
        "Em casa (home care)": "casa",
        "A domicílio": "domicilio",
        "Em salão/parceria": "salao",
        "No meu estúdio": "estudio",
      }[v] || v),
    },
  ] as const;

  type Step = typeof steps[number];
  type StepKey = Step["key"];

  function setAnswer(key: StepKey, displayValue: string) {
    const step = steps.find((s) => s.key === key)!;
    const normalized = (step as any).map ? (step as any).map(displayValue) : displayValue;
    setAnswers((prev) => ({ ...prev, [key]: normalized }));
  }

  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const current = steps[currentStep];
  const canProceed = Boolean((answers as any)[current.key]);
  const progress = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    const id = localStorage.getItem("leadId");
    const dataRaw = localStorage.getItem("leadData");
    if (!id || !dataRaw) {
      // Sem contexto do lead, volta para a Home
      navigate("/");
      return;
    }
    setLeadId(id);
    try {
      const data = JSON.parse(dataRaw) as LeadData;
      setLeadData(data);
    } catch {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId || !leadData) return;
    setSubmitting(true);

    const payload = {
      leadId,
      lead: leadData,
      quiz: answers,
    };

    try {
      const res = await fetch("/api/leads/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Não foi possível finalizar o quiz.");
      }

      // Limpa somente após finalizar
      localStorage.removeItem("leadId");
      localStorage.removeItem("leadData");

      // Sucesso: redireciona para a página de confirmação
      navigate("/sucesso");
    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro ao finalizar seu cadastro. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        background: "#170F0B",
        color: "#FFFFFF",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
      className="px-4 md:px-8 py-16"
    >
      <div className="container mx-auto max-w-2xl">
        <motion.h1
          className="nail-h2 mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Quase lá... não saia desta página!
        </motion.h1>

        {/* Barra de Progresso */}
        <div className="mb-12 space-y-2">
          <div className="flex justify-between text-sm font-medium text-[#DBA86F]">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-[#1B1310] rounded-full overflow-hidden border border-[#372507]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D19756] to-[#EFD5A7]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="nail-h3 text-center">
                {current.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {current.options.map((opt) => {
                  const display = opt;
                  const value = (current as any).map ? (current as any).map(opt) : opt;
                  const active = (answers as any)[current.key] === value;
                  return (
                    <button
                      type="button"
                      key={display}
                      onClick={() => {
                        setAnswer(current.key as StepKey, display);
                      }}
                      className={[
                        "w-full rounded-xl px-5 py-4 text-left transition border",
                        "bg-[#1B1310] text-white",
                        active
                          ? "border-[#DBA86F] ring-2 ring-[#DBA86F]/20"
                          : "border-[#372507] hover:border-[#DBA86F]/60",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-base md:text-[20px]">{display}</span>
                        <div
                          className={[
                            "inline-block w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                            active ? "bg-[#DBA86F] border-[#DBA86F]" : "border-[#5a4630]",
                          ].join(" ")}
                        >
                          {active && (
                            <div className="w-2 h-2 bg-black rounded-full" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={isFirst || submitting}
              className="rounded-xl px-6 py-3 border border-[#372507] text-white/70 hover:text-white bg-transparent disabled:opacity-30 transition"
            >
              Voltar
            </button>

            {!isLast ? (
              <button
                type="button"
                onClick={() => canProceed && setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
                disabled={!canProceed || submitting}
                className="rounded-xl px-6 py-3 border border-[#DBA86F] text-white bg-transparent hover:text-[#DBA86F] disabled:opacity-30 transition"
              >
                Avançar
              </button>
            ) : (
              <div className="block relative group" style={{ padding: "6px" }}>
                <button
                  type="submit"
                  className="cta-button justify-center"
                  disabled={!canProceed || submitting}
                >
                  {submitting ? "Enviando..." : "Finalizar meu cadastro"}
                </button>
                <BorderBeam size={100} duration={3} colorFrom="#D19756" colorTo="#F1EEE1" beamBorderRadius={12} />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
