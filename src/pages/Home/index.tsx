import FeaturedListings from "@/pages/Home/components/FeaturedListings";
import PlanningBoard from "@/pages/Home/components/PlanningBoard";
import ChallengesSolutions from "@/pages/Home/components/ChallengesSolutions";
import SecurityStats from "@/pages/Home/components/SecurityStats";
import FAQ from "@/pages/Home/components/FAQ";
import Hero from "@/pages/Home/components/Hero";
import FeatureScroll from "@/pages/Home/components/FeatureScroll";
import BackgroundFx from "@/components/shared/BackgroundFx";

const Home = () => (
  <main>
    <BackgroundFx />
    <Hero />
    <FeatureScroll />
    <FeaturedListings />
    <PlanningBoard />
    <ChallengesSolutions />
    <SecurityStats />
    <FAQ />
  </main>
);

export default Home;
