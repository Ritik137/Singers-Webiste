import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getProfile, deleteAccount, uploadProfilePicture } from "../api/authApi";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const getToken = () => localStorage.getItem("token");

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const response = await getProfile(token);
      setUser(response.data);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.msg || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("profilePic", file);
      await uploadProfilePicture(formData, token);
      await fetchProfile();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.msg || "Failed to upload image");
    } finally {
      setUploading(false);
      // reset the file input so same file can be re-selected if needed
      e.target.value = "";
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      const token = getToken();
      await deleteAccount(token);
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.msg || "Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="min-h-screen flex justify-center items-start py-12 px-4">
        <section className="w-full max-w-3xl bg-zinc-900 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h1 className="text-3xl sm:text-4xl text-white font-bold mb-6 text-center">
            My Profile
          </h1>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <svg
                className="animate-spin h-10 w-10 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-6">{error}</div>
          ) : (
            user && (
              <>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  {/* Profile image + upload */}
                  <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
                    <div className="relative">
                      <img
                        src={
                          user.profilePic ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt={`${user?.name || "User"} profile picture`}
                        className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-yellow-400"
                      />

                      {/* Small uploading indicator */}
                      {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                          <svg
                            className="animate-spin h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                        </div>
                      )}
                    </div>

                    <label
                      htmlFor="profilePic"
                      className="mt-4 cursor-pointer text-sm text-white bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 border border-zinc-700"
                    >
                      Change Photo
                    </label>
                    <input
                      id="profilePic"
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="sr-only"
                      aria-label="Upload profile picture"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="text-white">
                        <p className="text-sm text-zinc-400">Name</p>
                        <p className="text-lg font-medium">{user.name}</p>
                      </div>

                      <div className="text-white">
                        <p className="text-sm text-zinc-400">Email</p>
                        <p className="text-lg font-medium break-words">{user.email}</p>
                      </div>

                      <div className="text-white">
                        <p className="text-sm text-zinc-400">Phone</p>
                        <p className="text-lg font-medium">{user.phone || "—"}</p>
                      </div>

                      <div className="text-white">
                        <p className="text-sm text-zinc-400">Role</p>
                        <p className="text-lg font-medium">{user.role}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button
                        onClick={() => navigate("/edit-profile")}
                        className="w-full sm:w-auto bg-yellow-400 text-black px-5 py-2 rounded-lg font-medium hover:brightness-95"
                        aria-label="Edit profile"
                      >
                        Edit Profile
                      </button>

                      <button
                        onClick={() => navigate("/change-password")}
                        className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2 rounded-lg font-medium hover:brightness-95"
                        aria-label="Change password"
                      >
                        Change Password
                      </button>

                      <button
                        onClick={handleDelete}
                        className="w-full sm:w-auto bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:brightness-95"
                        aria-label="Delete account"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;