import { Input, Checkbox } from 'antd';
import InputPhoneNumber from '@components/common/InputPhoneNumber';
import ContentWrapper from '@components/common/InputPhoneNumber/style';

export default function loginPhoneNumber() {
  return (
    <form action="" className="space-y-6">
      <InputPhoneNumber />
      <ContentWrapper>
        <div className="space-y-4">
          <h1 className="text-base text-cardDate font-medium pl-2">Нууц үг</h1>
          <Input.Password
            className="rounded-lg bg-bg border-0 p-2 py-3 text-cardDate text-base"
            placeholder="Нууц үг оруулна уу"
          />
        </div>
      </ContentWrapper>

      <Checkbox className="text-base text-cardDate pl-2"> Сануулах</Checkbox>
      <div className="flex text-base space-x-4">
        <button className="w-1/3 bg-blue-500 py-2 text-white font-medium rounded-lg hover:bg-blue-400">
          Нэвтрэх
        </button>
        <button className="w-2/3 border-2 py-2 font-medium rounded-lg text-cardDate hover:text-blue-500 hover:border-blue-500">
          Бүртгүүлэх
        </button>
      </div>
      <p className="flex justify-center">
        <a
          href=""
          className="hover:underline text-blue-500 text-sm hover:text-blue-400"
        >
          Нууц үгээ мартсан уу?
        </a>
      </p>
    </form>
  );
}
