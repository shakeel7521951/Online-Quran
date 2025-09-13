import React from "react";
import Hero from "../components/ServicesComp/Hero";
import FreeTrialClass from "../components/ServicesComp/FreeTrialClass";
import TajweedSection from "../components/ServicesComp/TajweedSection";
import HifzSection from "../components/ServicesComp/HifzSection";
import TafseerSection from "../components/ServicesComp/TafseerSection";
import KidsQuranClasses from "../components/ServicesComp/KidsQuranClasses";
import OneOnOneClasses from "../components/ServicesComp/OneOnOneClasses";
import FlexibleSchedule from "../components/ServicesComp/FlexibleSchedule";
import FemaleTutors from '../components/ServicesComp/FemaleTutors'
import IslamicStudies from '../components/ServicesComp/IslamicStudies'
import Lenis from 'lenis'
const Services = () => {
  const lenis = new Lenis({
    autoRaf:true,
  })
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Service Sections with IDs for smooth scrolling */}
      <section id="OneOnOneClasses">
        <OneOnOneClasses />
      </section>

      <section id="TajweedSection">
        <TajweedSection />
      </section>

      <section id="HifzSection">
        <HifzSection />
      </section>

      <section id="TafseerSection">
        <TafseerSection />
      </section>

      <section id="KidsQuranClasses">
        <KidsQuranClasses />
      </section>

      <section id="FreeTrialClass">
        <FreeTrialClass />
      </section>

      <section id="FlexibleSchedule">
        <FlexibleSchedule />
      </section>

      <section id="FemaleTutors">
        <FemaleTutors />
      </section>

      <section id="IslamicStudies">
        <IslamicStudies />
      </section>
    </div>
  );
};

export default Services;
