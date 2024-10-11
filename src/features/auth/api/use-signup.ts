import { client } from "@/lib/rpc"
import { useMutation } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"


// InferRequestType
const $post = client.api.auth["sign-up"].$post
type ReqType = InferRequestType<typeof $post>

// InferResponseType
type ResType = InferResponseType<typeof $post>


export const useSignUp = () => {
    const mutation = useMutation<ResType, Error, ReqType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.auth["sign-up"]["$post"]({ json })
            return await response.json()
        }
    })

    return mutation;
}