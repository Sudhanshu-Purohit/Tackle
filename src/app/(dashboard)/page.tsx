import { getCurrentUser } from "@/features/auth/get-current-user";
import { getWorkspaces } from "@/features/workspaces/get-workspaces";
import { redirect } from "next/navigation";

const Home = async () => {

  const user = await getCurrentUser();
  if (!user) redirect('/sign-in');

  const workspaces = await getWorkspaces();

  if (workspaces.total === 0) {
    redirect('/workspaces/create');
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
  
}

export default Home;
