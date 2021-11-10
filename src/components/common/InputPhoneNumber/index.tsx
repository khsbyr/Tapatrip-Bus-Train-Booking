import { Input, Select } from 'antd';
import mngIcon from 'public/assets/flagMongolia.png';
import enIcon from 'public/assets/flagEng.png';
import Image from 'next/image';
import ContentWrapper from './style';
import s from '@components/common/InputPhoneNumber/PhoneNumber.module.scss';
const countries = [
  { name: '+976', src: mngIcon, value: 0 },
  { name: '+44', src: enIcon, value: 1 },
];
const { Option } = Select;
export default function InputPhoneNumber() {
  return (
    <ContentWrapper className="space-y-3.5">
      <label className={s.Label} htmlFor="pNumber">
        Утас дугаар
      </label>
      <div className="flex items-center rounded-lg bg-bg">
        <Select
          defaultValue={countries[0].value}
          className="w-48 text-sm border-r-2 p-2 mx-2 text-cardDate"
        >
          {countries.map(country => (
            <Option value={country.value}>
              <p className="h-full w-full flex items-center">
                <Image
                  src={country.src}
                  width="24"
                  height="12"
                  className="rounded-sm mr-2"
                />{' '}
                {country.name}
              </p>
            </Option>
          ))}
        </Select>
        <Input className={s.input} />
      </div>
    </ContentWrapper>
  );
}
