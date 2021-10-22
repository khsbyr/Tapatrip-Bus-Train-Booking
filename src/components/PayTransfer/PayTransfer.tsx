import { Input } from 'antd';
export default function Payment() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap py-2 mt-2 font-normal space-y-5 sm:space-y-0 sm:grid grid-cols-2">
        <div className="w-full space-y-4 sm:pr-3 lg:pr-5">
          <label className="px-2" htmlFor="lastName">
            Захиалгын дугаар
          </label>
          <Input
            className="rounded-lg bg-gray-100 border-0 p-2"
            placeholder="12345678"
          />
        </div>
        <div className="w-full space-y-4 sm:pl-3 lg:pl-5">
          <label className="px-2" htmlFor="firstName">
            Холбогдох утас
          </label>
          <Input
            className="rounded-lg bg-gray-100 border-0 p-2"
            placeholder="99999999"
          />
        </div>
      </div>
      <div className="flex flex-wrap py-2 mt-2 font-normal space-y-5 sm:space-y-0 sm:grid grid-cols-2">
        <div className="w-full space-y-4 sm:pr-3 lg:pr-5">
          <label className="px-2" htmlFor="lastName">
            Дансны дугаар
          </label>
          <Input
            className="rounded-lg bg-gray-100 border-0 p-2"
            placeholder="50505050"
          />
        </div>
        <div className="w-full space-y-4 sm:pl-3 lg:pl-5">
          <label className="px-2" htmlFor="firstName">
            Хүлээн авагч
          </label>
          <Input
            className="rounded-lg bg-gray-100 border-0 p-2"
            placeholder=""
          />
        </div>
      </div>
    </div>
  );
}
