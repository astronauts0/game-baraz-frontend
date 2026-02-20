import React from "react";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import ContainerDiv from "@/components/shared/ContainerDiv";
import SectionHeader from "@/components/shared/SectionHeader";
import BackgroundFx from "@/components/shared/BackgroundFx";

const ContactUs: React.FC = () => {
  return (
    <ContainerDiv className="py-10 sm:py-20">
      <BackgroundFx from="from-emerald-500/23" />
      <div>
        <SectionHeader
          badge="System Uplink Established"
          badgeDot="bg-emerald-500"
          topText="Contact"
          bottomText="Support"
          description="Got a problem? We've got a squad for that. Reach out for disputes, partnership intel, or general inquiries."
          rollingOptions={{
            bottom: {
              gradient: "word",
            },
          }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </ContainerDiv>
  );
};

export default ContactUs;
