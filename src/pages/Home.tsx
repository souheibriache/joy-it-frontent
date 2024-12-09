import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Investir from "@/components/Investir";
import Partenaires from "@/components/Partenaires";
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
