import Loader from '@components/common/loader';
import TrainService from '@services/train';
import { Button, Empty } from 'antd';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import s from './refNumber.module.scss';

export default function ticketGenerate() {
  const router = useRouter();
  const { refNumber } = router.query;
  const [data, setData] = useState(null);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState('');

  useEffect(() => {
    async function getTicketInfo() {
      try {
        const res = await TrainService.getTicketInfo(refNumber);
        setStatus(res.status);
        setLoading(false);
        if (res && res?.status === 200) {
          setData(res?.result);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    if (refNumber) getTicketInfo();
  }, [refNumber]);

  // function printDocument() {
  //   setLoading1('true');
  //   const printArea = document.getElementById('divToPrint');
  //   html2canvas(printArea, {
  //     scale: 2,
  //     logging: true,
  //   }).then(canvas => {
  //     const dataURL = canvas.toDataURL();
  //     const pdf = new jsPDF();
  //     var width = pdf.internal.pageSize.getWidth();
  //     var height = pdf.internal.pageSize.getHeight();
  //     pdf.addImage(dataURL, 'PNG', 0, 0, width, height);
  //     pdf.save('tapatrip_ticket.pdf');
  //     setLoading1('false');
  //   });
  // }

  function demoFromHTML() {
    // const html_source = document.getElementById('divToPrint'); // O id do elemento que contém o Html que quer imprimir.

    // html2canvas(html_source, { scale: 2 }).then(function (canvas) {
    //   let imgData = canvas.toDataURL('image/png');
    //   let imgWidth = 210; // Largura em mm de um a4
    //   let pageHeight = 297; // Altura em mm de um a4
    //   let pdf = new jsPDF();
    //   let imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   let heightLeft = imgHeight;
    //   let position = 0;

    //   pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //   heightLeft -= pageHeight;

    //   while (heightLeft >= 0) {
    //     position = heightLeft - imgHeight;
    //     pdf.addPage();
    //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //     heightLeft -= pageHeight;
    //   }

    //   pdf.save('tapatrip_ticket.pdf');
    // });
    window.print();
  }

  return loading ? (
    <Loader />
  ) : (
    <div id="example">
      <Head>
        <title>Tapatrip - Ticket</title>
      </Head>
      {status && status !== 200 ? (
        ''
      ) : (
        <div className="text-center my-10 hidden lg:block">
          <Button type="primary" onClick={demoFromHTML}>
            {loading1 === 'true' ? (
              <div className={s.ldsDualRing} />
            ) : (
              'Татаж авах'
            )}
          </Button>
        </div>
      )}
      <div id="asd">
        <div className={`${s.a4size} pt-2`}>
          <div id="divToPrint" className="p-14 pt-5">
            {status !== 200 ? (
              <Empty description={'Захиалгын мэдээлэл олдсонгүй'} />
            ) : (
              <>
                {data &&
                  data.rs_payload?.passengers?.map((z, index) => {
                    return (
                      <div
                        style={{
                          outline: '1px solid black',
                          width: '100%',
                          pageBreakInside: 'avoid',
                          marginTop: index !== 0 ? '20px' : '0px',
                          fontFamily: 'Times New Roman',
                        }}
                      >
                        <table style={{ width: '100%' }}>
                          <tbody>
                            <tr>
                              <td>
                                <img
                                  className=""
                                  src="/assets/ticketImagesTrain/HNN.png"
                                  style={{ width: '50px' }}
                                />
                              </td>
                              <td>
                                <b>Цахим тасалбарын дугаар </b>
                                <br />e ticket number
                              </td>
                              <td>
                                <h4 style={{ color: 'red' }}>
                                  <b>
                                    {z.TICKET_SERI}-{z.TICKET_NO}
                                  </b>
                                </h4>{' '}
                              </td>
                              <td colSpan={2}>
                                {' '}
                                <b>Захиалгын дугаар</b>
                                <br />
                                Order number
                              </td>
                              <td>{data.ref_number}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          className="table table-bordered"
                          style={{
                            width: '100%',
                          }}
                          // border="1"
                        >
                          <tbody>
                            <tr
                              style={{
                                border: '1px solid #ddd',
                              }}
                            >
                              <td
                                colSpan={5}
                                style={{
                                  border: '1px solid #ddd',
                                  width: '48%',
                                }}
                              >
                                {' '}
                                <b>Хяналтын дугаар</b>
                                <br />
                                Check Number
                                <br />
                                {data.order_number}
                                <br />
                                Аяллын жил: {moment().format('YYYY')}
                                <br />
                                Trip Year: {moment().format('YYYY')}
                              </td>
                              <td
                                colSpan={4}
                                style={{ border: '1px solid #ddd' }}
                              >
                                <b>{z.NAME}</b>
                                <br />
                                {z.DOCNO}
                                <br />
                                {z.DOB}
                                <br />
                                Зорчигчдын тоо: 01/ Number of passengers:{' '}
                                <span> 01</span>
                              </td>
                            </tr>
                            <tr style={{ border: '1px solid #ddd' }}>
                              <td
                                style={{
                                  border: '1px solid #ddd',
                                  width: '60px',
                                  textAlign: 'center',
                                }}
                              >
                                <img
                                  className=""
                                  src="/assets/ticketImagesTrain/calendar.png"
                                  style={{
                                    width: '40px',
                                    marginLeft: '8px',
                                  }}
                                />
                              </td>
                              <td
                                style={{
                                  border: '1px solid #ddd',
                                  width: '60px',
                                  textAlign: 'center',
                                }}
                              >
                                <img
                                  className=""
                                  src="/assets/ticketImagesTrain/clock.png"
                                  style={{
                                    width: '40px',
                                    marginLeft: '7px',
                                  }}
                                />
                              </td>
                              <td
                                colSpan={4}
                                style={{ border: '1px solid #ddd' }}
                              >
                                {' '}
                                <b> Аялах чиглэл/Travel route</b>
                                <br />
                                Хаанаас/From{' '}
                                <span style={{ marginLeft: '5em' }}>
                                  Хаашаа/To
                                </span>{' '}
                              </td>
                              <td
                                style={{
                                  border: '1px solid #ddd',
                                  width: '60px',
                                  textAlign: 'center',
                                }}
                              >
                                <img
                                  className=""
                                  src="/assets/ticketImagesTrain/calendar.png"
                                  style={{ width: '40px', marginLeft: '8px' }}
                                />
                              </td>
                              <td
                                style={{
                                  border: '1px solid #ddd',
                                  width: '60px',
                                  textAlign: 'center',
                                }}
                              >
                                <img
                                  className=""
                                  src="/assets/ticketImagesTrain/clock.png"
                                  style={{ width: '40px', marginLeft: '8px' }}
                                />
                              </td>
                              <td style={{ border: '1px solid #ddd' }}>
                                {' '}
                                <b>Ангилал</b> <br /> Class
                              </td>
                            </tr>
                            <tr
                              style={{
                                border: '1px solid #ddd',
                              }}
                            >
                              <td
                                style={{
                                  border: '1px solid #ddd',
                                }}
                              >
                                {data.rs_payload?.journey?.DEP_DATE}
                              </td>
                              <td style={{ border: '1px solid #ddd' }}>
                                {data.rs_payload?.journey?.DEP_TIME}
                              </td>
                              <td
                                colSpan={4}
                                rowSpan={2}
                                style={{ border: '1px solid #ddd' }}
                              >
                                {data.rs_payload?.journey?.FROMNAME}{' '}
                                <span style={{ marginLeft: '5em' }}>
                                  {' '}
                                  -&gt; {data.rs_payload?.journey?.TONAME}
                                </span>
                              </td>
                              <td style={{ border: '1px solid #ddd' }}>
                                {data.rs_payload?.journey?.ARR_DATE}
                              </td>
                              <td style={{ border: '1px solid #ddd' }}>
                                {data.rs_payload?.journey?.ARR_TIME}{' '}
                                {data.rs_payload?.journey?.TO_RAILWAY === 2
                                  ? '(МСК цагаар GMT+3)'
                                  : ''}
                              </td>
                              <td
                                rowSpan={2}
                                style={{ border: '1px solid #ddd' }}
                              >
                                {' '}
                                {z.WAGONTYPE}
                              </td>
                            </tr>
                            <tr style={{ border: '1px solid #ddd' }}>
                              <td
                                colSpan={2}
                                style={{ border: '1px solid #ddd' }}
                              >
                                Явах/ Departure
                              </td>
                              <td
                                colSpan={2}
                                style={{ border: '1px solid #ddd' }}
                              >
                                Ирэх / Arrival
                              </td>
                            </tr>
                            <tr style={{ border: '1px solid #ddd' }}>
                              <td
                                colSpan={3}
                                style={{ border: '1px solid #ddd' }}
                              >
                                {' '}
                                <b>Галт тэрэг №</b>{' '}
                                {data.rs_payload?.journey?.TRAIN_NO}
                                <br /> Train number
                              </td>
                              <td style={{ border: '1px solid #ddd' }}>
                                <b>{z.WAGONTYPE}</b>
                              </td>
                              <td style={{ border: '1px solid #ddd' }}>
                                <b>Вагон № </b> <br /> Coach number
                              </td>
                              <td style={{ border: '1px solid #ddd' }}>
                                <b>{z.WAGON}</b>
                              </td>
                              <td
                                colSpan={2}
                                style={{ border: '1px solid #ddd' }}
                              >
                                {' '}
                                <b>Мест №</b> <br /> Seat number
                              </td>
                              <td style={{ border: '1px solid #ddd' }}>
                                <b> {z.MEST}</b>
                                <br />
                                <b>
                                  {z.MEST % 2 === 1
                                    ? 'Доод/Lower'
                                    : 'Дээд/Upper'}
                                </b>
                              </td>
                            </tr>
                            <tr style={{ border: '1px solid #ddd' }}>
                              <td
                                colSpan={5}
                                style={{ border: '1px solid #ddd' }}
                              >
                                <b>
                                  <b>Бүх үнэ / Full Price</b>
                                </b>
                                <br />

                                {z.fees?.map(fee => {
                                  return (
                                    <span>
                                      {fee.GROUP_NAME} - {fee.TOTALCOSTTUG}
                                      <br />
                                    </span>
                                  );
                                })}
                              </td>
                              <td
                                colSpan={3}
                                style={{ border: '1px solid #ddd' }}
                              >
                                {' '}
                                <b>Тариф</b>
                                <br />
                                Fare (ticket, reservation)
                                <br />
                                <b> Үнэ, Төг </b>
                                <br />
                                Price / Tug
                                <br />
                                <b> Нэмэлт хураамж, Төг </b>
                                <br />
                                Services, Tug
                              </td>
                              <td style={{ border: '1px solid #ddd' }}>
                                {z.FARECOSTTUG}
                                <br />
                                <br /> {z.TOTALCOSTTUG}
                                <br /> <br />
                                {z.OTHERCOSTTUG}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          className="table-borderless"
                          style={{ width: '100%' }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ width: '50%', marginLeft: '10px' }}>
                                <b>Цахим тасалбарын байдал: </b>
                                <br />
                                E-ticket status
                                <br />
                                <b>
                                  Цахим бүртгэлийг цуцлах боломжтой хугацаа:{' '}
                                </b>
                                <br />
                                E-registration available till
                                <br />
                                <b>Нэмэлт мэдээлэл: </b>
                                <br />
                                Additional information <br />
                                <br />
                                <b>Бүртгэл хийгдсэн он сар, цаг:</b>
                                <br />
                                Date and Time of Booking
                                <br />
                                <b>Тээвэрлэгч</b> <br />
                                Carrier <br />
                                <b> Төлбөрийн хэлбэр</b>
                                <br />
                                Payment method <br />
                                <b>Үйлчилгээний нэмэлт мэдээлэл</b>
                              </td>
                              <td>
                                Цахим бүртгэлээр орсон {z.PRINTED_DATE}
                                <br />
                                Electronic registration
                                <br />
                                {z.PRINTED_DATE}
                                <br />
                                Иргэний үнэмлэх болон регистрийн дугаар бүхий
                                бичиг баримтын хамт хүчинтэй.
                                <br />
                                Valid with passport
                                <br />
                                <br />
                                {z.PRINTED_DATE} <br />
                                <br />
                                УБТЗ <br />
                                UBTZ
                                <br />
                                Банкны карт <br />
                                Bank Card
                                <br />
                                Additional service information
                                <br />
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          className="table-borderless"
                          style={{ width: '100%' }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ width: '70%' }}>
                                <br />{' '}
                                <b>
                                  {' '}
                                  Цахимаар и-тасалбарын захиалгын нөхцөл болон
                                  журам, төлбөрийн хэлбэр, ашиглагдаагүй цахим
                                  тасалбарын буцаалт, гэрээтэй танилцсан болно.{' '}
                                </b>
                                <br />
                                I confirm that i have read and agree with the
                                rules and conditions of the order, e-ticket
                                payment, refund of unused e-ticket and offer
                                contruct.
                                <br />
                                <br />
                                <b>
                                  {' '}
                                  Цахим тасалбарын QRCODE бүхий хэсгийг
                                  нугалж,үрчийлгэсэн тохиолдолд шалгах боломжгүй
                                  болохыг анхаарна уу !
                                </b>
                                <br />
                                I agree with the travel details and confirm that
                                all personal data are correct.
                                <br />
                                <br />
                                <b>
                                  Энэхүү цахим тасалбарыг хэвлэн, вагонд суух
                                  үедээ өөрийн бичиг баримтын хамтаар үзүүлж
                                  сууна уу.{' '}
                                </b>
                                <br />
                                The eticket for your journey please check-in
                                online
                              </td>
                              <td>
                                {z.qrcode ? (
                                  <div className="flex justify-center">
                                    <QRCode size={150} value={z.qrcode} />
                                  </div>
                                ) : (
                                  ''
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <img
                          className=""
                          src="/assets/ticketImagesTrain/logo.png"
                          style={{ width: '100%' }}
                        />
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
