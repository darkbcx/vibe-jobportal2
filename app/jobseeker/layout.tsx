import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session || session.user.role !== 'jobseeker') {
    redirect('/auth/signin');
  }

  return <div>{children}</div>;
}
