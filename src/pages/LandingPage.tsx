import Footer from "@/components/Footer";
import Partenaires from "@/components/landing-page/Partenaires";
import Hero from "@/components/landing-page/Hero";
import Services from "@/components/landing-page/Services";
import Advertisement from "@/components/landing-page/Advertisement";
import Investment from "@/components/landing-page/Investment";
import PourquoiChoisir from "@/components/landing-page/PourquoiChoisir";
import Testimonials from "@/components/landing-page/Testimonials";
type Props = {};

const LandingPage = ({}: Props) => {
  return (
    <div className="flex-col gap-20">
      <div className="flex flex-col w-full items-center overflow-hidden relative gap-32">
        <Hero />
        <Partenaires />
        <Services />

        <Advertisement />
        <Investment />

        <PourquoiChoisir />

        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
