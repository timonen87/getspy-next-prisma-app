import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="w-full bg-white p-8 mt-2">
        <div className='container mx-auto'>
      2023 Copyright:
      <a className="text-neutral-800 dark:text-neutral-400" href="/">
        GetSpy.ru — A constructive and inclusive social network for software
        developers. With you every step of your journey.
      </a>
      </div>
    </footer>
  );
};

export default Footer;
