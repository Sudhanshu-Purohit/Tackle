import { DottedSeperator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const SignInCard = () => {
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">
          Welcome back!
        </CardTitle>
      </CardHeader>
      <div className="px-7 ">
        <DottedSeperator />
      </div>
      <CardContent className="p-7">
        <form className="space-y-4">
          <Input
            required
            type="email"
            placeholder="Enter email address"
            value={""}
            onChange={() => { }}
            disabled={false}
          />
          <Input
            required
            type="password"
            placeholder="Enter password"
            value={""}
            onChange={() => { }}
            disabled={false}
            min={5}
            max={10}
          />
          <Button disabled={false} size="lg" className="w-full">
            Login
          </Button>
        </form>
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
          Login with Google
        </Button>
        <Button
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>
    </Card>
  )
}

