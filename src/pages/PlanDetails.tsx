import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useCreateCheckoutSession,
  useOrderDetails,
} from "@/utils/api/plan-api";
import { toast } from "sonner";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { data: order } = useOrderDetails(orderId);
  const { createCheckoutSession, isLoading: createCheckoutSessionIsLoading } =
    useCreateCheckoutSession();

  useEffect(() => {
    console.log({ order });
  }, [order]);

  const handleConfirmPayment = async () => {
    try {
      const session = await createCheckoutSession(orderId as string);
      if (session.url) {
        window.location.href = session.url; // Redirect to Stripe checkout
      }
    } catch (error) {
      toast.error("Erreur lors de la création de la session de paiement.");
    }
  };

  if (!order) {
    return <p>Chargement des détails de la commande...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Détails de la commande</h1>
      <p>
        <strong>ID:</strong> {order.id}
      </p>
      <p>
        <strong>Participants:</strong> {order.participants}
      </p>
      <p>
        <strong>Durée:</strong> {order.duration} mois
      </p>
      <p>
        <strong>Coût total:</strong> {order.totalCost} €
      </p>

      <h2 className="text-xl font-semibold mt-4">Services inclus</h2>
      <ul>
        {order?.details?.map((detail: any) => (
          <li key={detail.id}>
            <strong>{detail.serviceType}</strong> - {detail.frequency} fois par
            mois
          </li>
        ))}
      </ul>

      <Button
        className="mt-4 bg-primary text-white font-bold"
        onClick={handleConfirmPayment}
        disabled={createCheckoutSessionIsLoading}
      >
        Confirmer le paiement
      </Button>
    </div>
  );
};

export default OrderDetails;
