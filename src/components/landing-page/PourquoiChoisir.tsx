import Time from "../../assets/pourquoi-nous-choisir/time.png";
import Board from "../../assets/pourquoi-nous-choisir/board.png";
import Check from "../../assets/pourquoi-nous-choisir/check.png";
import Credit from "../../assets/pourquoi-nous-choisir/credit.png";
type Props = {};

const PourquoiChoisir = ({}: Props) => {
  return (
    <div className="bg-gradient-to-t from-[#30867D] to-primary w-full text-white">
      <div className="container mx-auto flex flex-row justify-between w-full py-20 gap-20">
        <div className="flex flex-col gap-5 justify-center flex-1">
          <h1 className="text-5xl uppercase font-bold font-bolota">
            Pourquoi nous choisir ?
          </h1>
          <p className="text-xl -tracking-tighter">
            Chez <span> JOY IT</span>, nous simplifions l’organisation de vos
            initiatives de bien-être au travail grâce à notre plateforme
            intuitive et flexible. Nous avons conçu une solution pensée pour
            motiver vos équipes et booster leur productivité au quotidien.
          </p>
        </div>

        <ul className="flex-1 flex flex-col gap-10 text-xl">
          <li className="flex flex-row gap-3 items-center">
            <img src={Check} alt="" className=" w-10 h-auto" />{" "}
            <p>Simplification de l’organisation des activités. </p>
          </li>
          <li className="flex flex-row gap-3 items-center">
            <img src={Board} alt="" className=" w-10 h-auto" />{" "}
            <p>Catalogue varié d’activités engageantes. </p>
          </li>
          <li className="flex flex-row gap-3 items-center">
            <img src={Credit} alt="" className=" w-10 h-auto" />{" "}
            <p>Renforcement de la cohésion et de la motivation des équipes. </p>
          </li>
          <li className="flex flex-row gap-3 items-center">
            <img src={Time} alt="" className=" w-10 h-auto" />{" "}
            <p>Gain de temps grâce à une plateforme intuitive. </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PourquoiChoisir;
