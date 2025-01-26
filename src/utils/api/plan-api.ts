import { useQuery } from "react-query";
import fetchWithAuth from "@/utils/fetchWrapper"; // Ensure this points to your wrapper for authenticated requests
import { useEffect, useState } from "react";

export interface Plan {
  id: string;
  name: string;
  credit: number;
  price: number;
  benifits: string[];
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  images: {
    fullUrl: string;
    isMain: boolean;
  }[];
}

export const useGetAllPlans = () => {
  return useQuery<Plan[]>("plans", async () => {
    const response = await fetchWithAuth("/plans", {
      method: "GET",
    });

    if (!response) {
      throw new Error("Failed to fetch plans");
    }

    return response;
  });
};

export const useGetPlanById = (planId: string) => {
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await fetchWithAuth(`/plans/${planId}`);
        setPlan(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the plan.");
      } finally {
        setIsLoading(false);
      }
    };

    if (planId) fetchPlan();
  }, [planId]);

  return { plan, isLoading, error };
};

export const useCreateCheckoutSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (planId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchWithAuth(`/subscription/checkout`, {
        method: "POST",
        body: JSON.stringify({ planId }),
      });
      console.log({ response });
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
          `/subscription/checkout/${sessionId}`
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
