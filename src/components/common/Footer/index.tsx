import React, { FC } from 'react';
import styles from './footer.module.scss';

interface Props {
  navbarData?: any;
}

const Footer: FC<Props> = ({ navbarData }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.subFooter}>
        <div className={styles.subBody}>
          <div>
            <h1 style={{ color: '#0A3761' }} className="font-bold text-lg">
              Компаний тухай
            </h1>
            <div className="mt-6">
              {navbarData.companyList.map(company => (
                <a
                  key={company.id}
                  href={'#'}
                  // href={company.route}
                >
                  <p className="mt-2 font-light " style={{ color: '#0A3761' }}>
                    {company.text}
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
              {navbarData.contactList.map(contact => (
                <a
                  key={contact.id}
                  href={'#'}
                  //  href={contact.route}
                >
                  <p className="mt-2 font-light " style={{ color: '#0A3761' }}>
                    {contact.text}
                  </p>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h1 style={{ color: '#0A3761' }} className="font-bold text-lg">
              Биднийг дагаарай
            </h1>
            <div className="flex mt-4">
              <a
                target="_blank"
                href="https://www.facebook.com/TapaTripTravelAgency"
                className="fill-current text-green-600"
              >
                <img
                  src="../../assets/fb.png"
                  className="mr-5 h-8 w-8 text-white"
                />
              </a>
              <a target="_blank" href="https://twitter.com/Tapatrip">
                <img src="../../assets/twitter.png" className="mr-5 h-8 w-8" />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/tapatrip_official/"
              >
                <img
                  src="../../assets/instagram.png"
                  className="mr-5 h-8 w-8"
                />
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <ul className="flex flex-wrap items-center ">
              <li>
                <img src="../../assets/IATA_logo.png" className="p-2" />
              </li>
              <li>
                <img src="../../assets/veri.png" className="p-2" />
              </li>
              <li>
                <img src="../../assets/mastercard.png" className="p-2" />
              </li>
              <li>
                <img src="../../assets/visa.png" className="p-2" />
              </li>
              <li>
                <img src="../../assets/securteTrust.png" className="p-2" />
              </li>
            </ul>
          </div>
        </div>
        <div className="md:hidden pt-5 pb-10">
          <ul className="flex items-center justify-around">
            <li>
              <img src="../../assets/IATA_logo.png" className="p-2" />
            </li>
            <li>
              <img src="../../assets/veri.png" className="p-2" />
            </li>
            <li>
              <img src="../../assets/mastercard.png" className="p-2" />
            </li>
            <li>
              <img src="../../assets/visa.png" className="p-2" />
            </li>
            <li>
              <img src="../../assets/securteTrust.png" className="p-2" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
