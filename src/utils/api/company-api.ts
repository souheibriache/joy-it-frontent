import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store"; // Adjust the path to your store
import {
  fetchCompanyFailure,
  fetchCompanyStart,
  fetchCompanySuccess,
} from "@/redux/auth/company-slice";
import fetchWithAuth from "../fetchWrapper";

export const useFetchCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentCompany, loading } = useSelector(
    (state: RootState) => state.company
  );
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!accessToken) {
        return;
      }

      if (!currentCompany) {
        dispatch(fetchCompanyStart());
        try {
          const data = await fetchWithAuth("/companies/my-company", {
            method: "GET",
          });

          if (data) {
            dispatch(fetchCompanySuccess(data));
            if (!data.subscription) {
              navigate("/plans");
            } else {
              navigate("/");
            }
          } else {
            navigate("/create-company");
          }
        } catch (error) {
          dispatch(fetchCompanyFailure(error));
          navigate("/create-company");
        }
      } else if (currentCompany && !currentCompany.subscription) {
        //navigate("/plans");
      }
    };

    fetchCompany();
  }, [accessToken, currentCompany, dispatch, navigate]);

  return { currentCompany, loading };
};

export type CreateCompanyData = {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  siretNumber: string;
  employeesNumber: number;
  logo?: File; // Optional logo file
};

export const useCreateCompany = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const createCompany = async (formData: FormData): Promise<void> => {
    return await fetchWithAuth(`/companies`, {
      method: "POST",
      body: formData,
    });
  };

  return useMutation(createCompany, {
    onSuccess: async () => {
      try {
        // Fetch the newly created company
        const data = await fetchWithAuth("/companies/my-company", {
          method: "GET",
        });

        if (data) {
          dispatch(fetchCompanySuccess(data));
          toast.success("Entreprise créée et chargée avec succès !");
        }
      } catch (error) {
        toast.error(
          "L'entreprise a été créée, mais nous n'avons pas pu la charger."
        );
      }

      queryClient.invalidateQueries("currentCompany");
    },
    onError: (error: any) => {
      toast.error(error.message || "Échec de la création de l'entreprise.");
    },
  });
};
