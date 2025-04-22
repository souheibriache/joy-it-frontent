import { useMutation } from "react-query";
import { API_BASE_URL } from "../constants";
import { toast } from "sonner";
import fetchWithAuth from "../fetchWrapper";

type SubmitNewsletter = {
  email: string;
};

export type SupportVisitorPayload = {
  question: string;
  subject: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export const useSubmitNewsletter = () => {
  const submitNewsletter = async (newsletterData: SubmitNewsletter) => {
    const response = await fetch(`${API_BASE_URL}/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newsletterData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Impossible de vous inscrire.");
    }

    return response.json();
  };

  const { mutateAsync: submitNewsletterRequest, isLoading } = useMutation(
    submitNewsletter,
    {
      onSuccess: () => {
        toast.success("Merci pour votre inscription à la newsletter !");
      },
      onError: (error: any) => {
        toast.error(
          error.message ||
            "Échec de l’inscription à la newsletter. Veuillez réessayer."
        );
      },
    }
  );

  return { submitNewsletterRequest, isLoading };
};

export const useSubmitSupportVisitor = () => {
  const submit = async (payload: SupportVisitorPayload) => {
    const form = new FormData();
    form.append("question", payload.question);
    form.append("subject", payload.subject);
    form.append("email", payload.email);
    form.append("firstName", payload.firstName);
    form.append("lastName", payload.lastName);
    form.append("phoneNumber", payload.phoneNumber);

    const res = await fetch(`${API_BASE_URL}/support`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Impossible d’envoyer votre message.");
    }
    return res.json();
  };

  return useMutation(submit, {
    onSuccess: () => {
      toast.success(
        "Votre message a bien été envoyé ! Nous vous répondrons sous peu."
      );
    },
    onError: (err: any) => {
      toast.error(err.message || "Échec de l’envoi. Veuillez réessayer.");
    },
  });
};

export type SupportUserPayload = Omit<
  SupportVisitorPayload,
  "email" | "firstName" | "lastName" | "phoneNumber"
>;

export const useSubmitSupportUser = () => {
  const submit = async (payload: SupportUserPayload) => {
    const form = new FormData();
    form.append("question", payload.question);
    form.append("subject", payload.subject);

    // fetchWithAuth should internally add the Authorization header
    const res = await fetchWithAuth(`${API_BASE_URL}/support/user`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Impossible d’envoyer votre message.");
    }
    return res.json();
  };

  return useMutation(submit, {
    onSuccess: () => {
      toast.success(
        "Votre message a bien été envoyé ! Merci de votre confiance."
      );
    },
    onError: (err: any) => {
      toast.error(err.message || "Échec de l’envoi. Veuillez réessayer.");
    },
  });
};
