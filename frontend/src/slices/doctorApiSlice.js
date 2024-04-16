import { apiSlice } from './apiSlice';
const DOCTOR_URL = '/api/doctor';

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginDoctor: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutDoctor: builder.mutation({
      query: () => ({
        url: `${DOCTOR_URL}/logout`,
        method: 'POST',
      }),
    }),
    registerDoctor: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateDoctor: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    makeAvailableDoctor: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/available`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginDoctorMutation,
  useLogoutDoctorMutation,
  useRegisterDoctorMutation,
  useUpdateDoctorMutation,
  useMakeAvailableDoctorMutation,
} = doctorApiSlice;
