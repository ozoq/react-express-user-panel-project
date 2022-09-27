import { Button } from "@mantine/core";
import { IconArrowsShuffle } from "@tabler/icons";
import { Chance } from "chance";

const chance = new Chance();

const RandomizeForm = ({ form }) => (
  <Button
    fullWidth
    leftIcon={<IconArrowsShuffle size={16} />}
    variant="default"
    mt="sm"
    onClick={() =>
      form.setValues({
        name: chance.name(),
        email: chance.email(),
        password: 123,
      })
    }
  >
    Fill random data
  </Button>
);

export default RandomizeForm;
