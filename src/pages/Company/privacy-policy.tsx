import Head from 'next/head';
import HeaderBackground from '@components/common/HeaderBackground';
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';
import NavData from '@data/navData.json';

export default function privacyPolicy() {
  return (
    <>
      <Head>
        <title>Tapatrip - Privacy Policy</title>
      </Head>
      <div className="">
        <HeaderBackground isBorderRadius={true} />
        <Navbar navbarData={NavData} />
        <div className="bg-bg py-5 px-7 lg:py-10 sm:px-20">
          <div className="max-w-7xl mx-auto text-cardDate space-y-5">
            <div className="text-center font-bold text-xl">
              Нууцлалын баталгаа
            </div>
            <div className="text-base font-medium space-y-4">
              <p className="font-bold">Баталгаа</p>
              <p>
                Тапатрип Эжэнси ХХК /Tapatrip Agency LLC/ нь www.tapatrip.com
                вэб сайт болон Tapatrip гар утасны аппликэйшнээр /цаашид
                Тапатрип гэх/ үйлчлүүлэгчдийн мэдээллийн нууцлалыг нэн тэргүүнд
                тавих ба мэдээллийн халдашгүй байдлыг бүх түвшинд ханган
                ажиллана. Та Тапатрипээр үйлчлүүлж үйлчлүүлэгч болох нь дараах
                нууцлалын баталгааг хүлээн зөвшөөрсөнд тооцогдоно.
              </p>
              <p className="font-bold">Хэрэглэгчийн хувийн мэдээлэл</p>
              <p>
                Үйлчлүүлэгчийн хайлт болон захиалгын явцад оруулсан мэдээлэл
                манай платформд аюулгүйгээр хадгалагдах болно. Бид харилцагчийн
                оруулсан мэдээллийг зөвхөн танд тустай нөхцөлөөр буюу
                харилцагчийн хүсэлтэнд хариулах, хиймэл оюун ухааны
                тусламжтайгаар харилцагчийн хэрэгцээнд таарсан нислэг, буудал,
                аялалыг санал болгох, зарим шаардлагатай мэдээллийг хүргэхээр
                холбоо барих зэрэгт ашиглана.
              </p>
              <p className="font-bold">Мэдээллийн хамгаалалт</p>
              <p>
                Тапатрип платформ мэдээллийн аюулгүй байдалд чиглэгдсэн бүх
                төрлийн стандатруудыг хангасан үүлэн тооцоолол байрладаг. Хууль,
                хяналтын байгууллагын албан ёсны шаардлага дээр үндэслэн хамтран
                ажиллахаас бусад ямар ч нөхцөлд хувь хүний мэдээллийг бусдад үл
                дамжуулна. Үүнтэй зэрэгцэн харилцагч өөрийн мэдээллийн аюулгүй
                байдлыг хангах үүднээс бусдад нэвтрэх нэр, нууц үгээ дамжуулах
                болон алдахаас сэргийлэх шаардлагатай.
              </p>
              <p className="font-bold">Өөрчлөлт</p>
              <p>
                Дээр дурдсан нууцлалын баталгаанд бид ямар нэгэн
                анхааруулгагүйгээр өөрчлөлт оруулах эрхтэй бөгөөд харилцагч нь
                үйлчилгээ үзүүлэгчийн үйлчилгээний нөхцөлийн хамгийн сүүлийн
                хувилбартай танилцаж байх үүрэгтэй.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-bg font-Roboto">
          <Footer navbarData={NavData} />
        </div>
      </div>
    </>
  );
}
