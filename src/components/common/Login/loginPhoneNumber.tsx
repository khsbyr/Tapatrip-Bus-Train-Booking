import { Form, Input, InputNumber, Space, Select, Checkbox } from 'antd';
import mngIcon from 'public/assets/flagMongolia.png';
import enIcon from 'public/assets/flagEng.png';
import Image from 'next/image';
import ContentWrapper from './style';
const countries = [
  { name: '+976', src: mngIcon, value: 0 },
  { name: '+444', src: enIcon, value: 1 },
];
const { Option } = Select;
export default function loginPhoneNumber() {
  return (
    <ContentWrapper>
      <form action="" className="space-y-6">
        <div className="space-y-2">
          <label className="text-base text-cardDate pl-2" htmlFor="">
            Утасны дугаар
          </label>
          <div className="flex rounded-lg bg-bg">
            <Select
              defaultValue={countries[0].value}
              className="w-48 text-sm border-r-2 p-2 mx-2 text-cardDate"
            >
              {countries.map(country => (
                <Option value={country.value}>
                  <p className="h-full w-full">
                    <Image
                      src={country.src}
                      width="24"
                      height="12"
                      className="rounded-sm"
                    />{' '}
                    {country.name}
                  </p>
                </Option>
              ))}
            </Select>
            <Input
              className="rounded-lg bg-bg border-0 p-2 py-3 text-cardDate text-base"
              placeholder="Дугаар оруулна уу"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            className="text-base text-cardDate font-medium pl-2"
            htmlFor=""
          >
            Нууц үг
          </label>
          <Input.Password
            className="rounded-lg bg-bg border-0 p-2 py-3 text-cardDate text-base"
            placeholder="Нууц үг оруулна уу"
          />
        </div>
        <Checkbox className="text-base text-cardDate pl-2"> Сануулах</Checkbox>
        <div className="flex text-base space-x-4">
          <button className="w-1/3 bg-blue-500 py-2 text-white font-medium rounded-lg">
            Нэвтрэх
          </button>
          <button className="w-2/3 border-2 py-2 font-medium rounded-lg text-cardDate">
            Бүртгүүлэх
          </button>
        </div>
        <p className="flex justify-center">
          <a
            href=""
            className="underline text-blue-400 text-sm hover:text-blue-300"
          >
            Нууц үгээ мартсан уу?
          </a>
        </p>
      </form>
    </ContentWrapper>
  );
}
