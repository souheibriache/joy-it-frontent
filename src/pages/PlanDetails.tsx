"use client";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useCreateCheckoutSession,
  useOrderDetails,
} from "@/utils/api/plan-api";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Clock,
  CreditCard,
  Loader,
  Package,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { data: order, isLoading } = useOrderDetails(orderId);
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

  if (isLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-medium">
            Chargement des détails de la commande...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto p-6 text-center min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Commande introuvable
        </h1>
        <p className="text-lg mb-6">
          Nous n'avons pas pu trouver les détails de cette commande.
        </p>
        <Button
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={() => window.history.back()}
        >
          Retour
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto p-6 max-w-3xl py-16"
    >
      <Card className="border-none shadow-lg overflow-hidden">
        <CardHeader className="bg-slate-50">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Détails de la commande
              </CardTitle>
              <CardDescription>
                Vérifiez les détails avant de procéder au paiement
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="text-primary border-primary px-3 py-1 text-sm self-start sm:self-auto"
            >
              Commande #{order.id}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center">
              <Users className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm text-slate-500">Participants</p>
              <p className="text-xl font-bold">{order.participants}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center">
              <Clock className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm text-slate-500">Durée</p>
              <p className="text-xl font-bold">{order.duration} mois</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center">
              <CreditCard className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm text-slate-500">Coût total</p>
              <p className="text-xl font-bold">{order.totalCost} €</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Services inclus
            </h2>
            <div className="bg-slate-50 rounded-lg p-4">
              <ul className="divide-y">
                {order.details?.map((detail: any) => (
                  <li
                    key={detail.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-primary" />
                      <span className="font-medium">{detail.serviceType}</span>
                    </div>
                    <Badge variant="secondary">
                      {detail.frequency} fois par mois
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-2 pb-8">
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
            onClick={handleConfirmPayment}
            disabled={createCheckoutSessionIsLoading}
          >
            {createCheckoutSessionIsLoading ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Traitement...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Confirmer le paiement
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default OrderDetails;
