import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, Store, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero-mercado.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o Center Supermercado — Nossa história" },
      {
        name: "description",
        content:
          "Conheça a história do Center Supermercado: um mercado de família feito para o bairro, com atendimento próximo e produtos de qualidade.",
      },
      { property: "og:title", content: "Sobre o Center Supermercado" },
      {
        property: "og:description",
        content: "Um mercado de família, feito para o bairro, com atendimento próximo.",
      },
    ],
  }),
  component: Sobre,
});

const valores = [
  {
    icon: Users,
    titulo: "Atendimento de vizinho",
    texto: "Aqui a gente conhece o cliente pelo nome e sabe do que a sua casa precisa.",
  },
  {
    icon: Store,
    titulo: "Produto de qualidade",
    texto: "Selecionamos fornecedores e conferimos tudo o que entra nas nossas prateleiras.",
  },
  {
    icon: HandHeart,
    titulo: "Preço justo",
    texto: "Ofertas de verdade toda semana, sem letra miúda nem pegadinha.",
  },
];

function Sobre() {
  return (
    <Layout>
      <section className="bg-primary py-14 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-extrabold md:text-5xl">Sobre o Center</h1>
          <p className="mt-3 max-w-2xl text-lg opacity-90">
            Mais que um supermercado: um ponto de encontro do bairro.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-primary">Uma história de família</h2>
          <p className="mt-4 text-muted-foreground">
            O Center Supermercado nasceu do sonho de oferecer ao bairro um mercado completo, com
            atendimento próximo e preço honesto. Começamos pequenos, com poucas gôndolas e muita
            vontade de servir bem.
          </p>
          <p className="mt-4 text-muted-foreground">
            Hoje somos referência em hortifrúti, açougue e padaria própria — mas continuamos com o
            mesmo jeito de sempre: recebendo cada cliente como quem recebe visita em casa.
          </p>
        </div>
        <img
          src={heroImg}
          alt="Corredores do Center Supermercado"
          width={1600}
          height={900}
          loading="lazy"
          className="rounded-3xl object-cover shadow-sm"
        />
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">No que a gente acredita</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {valores.map((v) => (
              <div key={v.titulo} className="rounded-2xl bg-card p-6 shadow-sm">
                <v.icon className="h-8 w-8 text-secondary-foreground" />
                <h3 className="mt-4 text-lg font-bold text-primary">{v.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
