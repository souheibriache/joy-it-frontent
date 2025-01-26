import { Button } from "@/components/ui/button";
import { Check, Dot } from "lucide-react";
import { Plan, useGetAllPlans } from "@/utils/api/plan-api";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const navigate = useNavigate();
  const { data: plans, isLoading, error } = useGetAllPlans();

  if (isLoading) return <div>Loading plans...</div>;
  if (error) return <div>Error loading plans</div>;

  return (
    <div className="flex flex-col w-full h-[calc(100vh-100px)] items-center container mx-auto py-10 gap-10">
      <h1 className="text-4xl text-purple font-bold border-l-purple">
        prêt à commencer l’aventure avec Joy-it !
      </h1>
      <p className="text-lg font-semibold text-foreground">
        Choisissez l’abonnement qui correspond aux besoins de votre entreprise
        et commencez à transformer le bien-être de vos équipes.
      </p>

      <div className="flex flex-row gap-20 ">
        {plans?.map((plan: Plan, index: number) => {
          const isMiddle = index > 0 && index < plans.length - 1;

          return (
            <div
              key={plan.id}
              className={`flex flex-col gap-4 border-purple border-4 p-10 rounded-xl shadow-xl ${
                isMiddle ? "scale-110" : ""
              }`}
            >
              <p className="text-2xl text-purple font-bold">{plan.name}</p>
              <p className="text-4xl text-black font-bold">
                {plan.price}€ / mois
              </p>
              <p>
                Crédits inclus :{" "}
                <span className="font-semibold">
                  {plan.credit} crédits/mois
                </span>
              </p>

              <p className="font-semibold">Accès :</p>
              <ul className="flex flex-col gap-2 text-gray-500">
                {plan.activities.map((activity) => (
                  <li
                    key={activity.id}
                    className="flex flex-row gap-2 items-center"
                  >
                    <div className="border p-0.5 rounded-full border-gray-500">
                      <Check size={15} />
                    </div>
                    {activity.name}
                  </li>
                ))}
              </ul>

              <h1 className="font-semibold">Avantages :</h1>
              <ul className="flex flex-col gap-2">
                {plan.benifits.map((benefit, idx) => (
                  <li key={idx} className="flex flex-row gap-2">
                    <Dot /> {benefit}
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                onClick={() => navigate(`/plans/${plan.id}`)}
                className="border-purple border-2 text-purple hover:text-secondarypurple hover:border-secondarypurple"
              >
                Choisir
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;
