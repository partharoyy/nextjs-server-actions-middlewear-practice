import { getUsersAction } from '@/actions';
import Logout from '@/components/logout';
import { redirect } from 'next/navigation';

export default async function Home() {
  const getUser = await getUsersAction();

  if (!getUser?.success) redirect('/sign-in');

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1>Home page</h1>
      <h2>Username: {getUser?.data?.userName}</h2>
      <h2>Email: {getUser?.data?.email}</h2>
      <Logout />
    </main>
  );
}
