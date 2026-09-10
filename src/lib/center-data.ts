import { supabase } from "@/integrations/supabase/client";

export type Oferta = {
  id: string;
  nome: string;
  preco: number | null;
  preco_texto: string | null;
  dia_semana: string | null;
  descricao: string | null;
  imagem_url: string | null;
  ativo: boolean;
  ordem: number;
};

export type Vaga = {
  id: string;
  cargo: string;
  descricao: string | null;
  ativo: boolean;
  ordem: number;
};

export const ofertasAtivasQuery = {
  queryKey: ["ofertas", "ativas"],
  queryFn: async (): Promise<Oferta[]> => {
    const { data, error } = await supabase
      .from("ofertas")
      .select("*")
      .eq("ativo", true)
      .order("ordem", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Oferta[];
  },
};

export const vagasAtivasQuery = {
  queryKey: ["vagas", "ativas"],
  queryFn: async (): Promise<Vaga[]> => {
    const { data, error } = await supabase
      .from("vagas")
      .select("*")
      .eq("ativo", true)
      .order("ordem", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Vaga[];
  },
};

export const ofertasTodasQuery = {
  queryKey: ["ofertas", "todas"],
  queryFn: async (): Promise<Oferta[]> => {
    const { data, error } = await supabase
      .from("ofertas")
      .select("*")
      .order("ordem", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Oferta[];
  },
};

export const vagasTodasQuery = {
  queryKey: ["vagas", "todas"],
  queryFn: async (): Promise<Vaga[]> => {
    const { data, error } = await supabase
      .from("vagas")
      .select("*")
      .order("ordem", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Vaga[];
  },
};

export function formatarPreco(o: Pick<Oferta, "preco" | "preco_texto">) {
  if (o.preco_texto && o.preco_texto.trim()) return o.preco_texto;
  if (o.preco != null)
    return o.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return "";
}
