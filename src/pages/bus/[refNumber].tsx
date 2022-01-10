import Loader from '@components/common/loader';
import PaymentService from '@services/payment';
import { Button, Empty } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
      let data = {
        ref_number: refNumber,
      };
      try {
        const res = await PaymentService.checkTicket(data);
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

  function printDocument() {
    setLoading1('true');
    const printArea = document.getElementById('divToPrint');
    html2canvas(printArea, { scale: 2 }).then(canvas => {
      const dataURL = canvas.toDataURL();
      const pdf = new jsPDF();
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(dataURL, 'PNG', 0, 0, width, height);
      pdf.save('tapatrip_ticket.pdf');
      setLoading1('false');
    });
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
        <div className="text-center my-10">
          <Button type="primary" onClick={printDocument}>
            {loading1 === 'true' ? (
              <div className={s.ldsDualRing} />
            ) : (
              'Татаж авах'
            )}
          </Button>
        </div>
      )}
      <div id="asd">
        <div className={`${s.a4size} shadow-xl pt-2 ${s.pdfPage}`}>
          <div id="divToPrint" className="p-14 pt-5">
            {status !== 200 ? (
              <Empty description={'Захиалгын мэдээлэл олдсонгүй'} />
            ) : (
              <>
                <img src="/assets/svgIcons/NewLogo.svg" />

                <div className="text-md font-medium text-gray-700 mt-4">
                  <div className="">Захиалгын мэдээлэл</div>
                </div>

                <div
                  className="bg-gray-100 w-full mt-5"
                  style={{ height: '2px' }}
                />

                <div className="mt-5">
                  <table className={s.table}>
                    <tr>
                      <th>Чиглэл:</th>
                      <td>{data && data.schedule_object.direction_name}</td>
                    </tr>
                    <tr>
                      <th>Хаанаас:</th>
                      <td>{data && data.schedule_object.start_stop_name}</td>
                    </tr>
                    <tr>
                      <th>Хаашаа:</th>
                      <td>{data && data.schedule_object.end_stop_name}</td>
                    </tr>
                    <tr>
                      <th>Хөдлөх огноо:</th>
                      <td>
                        {data && data.schedule_object.leave_date}{' '}
                        {data && data.schedule_object.leave_time}
                      </td>
                    </tr>
                    <tr>
                      <th>ААН:</th>
                      <td>
                        {data && data.schedule_object.bus.transporter_name}
                      </td>
                    </tr>
                    <tr>
                      <th>Марк загвар:</th>
                      <td>{data && data.schedule_object.bus.model_name}</td>
                    </tr>
                    <tr>
                      <th>Суудлын тоо:</th>
                      <td>{data && data.schedule_object.bus.seat_count}</td>
                    </tr>
                    <tr>
                      <th>Улсын дугаар:</th>
                      <td>{data && data.schedule_object.bus.plate_number}</td>
                    </tr>
                  </table>
                </div>

                <div className="text-md font-medium text-gray-700 mt-5">
                  <div className="">Зорчигчдын мэдээлэл</div>
                </div>

                <div
                  className="bg-gray-100 w-full mt-5"
                  style={{ height: '2px' }}
                />

                <div className="mt-5">
                  <table className={s.table1}>
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Суудал</th>
                        <th>Нас</th>
                        <th>Регистер</th>
                        <th>Овог нэр</th>
                        <th>Даатгал</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.pax.map((user, index) => (
                          <tr key={index}>
                            <td>{++index}</td>
                            <td>{user.seat}</td>
                            <td>{user.is_child ? 'Хүүхэд' : 'Том хүн'}</td>
                            <td>{user.document_number}</td>
                            <td>
                              {user.first_name} {user.last_name}
                            </td>
                            <td>{data.schedule_object.insurance_name}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {data && data?.ebarimt.id ? (
              <>
                {' '}
                <div className="text-md font-medium text-gray-700 mt-5">
                  <div className="">Сугалааны мэдээлэл</div>
                </div>
                <div
                  className="bg-gray-100 w-full mt-5"
                  style={{ height: '2px' }}
                />
                <div className="mt-5 grid grid-cols-2">
                  <div className="mt-4">
                    <QRCode size={200} value={data?.ebarimt?.qr_data} />
                  </div>

                  <div>
                    <ul className={s.ebarimt}>
                      <li className={s.title}>Сугалааны огноо:</li>
                      <li>{data?.ebarimt?.date}</li>
                      <li className={s.title}>Сугалааны дугаар:</li>
                      <li>{data?.ebarimt?.lottery}</li>
                      <li className={s.title}>ДДТД:</li>
                      <li>{data?.ebarimt?.id}</li>
                      <li className={s.title}>Нийт дүн:</li>
                      <li>{data?.ebarimt?.amount}</li>
                      <li className={s.title}>Бүртгүүлэх дүн:</li>
                      <li>{data?.ebarimt?.amount}</li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
