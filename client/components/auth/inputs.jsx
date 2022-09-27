import { PasswordInput, TextInput } from "@mantine/core";
import { IconAt, IconLock, IconUser } from "@tabler/icons";

export const Name = ({ form }) => (
  <TextInput
    withAsterisk
    icon={<IconUser size={16} />}
    label="Name"
    placeholder="John Doe"
    {...form.getInputProps("name")}
  />
);

export const Email = ({ form }) => (
  <TextInput
    withAsterisk
    icon={<IconAt size={16} />}
    label="Email"
    placeholder="your@mail.com"
    {...form.getInputProps("email")}
  />
);

export const Password = ({ form }) => (
  <PasswordInput
    withAsterisk
    icon={<IconLock size={16} />}
    label="Password"
    placeholder="password123"
    mt="md"
    {...form.getInputProps("password")}
  />
);
