import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCreateCheckoutSession, useGetPlanById } from "@/utils/api/plan-api";
import { toast } from "sonner";

const DetailsDuPlan: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const { plan, isLoading, error } = useGetPlanById(planId || "");
  const {
    createCheckoutSession,
    isLoading: isCheckoutLoading,
    error: checkoutError,
  } = useCreateCheckoutSession();

  const [codePromo, setCodePromo] = useState<string>("");
  const [remise, setRemise] = useState<number>(0);
  const [tvaRate] = useState<number>(20); // Exemple de taux de TVA (20%)
  const [erreurPromo, setErreurPromo] = useState<string | null>(null);

  const appliquerCodePromo = () => {
    if (codePromo === "DISCOUNT10") {
      setRemise(10);
      setErreurPromo(null);
    } else {
      setErreurPromo("Code promo invalide.");
      setRemise(0);
    }
  };

  const calculerTotal = () => {
    const prixApresRemise = plan.price - (plan.price * remise) / 100;
    const tva = (prixApresRemise * tvaRate) / 100;
    return prixApresRemise + tva;
  };

  const gererPaiement = async () => {
    if (!planId) return;

    try {
      const { url } = await createCheckoutSession(planId);
      if (!url) {
        toast.error("Vous avez déjà un abonnement actif pour ce plan.");
        return;
      }

      window.location.href = url;
    } catch (err) {
      console.error(err);
      toast.error(
        "Une erreur s'est produite lors du traitement de votre abonnement. Veuillez réessayer."
      );
    }
  };

  if (isLoading) return <div>Chargement des détails du plan...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!plan) return <div>Plan introuvable.</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{plan.name}</h1>
      <p className="text-lg mb-4">Prix : €{plan.price}</p>
      <p className="text-lg mb-4">Crédits : {plan.credit}</p>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Avantages :</h2>
        <ul className="list-disc pl-6">
          {plan.benifits.map((benefit: string, index: number) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Activités :</h2>
        <ul className="list-disc pl-6">
          {plan.activities.map((activity: any) => (
            <li key={activity.id}>{activity.name}</li>
          ))}
        </ul>
      </div>

      <div className="border p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Détails de paiement</h2>
        <div className="mb-4">
          <label className="block font-semibold">Prix de base :</label>
          <p>€{plan.price}</p>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Remise :</label>
          <p>{remise}%</p>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">TVA ({tvaRate}%) :</label>
          <p>€{((plan.price - (plan.price * remise) / 100) * tvaRate) / 100}</p>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Total :</label>
          <p>€{calculerTotal()}</p>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Code promo :</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={codePromo}
              onChange={(e) => setCodePromo(e.target.value)}
              className="border rounded px-4 py-2 w-full"
              placeholder="Entrez le code promo"
            />
            <Button onClick={appliquerCodePromo}>Appliquer</Button>
          </div>
          {erreurPromo && (
            <p className="text-red-500 text-sm mt-2">{erreurPromo}</p>
          )}
        </div>
        <Button
          className="bg-purple text-white px-6 py-2 rounded-md"
          onClick={gererPaiement}
          disabled={isCheckoutLoading}
        >
          {isCheckoutLoading
            ? "Traitement en cours..."
            : "Procéder au paiement"}
        </Button>
        {checkoutError && (
          <p className="text-red-500 text-sm mt-4">{checkoutError}</p>
        )}
      </div>
    </div>
  );
};

export default DetailsDuPlan;
