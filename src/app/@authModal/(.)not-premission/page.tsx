import CloseModal from '@/components/CloseModal';

import { FC } from 'react';

const page: FC = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>
          <div className="mx-auto p-4">
            <h1>У Вас недостаточно прав для данного действия</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
