import { useState } from 'react';
import OrderModal from '@components/bus/OrderModal';

export default function index() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function checkOrder() {
    setIsModalVisible(true);
  }

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <button
        className="bg-bg text-cardDate font-medium py-2 px-4 rounded-lg h-auto w-48 lg:w-40 xl:w-48 hover:bg-register hover:text-white"
        onClick={checkOrder}
      >
        Захиалга шалгах
      </button>
      {isModalVisible && (
        <OrderModal isModalVisible={isModalVisible} close={closeModal} />
      )}
    </>
  );
}
