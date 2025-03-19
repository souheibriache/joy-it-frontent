import decathlon from "../../assets/partenaires/decathlon.png";
import foodles from "../../assets/partenaires/foodles.png";
import foresthill from "../../assets/partenaires/foresthill.png";
import gymlib from "../../assets/partenaires/gymlib.png";
import kee from "../../assets/partenaires/kee.png";
import keizio from "../../assets/partenaires/keizio.png";
type Props = {};

const Partenaires = ({}: Props) => {
  return (
    <div className="py-32 flex items-center content-center">
      <div className=" flex flex-col justify-center items-center container mx-auto gap-20">
        <h1 className="text-4xl font-bold text-primary text-center">
          Nos partenaires de qualité 
        </h1>
        <div className="flex flex-row gap-20">
          <img
            src={decathlon}
            alt=""
            className="h-12 w-auto grayscale hover:grayscale-0 duration-200 hover:scale-105 self-center mx-auto"
          />
          <img
            src={foodles}
            alt=""
            className="h-12 w-auto grayscale hover:grayscale-0 duration-200 hover:scale-105 self-center mx-auto"
          />
          <img
            src={foresthill}
            alt=""
            className="h-12 w-auto grayscale hover:grayscale-0 duration-200 hover:scale-105 self-center mx-auto"
          />
          <img
            src={gymlib}
            alt=""
            className="h-12 w-auto grayscale hover:grayscale-0 duration-200 hover:scale-105 self-center mx-auto"
          />
          <img
            src={kee}
            alt=""
            className="h-12 w-auto grayscale hover:grayscale-0 duration-200 hover:scale-105 self-center mx-auto"
          />
          <img
            src={keizio}
            alt=""
            className="h-12 w-auto grayscale hover:grayscale-0 duration-200 hover:scale-105 self-center mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Partenaires;
