import { Link, useRouterState } from "@tanstack/react-router";
import { Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/logo-center.png.asset.json";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/ofertas", label: "Ofertas" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Loja Online / Contato" },
] as const;

export function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoAsset.url} alt="Center Supermercado" className="h-10 w-auto" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.to ? "text-primary" : "text-foreground/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/ofertas"
              className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-transform hover:scale-105"
            >
              Ver ofertas
            </Link>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium ${
                    pathname === item.to ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <img
              src={logoAsset.url}
              alt="Center Supermercado"
              className="h-12 w-auto rounded bg-white p-1"
            />
            <p className="mt-3 text-sm opacity-90">
              O mercado da sua família. Qualidade, frescor e economia todos os dias.
            </p>
          </div>
          <div className="text-sm">
            <h3 className="mb-3 font-semibold">Funcionamento</h3>
            <p className="flex items-center gap-2 opacity-90">
              <Clock className="h-4 w-4" /> Seg a Sáb: 7h às 21h
            </p>
            <p className="mt-1 flex items-center gap-2 opacity-90">
              <Clock className="h-4 w-4" /> Dom: 8h às 13h
            </p>
          </div>
          <div className="text-sm">
            <h3 className="mb-3 font-semibold">Contato</h3>
            <p className="flex items-center gap-2 opacity-90">
              <Phone className="h-4 w-4" /> (00) 0000-0000
            </p>
            <p className="mt-1 flex items-center gap-2 opacity-90">
              <MapPin className="h-4 w-4" /> Av. Central, 123 — Centro
            </p>
          </div>
        </div>
        <div className="border-t border-white/15 py-4 text-center text-xs opacity-80">
          © {new Date().getFullYear()} Center Supermercado. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
