import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session || session.user.role !== 'company') {
    redirect('/auth/signin');
  }

  return <div>{children}</div>;
}
