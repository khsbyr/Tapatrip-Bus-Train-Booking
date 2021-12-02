import StaticNavbar from '@components/travel/StaticNavbar';
import ConfirmModal from '@components/common/confirmModal';
import Footer from '@components/common/footer';
import InputPhoneNumber from '@components/common/phoneNumber';
import ContentWrapper from '@components/travel/style';
import Company from '@data/company.json';
import NavData from '@data/navData.json';
import AuthService from '@services/auth';
import { postRequest } from '@services/travel/travelServices';
import { Form, Input, Modal, Steps } from 'antd';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
const { Step } = Steps;
interface Props {
  data?: any;
}
let adults = 0;
let childs = 0;

const Register = props => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [packData, setPackData] = useState(null);
  const [refNumber, setRefNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [verified, setVerified] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    dialNumber: 976,
    phoneNumber: null,
    contact_name: null,
    first_name: null,
    contact_email: null,
  });
  useEffect(() => {
    const queries = props.query;
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
  const close = () => {
    setIsModalVisible(false);
    setLoading(false);
  };
  const handleSmsVerify = async code => {
    setLoading(true);
    if (code!) {
      if (
        await AuthService.verifyCode({
          dialCode: contactInfo.dialNumber,
          phone: contactInfo.phoneNumber,
          code: code,
        })
      ) {
        await setVerified(code);
        handleBooking();
      } else {
        Modal.error({
          title: 'Алдаа',
          content: 'Таны оруулсан код буруу байна дахин оролдоно уу?',
        });
        setLoading(false);
      }
    }
  };

  const smsSender = async values => {
    setLoading(true);
    let payload = {
      phone: values.phoneNumber,
      dialCode: values.dialCode,
    };
    const result = await AuthService.verifySms(payload);
    if (result) return true;
    else {
      Modal.error({
        title: 'Алдаа',
        content: 'Тань руу баталгаажуулах код явуулахад алдаа гарлаа!!!',
      });
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    try {
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
        date: router.query.tourDate,
        contact_name: contactInfo.contact_name,
        contact_email: contactInfo.contact_email,
        contact_dial_number: 976,
        contact_phone: contactInfo.phoneNumber,
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
      }
    } catch (e) {
      console.log(e);
      Modal.error({
        title: 'Алдаа',
        content: e.message,
      });
      setLoading(false);
    }
  };

  const sendButton = async v => {
    setContactInfo({
      dialNumber: 976,
      phoneNumber: v.phone,
      contact_name: v.lastName,
      first_name: v.firstname,
      contact_email: v.email,
    });

    const isSmsSucces = smsSender({
      dialCode: 976,
      phoneNumber: v.phone,
    });
    if (isSmsSucces) {
      setIsModalVisible(true), setLoading(false);
    } else {
      Modal.error({
        title: 'Алдаа',
        content: 'Тань руу баталгаажуулах код явуулахад алдаа гарлаа!!!',
      });
      setLoading(false);
    }
  };

  return (
    <ContentWrapper>
      <div>
        <StaticNavbar navbarData={NavData} />
        <Steps className="my-5 px-6" size="small" current={1}>
          <Step title="Сонгох" />
          <Step title="Захиалах" />
          <Step title="Төлбөр төлөх" />
        </Steps>
        <div style={{ minHeight: '500px' }} className="bg-bg font-Roboto">
          <div className="default-container pt-1">
            <Form
              name="Guests register"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={sendButton}
              className="grid grid-cols-1 md:grid-cols-3"
            >
              <div className="col-span-2">
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
                <div className=" bg-white rounded-md grid grid-cols-1 pb-4 sm:grid-cols-2 p-4 gap-4">
                  <Form.Item
                    label={'Овог'}
                    name="lastName"
                    rules={[
                      {
                        type: 'string',
                        message: 'should be string',
                      },
                      { required: true, message: 'Овгоо заавал бөглөнө үү!' },
                    ]}
                    className="mb-0"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Нэр'}
                    name="firtsName"
                    rules={[
                      {
                        type: 'string',
                        message: 'should be string',
                      },
                      { required: true, message: 'Нэрээ заавал бөглөнө үү!' },
                    ]}
                    className="mb-0"
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={'Цахим шуудан'}
                    name="email"
                    rules={[
                      {
                        type: 'email',
                        message: 'И-мэйл буруу байна!',
                      },
                      {
                        required: true,
                        message: 'И-мэйл хаягаа заавал бөглөнө үү!',
                      },
                    ]}
                    className="mb-0"
                  >
                    <Input />
                  </Form.Item>
                  <div className="space-y-2">
                    <label htmlFor="">Утасны дугаар</label>
                    <InputPhoneNumber name="" />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="col-span-1 w-full p-2">
                  <h1 className="font-bold pb-2 text-2xl">
                    Захиалгын дэлгэрэнгүй
                  </h1>
                  <div className="bg-white rounded-md mb-4">
                    <div className="p-2 inline-flex">
                      <h1 className="font-bold mb-1 px-2">
                        {router.query.tourName}
                      </h1>
                    </div>
                    <div className="grid grid-cols-2 p-1 mb-1 px-4">
                      <p>
                        Насанд хүрэгч: &nbsp;
                        <span className="bg-gray-200 p-1 rounded-sm">{`${adults}`}</span>
                      </p>
                      <p>
                        Хүүхэд: &nbsp;
                        <span className="bg-gray-200 p-1 rounded-sm">{`${childs}`}</span>
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
      <Footer companyInfo={Company} />
      {isModalVisible && (
        <ConfirmModal
          isModalVisible={isModalVisible}
          booking={handleSmsVerify}
          close={close}
          loading={loading}
        />
      )}
    </ContentWrapper>
  );
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: { query },
  };
};

export default Register;
