import { useTrainContext } from '@context/trainContext';
import React from 'react';
import MyOrdersAll from '.';
import MyOrderBus from './myOrderBus';
import MyOrderTrain from './myOrderTrain';

export default function MyOrders() {
  const { myOrderId } = useTrainContext();

  const getMyOrder = id => {
    switch (id) {
      case 0:
        return <MyOrdersAll />;
      case 1:
        return <MyOrderBus />;
      case 2:
        return <MyOrderTrain />;
      default:
        return <MyOrdersAll />;
    }
  };

  return <div>{getMyOrder(myOrderId)}</div>;
}
