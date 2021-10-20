import React, { FC } from 'react';

const Application: FC = () => {
  return (
    <div className="bg-white " style={{ height: '36rem' }}>
      <div className="max-w-7xl mx-auto py-12 px-3 md:py-20 md:px-6">
        <div className="md:grid grid-cols-2">
          <div>
            <h1 className="font-bold text-2xl" style={{ color: '#0A3761' }}>
              Аяллын цогц шийдэл
            </h1>
            <p className="font-light text-md mt-6" style={{ color: '#0A3761' }}>
              Тапатрип аппликейшн нь аяллын бүх төрлийн үйлчилгээг нэг дороос
              хэзээ ч, хаанаас ч гар утаснаасаа захиалах боломжийг олгож байна.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="flex">
                <img src="/assets/cashback.png" />
                <p
                  className="flex items-center font-light text-md ml-6"
                  style={{ color: '#0A3761' }}
                >
                  2% Буцаан олголт
                </p>
              </div>

              <div className="flex">
                <img src="/assets/Airline logo.png" />
                <p
                  className="flex items-center font-light text-md ml-6"
                  style={{ color: '#0A3761' }}
                >
                  900 авиа компани
                </p>
              </div>

              <div className="flex">
                <img src="/assets/Path 5361.png" />
                <p
                  className="flex items-center font-light text-md ml-6"
                  style={{ color: '#0A3761' }}
                >
                  Олон улсын 1 сая зочид буудал
                </p>
              </div>

              <div className="flex">
                <img src="/assets/24-hours.png" />
                <p
                  className="flex items-center font-light text-md ml-6"
                  style={{ color: '#0A3761' }}
                >
                  24/7 онлайн үйлчилгээ
                </p>
              </div>
            </div>
            <div className="flex mt-10 flex-wrap">
              <img src="/assets/App store.png" className="h-12 mr-7" />
              <img src="/assets/Google play.png" className="h-12 mr-7" />
              <img src="/assets/App gallery.png" className="h-12" />
            </div>
          </div>
          <div className="hidden md:block">
            <img src="/assets/App download image.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
