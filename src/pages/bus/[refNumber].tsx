import { DownloadOutlined } from '@ant-design/icons';
import { PDFExport } from '@progress/kendo-react-pdf';
import PaymentService from '@services/payment';
import { Button, Empty } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import s from './refNumber.module.scss';
import Loader from '@components/common/loader';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ticketGenerate() {
  const router = useRouter();
  const { refNumber } = router.query;
  const [data, setData] = useState(null);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);

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

  const pdfExportComponent = useRef(null);

  const handleExportWithComponent = event => {
    pdfExportComponent.current.save();
  };

  // function printDocument() {
  //   const input = document.getElementById('divToPrint');
  //   html2canvas(input).then(canvas => {
  //     let imgWidth = 208;
  //     let imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     const imgData = canvas.toDataURL('img/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //     pdf.save('download.pdf');
  //   });
  // }

  function printDocument() {
    const printArea = document.getElementById('divToPrint');

    html2canvas(printArea).then(canvas => {
      const dataURL = canvas.toDataURL();
      const pdf = new jsPDF();
      pdf.addImage(dataURL, 'PNG', 20, 20);

      pdf.save('saved.pdf');
    });
  }

  // function printDocument() {
  //   const printArea = document.getElementById('divToPrint');
  //   html2canvas(printArea).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF({
  //       orientation: 'portrait',
  //     });
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save('download.pdf');
  //   });
  // }

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
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={printDocument}
          >
            Татаж авах
          </Button>
        </div>
      )}
      <div id="asd">
        {/* <PDFExport ref={pdfExportComponent}> */}
        <div className={`${s.a4size} shadow-xl p-14 pt-2 ${s.pdfPage}`}>
          <div id="divToPrint">
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
                    <tr>
                      <th>№</th>
                      <th>Суудал</th>
                      <th>Нас</th>
                      <th>Регистер</th>
                      <th>Овог нэр</th>
                      <th>Даатгал</th>
                    </tr>
                    {data &&
                      data.pax.map((user, index) => (
                        <tr>
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
        {/* </PDFExport> */}
      </div>
    </div>
  );
}
