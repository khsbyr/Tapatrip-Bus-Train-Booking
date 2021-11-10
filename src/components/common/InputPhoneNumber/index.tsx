import { Input, Select } from 'antd';
import mngIcon from 'public/assets/flagMongolia.png';
import enIcon from 'public/assets/flagEng.png';
import Image from 'next/image';
import ContentWrapper from './style';
import s from '@components/common/InputPhoneNumber/PhoneNumber.module.scss';
import { useGlobalStore } from '@context/globalStore';
const countries = [
  { name: ' 976', src: mngIcon, value: 0 },
  { name: ' 44', src: enIcon, value: 1 },
];
const { Option } = Select;
export default function InputPhoneNumber() {
  const { customers, setCustomers } = useGlobalStore();

  function handleChange(value) {
    if (customers) {
      customers.dialNumber = value;
      setCustomers(customers);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: true,
        email: '',
        dialNumber: value,
        phoneNumber: '',
      };
      setCustomers(customer);
    }
  }

  const handleCustomerPhone = e => {
    if (customers) {
      customers.phoneNumber = e.target.value;
      setCustomers(customers);
    } else {
      let customer = {
        companyRegister: '',
        isCompany: true,
        email: '',
        dialNumber: '',
        phoneNumber: e.target.value,
      };
      setCustomers(customer);
    }
  };

  return (
    <ContentWrapper className="space-y-3.5">
      <label className={s.Label} htmlFor="pNumber">
        Утас дугаар
      </label>
      <div className="flex items-center rounded-lg bg-bg">
        <Select
          defaultValue={countries[0].name}
          onChange={handleChange}
          className="w-48 text-sm border-r-2 p-2 mx-2 text-cardDate"
        >
          {countries.map(country => (
            <Option value={country.name}>
              <p className="h-full w-full flex items-center">
                <Image
                  src={country.src}
                  width="24"
                  height="12"
                  className="rounded-sm mr-2"
                />{' '}
                {' ' + country.name}
              </p>
            </Option>
          ))}
        </Select>
        <Input onChange={handleCustomerPhone} className={s.input} />
      </div>
    </ContentWrapper>
  );
}
