import { getCurrentUser } from "@/features/auth/get-current-user";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

const WorkspaceCreatePage = async () => {

    const user = await getCurrentUser();
    if (!user) redirect('/sign-in');

    return (
        <div className="w-full lg:max-w-xl">
            <CreateWorkspaceForm />
        </div>
    )
}

export default WorkspaceCreatePage;
