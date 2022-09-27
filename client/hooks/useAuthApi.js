import { useState } from "react";
import { notifyOfError } from "../utils/notify";
import post from "../utils/post";
import assignContextToApi from "../utils/assignContextToApi";

const authApi = assignContextToApi(() => {
  const [user, setUser] = useState(null);

  async function login({ email = "", password = "" }) {
    const { status, message } = await post("api/auth/login", {
      email,
      password,
    });
    if (status === "failure") {
      return notifyOfError("Authentication failed", message);
    }
    refresh();
  }

  async function register({ name = "", email = "", password = "" }) {
    const { status, message } = await post("api/auth/register", {
      name,
      email,
      password,
    });
    if (status === "failure") {
      return notifyOfError("Registration failed", message);
    }
    refresh();
  }

  async function logout() {
    await post("api/auth/logout");
    refresh();
  }

  async function refresh() {
    const { data } = await post("api/auth/status");
    setUser(data.user ? data.user : null);
  }

  return {
    user,
    login,
    register,
    logout,
    refresh,
  };
});

export const AuthApiProvider = authApi.ApiProvider;
export default authApi.useApi;
