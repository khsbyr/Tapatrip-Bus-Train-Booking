import React, { FC } from 'react';

interface Props {
  CommentList?: any;
}

const Comment: FC<Props> = ({ CommentList }) => {
  return (
    <>
      <h1
        className="font-bold text-2xl max-w-7xl mx-auto mt-12 px-6"
        style={{ color: '#0A3761' }}
      >
        Хэрэглэгчийн сэтгэгдэл
      </h1>
      <div className="px-2">
        <div className="grid grid-cols-1 gap-3 my-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 max-w-7xl mx-auto md:my-12">
          {CommentList.map(z => (
            <>
              <div className="bg-white h-auto rounded-lg p-3 shadow-lg ">
                <div className="md:text-center grid grid-cols-2 md:block">
                  <div className="flex justify-start items-center md:justify-center">
                    <img src={z.image} className="w-36 h-36 md:w-64 md:h-64" />
                  </div>

                  <div>
                    <h1
                      className="font-medium text-md md:text-md mt-3"
                      style={{ color: '#0A3761' }}
                    >
                      {z.name}
                    </h1>
                    <p
                      className="font-light text-sm md:text-md mt-3"
                      style={{ color: '#0A3761' }}
                    >
                      {z.comment}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
