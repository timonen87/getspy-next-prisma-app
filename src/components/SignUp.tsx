import { Icons } from "@/components/Icons";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-12 w-24" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Добро пожаловать на GetSpy.ru
        </h1>
        {/* <p className="text-sm max-w-xs mx-auto">на GetSpy.ru</p> */}
      </div>
      <UserAuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        У Вас есть аккаунт? Вы можете{" "}
        <Link
          href="/sign-in"
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Войти
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
