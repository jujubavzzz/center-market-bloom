import { createFileRoute } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, Phone, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Loja Online e Contato — Center Supermercado" },
      {
        name: "description",
        content:
          "Faça seu pedido pelo WhatsApp e receba em casa. Veja endereço, telefone e horários do Center Supermercado.",
      },
      { property: "og:title", content: "Loja Online e Contato — Center Supermercado" },
      {
        property: "og:description",
        content: "Peça pelo WhatsApp e receba em casa. Endereço, telefone e horários.",
      },
    ],
  }),
  component: Contato,
});

const WHATSAPP = "5500000000000";

function Contato() {
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [lista, setLista] = useState("");

  const texto = encodeURIComponent(
    `Olá, Center Supermercado! Meu nome é ${nome || "..."}, do bairro ${bairro || "..."}.\n\nMinha lista:\n${lista || "..."}`,
  );

  return (
    <Layout>
      <section className="bg-primary py-14 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-extrabold md:text-5xl">Loja online & contato</h1>
          <p className="mt-3 max-w-2xl text-lg opacity-90">
            Monte sua lista aqui e envie direto pro nosso WhatsApp. A gente separa tudo e entrega
            na sua casa.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primary">
            <ShoppingCart className="h-6 w-6" /> Fazer meu pedido
          </h2>
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="nome" className="text-sm font-medium">
                Seu nome
              </label>
              <input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Maria Silva"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="bairro" className="text-sm font-medium">
                Bairro de entrega
              </label>
              <input
                id="bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Ex.: Centro"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="lista" className="text-sm font-medium">
                Lista de compras
              </label>
              <textarea
                id="lista"
                value={lista}
                onChange={(e) => setLista(e.target.value)}
                rows={6}
                placeholder={"2 kg de arroz\n1 pacote de café\n1 kg de tomate"}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${texto}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Enviar pedido pelo WhatsApp
            </a>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Truck className="h-4 w-4" /> Entrega no bairro a partir de R$ 60 em compras.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-primary">Onde estamos</h2>
            <p className="mt-4 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-secondary-foreground" /> Av. Central, 123 — Centro
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-secondary-foreground" /> (00) 0000-0000
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm">
              <Instagram className="h-4 w-4 text-secondary-foreground" /> @centersupermercado
            </p>
          </div>
          <div className="rounded-3xl bg-muted p-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Clock className="h-6 w-6" /> Horários
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex justify-between border-b border-border pb-2">
                <span>Segunda a sábado</span> <span className="font-semibold">7h — 21h</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span> <span className="font-semibold">8h — 13h</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
