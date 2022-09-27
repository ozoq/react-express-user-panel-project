import { Paper, ScrollArea, Table } from "@mantine/core";
import usePanelApi from "../../hooks/usePanelApi";
import moment from "moment";

function PanelUserTable({
  components: { CheckboxSelectAll, CheckboxSelectOne },
}) {
  const { users } = usePanelApi();

  return (
    <Paper p="lg" withBorder>
      <ScrollArea style={{ maxWidth: "80vw" }}>
        <Table horizontalSpacing="xl" verticalSpacing="sm">
          <thead>
            <tr>
              <th>
                <CheckboxSelectAll />
              </th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Last seen</th>
              <th>Created</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <CheckboxSelectOne candidat={user.id} />
                </td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{moment(user.seenAt).fromNow()}</td>
                <td>{moment(user.createdAt).fromNow()}</td>
                <td>{user.isBlocked ? "Blocked" : "Active"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}

export default PanelUserTable;
