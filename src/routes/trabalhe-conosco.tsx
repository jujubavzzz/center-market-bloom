import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Clock, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/trabalhe-conosco")({
  head: () => ({
    meta: [
      { title: "Trabalhe Conosco — Center Supermercado" },
      {
        name: "description",
        content:
          "Venha fazer parte do time Center Supermercado. Envie seu currículo pelo WhatsApp e confira as áreas em aberto.",
      },
      { property: "og:title", content: "Trabalhe Conosco — Center Supermercado" },
      {
        property: "og:description",
        content:
          "Venha fazer parte do time Center Supermercado. Envie seu currículo pelo WhatsApp.",
      },
    ],
  }),
  component: TrabalheConosco,
});

const WHATSAPP = "5500000000000";

const vagas = [
  { area: "Açougueiro(a)", desc: "Corte, atendimento e organização do açougue." },
  { area: "Operador(a) de Caixa", desc: "Atendimento ao cliente no checkout e organização." },
  { area: "Repositor(a)", desc: "Organização de prateleiras e reposição de produtos." },
  { area: "Atendente de Padaria", desc: "Venda de pães, bolos e produtos da padaria." },
  { area: "Ajudante Geral", desc: "Apoio em diversos setores do mercado." },
];

function TrabalheConosco() {
  const [nome, setNome] = useState("");
  const [vaga, setVaga] = useState(vagas[0]?.area ?? "");

  const texto = encodeURIComponent(
    `Olá, Center Supermercado! Meu nome é ${nome || "..."} e gostaria de enviar meu currículo para a vaga de ${vaga || "..."}.`,
  );

  return (
    <Layout>
      <section className="bg-primary py-14 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-extrabold md:text-5xl">Trabalhe conosco</h1>
          <p className="mt-3 max-w-2xl text-lg opacity-90">
            Estamos contratando! Faça parte do time Center e cresça com a gente.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Briefcase className="h-6 w-6" /> Áreas em aberto
          </h2>
          <ul className="mt-6 space-y-4">
            {vagas.map((v) => (
              <li
                key={v.area}
                onClick={() => setVaga(v.area)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  vaga === v.area
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <h3 className="font-semibold text-foreground">{v.area}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-primary">Envie seu currículo</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Preencha rapidinho e clique no botão para enviar pelo WhatsApp.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="nome" className="text-sm font-medium">
                  Seu nome completo
                </label>
                <input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex.: João da Silva"
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="vaga" className="text-sm font-medium">
                  Vaga de interesse
                </label>
                <select
                  id="vaga"
                  value={vaga}
                  onChange={(e) => setVaga(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  {vagas.map((v) => (
                    <option key={v.area} value={v.area}>
                      {v.area}
                    </option>
                  ))}
                </select>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${texto}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-transform hover:scale-[1.02]"
              >
                <Send className="h-4 w-4" /> Enviar currículo pelo WhatsApp
              </a>
              <p className="text-xs text-muted-foreground">
                Você será redirecionado para o WhatsApp do mercado. Depois é só enviar seu currículo.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-muted p-8">
            <h2 className="text-2xl font-bold text-primary">Por que trabalhar aqui?</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-secondary mt-1.5" />
                <span>Ambiente familiar e respeitoso</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-secondary mt-1.5" />
                <span>Oportunidade de crescimento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-secondary mt-1.5" />
                <span>Descontos e benefícios para funcionários</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm text-sm">
            <h3 className="mb-3 font-semibold text-primary">Dúvidas?</h3>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-secondary-foreground" /> (00) 0000-0000
            </p>
            <p className="mt-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-secondary-foreground" /> Av. Central, 123 — Centro
            </p>
            <p className="mt-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-secondary-foreground" /> Seg a Sáb: 7h às 21h
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
