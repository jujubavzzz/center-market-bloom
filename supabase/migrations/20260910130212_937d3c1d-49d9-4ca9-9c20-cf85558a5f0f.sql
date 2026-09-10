CREATE TABLE public.ofertas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  preco numeric,
  preco_texto text,
  dia_semana text,
  descricao text,
  imagem_url text,
  ativo boolean NOT NULL DEFAULT true,
  ordem integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.vagas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cargo text NOT NULL,
  descricao text,
  ativo boolean NOT NULL DEFAULT true,
  ordem integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.ofertas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ofertas TO authenticated;
GRANT ALL ON public.ofertas TO service_role;

GRANT SELECT ON public.vagas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vagas TO authenticated;
GRANT ALL ON public.vagas TO service_role;

ALTER TABLE public.ofertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vagas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ofertas ativas visiveis publicamente" ON public.ofertas FOR SELECT TO anon USING (ativo = true);
CREATE POLICY "Autenticados leem ofertas" ON public.ofertas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Autenticados criam ofertas" ON public.ofertas FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Autenticados editam ofertas" ON public.ofertas FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Autenticados excluem ofertas" ON public.ofertas FOR DELETE TO authenticated USING (true);

CREATE POLICY "Vagas ativas visiveis publicamente" ON public.vagas FOR SELECT TO anon USING (ativo = true);
CREATE POLICY "Autenticados leem vagas" ON public.vagas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Autenticados criam vagas" ON public.vagas FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Autenticados editam vagas" ON public.vagas FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Autenticados excluem vagas" ON public.vagas FOR DELETE TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_ofertas_updated_at BEFORE UPDATE ON public.ofertas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_vagas_updated_at BEFORE UPDATE ON public.vagas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.ofertas (nome, preco, preco_texto, dia_semana, descricao, imagem_url, ativo, ordem) VALUES
('Esfirra por R$ 1', 1.00, 'R$ 1,00 a unidade', 'Quarta-feira', 'Esfirras assadas na hora na nossa padaria: carne, frango, queijo e calabresa. Preço único o dia todo, enquanto durar o estoque.', NULL, true, 1),
('Dia das Verduras', NULL, 'Descontos no hortifrúti', 'Quinta-feira', 'Hortifrúti selecionado com descontos especiais: alface, couve, tomate, cenoura e muito mais fresquinho direto do produtor.', NULL, true, 2),
('Promoção de Carnes', NULL, 'Cortes selecionados', 'Sexta-feira', 'Nosso açougue prepara os melhores cortes para o seu fim de semana: picanha, alcatra, costela e frango com preço de sexta.', NULL, true, 3);

INSERT INTO public.vagas (cargo, descricao, ativo, ordem) VALUES
('Açougueiro(a)', 'Corte, atendimento e organização do açougue.', true, 1),
('Operador(a) de Caixa', 'Atendimento ao cliente no checkout e organização.', true, 2),
('Repositor(a)', 'Organização de prateleiras e reposição de produtos.', true, 3),
('Atendente de Padaria', 'Venda de pães, bolos e produtos da padaria.', true, 4),
('Ajudante Geral', 'Apoio em diversos setores do mercado.', true, 5);