import ContainerDiv from "@/components/shared/ContainerDiv";
import { Badge } from "@/components/ui/badge";
import { faqs } from "@/data/appData";
import React, { useState } from "react";
import FAQItem from "@/components/shared/FAQItem";
import { SectionBadge } from "@/components/shared/SectionBadge";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="sm:py-32 py-10 bg-white relative z-10 border-t border-slate-100">
      <ContainerDiv>
        <div className="text-center sm:mb-20 mb-10 relative z-10 space-y-2">
          <SectionBadge>FAQ_DATABASE // NO_LIES_DETECTED</SectionBadge>

          <h2 className="text-4xl font-bold">Things People Ask Us</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <FAQItem
              key={idx}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === idx}
              onToggle={() => toggle(idx)}
            />
          ))}
        </div>
      </ContainerDiv>
    </section>
  );
};

export default FAQ;
