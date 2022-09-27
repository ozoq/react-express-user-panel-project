import { Center, Loader as MantineLoader } from "@mantine/core";
import { useState } from "react";

function useLoader() {
  const [loaded, setLoaded] = useState(false);

  const Loader = ({ children }) => {
    if (!loaded) {
      return (
        <Center sx={{ flex: 1 }}>
          <MantineLoader size="xl" variant="dots" />
        </Center>
      );
    }
    return children;
  };

  return {
    Loader,
    setLoaded: async () => {
      // Let the animation play a bit, so the app doesn't feel "jumpy"
      await new Promise((res) => setTimeout(res, 500));
      setLoaded(true);
    },
  };
}

export default useLoader;
