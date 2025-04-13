import { useQuery } from "react-query";
import fetchWithAuth from "@/utils/fetchWrapper"; // Ensure this points to your wrapper for authenticated requests
import { toast } from "sonner";

export interface Faq {
  id: string;
  question: string;
  answer: string;
}
export const useGetFaq = () => {
  const getFaqRequest = async () => {
    return await fetchWithAuth("/faq", { method: "GET" });
  };

  const { data: faq, isLoading, error } = useQuery(["faq"], getFaqRequest);

  if (error) {
    toast.error("Echéc de recuperation des faq");
  }

  return { faq, isLoading };
};
