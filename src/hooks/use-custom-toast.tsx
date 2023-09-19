import Link from 'next/link';
import { toast } from './use-toast';
import { buttonVariants } from '@/components/ui/Button';

export const useCustomToast = () => {
  const LoginToast = () => {
    const { dismiss } = toast({
      title: 'Войдите в систему',
      description:
        'Вы должны авторизоваться и получить доступ к редактированию',
      variant: 'destructive',
      action: (
        <Link
          href="/sign-in"
          onClick={() => dismiss()}
          className={buttonVariants({ variant: 'outline' })}
        >
          Войти
        </Link>
      ),
    });
  };

  return { LoginToast };
};
