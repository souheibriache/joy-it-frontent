"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee, Loader, Sparkles, Users } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { useCalculatePricing, useCreateOrder } from "@/utils/api/plan-api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Order = () => {
  const [employeesNumber, setEmployeesNumber] = useState<number>(5);
  const [snacking, setSnacking] = useState<boolean>(false);
  const [wellBeing, setWellBeing] = useState<boolean>(false);
  const [teamBuilding] = useState<boolean>(false);
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

  const { mutate: createOrder, isLoading: isLoadingCreateOrder } =
    useCreateOrder();

  const handleSubmit = () => {
    const orderData = {
      participants: employeesNumber,
      duration: 3,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-6xl"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 inline-block border-l-4 border-primary pl-4">
          Prêt à commencer l'aventure avec Joy-it !
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Remplissez les champs suivants pour afficher le montant de votre
          abonnement en temps réel et procéder au paiement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column - Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-md border-none">
            <CardContent className="pt-6">
              <form className="space-y-8">
                {/* Employees number */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="employees"
                      className="text-lg font-semibold text-primary flex items-center"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Nombre d'employés*
                    </Label>
                    <Badge variant="outline" className="text-lg font-semibold">
                      {employeesNumber}
                    </Badge>
                  </div>

                  <div className="px-2">
                    <Slider
                      id="employees"
                      max={100}
                      min={0}
                      step={1}
                      value={[employeesNumber]}
                      onValueChange={(e) => {
                        setEmployeesNumber(e[0]);
                      }}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">
                    Services souhaités*
                  </h3>

                  {/* Snacking option */}
                  <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="snacking"
                        checked={snacking}
                        onCheckedChange={(checked) =>
                          setSnacking(checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor="snacking"
                          className="font-medium text-base flex items-center"
                        >
                          <Coffee className="mr-2 h-4 w-4 text-primary" />
                          Snack
                        </Label>
                        <p className="text-sm text-gray-500">
                          Fruits secs, fruits de saison, box de viennoiserie...
                        </p>
                      </div>
                    </div>

                    {snacking && (
                      <div className="pl-7 space-y-2 pt-2 border-t border-dashed border-gray-200">
                        <Label
                          htmlFor="snackFreq"
                          className="text-sm font-medium text-primary"
                        >
                          Fréquence des activités Snack (par mois)
                        </Label>
                        <div className="flex items-center space-x-4">
                          <Slider
                            id="snackFreq"
                            max={4}
                            min={0}
                            step={1}
                            value={[snackingFrequency]}
                            onValueChange={(e) => {
                              setSnackingFrequency(e[0]);
                            }}
                            className="flex-1"
                          />
                          <Badge
                            variant="secondary"
                            className="text-base font-semibold min-w-[2rem] text-center"
                          >
                            {snackingFrequency}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Well-being option */}
                  <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="wellBeing"
                        checked={wellBeing}
                        onCheckedChange={(checked) =>
                          setWellBeing(checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor="wellBeing"
                          className="font-medium text-base flex items-center"
                        >
                          <Sparkles className="mr-2 h-4 w-4 text-primary" />
                          Bien-être
                        </Label>
                        <p className="text-sm text-gray-500">
                          Yoga, gestion du stress, massage, atelier DIY...
                        </p>
                      </div>
                    </div>

                    {wellBeing && (
                      <div className="pl-7 space-y-2 pt-2 border-t border-dashed border-gray-200">
                        <Label
                          htmlFor="wellBeingFreq"
                          className="text-sm font-medium text-primary"
                        >
                          Fréquence des activités Bien-être (par mois)
                        </Label>
                        <div className="flex items-center space-x-4">
                          <Slider
                            id="wellBeingFreq"
                            max={4}
                            min={0}
                            step={1}
                            value={[wellBeingFrequency]}
                            onValueChange={(e) => {
                              setWellBeingFrequency(e[0]);
                            }}
                            className="flex-1"
                          />
                          <Badge
                            variant="secondary"
                            className="text-base font-semibold min-w-[2rem] text-center"
                          >
                            {wellBeingFrequency}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Team building note */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-blue-800 text-sm">
                      Pour programmer des activités de team building, veuillez{" "}
                      <Link
                        className="font-semibold text-primary underline"
                        to="/contact-us"
                      >
                        nous contacter
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <p className="text-sm text-red-500">*Champ obligatoire</p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Pricing */}
        <div>
          <div className="sticky top-8 space-y-6">
            <Card className="shadow-lg border-none overflow-hidden">
              <div className="bg-primary/10 p-4 text-center">
                <h2 className="text-xl font-bold text-primary">
                  Récapitulatif
                </h2>
              </div>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nombre d'employés:</span>
                    <Badge variant="outline" className="font-semibold">
                      {employeesNumber}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Durée d'engagement:</span>
                    <Badge variant="outline" className="font-semibold">
                      3 mois
                    </Badge>
                  </div>

                  {snacking && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Snacking:</span>
                      <Badge variant="outline" className="font-semibold">
                        {snackingFrequency}x / mois
                      </Badge>
                    </div>
                  )}

                  {wellBeing && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bien-être:</span>
                      <Badge variant="outline" className="font-semibold">
                        {wellBeingFrequency}x / mois
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="h-px bg-gray-200 my-4" />

                <div className="bg-slate-50 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-4">Montant total</h3>
                  {isLoading ? (
                    <div className="flex justify-center">
                      <Loader className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : error ? (
                    <p className="text-red-500">Erreur lors du calcul</p>
                  ) : (
                    <div className="text-4xl font-bold text-primary">
                      {pricing || 0} € HT
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Avec engagement de 3 mois
                  </p>
                </div>

                <Button
                  className="w-full text-white group"
                  onClick={handleSubmit}
                  disabled={isLoadingCreateOrder || isLoading}
                >
                  {isLoadingCreateOrder ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      Continuer
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Order;
