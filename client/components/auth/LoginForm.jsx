import { Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import useAuthApi from "../../hooks/useAuthApi";
import * as inputs from "./inputs";

function LoginForm() {
  const { login } = useAuthApi();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Text align="center" weight={700}>
        Sign in to Panel
      </Text>
      <form onSubmit={form.onSubmit(login)}>
        <inputs.Email form={form} />
        <inputs.Password form={form} />
        <Button fullWidth type="submit" mt="md">
          Sign in
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
