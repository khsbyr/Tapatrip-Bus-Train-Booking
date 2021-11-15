import { Statistic, Radio, Space, Input } from 'antd';
import PayTransfer from '@components/bus/Payments/PayTransfer';
import QPay from '@components/bus/Payments/QPay';
import React, { useState } from 'react';
import style from './Payments.module.scss';
import ContentWrapper from './style';
import StepCard from '../StepCard';
import PaymentCard from '../PaymentCard';
import OrderModal from '@components/bus/OrderModal';

export default function Payment({ datas, scheduleId }) {
  const [value, setValue] = React.useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Countdown } = Statistic;
  const deadline = Date.now() + 60 * 60 * 333.3;

  const onChange = e => {
    setValue(e.target.value);
  };

  const handleCheck = e => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ContentWrapper>
      <div className={style.body}>
        <div className={style.content}>
          <div className={style.root}>
            <div className={style.bodyPayment}>
              <div className={style.instructions}>
                <p>Төлбөр төлөх зааварчилгаа</p>
                <p>
                  <Countdown value={deadline} />
                </p>
              </div>
              <ul className="p-4 text-sm sm:text-base px-10">
                <li>
                  Хэрэглэгч та Авто тээврийн үндэсний төвийн дор дурдсан дансруу
                  билетийн төлбөрөө 20 минутын дотор шилжүүлэх ба гүйлгээний
                  утга хэсэгт ЗАХИАЛГЫН КОД болон холбогдох утасны дугаараа
                  заавал бичиж шилжүүлэг хийнэ.
                </li>
                <li className="py-6">
                  Дараах тохиолдлуудад таны захиалга хүчингүй болно гэдгийг
                  анхаарна уу.
                </li>
                <ul>
                  <li>-Заагдсан хугацаанд төлбөр хийгээгүй</li>
                  <li>-Дутуу төлбөр хийх</li>
                  <li>
                    -Захиалгын кодыг буруу /ямар нэгэн илүү тэмдэг, тэмдэглэгээ
                    бичихгүй(!.,-)/ эсвэл дутуу бичих
                  </li>
                </ul>
              </ul>
            </div>

            <div className={style.radioGroup}>
              <h1 className={style.paymentTitle}>
                Төлбөр төлөх хэлбэр сонгоно уу
              </h1>
              <div className="w-full px-6 pb-5">
                <p className={style.paymentShape}>Шилжүүлэх</p>
                <PayTransfer />
              </div>
              {/* <Radio.Group onChange={onChange} value={value} className="w-full">
                <div className="w-full ml-6">
                  <Space direction="vertical">
                    <Radio value={1}>
                      <div className="w-full">
                        <p className={style.paymentShape}>Шилжүүлэх</p>
                        {value === 1 && <PayTransfer />}
                      </div>
                    </Radio>
                    <Radio value={2}>
                      <div>
                        <p className={style.paymentShape}>QPay</p>
                        {value === 2 && <QPay />}
                      </div>
                    </Radio>
                  </Space>
                </div>
              </Radio.Group> */}
            </div>
          </div>
        </div>
        <div className={style.card}>
          <div className="px-2 lg:px-0 space-y-3 mt-3 md:mt-0">
            <StepCard datas={datas} scheduleId={scheduleId} />
            <PaymentCard datas={datas} scheduleId={scheduleId} />
            <button className={style.button} onClick={handleCheck}>
              Захиалгын мэдээлэл шалгах
            </button>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <OrderModal isModalVisible={isModalVisible} close={closeModal} />
      )}
    </ContentWrapper>
  );
}
