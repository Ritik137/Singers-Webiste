import axiosInstance from "./axiosInstance";
import axios from "axios";

const AUTH_URL = "http://localhost:5001/auth/api";

export const sendOTP = (data) => axiosInstance.post(`${AUTH_URL}/send-otp`, data);
export const verifyOTP = (data) => axiosInstance.post(`${AUTH_URL}/verify-otp`, data);
export const login = (data) => axiosInstance.post(`${AUTH_URL}/login`, data);
export const forgotPassword = (data) => axiosInstance.post(`${AUTH_URL}/forgot-password`, data);
export const resetPassword = (data) => axiosInstance.post(`${AUTH_URL}/reset-password`, data);
export const getProfile = () => axiosInstance.get(`${AUTH_URL}/profile`);
export const updateProfile = (data) => axiosInstance.put(`${AUTH_URL}/profile`, data);
export const changePassword = (data) => axiosInstance.put(`${AUTH_URL}/change-password`, data);
export const logout = () => axiosInstance.post(`${AUTH_URL}/logout`);
export const deleteAccount = () => axiosInstance.delete(`${AUTH_URL}/delete-account`);

// For multipart uploads we use axios directly to be explicit about headers override:
export const uploadProfilePicture = (formData) =>
  axios.put(`${AUTH_URL}/upload-profile-picture`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });