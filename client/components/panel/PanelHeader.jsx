import { Avatar, Button, Group, Text } from "@mantine/core";
import useAuthApi from "../../hooks/useAuthApi";

const PanelHeader = () => {
  const { logout, user } = useAuthApi();
  return (
    <Group position="apart" p="md">
      <Group>
        <Avatar variant="filled" radius="lg" color="dark">
          {user.email.charAt(0)}
        </Avatar>
        <Text>{user.email}</Text>
      </Group>
      <Button onClick={logout} variant="default">
        Log out
      </Button>
    </Group>
  );
};
export default PanelHeader;
