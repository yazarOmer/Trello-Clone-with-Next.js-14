import { auth, signOut } from "@/auth";

export default async function OrganizationPage() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button>sign out</button>
      </form>
    </div>
  );
}
