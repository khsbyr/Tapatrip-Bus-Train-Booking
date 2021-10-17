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
      <div className="grid grid-cols-1 gap-3 my-6 md:grid-cols-3 md:gap-8 max-w-7xl mx-auto md:my-12">
        {CommentList.map(z => (
          <>
            <div className="bg-white h-96 rounded-lg  p-3 shadow-lg ">
              <div className="text-center">
                <div className="flex justify-center">
                  <img src={z.image} />
                </div>

                <h1
                  className="font-light text-md mt-3"
                  style={{ color: '#0A3761' }}
                >
                  {z.name}
                </h1>
                <p
                  className="font-light text-md mt-3"
                  style={{ color: '#0A3761' }}
                >
                  {z.comment}
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Comment;
