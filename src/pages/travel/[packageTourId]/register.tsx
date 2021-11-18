import Footer from '@components/common/Footer';
import Navbar from '@components/common/Navbar/index';
import ContentWrapper from '@components/Travel/Search-Travel';
import NavData from '@data/navData.json';
import { postRequest } from '@lib/api';
import { Form, Input, Steps } from 'antd';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
const { Step } = Steps;
const steps = [
  {
    title: 'Суудал сонгох',
    // content: <SelectSeats travelData={travelData} />,
    button: 'Зорчигчийн мэдээлэл оруулах',
  },
  {
    title: 'Зорчигчийн мэдээлэл',
    // content: <PassengerInfo />,
    button: 'Төлбөр төлөх',
  },
  {
    title: 'Төлбөр төлөх',
    // content: <Payments />,
    button: 'Дуусгах',
  },
];
interface Props {
  data?: any;
}
let adults = 0;
let childs = 0;

const Register: FC<Props> = props => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [packData, setPackData] = useState(null);
  const [refNumber, setRefNumber] = useState(null);

  useEffect(() => {
    const queries = router.query;
    let packs = [];
    packs =
      queries.subPack &&
      queries.subPack
        .toString()
        .trim()
        .split('n')
        .filter(i => i);

    const subPacks = packs.map(pack => {
      return pack.trim().split('a');
    });

    const prepData = subPacks.map(subPack => {
      if (subPack.length > 1) {
        if (subPack[2] === 'D') {
          adults = adults + 1;
        } else if (subPack[2] === 'C') {
          childs = childs + 1;
        }
        return (
          subPack && {
            packageCode: subPack[0],
            subPackId: subPack[1],
            priceType: subPack[2],
            priceId: subPack[3],
            stock: 0,
          }
        );
      }
    });

    setPackData(prepData);

    return function cleanup() {
      adults = 0;
      childs = 0;
    };
  }, []);

  const onChange = current => {
    setCurrent(current);
  };

  const next = () => {
    setCurrent(current + 1);
  };
  const sendButton = async v => {
    const filteredArr = packData.reduce((acc, current) => {
      const x = acc.find(
        item =>
          item.subPackId === current.subPackId &&
          item.priceId === current.priceId
      );

      if (!x) {
        acc && (current.stock = current.stock + 1);
        return acc.concat([current]);
      } else {
        acc.map(dup => {
          if (dup.subPackId === x.subPackId && dup.priceId === x.priceId) {
            dup.stock = dup.stock + 1;
          }
        });
        return acc;
      }
    }, []);
    const newPackages = [];

    for (let i = 0; i < filteredArr.length; i++) {
      newPackages.push({
        id: Number(filteredArr[i].subPackId),
        package_code: filteredArr[i].packageCode,
        prices: [],
      });
    }

    for (let j = 0; j < filteredArr.length; j++) {
      for (let i = 0; i < newPackages.length; i++) {
        if (Number(newPackages[i].id) === Number(filteredArr[j].subPackId)) {
          newPackages[i].prices.push({
            id: Number(filteredArr[j].priceId),
            name: filteredArr[j].priceType === 'C' ? 'Хүүхэд' : 'Том хүн',
            stock: filteredArr[j].stock,
          });
        }
      }
    }

    var uniq = newPackages.reduce((unique, o) => {
      if (!unique.some(obj => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
    }, []);

    const bookingData = {
      id: Number(router.query.packageTourId),
      trip_code: router.query.tripCode,
      date: '2021-11-09',
      contact_name: v.lastName,
      contact_email: v.email,
      contact_dial_number: 976,
      contact_phone: v.phone,
      packages: uniq,
    };
    const data = await postRequest(
      '/activity/package_tour_booking/',
      bookingData
    );
    if (data.message.toLowerCase().trim() === 'success') {
      setRefNumber(data.result.ref_number);

      router.push({
        pathname: '/payment/[refNumber]',
        query: {
          refNumber: data.result.ref_number,
          totalPrice: router.query.totalPrice,
          totalPassenger: adults + childs,
          tourName: router.query.tourName,
        },
      });
      // router.push(`/payment/${data.result.ref_number}`);
    }
  };

  return (
    <ContentWrapper>
      <div className="relative bg-bg mt-20">
        <Navbar navbarData={NavData} />
        <Steps
          type="navigation"
          current={current}
          onChange={onChange}
          size="small"
          responsive={true}
          className="site-navigation-steps bg-steps"
        >
          {steps.map(item => (
            <Step
              key={item.title}
              icon=" "
              title={item.title}
              className="text-xs text-white"
            />
          ))}
        </Steps>
        <div style={{ minHeight: '500px' }} className="bg-bg font-Roboto h-96">
          <div className="default-container pt-1">
            <div className="md:col-span-2  gap-2 my-4">
              <Form
                name="Guests register"
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                onFinish={sendButton}
                className="p-4  grid grid-cols-3 gap-4 "
              >
                <div className="mr-2 col-span-2 grid grid-cols-2 ">
                  <h1 className="font-bold my-2 text-2xl">
                    Захиалагчийн мэдээлэл
                  </h1>
                  {/* <div className="grid grid-cols-2 col-span-2 gap-4 mb-2">
                  <div className="col-span-1  bg-white rounded-lg p-2">
                    Хувь хүн
                  </div>
                  <div className="col-span-1  bg-white rounded-lg p-2">
                    Байгууллага
                  </div>
                </div> */}
                  <div className="col-span-2 gap-4 p-4 grid grid-cols-2 bg-white rounded-md">
                    <Form.Item
                      label={'Овог'}
                      name="lastName"
                      rules={[
                        {
                          type: 'string',
                          message: 'should be string',
                        },
                        { required: true, message: 'required' },
                      ]}
                      className="mb-0 col-span-1"
                    >
                      <Input className=" bg-bg rounded-md border-0" />
                    </Form.Item>
                    <Form.Item
                      label={'Нэр'}
                      name="firtsName"
                      rules={[
                        {
                          type: 'string',
                          message: 'should be string',
                        },
                        { required: true, message: 'required' },
                      ]}
                      className="mb-0 col-span-1"
                    >
                      <Input className=" bg-bg rounded-md border-0" />
                    </Form.Item>

                    <Form.Item
                      label={'Email'}
                      name="email"
                      rules={[
                        {
                          type: 'email',
                          message: 'should be string',
                        },
                        { required: true, message: 'required' },
                      ]}
                      className="mb-0 col-span-1"
                    >
                      <Input className=" bg-bg rounded-md border-0" />
                    </Form.Item>
                    <Form.Item
                      label={'Phone'}
                      name="phone"
                      rules={[{ required: true, message: 'required' }]}
                      className="mb-0 col-span-1"
                    >
                      <Input
                        type="number"
                        className=" bg-bg rounded-md border-0"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="relative col-span-1">
                  <div className="fixed col-span-1 w-98 p-2">
                    <h1 className="font-bold pb-2 text-2xl">
                      Захиалгын дэлгэрэнгүй
                    </h1>
                    <div className="bg-white rounded-md mb-4">
                      <hr className="divide divide-gray-400" />
                      <div className="p-2  inline-flex">
                        <h1 className="font-bold mb-1 px-2">
                          {router.query.tourName}
                        </h1>
                      </div>
                      <div className="grid grid-cols-2 p-1 mb-1 px-4">
                        <p>
                          Насанд хүрэгч
                          <span className="bg-gray-200 p-0.5">{` x${adults}`}</span>
                        </p>
                        <p>
                          Хүүхэд
                          <span className="bg-gray-200 p-0.5">{` x${childs}`}</span>
                        </p>
                      </div>
                      <div className="grid grid-cols-2 py-2 px-4 border-t-2">
                        <div className="col-span-1">
                          <p className="font-bold">Нийт</p>
                        </div>
                        <div className="col-span-1">
                          <p className="text-right font-bold">
                            <CurrencyFormat
                              value={router.query.totalPrice}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={` ₮`}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <Form.Item className="mb-1">
                      <button
                        className="mb-2 col-span-1 w-full bg-button text-white font-bold py-3 px-4 rounded-lg"
                        type="submit"
                      >
                        Төлбөр төлөх
                      </button>
                    </Form.Item>
                    <button
                      type="submit"
                      className="col-span-1 w-full bg-steps text-white font-bold py-3 px-4 rounded-lg"
                    >
                      Зээлээр худалдан авах
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer navbarData={NavData} />
    </ContentWrapper>
  );
};

export default Register;
