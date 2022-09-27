import { showNotification } from "@mantine/notifications";

function notifyOfError(title, message) {
  showNotification({
    title,
    message: message || "Unknown error",
    autoClose: 3 * 1000,
    color: "red",
  });
}

export { notifyOfError };
