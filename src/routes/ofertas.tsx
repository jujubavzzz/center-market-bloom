import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import esfirraImg from "@/assets/oferta-esfirra.jpg";
import verdurasImg from "@/assets/oferta-verduras.jpg";
import carnesImg from "@/assets/oferta-carnes.jpg";

export const Route = createFileRoute("/ofertas")({
  head: () => ({
    meta: [
      { title: "Ofertas da Semana — Center Supermercado" },
      {
        name: "description",
        content:
          "Quarta da esfirra por R$ 1, quinta dia das verduras e sexta com promoção de carnes no Center Supermercado.",
      },
      { property: "og:title", content: "Ofertas da Semana — Center Supermercado" },
      {
        property: "og:description",
        content: "Esfirra por R$ 1 na quarta, verduras na quinta e carnes na sexta.",
      },
    ],
  }),
  component: Ofertas,
});

const ofertas = [
  {
    dia: "Quarta-feira",
    titulo: "Esfirra por R$ 1",
    texto:
      "Esfirras assadas na hora na nossa padaria: carne, frango, queijo e calabresa. Preço único o dia todo, enquanto durar o estoque.",
    img: esfirraImg,
    destaque: "R$ 1,00 a unidade",
  },
  {
    dia: "Quinta-feira",
    titulo: "Dia das Verduras",
    texto:
      "Hortifrúti selecionado com descontos especiais: alface, couve, tomate, cenoura e muito mais fresquinho direto do produtor.",
    img: verdurasImg,
    destaque: "Descontos no hortifrúti",
  },
  {
    dia: "Sexta-feira",
    titulo: "Promoção de Carnes",
    texto:
      "Nosso açougue prepara os melhores cortes para o seu fim de semana: picanha, alcatra, costela e frango com preço de sexta.",
    img: carnesImg,
    destaque: "Cortes selecionados",
  },
];

function Ofertas() {
  return (
    <Layout>
      <section className="bg-primary py-14 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-extrabold md:text-5xl">Ofertas da semana</h1>
          <p className="mt-3 max-w-2xl text-lg opacity-90">
            Cada dia tem uma vantagem no Center. Marque no calendário e aproveite.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-4 py-16">
        {ofertas.map((o, i) => (
          <article
            key={o.dia}
            className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>figure]:order-2" : ""}`}
          >
            <figure className="overflow-hidden rounded-3xl shadow-sm">
              <img
                src={o.img}
                alt={o.titulo}
                width={800}
                height={600}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
            <div>
              <span className="inline-block rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-secondary-foreground">
                {o.dia}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-primary">{o.titulo}</h2>
              <p className="mt-2 text-lg font-semibold">{o.destaque}</p>
              <p className="mt-3 text-muted-foreground">{o.texto}</p>
            </div>
          </article>
        ))}

        <div className="rounded-3xl border border-border bg-card p-8 text-center">
          <h2 className="text-2xl font-bold">Quer receber as ofertas antes de todo mundo?</h2>
          <p className="mt-2 text-muted-foreground">
            Fale com a gente no WhatsApp e entre na nossa lista de transmissão.
          </p>
          <Link
            to="/contato"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Falar com o Center
          </Link>
        </div>
      </section>
    </Layout>
  );
}
