import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { BriefHistory } from "@/components/sections/BriefHistory";
import { SkillsFlip } from "@/components/sections/SkillsFlip";
import { Ventures } from "@/components/sections/Ventures";
import { Architecture } from "@/components/sections/Architecture";
import { Giveable } from "@/components/sections/Giveable";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <BriefHistory />
      <SkillsFlip />
      <Ventures />
      <Architecture />
      <Giveable />
      <Contact />
    </>
  );
}
