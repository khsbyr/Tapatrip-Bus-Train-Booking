import { Divider, Radio } from 'antd';
import PayTransfer from '@components/common/PayTransfer';
import React from 'react';
import s from './Payments.module.scss';
export default function Payment() {
  const [value, setValue] = React.useState(1);
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className={s.div1}>
      <div className={s.div2}>
        <div className={s.zaavarh1}>
          <p className={s.zaavarh1p1}>Төлбөр төлөх зааварчилгаа</p>
          <p className={s.zaavarh1p2}>09:59</p>
        </div>
        <ul className="p-4 text-xs px-10">
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
        <Radio.Group onChange={onChange} value={value}>
          <div className="px-6 space-y-4 w-full">
            <Radio value={1}>
              <p>Шилжүүлэх</p>
              {value === 1 && <PayTransfer />}
            </Radio>
            <div>
              <Radio value={2}>
                QPay
                {value === 2 && <PayTransfer />}
              </Radio>
            </div>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
}
