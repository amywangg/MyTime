import redaxios from "redaxios";

const API = process.env.MYTIME_BACKEND_URL;

export async function login(params: {
  email: string;
  password: string;
}): Promise<User> {
  const response = await redaxios.post(`${API}/login`, { session: params });

  return response.data.data;
}

export async function logout() {
  const response = await redaxios.delete("/api/sessions");

  return response.data.data;
}
