import { Header } from "../_components/header";

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
    <div>
      <Header orgId={params.orgId} />
      {children}
    </div>
  );
}
