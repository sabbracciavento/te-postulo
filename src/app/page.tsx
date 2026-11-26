import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { Evidence } from "@/components/sections/Evidence";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MailSection } from "@/components/sections/MailSection";
import { Plans } from "@/components/sections/Plans";
import { Confianza } from "@/components/sections/Confianza";
import { FAQ } from "@/components/sections/FAQ";
import { Closing } from "@/components/sections/Closing";
import { faq } from "@/content/home";
import { site } from "@/content/site";

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/tp-circulo-512.png`,
      description: site.description,
      areaServed: "Ciudad Autónoma de Buenos Aires y Gran Buenos Aires, Argentina",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ];

  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <Hero />
        <Benefits />
        <HowItWorks />
        <Evidence />
        <MailSection />
        <Plans />
        <Confianza />
        <FAQ />
        <Closing />
      </main>
      <Footer conBarra />
      <MobileCtaBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
