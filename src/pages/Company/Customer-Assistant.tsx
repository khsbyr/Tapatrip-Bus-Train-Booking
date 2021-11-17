import HeaderBackground from '@components/common/HeaderBackground/';
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';
import NavData from '@data/navData.json';

export default function customerAssistant() {
  return (
    <div className="">
      <HeaderBackground isBorderRadius={true} />
      <Navbar navbarData={NavData} />
      <div className="bg-bg py-5 px-7 lg:py-10 sm:px-20">
        <div className="max-w-7xl mx-auto text-cardDate space-y-5">
          <div className="text-center font-bold text-xl">About us </div>
          <div className="text-base font-medium space-y-4">
            <p>
              “Tapatrip” LLC is a group of companies established to provide
              integrated online travel services. Since 2007, subsidiary company
              "Tapatrip Agency" LLC has been officially providing its customers
              with the opportunity to fly to any city in the world.
            </p>
            <p>
              We provide a variety of adventurous travel services to customer
              that includes purchasing airline tickets to every location in the
              world, offering 1 million hotels in 195 countries of the world.
              “Tapatrip” platform is the next generation system based on
              artificial intelligence.
            </p>
            <p>
              Users will be able to use the platform with data analysis based on
              big data in Mongolian, English, and Chinese. The customers who
              choose us can get services and information in their mother
              languages and 24/7 services will be provided in English and
              Chinese. Through expanding of operation, the branches are
              established in 55 countries, as a result, the customers can
              contact a service provider in the same time zone. Let’s explore
              the world.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-bg font-Roboto">
        <Footer navbarData={NavData} />
      </div>
    </div>
  );
}
