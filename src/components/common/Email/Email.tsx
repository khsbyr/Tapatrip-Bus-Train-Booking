import { MailIcon, MenuIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';

const Email: FC = () => {
  return (
    <div className="bg-white" style={{ height: 'auto' }}>
      <div className="max-w-7xl mx-auto py-12 px-3 md:py-20 md:px-6">
        <h1
          className="text-center font-bold text-3xl"
          style={{ color: '#8AB1D5' }}
        >
          ДЭЛХИЙГ НЭЭЕ
        </h1>

        <h1
          className="text-center font-bold text-5xl mt-12"
          style={{ color: '#177AD6' }}
        >
          Онцгой хөнгөлөлт, урамшуулал шинчлэлийг <br /> имэйлээр авахыг хүсэж
          байна уу?
        </h1>

        <form className="max-w-7xl mx-auto" style={{ maxWidth: '800px' }}>
          <div className="flex flex-row items-center mt-16 rounded-2xl py-1 h-14 bg-bg ">
            <MailIcon className="w-8 h-8 ml-4" style={{ color: '#8AB1D5' }} />
            <input
              className="appearance-none bg-transparent w-full ml-2 py-1 px-2 placeholder-primary border-none"
              type="text"
              placeholder="И-Мэйл хаягаа оруулна уу"
              aria-label="Full name"
            />
           <button className="bg-button text-white font-bold py-2 px-4 rounded-2xl h-14 w-96">
              Бүртгэх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Email;
