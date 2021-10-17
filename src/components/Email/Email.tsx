import React, { FC } from 'react';

const Email: FC = () => {
  return (
    <div className="bg-white " style={{ height: '28rem' }}>
      <div className="max-w-7xl mx-auto py-12 px-3 md:py-20 md:px-6">
        <h1
          className="text-center font-bold text-2xl"
          style={{ color: '#8AB1D5' }}
        >
          ДЭЛХИЙГ НЭЭЕ
        </h1>

        <h1
          className="text-center font-bold text-3xl mt-12"
          style={{ color: '#177AD6' }}
        >
          Онцгой хөнгөлөлт, урамшуулал шинчлэлийг <br /> имэйлээр авахыг хүсэж
          байна уу?
        </h1>
      </div>
    </div>
  );
};

export default Email;
