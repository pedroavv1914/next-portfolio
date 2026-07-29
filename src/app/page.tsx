import Effects from "@/components/Effects";
import BackToTop from "@/components/BackToTop";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/sections/Hero";
import Trajetoria from "@/components/sections/Trajetoria";
import OQueFaco from "@/components/sections/OQueFaco";
import Projetos from "@/components/sections/Projetos";
import Processo from "@/components/sections/Processo";
import Contato from "@/components/sections/Contato";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Effects />

      <SiteHeader />

      <Hero />

      <Trajetoria />

      <OQueFaco />

      <Projetos />

      <Processo />

      <Contato />

      <SiteFooter />

      <BackToTop />
    </>
  );
}
