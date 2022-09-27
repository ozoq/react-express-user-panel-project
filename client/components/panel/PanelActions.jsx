import { Button, Group } from "@mantine/core";
import {
  IconArrowsExchange,
  IconLock,
  IconLockOpen,
  IconTrash,
} from "@tabler/icons";
import usePanelApi from "../../hooks/usePanelApi";

const PanelActions = ({ selected, components: { ButtonInvertSelection } }) => {
  const { blockUsers, unblockUsers, deleteUsers } = usePanelApi();

  return (
    <Group position="apart">
      <ButtonInvertSelection
        variant="default"
        leftIcon={<IconArrowsExchange size={16} />}
      >
        Invert Selection
      </ButtonInvertSelection>
      <Group position="right">
        <Button
          rightIcon={<IconLock size={14} />}
          onClick={() => blockUsers(selected)}
          variant="default"
        >
          Block
        </Button>
        <Button
          rightIcon={<IconLockOpen size={14} />}
          onClick={() => unblockUsers(selected)}
          variant="default"
        >
          Activate
        </Button>
        <Button
          rightIcon={<IconTrash size={14} />}
          onClick={() => deleteUsers(selected)}
          variant="default"
        >
          Delete
        </Button>
      </Group>
    </Group>
  );
};

export default PanelActions;
