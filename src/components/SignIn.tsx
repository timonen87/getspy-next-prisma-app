import { Icons } from '@/components/Icons';
import Link from 'next/link';
import UserAuthForm from './UserAuthForm';

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Добро пожаловать на GetSpy.ru
        </h1>
      </div>
      <UserAuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        В первые на сайте?{' '}
        <Link
          href="/sign-up"
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Зарегистрируйся
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
