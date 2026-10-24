import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
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
        <TrustBar />
        <HowItWorks />
        <MailSection />
        <Plans />
        <Confianza />
        <FAQ />
        <Closing />
      </main>
      <Footer />
      <MobileCtaBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
