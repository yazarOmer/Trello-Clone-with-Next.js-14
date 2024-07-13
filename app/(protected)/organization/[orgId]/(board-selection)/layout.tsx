import { Header } from "../_components/header";
import { Sidebar } from "../_components/sidebar";

export default function OrgIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    orgId: string;
  };
}) {
  return (
    <main className="h-[calc(100vh-64px)]">
      <Header orgId={params.orgId} />
      <div className="h-full flex">
        <Sidebar orgId={params.orgId} />
        <div className="w-full h-full">{children}</div>
      </div>
    </main>
  );
}
