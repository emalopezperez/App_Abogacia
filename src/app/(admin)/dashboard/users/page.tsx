import { getUserById, getUsers } from "@/lib/actions/user.actions";

export default async function Page() {
  const users = await getUsers();

  console.log(users);
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}
