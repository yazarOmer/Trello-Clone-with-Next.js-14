import { auth, signOut } from "@/auth";
import { getOrganizations } from "@/data/organization";
import { SelectOrganization } from "./_components/select-organization";

export default async function OrganizationPage() {
  const session = await auth();
  const organizations = await getOrganizations(session?.user?.id as string);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-6xl font-bold text-zinc-900">
          Hello {session?.user?.name}
        </h1>
        <h3 className="text-lg font-normal text-zinc-600">
          Please select an organization to continue
        </h3>
        <SelectOrganization organizations={organizations} />
      </div>
    </div>
  );
}
