import { LanguageProvider } from '../i18n';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WorldMap from '../components/WorldMap';
import Metrics from '../components/Metrics';
import AIAnalyzer from '../components/AIAnalyzer';
import Cases from '../components/Cases';
import Training from '../components/Training';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  return (
    <LanguageProvider defaultLocale="zh">
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <WorldMap />
          <Metrics />
          <AIAnalyzer />
          <Cases />
          <Training />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
}
