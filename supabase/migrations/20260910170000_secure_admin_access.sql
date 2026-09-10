-- ============================================================
-- CENTER MARKET
-- Segurança do painel administrativo
-- ============================================================

-- ------------------------------------------------------------
-- 1. Tabela de administradores
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.admins (
  user_id uuid PRIMARY KEY
    REFERENCES auth.users(id)
    ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Usuários autenticados podem apenas verificar
-- se o próprio usuário é administrador.
CREATE POLICY "Usuário pode verificar seu próprio acesso"
ON public.admins
FOR SELECT
TO authenticated
USING (user_id = auth.uid());


-- ------------------------------------------------------------
-- 2. Remover as policies antigas/inseguras
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "Ofertas ativas visiveis publicamente"
ON public.ofertas;

DROP POLICY IF EXISTS "Autenticados leem ofertas"
ON public.ofertas;

DROP POLICY IF EXISTS "Autenticados criam ofertas"
ON public.ofertas;

DROP POLICY IF EXISTS "Autenticados editam ofertas"
ON public.ofertas;

DROP POLICY IF EXISTS "Autenticados excluem ofertas"
ON public.ofertas;

DROP POLICY IF EXISTS "Vagas ativas visiveis publicamente"
ON public.vagas;

DROP POLICY IF EXISTS "Autenticados leem vagas"
ON public.vagas;

DROP POLICY IF EXISTS "Autenticados criam vagas"
ON public.vagas;

DROP POLICY IF EXISTS "Autenticados editam vagas"
ON public.vagas;

DROP POLICY IF EXISTS "Autenticados excluem vagas"
ON public.vagas;


-- ------------------------------------------------------------
-- 3. OFERTAS
-- ------------------------------------------------------------

-- Visitantes podem ver somente ofertas ativas.
CREATE POLICY "Público pode ver ofertas ativas"
ON public.ofertas
FOR SELECT
TO anon
USING (ativo = true);

-- Usuários autenticados podem ver ofertas ativas.
CREATE POLICY "Autenticados podem ver ofertas ativas"
ON public.ofertas
FOR SELECT
TO authenticated
USING (ativo = true);

-- Administradores podem ver todas as ofertas,
-- inclusive as desativadas.
CREATE POLICY "Administradores podem ver todas as ofertas"
ON public.ofertas
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admins
    WHERE admins.user_id = auth.uid()
  )
);

-- Somente administradores podem criar ofertas.
CREATE POLICY "Administradores podem criar ofertas"
ON public.ofertas
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.admins
    WHERE admins.user_id = auth.uid()
  )
);

-- Somente administradores podem editar ofertas.
CREATE POLICY "Administradores podem editar ofertas"
ON public.ofertas
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admins
    WHERE admins.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.admins
    WHERE admins.user_id = auth.uid()
  )
);

-- Somente administradores podem excluir ofertas.
CREATE POLICY "Administradores podem excluir ofertas"
ON public.ofertas
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admins
    WHERE admins.user_id = auth.uid()
  )
);


-- ------------------------------------------------------------
-- 4. VAGAS
-- ------------------------------------------------------------

-- Visitantes podem ver somente vagas ativas.
CREATE POLICY "Público pode ver vagas ativas"
ON public.vagas
FOR SELECT
TO anon
USING (ativo = true);

-- Usuários autenticados podem ver vagas ativas.
CREATE POLICY "Autenticados podem ver vagas ativas"
ON public.vagas
FOR SELECT
TO authenticated
USING (ativo = true);

-- Administradores podem ver todas as vagas.
CREATE POLICY "Administradores podem ver todas as vagas"
ON public.vagas
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admins
    WHERE admins.user_id = auth.uid()
  )
);

-- Somente administradores podem criar vagas.
CREATE POLICY "Administradores podem criar vagas"
ON public.vagas
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.admins
    WHERE admins.user_id = auth.uid()
  )
);

-- Somente administradores podem editar vagas.
CREATE POLICY "Administradores podem editar vagas"
ON public.vagas
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admins
    WHERE admins.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.admins
    WHERE admins.user_id = auth.uid()
  )
);

-- Somente administradores podem excluir vagas.
CREATE POLICY "Administradores podem excluir vagas"
ON public.vagas
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admins
    WHERE admins.user_id = auth.uid()
  )
);


-- ------------------------------------------------------------
-- 5. Permissões
-- ------------------------------------------------------------

GRANT SELECT ON public.admins TO authenticated;

GRANT SELECT ON public.ofertas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE
ON public.ofertas TO authenticated;

GRANT SELECT ON public.vagas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE
ON public.vagas TO authenticated;

GRANT ALL ON public.admins TO service_role;
GRANT ALL ON public.ofertas TO service_role;
GRANT ALL ON public.vagas TO service_role;
