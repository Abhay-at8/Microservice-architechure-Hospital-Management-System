import { apiSlice } from './apiSlice';
const PATIENT_URL = '/api/patient';

export const patientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginPatient: builder.mutation({
      query: (data) => ({
        url: `${PATIENT_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutPatient: builder.mutation({
      query: () => ({
        url: `${PATIENT_URL}/logout`,
        method: 'POST',
      }),
    }),
    registerPatient: builder.mutation({
      query: (data) => ({
        url: `${PATIENT_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePatient: builder.mutation({
      query: (data) => ({
        url: `${PATIENT_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginPatientMutation,
  useLogoutPatientMutation,
  useRegisterPatientMutation,
  useUpdatePatientMutation
} = patientApiSlice;
