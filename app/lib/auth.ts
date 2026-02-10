import { API_BASE_URL } from "./config";

export const logout = async () => {
  const token = localStorage.getItem("token");
  alert(token);

  if (!token) return;

  await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Clear client data
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
