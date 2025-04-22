import InvestImage from "../../assets/invest.png";

type Props = {};

const StatItem = ({
  percentage,
  description,
}: {
  percentage: string;
  description: string;
}) => (
  <div className="flex flex-col gap-2">
    <h2 className="text-xl md:text-2xl font-semibold uppercase">
      {percentage}
    </h2>
    <p className="text-base md:text-lg">{description}</p>
  </div>
);

const Investment = ({}: Props) => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-32 items-center px-4">
      <div className="w-full md:w-1/2">
        <img
          src={InvestImage || "/placeholder.svg"}
          alt="Investment illustration"
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2 lg:w-2/3 gap-6 md:gap-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold font-bolota text-primary text-center md:text-left">
          Pourquoi investir dans le bien-être en entreprise ?
        </h1>

        <StatItem
          percentage="84 % des salariés"
          description="Considèrent que la reconnaissance dans leur travail est essentielle à leur bien-être."
        />

        <StatItem
          percentage="61 % des employés"
          description="Pensent que le bonheur au travail est plus important que le salaire."
        />

        <StatItem
          percentage="28 % des entreprises"
          description="Constatent une baisse des arrêts maladie et une réduction de 26 % des coûts de santé grâce à des programmes de bien-être."
        />
      </div>
    </div>
  );
};

export default Investment;
