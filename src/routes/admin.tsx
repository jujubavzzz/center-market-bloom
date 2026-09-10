import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Loader2, LogOut, Pencil, Plus, Trash2, X } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/logo-center.png.asset.json";
import {
  ofertasTodasQuery,
  vagasTodasQuery,
  type Oferta,
  type Vaga,
} from "@/lib/center-data";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel Administrativo — Center Supermercado" },
      {
        name: "description",
        content: "Área restrita para gerenciar ofertas e vagas do Center Supermercado.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const inputClass =
  "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCarregando(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return session ? <Painel /> : <Login />;
}

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function entrar(e: FormEvent) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) setErro("E-mail ou senha incorretos.");
    setEnviando(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <form
        onSubmit={entrar}
        className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-sm"
      >
        <img src={logoAsset.url} alt="Center Supermercado" className="mx-auto h-12 w-auto" />
        <h1 className="mt-6 text-center text-2xl font-bold text-primary">
          Painel administrativo
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Entre para gerenciar ofertas e vagas.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="senha" className="text-sm font-medium">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={inputClass}
            />
          </div>
          {erro && <p className="text-sm text-destructive">{erro}</p>}
          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {enviando ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Painel() {
  const [aba, setAba] = useState<"ofertas" | "vagas">("ofertas");
  const queryClient = useQueryClient();

  async function sair() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Center Supermercado" className="h-9 w-auto" />
            <span className="text-sm font-semibold text-primary">Painel</span>
          </div>
          <button
            onClick={sair}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex gap-2">
          {(["ofertas", "vagas"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setAba(t)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                aba === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground/70 hover:text-primary"
              }`}
            >
              {t === "ofertas" ? "Ofertas" : "Trabalhe Conosco"}
            </button>
          ))}
        </div>

        <div className="mt-8">{aba === "ofertas" ? <AdminOfertas /> : <AdminVagas />}</div>
      </div>
    </div>
  );
}

type OfertaForm = {
  nome: string;
  preco: string;
  preco_texto: string;
  dia_semana: string;
  descricao: string;
  imagem_url: string;
  ativo: boolean;
};

const ofertaVazia: OfertaForm = {
  nome: "",
  preco: "",
  preco_texto: "",
  dia_semana: "",
  descricao: "",
  imagem_url: "",
  ativo: true,
};

function AdminOfertas() {
  const queryClient = useQueryClient();
  const { data: ofertas = [], isLoading } = useQuery(ofertasTodasQuery);
  const [editando, setEditando] = useState<Oferta | null>(null);
  const [form, setForm] = useState<OfertaForm>(ofertaVazia);
  const [aberto, setAberto] = useState(false);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  function atualizar() {
    queryClient.invalidateQueries({ queryKey: ["ofertas"] });
  }

  function abrirNovo() {
    setEditando(null);
    setForm(ofertaVazia);
    setErro("");
    setAberto(true);
  }

  function abrirEdicao(o: Oferta) {
    setEditando(o);
    setForm({
      nome: o.nome,
      preco: o.preco != null ? String(o.preco) : "",
      preco_texto: o.preco_texto ?? "",
      dia_semana: o.dia_semana ?? "",
      descricao: o.descricao ?? "",
      imagem_url: o.imagem_url ?? "",
      ativo: o.ativo,
    });
    setErro("");
    setAberto(true);
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    const payload = {
      nome: form.nome,
      preco: form.preco ? Number(form.preco.replace(",", ".")) : null,
      preco_texto: form.preco_texto || null,
      dia_semana: form.dia_semana || null,
      descricao: form.descricao || null,
      imagem_url: form.imagem_url || null,
      ativo: form.ativo,
    };
    const { error } = editando
      ? await supabase.from("ofertas").update(payload).eq("id", editando.id)
      : await supabase.from("ofertas").insert(payload);
    setSalvando(false);
    if (error) {
      setErro("Não foi possível salvar. Tente novamente.");
      return;
    }
    setAberto(false);
    atualizar();
  }

  async function alternarAtivo(o: Oferta) {
    await supabase.from("ofertas").update({ ativo: !o.ativo }).eq("id", o.id);
    atualizar();
  }

  async function excluir(o: Oferta) {
    if (!confirm(`Excluir a oferta "${o.nome}"?`)) return;
    await supabase.from("ofertas").delete().eq("id", o.id);
    atualizar();
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">Ofertas</h2>
        <button
          onClick={abrirNovo}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-secondary-foreground hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" /> Nova oferta
        </button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-muted-foreground">Carregando...</p>}

      <ul className="mt-6 space-y-3">
        {ofertas.map((o) => (
          <li
            key={o.id}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4"
          >
            {o.imagem_url && (
              <img
                src={o.imagem_url}
                alt={o.nome}
                className="h-14 w-14 rounded-xl object-cover"
              />
            )}
            <div className="min-w-[200px] flex-1">
              <p className="font-semibold">{o.nome}</p>
              <p className="text-sm text-muted-foreground">
                {[o.dia_semana, o.preco_texto].filter(Boolean).join(" · ")}
              </p>
            </div>
            <button
              onClick={() => alternarAtivo(o)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                o.ativo
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {o.ativo ? "Ativo" : "Inativo"}
            </button>
            <button
              onClick={() => abrirEdicao(o)}
              aria-label="Editar"
              className="rounded-full border border-border p-2 hover:border-primary hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => excluir(o)}
              aria-label="Excluir"
              className="rounded-full border border-border p-2 text-destructive hover:border-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      {aberto && (
        <Modal titulo={editando ? "Editar oferta" : "Nova oferta"} onClose={() => setAberto(false)}>
          <form onSubmit={salvar} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome do produto</label>
              <input
                required
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Preço (R$)</label>
                <input
                  value={form.preco}
                  onChange={(e) => setForm({ ...form, preco: e.target.value })}
                  placeholder="1,00"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Unidade / texto do preço</label>
                <input
                  value={form.preco_texto}
                  onChange={(e) => setForm({ ...form, preco_texto: e.target.value })}
                  placeholder="R$ 1,00 a unidade"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Dia da semana</label>
              <select
                value={form.dia_semana}
                onChange={(e) => setForm({ ...form, dia_semana: e.target.value })}
                className={inputClass}
              >
                <option value="">Sem dia específico</option>
                {[
                  "Segunda-feira",
                  "Terça-feira",
                  "Quarta-feira",
                  "Quinta-feira",
                  "Sexta-feira",
                  "Sábado",
                  "Domingo",
                ].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Descrição</label>
              <textarea
                rows={3}
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Link da imagem</label>
              <input
                value={form.imagem_url}
                onChange={(e) => setForm({ ...form, imagem_url: e.target.value })}
                placeholder="https://..."
                className={inputClass}
              />
            </div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.ativo}
                onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
              />
              Oferta ativa no site
            </label>
            {erro && <p className="text-sm text-destructive">{erro}</p>}
            <button
              type="submit"
              disabled={salvando}
              className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Salvar"}
            </button>
          </form>
        </Modal>
      )}
    </section>
  );
}

function AdminVagas() {
  const queryClient = useQueryClient();
  const { data: vagas = [], isLoading } = useQuery(vagasTodasQuery);
  const [editando, setEditando] = useState<Vaga | null>(null);
  const [form, setForm] = useState({ cargo: "", descricao: "", ativo: true });
  const [aberto, setAberto] = useState(false);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  function atualizar() {
    queryClient.invalidateQueries({ queryKey: ["vagas"] });
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    const payload = {
      cargo: form.cargo,
      descricao: form.descricao || null,
      ativo: form.ativo,
    };
    const { error } = editando
      ? await supabase.from("vagas").update(payload).eq("id", editando.id)
      : await supabase.from("vagas").insert(payload);
    setSalvando(false);
    if (error) {
      setErro("Não foi possível salvar. Tente novamente.");
      return;
    }
    setAberto(false);
    atualizar();
  }

  async function alternarAtivo(v: Vaga) {
    await supabase.from("vagas").update({ ativo: !v.ativo }).eq("id", v.id);
    atualizar();
  }

  async function excluir(v: Vaga) {
    if (!confirm(`Excluir a vaga "${v.cargo}"?`)) return;
    await supabase.from("vagas").delete().eq("id", v.id);
    atualizar();
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">Vagas</h2>
        <button
          onClick={() => {
            setEditando(null);
            setForm({ cargo: "", descricao: "", ativo: true });
            setErro("");
            setAberto(true);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-secondary-foreground hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" /> Nova vaga
        </button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-muted-foreground">Carregando...</p>}

      <ul className="mt-6 space-y-3">
        {vagas.map((v) => (
          <li
            key={v.id}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <div className="min-w-[200px] flex-1">
              <p className="font-semibold">{v.cargo}</p>
              {v.descricao && (
                <p className="text-sm text-muted-foreground">{v.descricao}</p>
              )}
            </div>
            <button
              onClick={() => alternarAtivo(v)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                v.ativo ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}
            >
              {v.ativo ? "Ativa" : "Inativa"}
            </button>
            <button
              onClick={() => {
                setEditando(v);
                setForm({ cargo: v.cargo, descricao: v.descricao ?? "", ativo: v.ativo });
                setErro("");
                setAberto(true);
              }}
              aria-label="Editar"
              className="rounded-full border border-border p-2 hover:border-primary hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => excluir(v)}
              aria-label="Excluir"
              className="rounded-full border border-border p-2 text-destructive hover:border-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      {aberto && (
        <Modal titulo={editando ? "Editar vaga" : "Nova vaga"} onClose={() => setAberto(false)}>
          <form onSubmit={salvar} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Cargo</label>
              <input
                required
                value={form.cargo}
                onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Descrição</label>
              <textarea
                rows={3}
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                className={inputClass}
              />
            </div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.ativo}
                onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
              />
              Vaga ativa no site
            </label>
            {erro && <p className="text-sm text-destructive">{erro}</p>}
            <button
              type="submit"
              disabled={salvando}
              className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Salvar"}
            </button>
          </form>
        </Modal>
      )}
    </section>
  );
}

function Modal({
  titulo,
  onClose,
  children,
}: {
  titulo: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-4">
      <div className="mt-10 w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-primary">{titulo}</h3>
          <button onClick={onClose} aria-label="Fechar" className="rounded-full p-1 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
