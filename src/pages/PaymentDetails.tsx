"use client";

import type React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetCheckoutSession } from "@/utils/api/plan-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useFetchCompany } from "@/utils/api/company-api";
import { useDispatch } from "react-redux";
import { fetchCompanySuccess } from "@/redux/auth/company-slice";
import { useEffect } from "react";

const PaymentDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { fetchCompany } = useFetchCompany();
  const dispatch = useDispatch();

  const sessionId = searchParams.get("session_id");
  const { session, isLoading, error } = useGetCheckoutSession(sessionId || "");

  useEffect(() => {
    if (session && !isLoading && !error) {
      fetchCompany().then((companyData: any) => {
        if (companyData) {
          dispatch(fetchCompanySuccess(companyData));
        }
      });
    }
  }, [error, session, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-medium">
            Chargement des détails du paiement...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-2xl">
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-red-50 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-600">
              Échec du paiement
            </CardTitle>
            <CardDescription className="text-red-700">{error}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-6 pb-8">
            <Button
              className="bg-primary hover:bg-primary/90 text-white px-6"
              onClick={() => navigate("/plans")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux plans
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto py-10 px-4 max-w-2xl"
    >
      <Card className="border-none shadow-lg overflow-hidden">
        <CardHeader className="bg-green-50 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Paiement réussi !
          </CardTitle>
          <CardDescription className="text-green-700">
            Merci pour votre paiement.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-slate-800">
              Détails du paiement
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Plan :</span>
                <span className="font-medium">
                  {session?.metadata?.orderId || "N/A"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-slate-600">Montant payé :</span>
                <span className="font-medium">
                  {session ? (session.amount_total / 100).toFixed(2) : "0.00"} €
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-slate-600">Client :</span>
                <span className="font-medium">
                  {session?.customer_details?.email || "N/A"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-slate-600">Début d'abonnement :</span>
                <span className="font-medium">
                  {session?.expires_at
                    ? new Date(session.expires_at * 1000).toLocaleDateString(
                        "fr-FR"
                      )
                    : new Date().toLocaleDateString("fr-FR")}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-slate-600">Fin d'abonnement :</span>
                <span className="font-medium">
                  {session?.expires_at
                    ? new Date(
                        (session?.expires_at + 60 * 60 * 24 * 30 * 3) * 1000
                      ).toLocaleDateString("fr-FR")
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-8">
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-6"
            onClick={() => navigate("/activities")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux activités
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PaymentDetails;
