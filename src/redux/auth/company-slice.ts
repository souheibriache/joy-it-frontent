import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CompanyState = {
  currentCompany: {
    id: string;
    name: string;
    address: string;
    postalCode: string;
    city: string;
    phoneNumber: string;
    siretNumber: string;
    employeesNumber: number;
    logo: { fullUrl: string } | null;
    subscription: { id: string } | null;
    credit: number;
    isVerified: boolean;
  } | null;
  loading: boolean;
  error: boolean;
};

const initialState: CompanyState = {
  currentCompany: null,
  loading: false,
  error: false,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    fetchCompanyStart(state) {
      state.loading = true;
    },
    fetchCompanySuccess(state, action: PayloadAction<any>) {
      state.currentCompany = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchCompanyFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetCompany(state) {
      state.currentCompany = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  fetchCompanyStart,
  fetchCompanySuccess,
  fetchCompanyFailure,
  resetCompany,
} = companySlice.actions;

export default companySlice.reducer;
