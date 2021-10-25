import { MailIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';

const App: FC = () => {
  return (
    <div className="px-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 py-10 gap-2">
        <div className="bg-white h-auto flex items-center justify-center rounded-lg shadow-md py-10">
          <div className="flex">
            <div className="flex items-center">
              <img src="/assets/Application.png" />
            </div>
            <div className="max-w-sm ml-10 space-y-4">
              <h1 className="text-cardDate font-semibold">
                Тапатрип аппликэйшн татах
              </h1>
              <p className="text-cardDate font-thin">
                Нислэг, зочид буудал, аялал, автобус, галт тэрэгний тасалбарыг
                нэг дороос захиалах боломжтой.
              </p>
              <div className="flex flex-wrap">
                <img src="/assets/App store.png" className="h-10 " />
                <img src="/assets/Google play.png" className="h-10 " />
                <img src="/assets/App gallery.png" className="h-10" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white h-auto flex items-center justify-center rounded-lg shadow-md py-10">
          <div className="flex items-center">
            <div className="flex items-center">
              <img src="/assets/mail.png" className="h-auto" />
            </div>
            <div className="space-y-7">
              <h1 className="text-cardDate font-semibold">
                Онцгой хөнгөлөлт, урамшуулал, шинчлэлийг имэйлээр авахыг хүсэж
                байна уу?
              </h1>
              <div className="flex flex-wrap gap-1">
                <div className="flex flex-row items-center rounded-2xl h-12 bg-bg ">
                  <MailIcon
                    className="w-8 h-8 ml-4"
                    style={{ color: '#8AB1D5' }}
                  />
                  <input
                    className="appearance-none bg-transparent w-full ml-2 py-1 px-2 placeholder-primary border-none focus:outline-none"
                    type="text"
                    placeholder="И-Мэйл хаягаа оруулна уу"
                    aria-label="Full name"
                  />
                </div>{' '}
                <div>
                  <button className="bg-bg text-direction py-2 px-4 rounded-2xl h-12 w-32">
                    Бүртгэх
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
