import { createFileRoute, Link } from "@tanstack/react-router";
import { Beef, Croissant, Leaf, ShoppingBasket, Sparkles, Truck } from "lucide-react";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero-mercado.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Center Supermercado — Ofertas e economia todo dia" },
      {
        name: "description",
        content:
          "Center Supermercado: hortifrúti fresco, açougue, padaria e ofertas da semana. Quarta da esfirra, quinta das verduras e sexta da carne.",
      },
      { property: "og:title", content: "Center Supermercado — Ofertas e economia todo dia" },
      {
        property: "og:description",
        content: "Hortifrúti, açougue e padaria com preço justo. Confira as ofertas da semana.",
      },
    ],
  }),
  component: Home,
});

const destaques = [
  {
    icon: Croissant,
    dia: "Quarta",
    titulo: "Esfirra por R$ 1",
    texto: "Direto do forno da nossa padaria, o dia todo.",
  },
  {
    icon: Leaf,
    dia: "Quinta",
    titulo: "Dia das Verduras",
    texto: "Hortifrúti fresquinho com preços especiais.",
  },
  {
    icon: Beef,
    dia: "Sexta",
    titulo: "Promoção de Carnes",
    texto: "Cortes selecionados do nosso açougue.",
  },
];

const setores = [
  { icon: ShoppingBasket, nome: "Mercearia", texto: "Tudo para o dia a dia da sua casa." },
  { icon: Leaf, nome: "Hortifrúti", texto: "Frutas, legumes e verduras selecionados." },
  { icon: Beef, nome: "Açougue", texto: "Carnes frescas cortadas na hora." },
  { icon: Croissant, nome: "Padaria", texto: "Pão quentinho e salgados o dia inteiro." },
];

function Home() {
  return (
    <Layout>
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Interior do Center Supermercado com hortifrúti fresco"
          width={1600}
          height={900}
          className="h-[70vh] min-h-[420px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-secondary-foreground">
              <Sparkles className="h-4 w-4" /> Ofertas toda semana
            </span>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
              O mercado da sua família, pertinho de você.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-primary-foreground/90">
              Hortifrúti fresco, açougue de confiança e padaria própria — com preço justo todos os
              dias no Center Supermercado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/ofertas"
                className="rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-transform hover:scale-105"
              >
                Ver ofertas da semana
              </Link>
              <Link
                to="/contato"
                className="rounded-full border border-primary-foreground/40 px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Comprar pelo WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold">Os dias que valem a pena</h2>
        <p className="mt-2 text-center text-muted-foreground">
          Toda semana tem oferta certa esperando por você.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {destaques.map((d) => (
            <div
              key={d.dia}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <d.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-secondary-foreground/70">
                {d.dia}
              </p>
              <h3 className="text-xl font-bold text-primary">{d.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">Nossos setores</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {setores.map((s) => (
              <div key={s.nome} className="rounded-2xl bg-card p-6 text-center shadow-sm">
                <s.icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 font-semibold">{s.nome}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-primary p-10 text-center text-primary-foreground md:flex-row md:text-left">
          <Truck className="h-12 w-12 shrink-0 text-secondary" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Compre pelo WhatsApp e receba em casa</h2>
            <p className="mt-2 opacity-90">
              Monte sua lista, envie pra gente e a entrega chega rapidinho no seu bairro.
            </p>
          </div>
          <Link
            to="/contato"
            className="rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-transform hover:scale-105"
          >
            Fazer pedido
          </Link>
        </div>
      </section>
    </Layout>
  );
}
