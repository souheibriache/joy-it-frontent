import InvestImage from "../../assets/invest.png";
type Props = {};

const Investment = ({}: Props) => {
  return (
    <div className=" container mx-auto flex flex-row gap-32 items-center">
      <div className="w-1/2">
        <img src={InvestImage} alt="" className="h-full w-full" />
      </div>
      <div className="flex flex-col w-2/3 gap-10">
        <h1 className="text-4xl uppercase font-bold font-bolota text-primary">
          Pourquoi investir dans le bien-être en entreprise ?
        </h1>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold uppercase">
            84 % des salariés
          </h2>
          <p className="text-lg">
            Considèrent que la reconnaissance dans leur travail est essentielle
            à leur bien-être.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold uppercase">
            61 % des employés
          </h2>
          <p className="text-lg">
            Pensent que le bonheur au travail est plus important que le salaire.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold uppercase">
            28 % des entreprises
          </h2>
          <p className="text-lg">
            Constatent une baisse des arrêts maladie et une réduction de 26 %
            des coûts de santé grâce à des programmes de bien-être.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Investment;
