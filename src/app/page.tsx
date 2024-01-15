import {
  DonateSection,
  DonorRewards,
  HeroSection,
  QADropdowns,
} from "@/components/homepage/PageSections";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <HeroSection />
      <QADropdowns />
      <DonorRewards />
      <DonateSection />
    </main>
  );
}
