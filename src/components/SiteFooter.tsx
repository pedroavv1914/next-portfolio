import Monogram from "@/components/Monogram";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-coal">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-8 px-6 py-11 md:px-12 xl:px-16">
        <div className="flex items-center gap-3.5">
          <Monogram size={25} />
          <span className="type-label text-[11px] text-muted [letter-spacing:0.16em]">
            © 2026 Pedro Ribeiro — feito por mim, em Jundiaí
          </span>
        </div>
        <span className="type-label text-[11px] text-faint [letter-spacing:0.16em]">
          Next.js · TypeScript · deploy na Vercel
        </span>
      </div>
    </footer>
  );
}
