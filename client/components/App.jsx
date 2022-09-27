import { AppShell } from "@mantine/core";
import { useEffect } from "react";
import useAuthApi from "../hooks/useAuthApi";
import useLoader from "../hooks/useLoader";
import AuthPage from "./auth/AuthPage";
import PanelPage from "./panel/PanelPage";

const AppStyle = (theme) => ({
  main: {
    backgroundColor: theme.colors.gray[0],
    display: "flex",
    flexDirection: "column",
  },
});

function App() {
  const { user, refresh } = useAuthApi();
  const { Loader, setLoaded } = useLoader();

  useEffect(() => {
    (async () => {
      await refresh();
      setLoaded(true);
    })();
  }, []);

  return (
    <AppShell styles={AppStyle}>
      <Loader>{user ? <PanelPage /> : <AuthPage />}</Loader>
    </AppShell>
  );
}

export default App;
