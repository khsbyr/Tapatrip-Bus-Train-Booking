import { MailIcon, MenuIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';

interface Props {
  navbarData?: any;
}

const Footer: FC<Props> = ({ navbarData }) => {
  return (
    <div className="bg-white " style={{ height: 'auto' }}>
      <div className="max-w-7xl mx-auto py-12 px-3 md:py-20 md:px-6">
        <div className="grid grid-cols-2 gap-10 md:gap-0 md:grid-cols-4">
          <div>
            <h1 style={{ color: '#0A3761' }} className="font-bold text-lg">
              Компаний тухай
            </h1>
            <div className="mt-6">
              {navbarData.companyList.map(z => (
                <a href={z.route}>
                  <p className="mt-2 font-light " style={{ color: '#0A3761' }}>
                    {z.text}
                  </p>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h1 style={{ color: '#0A3761' }} className="font-bold text-lg">
              Холбоо барих
            </h1>
            <div className="mt-6">
              {navbarData.contactList.map(z => (
                <a href={z.route}>
                  <p className="mt-2 font-light " style={{ color: '#0A3761' }}>
                    {z.text}
                  </p>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h1 style={{ color: '#0A3761' }} className="font-bold text-lg">
              Биднийг дагаарай
            </h1>
            <div className="flex mt-6">
              <img src="../assets/Facebook.png" className="mr-5" />
              <img src="../assets/twitter.png" className="mr-5" />
              <img src="../assets/instagram.png" />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap">
              <img src="../assets/IATA_logo.png" className="p-3" />
              <img src="../assets/veri.png" className="p-3" />
              <img src="../assets/mastercard.png" className="p-3" />
              <img src="../assets/visa.png" className="p-3" />
              <img src="../assets/securteTrust.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
