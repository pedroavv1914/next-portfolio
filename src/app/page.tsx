import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Especialidades from "@/components/Especialidades";
import Portifolio from "@/components/Portifolio";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Especialidades />
        <Portifolio />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}
