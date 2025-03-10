import { resetAuth, signInSuccess } from "../redux/auth/auth-slice";
import { store } from "../redux/store";
import { resetUser } from "../redux/auth/user-slice";
import { API_BASE_URL } from "./constants";
import { resetCompany } from "@/redux/auth/company-slice";
import { toast } from "sonner";

export const fetchWithAuth = async (
  url: string,
  options: any = { headers: {} }
) => {
  const { accessToken, refreshToken } = store.getState().auth;
  const dispatch = store.dispatch;
  const headers: any = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] =
      options && options?.headers
        ? options?.headers["Content-Type"]
        : "application/json";
  }

  let fetchOptions = { ...options, headers };

  let response = await fetch(API_BASE_URL + url, fetchOptions);

  if (response.status === 401) {
    try {
      const refreshResponse = await refreshAccessToken(refreshToken || "");
      dispatch(
        signInSuccess({
          accessToken: refreshResponse.access_token,
          refreshToken: refreshResponse.refresh_token || refreshToken,
        })
      );

      if (refreshResponse.error || refreshResponse.statusCode === 422) {
        throw new Error("Session expirée. Veuillez vous reconnecter.");
      }

      fetchOptions.headers.Authorization = `Bearer ${refreshResponse.access_token}`;
      response = await fetch(API_BASE_URL + url, fetchOptions);
    } catch (error: any) {
      dispatch(resetAuth());
      dispatch(resetUser());
      dispatch(resetCompany());
      toast.error(error?.message);
      //window.location.href = "/sign-in";
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erreur ${response.status}`);
  }

  return response.json();
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const res = await fetch(API_BASE_URL + "/accounts/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    const jsonData = await res.json();
    return jsonData;
  } catch (err) {
    console.log(err);
  }
};

export default fetchWithAuth;
