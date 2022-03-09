import { useState } from 'react';
import OrderModal from '@components/bus/orderModal';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import OrderModalTrain from '../../train/orderModalTrain';

export default function OrderCheck() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  function checkOrder() {
    setIsModalVisible(true);
  }

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <button
        className="bg-bg text-cardDate font-medium py-2 px-4 rounded-lg h-auto w-56 lg:w-40 hover:bg-gray-200 xl:ml-10"
        onClick={checkOrder}
      >
        {t('ordercheck')}
      </button>
      {isModalVisible &&
        (router.pathname === '/train' ||
        router.pathname === '/train/orders' ||
        router.pathname === '/train/orders/[id]' ? (
          <OrderModalTrain isModalVisible={isModalVisible} close={closeModal} />
        ) : (
          <OrderModal isModalVisible={isModalVisible} close={closeModal} />
        ))}
    </>
  );
}
