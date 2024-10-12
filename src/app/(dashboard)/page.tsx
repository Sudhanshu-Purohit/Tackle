import { getCurrentUser } from "@/features/auth/get-current-user";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

const Home = async () => {

  const user = await getCurrentUser();
  if(!user) redirect('/sign-in');

  return (
    <div className="bg-red-600 p-4 h-full">
      <CreateWorkspaceForm />
    </div>
  )
}

export default Home;
