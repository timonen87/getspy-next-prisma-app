import { buttonVariants } from '@/components/ui/Button';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

interface useCustomToastsProps {
  loginToast: () => void;
}

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Войдите в систему',
      description: 'Вы должны авторизоваться на сайте',
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

  return { loginToast };
};
