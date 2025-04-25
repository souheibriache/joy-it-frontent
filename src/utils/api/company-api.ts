"use client";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  fetchCompanyFailure,
  fetchCompanyStart,
  fetchCompanySuccess,
} from "@/redux/auth/company-slice";
import fetchWithAuth from "../fetchWrapper";
import type { UpdateCompanyDto } from "@/types/company";

export const useFetchCompany = () => {
  const dispatch = useDispatch();

  const fetchCompany = async () => {
    dispatch(fetchCompanyStart());
    try {
      const data = await fetchWithAuth("/companies/my-company", {
        method: "GET",
      });
      console.log({ data });
      dispatch(fetchCompanySuccess(data));
      return data;
    } catch (error: any) {
      dispatch(
        fetchCompanyFailure(error.message || "Failed to fetch company data")
      );
      return null;
    }
  };

  // Use enabled: false to prevent automatic query execution
  const { data: company, refetch } = useQuery("myCompany", fetchCompany, {
    retry: false,
    onError: () => {
      // Handle error silently - we're already dispatching the error in fetchCompany
    },
  });

  return { company, refetch, fetchCompany };
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

      queryClient.invalidateQueries("myCompany");
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
      toast.success("Informations de l'entreprise mises à jour avec succès.");
      return res;
    } catch (err) {
      setError(err);
      toast.error("Échec de la mise à jour des informations de l'entreprise.");
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
