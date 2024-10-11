import { client } from "@/lib/rpc"
import { useMutation } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"


// InferRequestType
const $post = client.api.auth["sign-in"].$post
type ReqType = InferRequestType<typeof $post>

// InferResponseType
type ResType = InferResponseType<typeof $post>


export const useSignIn = () => {
    const mutation = useMutation<ResType, Error, ReqType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.auth["sign-in"]["$post"]({ json })
            return await response.json()
        }
    })

    return mutation;
}