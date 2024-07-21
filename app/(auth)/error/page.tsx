import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div>
      <Card className="w-[250px] shadow-sm text-center">
        <CardHeader>
          <p>Something went wrong...</p>
        </CardHeader>
        <CardFooter>
          <Button asChild variant="destructive" className="w-full">
            <Link href="/login">Back to login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
