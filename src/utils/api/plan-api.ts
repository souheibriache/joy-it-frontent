import { useMutation, useQuery } from "react-query";
import fetchWithAuth from "@/utils/fetchWrapper"; // Ensure this points to your wrapper for authenticated requests
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Activity {
  id: string;
  name: string;
  description: string;
  images: {
    fullUrl: string;
    isMain: boolean;
  }[];
}

const getPricing = async (params: any) => {
  const response = await fetchWithAuth("/pricing/calculate", {
    method: "POST",
    body: JSON.stringify(params),
  });
  return response;
};

export const useCalculatePricing = (params: any) => {
  return useQuery({
    queryKey: ["pricing", params],
    queryFn: () => getPricing(params),
    enabled: !!params,
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData: any) => {
      const response = await fetchWithAuth("/service-order", {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      return response;
    },
  });
};

const fetchOrderDetails = async (orderId: string) => {
  const response = await fetchWithAuth(`/service-order/${orderId}`);
  console.log({ response });
  if (!response) {
    throw new Error(
      "Erreur lors de la récupération des détails de la commande"
    );
  }
  return response;
};

export const useOrderDetails = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => {
      if (!orderId) throw new Error("ID de commande manquant");
      return fetchOrderDetails(orderId);
    },
    enabled: !!orderId,
    onError: () => {
      toast.error("Impossible de récupérer les détails de la commande.");
    },
  });
};

export const useCreateCheckoutSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (orderId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchWithAuth(
        `/service-order/${orderId}/checkout`,
        {
          method: "POST",
        }
      );
      return response;
    } catch (err: any) {
      setError(
        err.message || "An error occurred while creating the checkout session."
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createCheckoutSession, isLoading, error };
};

export const useGetCheckoutSession = (sessionId: string) => {
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        setError("Session ID is required");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetchWithAuth(
          `/service-order/checkout/${sessionId}`
        );
        setSession(response);
      } catch (err: any) {
        setError(err.message || "Failed to fetch session details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  return { session, isLoading, error };
};
