import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Ventures } from "@/components/sections/Ventures";
import { Architecture } from "@/components/sections/Architecture";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Ventures />
      <Architecture />
      <ResumeSection />
      <Contact />
    </>
  );
}
