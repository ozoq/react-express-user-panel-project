import { Center, Stack } from "@mantine/core";
import { useEffect } from "react";

import useSelection from "../../hooks/useSelection";
import useLoader from "../../hooks/useLoader";
import PanelHeader from "./PanelHeader";
import PanelActions from "./PanelActions";
import PanelUserTable from "./PanelUserTable";
import usePanelApi from "../../hooks/usePanelApi";

const PanelPage = () => {
  const { users, loadUsers } = usePanelApi();
  const { Loader, setLoaded } = useLoader();
  const {
    selected,
    CheckboxSelectOne,
    CheckboxSelectAll,
    ButtonInvertSelection,
  } = useSelection(users.map((user) => user.id));

  useEffect(() => {
    (async () => {
      await loadUsers();
      setLoaded(true);
    })();
  }, []);

  return (
    <>
      <PanelHeader />
      <Loader>
        <Center sx={{ flex: 1 }}>
          <Stack>
            <PanelActions
              selected={selected}
              components={{
                ButtonInvertSelection,
              }}
            />
            <PanelUserTable
              components={{
                CheckboxSelectOne,
                CheckboxSelectAll,
              }}
            />
          </Stack>
        </Center>
      </Loader>
    </>
  );
};

export default PanelPage;
