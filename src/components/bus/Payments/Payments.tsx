import { Statistic, Radio, Space, Input } from 'antd';
import PayTransfer from '@components/bus/Payments/PayTransfer';
import QPay from '@components/bus/Payments/QPay';
import React from 'react';
import s from './Payments.module.scss';
import ContentWrapper from './style';
import Banks from '@data/bankInformation.json';

export default function Payment() {
  const [value, setValue] = React.useState(1);
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const { Countdown } = Statistic;
  const deadline = Date.now() + 60 * 60;
  //  * 333.3;

  const onFinish = () => {
    console.log('finished!');
  };

  return (
    <ContentWrapper>
      <div className={s.root}>
        <div className={s.body}>
          <div className={s.instructions}>
            <p>Төлбөр төлөх зааварчилгаа</p>
            <p>
              <Countdown value={deadline} onFinish={onFinish} />
            </p>
          </div>
          <ul className="p-4 text-sm px-10">
            <li>
              Хэрэглэгч та Авто тээврийн үндэсний төвийн дор дурдсан дансруу
              билетийн төлбөрөө 20 минутын дотор шилжүүлэх ба гүйлгээний утга
              хэсэгт ЗАХИАЛГЫН КОД болон холбогдох утасны дугаараа заавал бичиж
              шилжүүлэг хийнэ.
            </li>
            <li className="py-6">
              Дараах тохиолдлуудад таны захиалга хүчингүй болно гэдгийг анхаарна
              уу.
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

        <div className={s.radioGroup}>
          <h1 className={s.paymentTitle}>Төлбөр төлөх хэлбэр сонгоно уу</h1>

          <Radio.Group onChange={onChange} value={value} className="w-full">
            <div className="w-full ml-6">
              <Space direction="vertical">
                <Radio value={1}>
                  <div className="w-full">
                    <p className={s.paymentShape}>Шилжүүлэх</p>
                    {value === 1 && <PayTransfer />}
                  </div>
                </Radio>
                <Radio value={2}>
                  <div>
                    <p className={s.paymentShape}>QPay</p>
                    {value === 2 && <QPay />}
                  </div>
                </Radio>
              </Space>
            </div>
          </Radio.Group>
        </div>
      </div>
    </ContentWrapper>
  );
}
