import { useState } from "react";
import { notifyOfError } from "../utils/notify";
import post from "../utils/post";
import assignContextToApi from "../utils/assignContextToApi";
import useAuthApi from "./useAuthApi";

const panelApi = assignContextToApi(() => {
  const [users, setUsers] = useState([]);
  const { refresh } = useAuthApi();

  async function authorizedPost(url, data) {
    const res = await post(url, data);

    if (res.status === "failure") {
      notifyOfError("Apparently, you are not logged in", res.message);
      refresh(); // Don't await
      return null;
    }

    return res;
  }

  async function loadUsers() {
    const res = await authorizedPost("/api/panel/loadUsers");
    setUsers(res?.data.users ?? []);
  }

  async function deleteUsers(ids) {
    await authorizedPost("/api/panel/deleteUsers", {
      ids,
    });
    loadUsers();
  }

  async function blockUsers(ids) {
    await authorizedPost("/api/panel/blockUsers", {
      ids,
    });
    loadUsers();
  }

  async function unblockUsers(ids) {
    await authorizedPost("/api/panel/unblockUsers", {
      ids,
    });
    loadUsers();
  }

  return {
    users,
    loadUsers,
    deleteUsers,
    blockUsers,
    unblockUsers,
  };
});

export const PanelApiProvider = panelApi.ApiProvider;
export default panelApi.useApi;
