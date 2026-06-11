import HeroSection from '@/components/home/HeroSection';
import PillarsSection from '@/components/home/PillarsSection';
import ThesisSection from '@/components/home/ThesisSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function Home() {
  return (
    <div className="fade-in">
      <HeroSection />
      <PillarsSection />
      <ThesisSection />
      <NewsletterSection />
    </div>
  );
}