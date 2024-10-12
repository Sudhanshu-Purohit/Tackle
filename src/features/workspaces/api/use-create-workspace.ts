import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"


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
            queryClient.invalidateQueries({ queryKey: ['workspaces'] })
        }
    })

    return mutation;
}