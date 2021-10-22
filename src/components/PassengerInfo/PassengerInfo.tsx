import * as React from 'react';
import {
  Input,
  Col,
  Row,
  Select,
  InputNumber,
  DatePicker,
  AutoComplete,
  Cascader,
} from 'antd';
import mngIcon from 'public/assets/flagMongolia.png';
import enIcon from 'public/assets/flagEng.png';
import Image from 'next/image';

const { Option } = Select;
export default function PassengerInfo() {
  return (
    <div className="p-2 space-y-2">
      <div className="flex flex-nowrap w-full rounded-lg bg-white">
        <p className="w-3/4 p-3">
          Та бүртгэл үүсгэснээр хялбар, хурдан захиалга хийх боломжтой.
        </p>
        <button className="flex justify-end border-2 rounded-lg p-1 text-blue-900 px-0 m-2 sm:px-6 items-center hover:text-white hover:bg-blue-900 ">
          Бүртгүүлэх
        </button>
      </div>
      <div className="rounded-lg bg-white p-4">
        <div className="w-full text-lg font-bold border-b-2 pb-1">
          Зорчигч 1
        </div>
        <div className="flex flex-wrap py-2 mt-2 font-normal space-y-5 sm:space-y-0 sm:grid grid-cols-2">
          <div className="w-full space-y-4 sm:pr-3 lg:pr-5">
            <label className="px-2" htmlFor="RegisterNo">
              Регистрийн дугаар
            </label>
            <div className="w-full border-0">
              <Select
                defaultValue="19"
                className="bg-gray-100 p-1 w-1/5 border-0 rounded-lg "
              >
                <Option value="1">А</Option>
                <Option value="2">Б</Option>
                <Option value="3">В</Option>
                <Option value="4">Г</Option>
                <Option value="5">Д</Option>
                <Option value="6">Е</Option>
                <Option value="7">Ё</Option>
                <Option value="8">Ж</Option>
                <Option value="9">З</Option>
                <Option value="10">И</Option>
                <Option value="11">Й</Option>
                <Option value="12">К</Option>
                <Option value="13">Л</Option>
                <Option value="14">М</Option>
                <Option value="15">Н</Option>
                <Option value="16">О</Option>
                <Option value="17">Ө</Option>
                <Option value="18">П</Option>
                <Option value="19">Р</Option>
                <Option value="20">С</Option>
                <Option value="21">Т</Option>
                <Option value="22">У</Option>
                <Option value="23">Ү</Option>
                <Option value="24">Ф</Option>
                <Option value="25">Х</Option>
                <Option value="26">Ц</Option>
                <Option value="27">Ч</Option>
                <Option value="28">Ш</Option>
                <Option value="29">Щ</Option>
                <Option value="30">Ф</Option>
                <Option value="31">Ъ</Option>
                <Option value="32">Ь</Option>
                <Option value="33">Э</Option>
                <Option value="34">Ю</Option>
                <Option value="35">Я</Option>
              </Select>
              <Select
                defaultValue="5"
                className="bg-gray-100 border-0 rounded-lg p-1 w-1/5"
              >
                <Option value="1">А</Option>
                <Option value="2">Б</Option>
                <Option value="3">В</Option>
                <Option value="4">Г</Option>
                <Option value="5">Д</Option>
                <Option value="6">Е</Option>
                <Option value="7">Ё</Option>
                <Option value="8">Ж</Option>
                <Option value="9">З</Option>
                <Option value="10">И</Option>
                <Option value="11">Й</Option>
                <Option value="12">К</Option>
                <Option value="13">Л</Option>
                <Option value="14">М</Option>
                <Option value="15">Н</Option>
                <Option value="16">О</Option>
                <Option value="17">Ө</Option>
                <Option value="18">П</Option>
                <Option value="19">Р</Option>
                <Option value="20">С</Option>
                <Option value="21">Т</Option>
                <Option value="22">У</Option>
                <Option value="23">Ү</Option>
                <Option value="24">Ф</Option>
                <Option value="25">Х</Option>
                <Option value="26">Ц</Option>
                <Option value="27">Ч</Option>
                <Option value="28">Ш</Option>
                <Option value="29">Щ</Option>
                <Option value="30">Ф</Option>
                <Option value="31">Ъ</Option>
                <Option value="32">Ь</Option>
                <Option value="33">Э</Option>
                <Option value="34">Ю</Option>
                <Option value="35">Я</Option>
              </Select>
              <Input
                className="rounded-lg border-0 bg-gray-100 p-2 w-3/5"
                placeholder="99887766"
              />
            </div>
          </div>
          <div className="w-full space-y-4 sm:pl-3 lg:pl-5">
            <label className="px-2" htmlFor="Vaccine">
              Вакцинд хамрагдсан эсэх
            </label>
            <Input className="rounded-lg bg-gray-100 border-0 p-2" disabled />
          </div>
        </div>

        <div className="flex flex-wrap py-2 mt-2 font-normal space-y-5 sm:space-y-0 sm:grid grid-cols-2">
          <div className="w-full space-y-4 sm:pr-3 lg:pr-5">
            <label className="px-2" htmlFor="lastName">
              Овог
            </label>
            <Input
              className="rounded-lg bg-gray-100 border-0 p-2"
              placeholder="Овог оруулна уу"
            />
          </div>
          <div className="w-full space-y-4 sm:pl-3 lg:pl-5">
            <label className="px-2" htmlFor="firstName">
              Нэр
            </label>
            <Input
              className="rounded-lg bg-gray-100 border-0 p-2"
              placeholder="Нэр оруулна уу"
            />
          </div>
        </div>

        <div className="flex flex-wrap py-2 mt-2 font-normal space-y-5 sm:space-y-0 sm:grid grid-cols-2">
          <div className="w-full space-y-4 sm:pr-3 lg:pr-5">
            <label className="px-2" htmlFor="email">
              И-мэйл хаяг
            </label>
            <Input
              className="rounded-lg bg-gray-100 border-0 p-2"
              placeholder="Таны тасалбарыг илгээх болно"
            />
          </div>
          <div className="w-full space-y-4 sm:pl-3 lg:pl-5">
            <label className="px-2" htmlFor="pNumber">
              Утас дугаар
            </label>
            {/* <Input.Group compact className="w-full"> */}
            <div className="rounded-lg p-1 bg-gray-100">
              <Select defaultValue="mn" className=" w-2/5">
                <Option value="mn">
                  <p className="flex items-center h-full w-full text-xs">
                    <Image
                      src={mngIcon}
                      width="26"
                      height="13"
                      className="rounded-sm"
                    />
                    +976
                  </p>
                </Option>
                <Option value="en">
                  <p className="flex items-center h-full w-full text-xs">
                    <Image
                      src={enIcon}
                      width="26"
                      height="13"
                      className="rounded-sm"
                    />
                    +44
                  </p>
                </Option>
              </Select>
              <Input
                className="bg-gray-100 border-0 w-3/5"
                placeholder="Дугаар оруулна уу"
              />
            </div>
            {/* </Input.Group> */}
          </div>
        </div>
      </div>
    </div>
  );
}
