import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import esfirraImg from "@/assets/oferta-esfirra.jpg";
import verdurasImg from "@/assets/oferta-verduras.jpg";
import carnesImg from "@/assets/oferta-carnes.jpg";
import { formatarPreco, ofertasAtivasQuery } from "@/lib/center-data";

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

const imagensPadrao = [esfirraImg, verdurasImg, carnesImg];

function Ofertas() {
  const { data: ofertas = [], isLoading } = useQuery(ofertasAtivasQuery);

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
        {isLoading && (
          <p className="text-center text-muted-foreground">Carregando ofertas...</p>
        )}
        {!isLoading && ofertas.length === 0 && (
          <p className="text-center text-muted-foreground">
            Nenhuma oferta no momento. Volte em breve!
          </p>
        )}
        {ofertas.map((o, i) => (
          <article
            key={o.id}
            className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>figure]:order-2" : ""}`}
          >
            <figure className="overflow-hidden rounded-3xl shadow-sm">
              <img
                src={o.imagem_url || imagensPadrao[i % imagensPadrao.length]}
                alt={o.nome}
                width={800}
                height={600}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
            <div>
              {o.dia_semana && (
                <span className="inline-block rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-secondary-foreground">
                  {o.dia_semana}
                </span>
              )}
              <h2 className="mt-4 text-3xl font-bold text-primary">{o.nome}</h2>
              <p className="mt-2 text-lg font-semibold">{formatarPreco(o)}</p>
              {o.descricao && <p className="mt-3 text-muted-foreground">{o.descricao}</p>}
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
