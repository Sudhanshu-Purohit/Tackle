import { DottedSeperator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useSignUp } from "../api/use-signup";
import { signUpSchema } from "../schemas";

export const SignUpCard = () => {

    const { mutate } = useSignUp();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof signUpSchema>) => {
        mutate({ json: values });
    }

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Start Your Journey
                </CardTitle>
                <CardDescription>
                    Register now to enhance your workflow! Manage projects effortlessly and keep your team aligned and productive.
                </CardDescription>
            </CardHeader>
            <div className="px-7 ">
                <DottedSeperator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter email address"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter your password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={false} size="lg" className="w-full">
                            Signup
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7 ">
                <DottedSeperator />
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    disabled={false}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FcGoogle className="mr-2 size-5" />
                    Signup with Google
                </Button>
                <Button
                    disabled={false}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FaGithub className="mr-2 size-5" />
                    Signup with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeperator />
            </div>
            <CardContent className="p-7 text-sm flex items-center justify-center">
                <p>
                    Already have an account?
                    <Link href="/sign-in">
                        <span className="text-blue-700"> Sign in</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}

