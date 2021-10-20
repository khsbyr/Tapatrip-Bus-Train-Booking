import React, { FC } from 'react';

interface Props {
  GridList?: any;
}

const Grid: FC<Props> = ({ GridList }) => {
  return (
    <div className="px-2">
      <div className="grid grid-cols-1 gap-3 my-6 md:grid-cols-3 md:gap-8 max-w-7xl mx-auto md:my-12">
        {GridList.map(z => (
          <>
            <div className="bg-white h-auto rounded-lg flex p-3 shadow-lg items-center">
              <img src={z.image} className="w-32 h-28" />
              <div className="ml-5">
                <h1 className="text-selected font-bold text-sm md:text-md">
                  {z.title}
                </h1>
                <p className="text-sm" style={{ color: '#0A3761' }}>
                  {z.body}
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Grid;
