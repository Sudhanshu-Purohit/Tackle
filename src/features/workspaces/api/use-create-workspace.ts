import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"


// InferRequestType
const $post = client.api.workspaces.$post
type ReqType = InferRequestType<typeof $post>

// InferResponseType
type ResType = InferResponseType<typeof $post>


export const useCreateWorkspace = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation<ResType, Error, ReqType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.workspaces.$post({ json })
            return await response.json()
        },
        onSuccess: () => {
            toast.success('Workspace created successfully! 🎉');
            queryClient.invalidateQueries({ queryKey: ['workspaces'] })
        },
        onError: (error) => {
            toast.error('Oops! There was an issue creating your workspace. 😟');
        }
    })

    return mutation;
}