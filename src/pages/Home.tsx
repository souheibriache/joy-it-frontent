import Footer from "@/components/Footer";
import Investir from "@/components/Investir";
import Hero from "@/components/landing-page/Hero";
import Partenaires from "@/components/landing-page/Partenaires";
import SearchActivities from "@/components/SearchActivities";
import Services from "@/components/Services";
import WhoAreWe from "@/components/WhoAreWe";

type Props = {};

const Home = ({}: Props) => {
  return (
    <div className="flex flex-col">
      <Hero />
      <SearchActivities />
      <Services />
      <Investir />
      <WhoAreWe />
      <Partenaires />
      <Footer />
    </div>
  );
};

export default Home;
