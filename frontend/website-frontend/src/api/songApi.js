import axiosInstance from "./axiosInstance";

const SONG_URL = "http://localhost:5002/songs/api";

export const getAllSongs = () => axiosInstance.get(`${SONG_URL}/get-all-song`);
export const getSongById = (id) => axiosInstance.get(`${SONG_URL}/get-song/${id}`);
export const getFeaturedSongs = () => axiosInstance.get(`${SONG_URL}/featured`);
export const getTrendingSongs = () => axiosInstance.get(`${SONG_URL}/trending`);
export const searchSongs = (q) => axiosInstance.get(`${SONG_URL}/search?q=${encodeURIComponent(q)}`);
export const incrementViews = (id) => axiosInstance.put(`${SONG_URL}/views/${id}`);
export const likeSong = (id, token) => axiosInstance.put(`${SONG_URL}/like/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });