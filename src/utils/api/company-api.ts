import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store"; // Adjust the path to your store
import {
  fetchCompanyFailure,
  fetchCompanyStart,
  fetchCompanySuccess,
} from "@/redux/auth/company-slice";

export const useFetchCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentCompany, loading } = useSelector(
    (state: RootState) => state.company
  );
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!currentCompany && accessToken) {
        dispatch(fetchCompanyStart());
        try {
          const response = await fetch("/api/v1/companies/my-company", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch company");
          }

          const data = await response.json();
          if (data) {
            dispatch(fetchCompanySuccess(data));
            navigate("/"); // Redirect to home if company exists
          } else {
            navigate("/create-company"); // Redirect to create company if none exists
          }
        } catch (error) {
          dispatch(fetchCompanyFailure(error));
          navigate("/create-company"); // Redirect to create company on error
        }
      }
    };

    fetchCompany();
  }, [currentCompany, accessToken, dispatch, navigate]);

  return { currentCompany, loading };
};
