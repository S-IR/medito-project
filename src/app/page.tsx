import {
  DonateSection,
  DonorRewards,
  HeroSection,
  QADropdowns,
} from "@/components/homepage/PageSections";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <HeroSection />
      <QADropdowns />
      <DonorRewards />
      <DonateSection />
    </main>
  );
}
