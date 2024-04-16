import { apiSlice } from './apiSlice';
const PHARMACY_URL = '/api/pharmacy';

export const pharmacyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginPharmacy: builder.mutation({
      query: (data) => ({
        url: `${PHARMACY_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutPharmacy: builder.mutation({
      query: () => ({
        url: `${PHARMACY_URL}/logout`,
        method: 'POST',
      }),
    }),
    registerPharmacy: builder.mutation({
      query: (data) => ({
        url: `${PHARMACY_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePharmacy: builder.mutation({
      query: (data) => ({
        url: `${PHARMACY_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    makeAvailablePharmacy: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/available`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginPharmacyMutation,
  useLogoutPharmacyMutation,
  useRegisterPharmacyMutation,
  useUpdatePharmacyMutation,
  useMakeAvailablePharmacyMutation,
} = pharmacyApiSlice;
