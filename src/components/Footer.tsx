import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="w-full bg-white p-8  mt-4">
        <div className='container max-w-7xl grid-cols-1 mx-auto grid sm:grid-cols-5 gap-4 '>
        	<div className='col-span-4'>&copy; GetSpy.ru 2020 - 2023 Copyright</div>
            <a className="text-sm col-auto" href="#">
                Все права защищены
            </a>
      </div>
    </footer>
  );
};

export default Footer;
