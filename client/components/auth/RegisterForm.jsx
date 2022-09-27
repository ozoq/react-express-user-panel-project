import { Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import useAuthApi from "../../hooks/useAuthApi";
import * as inputs from "./inputs";
import RandomizeForm from "./RandomizeForm";

function RegisterForm() {
  const { register } = useAuthApi();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Text align="center" weight={700}>
        Register
      </Text>
      <form onSubmit={form.onSubmit(register)}>
        <inputs.Name form={form} />
        <inputs.Email form={form} />
        <inputs.Password form={form} />
        <Button fullWidth type="submit" mt="md">
          Create
        </Button>
      </form>
      <RandomizeForm form={form} />
    </>
  );
}

export default RegisterForm;
