import { AppDispatch } from "@/redux/store";
import { LoginUserRequest } from "@/types/login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";
import { useMutation } from "react-query";
import { signInSuccess } from "@/redux/auth/auth-slice";
import { toast } from "sonner";
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
} from "@/redux/auth/user-slice";
import fetchWithAuth from "../fetchWrapper";

export const useLoginUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loginUser = async (loginUserData: LoginUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/accounts/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUserData),
    });

    if (!response.ok) {
      throw new Error("Échec de la connexion");
    }

    return response.json();
  };

  const {
    error,
    mutateAsync: loginUserRequest,
    isLoading,
    reset,
  } = useMutation(loginUser, {
    onSuccess: async (data) => {
      if (data.access_token && data.refresh_token) {
        dispatch(
          signInSuccess({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          })
        );
        toast.success("Connecté avec succès");
        await dispatch(fetchCurrentUser());
        navigate("/home");
      } else {
        toast.error("Identifiants invalides. Veuillez réessayer.");
        reset();
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Échec de la connexion.");
      reset();
    },
  });

  return { loginUserRequest, isLoading, error };
};

export const fetchCurrentUser = () => async (dispatch: AppDispatch) => {
  dispatch(fetchUserStart());
  try {
    const user = await fetchWithAuth("/accounts/profile", {
      method: "GET",
    });
    dispatch(fetchUserSuccess(user));
  } catch (error) {
    dispatch(fetchUserFailure(error));
    console.log({ error });
    toast.error("Échec de la récupération de l'utilisateur");
  }
};

export type SignupRequest = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const useSignupUser = () => {
  const signupUser = async (signupData: SignupRequest) => {
    const response = await fetch(`${API_BASE_URL}/accounts/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Unable to sign up user");
    }

    return response.json();
  };

  const { mutateAsync: signupUserRequest, isLoading } = useMutation(
    signupUser,
    {
      onSuccess: () => {
        toast.success("Account created successfully! Please log in.");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to sign up. Please try again.");
      },
    }
  );

  return { signupUserRequest, isLoading };
};

export const useVerifyAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const verifyAccount = async ({
    verificationToken,
  }: {
    verificationToken: string;
  }): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/accounts/verify-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verificationToken }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Verification failed");
    }

    const { access_token, refresh_token } = await response.json();

    dispatch(
      signInSuccess({
        accessToken: access_token,
        refreshToken: refresh_token,
      })
    );
  };

  return useMutation(verifyAccount, {
    onSuccess: () => {
      toast.success("Account verified successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to verify account");
    },
  });
};

type ResendVerificationEmailRequest = {
  email: string;
};

export const useResendVerificationEmail = () => {
  const resendVerificationEmail = async ({
    email,
  }: ResendVerificationEmailRequest): Promise<void> => {
    const response = await fetch(
      `${API_BASE_URL}/accounts/resend-verification-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          "Erreur lors de l'envoi de l'e-mail de vérification"
      );
    }
  };

  return useMutation(resendVerificationEmail, {
    onSuccess: () => {
      toast.success("Veuillez vérifier votre e-mail.");
    },
    onError: (error: any) => {
      toast.error(
        error.message || "Échec de l'envoi de l'e-mail de vérification."
      );
    },
  });
};

type RequestResetPasswordData = {
  login: string;
};

export const useRequestResetPassword = () => {
  const requestResetPassword = async ({
    login,
  }: RequestResetPasswordData): Promise<void> => {
    const response = await fetch(
      `${API_BASE_URL}/accounts/request-reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          "Échec de la demande de réinitialisation du mot de passe"
      );
    }
  };

  return useMutation(requestResetPassword, {
    onSuccess: () => {
      toast.success(
        "Un e-mail de réinitialisation de mot de passe a été envoyé."
      );
    },
    onError: (error: any) => {
      toast.error(
        error.message || "Échec de l'envoi de la demande de réinitialisation."
      );
    },
  });
};

type ResetPasswordData = {
  token: string;
  password: string;
};

export const useResetPassword = () => {
  const resetPassword = async ({
    token,
    password,
  }: ResetPasswordData): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/accounts/reset-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          "Erreur lors de la réinitialisation du mot de passe"
      );
    }
  };

  return useMutation(resetPassword, {
    onSuccess: () => {
      toast.success("Votre mot de passe a été réinitialisé avec succès !");
    },
    onError: (error: any) => {
      toast.error(
        error.message || "Échec de la réinitialisation du mot de passe."
      );
    },
  });
};
