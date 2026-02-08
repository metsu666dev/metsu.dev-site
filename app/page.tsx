import { LanguageProvider } from "@/components/language-provider"
import { AccentProvider } from "@/components/accent-provider"
import { NeonBackground } from "@/components/neon-background"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Stack } from "@/components/stack"
import { FeatureStrip } from "@/components/feature-strip"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <LanguageProvider>
      <AccentProvider>
        <NeonBackground />
        <Header />
        <main className="relative min-h-screen overflow-x-hidden">
          <Hero />
          <Services />
          <Stack />
          <FeatureStrip />
          <Projects />
          <About />
          <CTA />
          <Footer />
        </main>
      </AccentProvider>
    </LanguageProvider>
  )
}
