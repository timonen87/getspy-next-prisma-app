import { redirect } from 'next/navigation';
import { authOptions, getAuthSession } from '@/lib/auth';
import { UserNameForm } from '@/components/UserNameForm';

export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
};

export default async function SettingsPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <div className="container flex items-center h-full max-2-3xl mx-auto md:w-[700px]">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold ml-4">Профиль</h1>
        </div>
        <hr className="bg-zinc-500 h-px" />

        <UserNameForm
          user={{
            id: session.user.id,
            username: session.user.username || '',
            email: session.user.email || '',
            image: session.user.image || '',
            role: session.user.role || '',
          }}
        />
      </div>
    </div>
  );
}
