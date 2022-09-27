import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { AuthApiProvider } from "./hooks/useAuthApi";
import { PanelApiProvider } from "./hooks/usePanelApi";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthApiProvider>
        <PanelApiProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </PanelApiProvider>
      </AuthApiProvider>
    </MantineProvider>
  </React.StrictMode>
);
