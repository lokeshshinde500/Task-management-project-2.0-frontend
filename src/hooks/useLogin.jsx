import axios from "axios";

export default async function useLogin(data) {
  const response = await axios.post(
    "https://task-management-2-0.onrender.com/api/auth/login",
    data
  );
  return response;
}
