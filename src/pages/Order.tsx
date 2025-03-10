import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Dot, Loader } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { useCalculatePricing, useCreateOrder } from "@/utils/api/plan-api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Order = () => {
  const [employeesNumber, setEmployeesNumber] = useState<number>(5);
  const [snacking, setSnacking] = useState<boolean>(false);
  const [wellBeing, setWellBeing] = useState<boolean>(false);
  const [teamBuilding, setTeamBuilding] = useState<boolean>(false);
  const [snackingFrequency, setSnackingFrequency] = useState<number>(1);
  const [wellBeingFrequency, setWellBeingFrequency] = useState<number>(1);
  const navigate = useNavigate();
  const pricingParams = {
    numberOfParticipants: employeesNumber,
    months: 3, // Assuming a fixed commitment period
    snacking,
    snackingFrequency,
    wellBeing,
    wellBeingFrequency,
    teambuilding: false, // You mentioned contacting for team building
  };

  const {
    data: pricing,
    isLoading,
    error,
  } = useCalculatePricing(pricingParams);

  useEffect(() => {
    console.log({ pricing });
  }, [pricing]);

  const {
    mutate: createOrder,
    isLoading: isLoadingCreateOrder,
    error: errorCreateOrder,
  } = useCreateOrder();

  const handleSubmit = () => {
    const orderData = {
      participants: employeesNumber,
      duration: 3, // Assuming a 3-month engagement
      details: [
        ...(snacking
          ? [{ serviceType: "NOURRITURE", frequency: snackingFrequency }]
          : []),
        ...(wellBeing
          ? [{ serviceType: "BIEN_ETRE", frequency: wellBeingFrequency }]
          : []),
        ...(teamBuilding
          ? [{ serviceType: "TEAM_BUILDING", frequency: 1 }]
          : []),
      ],
    };

    createOrder(orderData, {
      onSuccess: (data: any) => {
        console.log("Order Created:", data);
        navigate(`/order/${data.id}`);
      },
      onError: (err) => {
        console.error("Failed to create order:", err);
        toast.error(
          "Une erreur est survenue lors de la création de la commande. Veuillez réessayer."
        );
      },
    });
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-100px)] items-center container mx-auto py-10 gap-10">
      <h1 className="text-4xl text-purple font-bold border-l-purple">
        Prêt à commencer l’aventure avec Joy-it !
      </h1>
      <p className="text-lg font-semibold text-foreground">
        Remplissez les champs suivants pour afficher le montant de votre
        abonnement en temps réel et procéder au paiement.
      </p>

      <div className="flex flex-row gap-16 items-center justify-center">
        <form className="flex flex-col gap-10" action="">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-semibold text-xl text-purple">
              Nombres d’employés*
            </label>

            <div className="flex flex-row gap-2 items-baseline">
              <Slider
                max={100}
                min={0}
                step={1}
                value={[employeesNumber]}
                onValueChange={(e) => {
                  setEmployeesNumber(e[0]);
                }}
              />
              <span className="text-xl font-semibold">{employeesNumber}</span>
            </div>
          </div>

          <h3 className="font-semibold text-xl text-purple">
            Services souhaités*
          </h3>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-2">
                <input
                  className="accent-purple w-4 h-4"
                  type="checkbox"
                  name="snacking"
                  checked={snacking}
                  onChange={(e) => setSnacking(e.target.checked)}
                />
                <label htmlFor="snacking" className="font-semibold ">
                  Snack (fruit sec, fruit de saisons, Box de viennoiserie...){" "}
                </label>
              </div>

              {snacking && (
                <div className="flex flex-col gap-0.5">
                  <label htmlFor="" className="font-semibold  text-purple">
                    Fréquence des activités Snack (Par mois)
                  </label>

                  <div className="flex flex-row gap-2 items-baseline">
                    <Slider
                      max={4}
                      min={0}
                      step={1}
                      value={[snackingFrequency]}
                      onValueChange={(e) => {
                        setSnackingFrequency(e[0]);
                      }}
                    />
                    <span className="text-lg font-semibold">
                      {snackingFrequency}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-2">
                <input
                  className="accent-purple w-4 h-4"
                  type="checkbox"
                  name="well_being"
                  checked={wellBeing}
                  onChange={(e) => setWellBeing(e.target.checked)}
                />
                <label htmlFor="well_being" className="font-semibold ">
                  Bien-être (Yoga, Gestion du stress, Massage, Atelier DIY...){" "}
                </label>
              </div>
              {wellBeing && (
                <div className="flex flex-col gap-0.5">
                  <label htmlFor="" className="font-semibold  text-purple">
                    Fréquence des activités Bien-être (Par mois)
                  </label>
                  <div className="flex flex-row gap-2 items-baseline">
                    <Slider
                      max={4}
                      min={0}
                      step={1}
                      value={[wellBeingFrequency]}
                      onValueChange={(e) => {
                        setWellBeingFrequency(e[0]);
                      }}
                    />
                    <span className="text-xl font-semibold">
                      {wellBeingFrequency}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="team_building" className="">
                  Pour programmer des activités de team building, veuillez{" "}
                  <Link
                    className="font-semibold text-purple underline"
                    to="/contact-us"
                  >
                    {" "}
                    nous contacter.
                  </Link>
                </label>
              </div>
            </div>
          </div>

          <p className="font-semibold text-red-500">*Champ obligatoire</p>
        </form>

        <div className="flex items-center justify-start h-full flex-col gap-5 ">
          <div className="flex flex-col p-24 border-4 border-purple rounded-[15px] items-center text-center gap-5 self-start">
            <h1 className="font-bold text-2xl">Montant total</h1>

            {isLoading ? (
              <Loader color="purple" />
            ) : error ? (
              <p className="text-red-500">Erreur lors du calcul</p>
            ) : (
              <h1 className="font-bold text-4xl">{pricing || 0} € HT</h1>
            )}

            <div className="bg-black h-[2px] w-full" />

            <p>Avec engagement de 3 mois</p>
          </div>

          <Button
            variant="outline"
            className="w-fit border-purple text-purple font-bold group"
            onClick={handleSubmit}
            disabled={isLoadingCreateOrder}
          >
            {isLoading ? "Chargement..." : "Suivant"}
            <ArrowRight className="group-hover:translate-x-2 duration-150" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
