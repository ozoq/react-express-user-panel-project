import { Button, Paper, Center, Stack } from "@mantine/core";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthPage() {
  const [isRegistration, setIsRegistration] = useState(false);

  const toggleRegistration = () => setIsRegistration(!isRegistration);

  return (
    <Center sx={{ flex: 1 }}>
      <Stack sx={{ width: 400 }}>
        <Paper p="md" withBorder>
          {isRegistration ? <RegisterForm /> : <LoginForm />}
        </Paper>
        <Button variant="default" onClick={toggleRegistration}>
          {isRegistration ? "Already a user?" : "Don't have an account?"}
        </Button>
      </Stack>
    </Center>
  );
}

export default AuthPage;
