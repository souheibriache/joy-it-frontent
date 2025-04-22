import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store"; // Adjust the path to your store
import {
  fetchCompanyFailure,
  fetchCompanyStart,
  fetchCompanySuccess,
} from "@/redux/auth/company-slice";
import fetchWithAuth from "../fetchWrapper";
import { UpdateCompanyDto } from "@/types/company";

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
            navigate("/");
          }
        } catch (error) {
          dispatch(fetchCompanyFailure(error));
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

export const useUpdateCompany = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const updateCompany = async (data: UpdateCompanyDto) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchWithAuth("/companies", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Informations de l’entreprise mises à jour avec succès.");
      return res;
    } catch (err) {
      setError(err);
      toast.error("Échec de la mise à jour des informations de l’entreprise.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCompany, loading, error };
};

export const useUpdateCompanyLogo = () => {
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState<any>(null);

  const updateLogo = async (file: File) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("logo", file);

    try {
      const res = await fetchWithAuth("/companies/logo", {
        method: "PUT",
        body: formData,
      });
      toast.success("Logo changé avec succée");
      return res;
    } catch (err) {
      setError(err);
      toast.error("Erreur durant le changement du logo");
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { updateLogo, uploading, error };
};
