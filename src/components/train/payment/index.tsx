import React from 'react';
import Layout from '@components/common/layout';
import { useTrainContext } from '@context/trainContext';
import moment from 'moment';

const Payment = () => {
  const { endDate } = useTrainContext();

  return (
    <Layout>
      {endDate ? (
        <div className="text-center mt-5 mb-1 max-w-7xl mx-auto px-2 cursor-pointer">
          <p className="font-semibold text-xs text-cardDate  gap-2 bg-white py-5 rounded-lg md:text-base">
            Та захиалгаа{' '}
            <span className="text-yellow-400">
              {moment(endDate).format('YYYY-MM-DD hh цаг mm минут')}
            </span>{' '}
            -аас өмнө хийж дуусгана уу!
          </p>
        </div>
      ) : (
        ''
      )}

      <div className="max-w-7xl mx-auto px-2 my-5">
        <div className="bg-white rounded-lg h-96 p-10">
          <h1>hi</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
