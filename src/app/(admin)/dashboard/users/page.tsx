import { getUsers } from "@/app/actions/user.actions";
import { TableUsers } from "@/components/dashboard/users/table-users";

export default async function Page() {
  const users = await getUsers();
  return (
    <div>
      <h2 className="text-2xl mb-4 font-bold">Usuarios</h2>
      <TableUsers users={users} />
    </div>
  );
}
