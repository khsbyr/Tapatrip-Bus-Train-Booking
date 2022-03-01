import React, { useState } from 'react';
import { useGlobalStore } from '@context/globalStore';
import { DuplicateIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import paymentFilter from '@helpers/payment-filter';
import { useTrainContext } from '@context/trainContext';

export default function PayCorporate({ corporate }) {
  const { t } = useTranslation(['steps']);
  const { booking } = useGlobalStore();
  const [bankIndex, setBankIndex] = useState(0);
  const { paymentDetail } = useTrainContext();
  const paymentFilterData = paymentFilter(corporate);

  const [copyBankName, setCopyBankName] = useState(
    <DuplicateIcon className="text-secondary h-6 w-6  hover:text-indigo-300" />
  );
  const [copyOrderNumber, setCopyOrderNumber] = useState(
    <DuplicateIcon className="text-secondary h-6 w-6  hover:text-indigo-300" />
  );
  const [copyTotalPrice, setCopyTotalPrice] = useState(
    <DuplicateIcon className="text-secondary h-6 w-6  hover:text-indigo-300" />
  );
  const [copyAccNumber, setCopyAccNumber] = useState(
    <DuplicateIcon className="text-secondary h-6 w-6  hover:text-indigo-300" />
  );

  const [copyAccName, setCopyAccName] = useState(
    <DuplicateIcon className="text-secondary h-6 w-6  hover:text-indigo-300" />
  );

  const copyToBankName = name => {
    navigator.clipboard.writeText(name);
    (async () => {
      setCopyBankName(<CheckIcon className="text-secondary h-6 w-6" />);
      await delay(500);
      setCopyBankName(
        <DuplicateIcon className="text-secondary h-6 w-6  hover:text-indigo-300" />
      );
    })();
  };

  const copyToOrderNumber = orderNum => {
    navigator.clipboard.writeText(orderNum);
    (async () => {
      setCopyOrderNumber(<CheckIcon className="text-secondary h-6 w-6" />);
      await delay(500);
      setCopyOrderNumber(
        <DuplicateIcon className="text-secondary h-6 w-6  hover:text-indigo-300" />
      );
    })();
  };

  const copyToTotalPrice = price => {
    navigator.clipboard.writeText(price);
    (async () => {
      setCopyTotalPrice(<CheckIcon className="text-secondary h-6 w-6" />);
      await delay(500);
      setCopyTotalPrice(
        <DuplicateIcon className="text-secondary h-6 w-6  hover:text-indigo-300" />
      );
    })();
  };

  const copyToAccNumber = accnum => {
    navigator.clipboard.writeText(accnum);
    (async () => {
      setCopyAccNumber(<CheckIcon className="text-secondary h-6 w-6" />);
      await delay(500);
      setCopyAccNumber(
        <DuplicateIcon className="text-secondary h-6 w-6  hover:text-indigo-300" />
      );
    })();
  };

  const copyToAccName = accname => {
    navigator.clipboard.writeText(accname);
    (async () => {
      setCopyAccName(<CheckIcon className="text-secondary h-6 w-6" />);
      await delay(500);
      setCopyAccName(
        <DuplicateIcon className="text-secondary h-6 w-6 hover:text-indigo-300" />
      );
    })();
  };

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <div className="space-y-6 mt-5">
      <div className="grid sm:grid-cols-2">
        <div className="space-y-1 mb-4 sm:mb-0 sm:pr-4 ">
          {paymentFilterData &&
            paymentFilterData.map((bank, index) => (
              <div
                key={index}
                className="w-full border rounded p-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => setBankIndex(index)}
              >
                <div className="flex justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <img src={bank.logo} alt="" width="35" />
                    <p>{bank.name}</p>
                  </div>
                  <button className="bg-bg hover:bg-gray-200 px-2 py-1 rounded font-medium">
                    {bank.currency}
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="bg-gray-50 rounded py-2 px-5">
          <div className="flex justify-between border-b-2 border-dotted py-2">
            <p>{t('bankName')}</p>
            <div className="flex">
              <p className="pr-2">
                {paymentFilterData && paymentFilterData[bankIndex]?.name}
              </p>
              <button
                onClick={() =>
                  copyToBankName(paymentFilterData[bankIndex]?.name)
                }
              >
                {copyBankName}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 border-b-2 border-dotted py-2">
            <p>{t('accountNumber')}</p>
            <div className="flex justify-end">
              <p className="pr-2">
                {paymentFilterData &&
                  paymentFilterData[bankIndex].account_number}
              </p>
              <button
                onClick={() =>
                  copyToAccNumber(paymentFilterData[bankIndex].account_number)
                }
              >
                {copyAccNumber}
              </button>
            </div>
          </div>
          <div className="flex justify-between border-b-2 border-dotted py-2">
            <p>{t('accountName')}</p>
            <div className="flex">
              <p className="pr-2">
                {paymentFilterData && paymentFilterData[bankIndex].company_name}
              </p>
              <button
                onClick={() =>
                  copyToAccName(paymentFilterData[bankIndex].company_name)
                }
              >
                {copyAccName}
              </button>
            </div>
          </div>
          <div className="flex justify-between border-b-2 border-dotted py-2">
            <p>{t('transferAmount')}</p>
            <div className="flex">
              <p className="pr-2">{paymentDetail.sum}₮</p>
              <button onClick={() => copyToTotalPrice(paymentDetail.sum)}>
                {copyTotalPrice}
              </button>
            </div>
          </div>
          <div className="flex justify-between py-2">
            <p>{t('transactionValue')}</p>
            <div className="flex">
              <p className="pr-2">{paymentDetail.ref_number}</p>
              <button
                onClick={() => copyToOrderNumber(paymentDetail.ref_number)}
              >
                {copyOrderNumber}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
