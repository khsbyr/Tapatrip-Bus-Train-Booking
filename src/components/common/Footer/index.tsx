import React, { FC } from 'react';
import styles from './footer.module.scss';
import Link from 'next/link';

interface Props {
  companyInfo?: any;
}

const Footer: FC<Props> = ({ companyInfo }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.subFooter}>
        <div className={styles.subBody}>
          <div className="col-span-2 md:col-span-1">
            <h1 style={{ color: '#0A3761' }} className="font-bold text-lg">
              Холбоо барих
            </h1>
            <div className="mt-5 text-cardDate mr-0 md:mr-10 space-y-1">
              <p>
                <b>Хаяг:</b> Хан-Уул дүүрэг, 11 хороо, Их монгол улсын гудамж,
                Ривер Гарден хотхон 308 байр, Улаанбаатар хот, Монгол Улс
              </p>
              <p>
                <b>Утасны дугаар:</b> (976)-75154444
              </p>
              <p>
                <b>И-мэйл хаяг:</b> crm@tapatrip.com
              </p>
            </div>
          </div>
          <div>
            <h1 style={{ color: '#0A3761' }} className="font-bold text-lg">
              Компаний тухай
            </h1>
            <div className="mt-6">
              {companyInfo?.map(company => (
                <Link key={company.id} href={company.head.replace(/[ ]/g, '')}>
                  <a
                    target="_blank"
                    className="hover:underline hover:text-cardDate"
                  >
                    <p
                      className="mt-2 font-light "
                      style={{ color: '#0A3761' }}
                    >
                      {company.title}
                    </p>
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h1 style={{ color: '#0A3761' }} className="font-bold text-lg">
              Биднийг дагах
            </h1>
            <div className="flex mt-4">
              <a
                target="_blank"
                href="https://www.facebook.com/TapaTripTravelAgency"
              >
                <img
                  src="../../assets/Facebook.png"
                  className="mr-5 h-8 w-8 text-white hover:scale-105"
                />
              </a>
              <a target="_blank" href="https://twitter.com/Tapatrip">
                <img
                  src="../../assets/twitter.png"
                  className="mr-5 h-8 w-8 hover:scale-105"
                />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/tapatrip_official/"
              >
                <img
                  src="../../assets/instagram.png"
                  className="mr-5 h-8 w-8 transform hover:scale-105"
                />
              </a>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-wrap justify-center items-center md:justify-start gap-3 md:gap-1">
              <img
                src="/assets/IATA_logo.png"
                className="h-8 p-0 md:p-3 md:h-full"
              />
              <img
                src="/assets/veri.png"
                className="h-8 p-0 md:p-3  md:h-full"
              />
              <img
                src="/assets/mastercard.png"
                className="h-8 p-0 md:p-3 md:h-full"
              />
              <img
                src="/assets/visa.png"
                className="h-6 p-0 md:p-3 md:h-full"
              />
              <img src="/assets/securteTrust.png" className="h-8 md:h-full" />
            </div>
          </div>
        </div>
        <p
          className="text-center py-8"
          style={{ color: 'rgba(2, 48, 71, 0.5)' }}
        >
          © Зохиогчийн эрхийг хуулийн дагуу Тапатрип ХХК эзэмшинэ.
        </p>
      </div>
    </div>
  );
};

export default Footer;
