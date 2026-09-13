import React, { lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";

const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const Domains = lazy(() => import("./components/DomainsPrize"));
const Judges = lazy(() => import("./components/Judges"));
const PrizePool = lazy(() => import("./components/PrizePool"));
const Sponsors = lazy(() => import("./components/Sponsors"));
const Faq = lazy(() => import("./components/Faq"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Header />
        <Hero />
        <AboutUs />
        <Domains />
        <Judges />
        <PrizePool />
        <Sponsors />
        <Faq />
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
