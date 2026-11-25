import { Button } from "@base-ui/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-59">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Ultimate Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="email" placeholder="m@example.com" />
          <Input type="passward" placeholder="Passward" />
          <Button className="w-full">Sign In</Button>
        </CardContent>
      </Card>
    </div>
  );
}
