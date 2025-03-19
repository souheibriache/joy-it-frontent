import { CheckCheck } from "lucide-react";

type Props = {};

const Investir = ({}: Props) => {
  return (
    <div className="relative h-full shadow-xl shadow-black/30">
      {/* SVG with shadow filter, reversed upside down */}

      {/* Content above the wave */}
      <div className="relative z-10 p-8 container mx-auto flex justify-evenly flex-col items-center gap-10">
        <h1 className="text-4xl font-bold text-center text-primary w-1/2">
          Pourquoi investir dans le bien-être en entreprise ?
        </h1>
        <div className="flex flex-row w-full items-center justify-between text-center gap-32">
          <div className="flex flex-1 flex-col gap-5 items-center justify-between">
            <div className="h-40 w-40 rounded-full border border-lightred text-lightred relative flex flex-col items-center justify-center">
              <CheckCheck size={80} />
            </div>
            <h3>84 % des salariés</h3>
            <h5>
              considèrent que la reconnaissance dans leur travail est
              essentielle à leur bien-être.
            </h5>
          </div>

          <div className="flex flex-1 flex-col gap-5 items-center justify-between">
            <div className="h-40 w-40 rounded-full border border-lightred text-lightred relative flex flex-col items-center justify-center">
              <CheckCheck size={80} />
            </div>
            <h3>61 % des employés</h3>
            <h5>
              pensent que le bonheur au travail est plus important que le
              salaire.
            </h5>
          </div>

          <div className="flex flex-1 flex-col gap-5 items-center justify-between">
            <div className="h-40 w-40 rounded-full border border-lightred text-lightred relative flex flex-col items-center justify-center">
              <CheckCheck size={80} />
            </div>
            <h3>28 % des entreprises</h3>
            <h5>
              constatent une baisse des arrêts maladie et une réduction de 26 %
              des coûts de santé grâce à des programmes de bien-être.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investir;
