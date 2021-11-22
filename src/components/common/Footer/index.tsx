import React, { FC } from 'react';
import styles from './footer.module.scss';
import Link from 'next/link';

interface Props {
  companyInfo?: any;
}

const Footer: FC<Props> = ({ companyInfo }) => {
  console.log(companyInfo);
  return (
    <div className={styles.footer}>
      <div className={styles.subFooter}>
        <div className={styles.subBody}>
          <div>
            <h1 style={{ color: '#0A3761' }} className="font-bold text-lg">
              Компаний тухай
            </h1>
            <div className="mt-6">
              {companyInfo?.map(company => (
                <Link key={company.id} href={company.path}>
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
              Холбоо барих
            </h1>
            <div className="mt-5 mt-2 text-cardDate mr-0 md:mr-8 xl:mr-10 space-y-1">
              <p>
                <b>Хаяг:</b> Хан-Уул дүүрэг, 11 хороо, Их монгол улсын гудамж,
                Ривер Гарден хотхон 308 байр, Улаанбаатар хот, Монгол Улс
              </p>
              <p>
                <b>Утасны дугаар:</b> (976)-75154444
              </p>
              <p>
                <b>И-мэйл хаяг:</b> Crm@tapatrip.com
              </p>
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
          <div className="hidden md:block">
            <div className="flex flex-wrap">
              <img src="/assets/IATA_logo.png" className="p-3" />
              <img src="/assets/veri.png" className="p-3" />
              <img src="/assets/mastercard.png" className="p-3" />
              <img src="/assets/visa.png" className="p-3" />
              <img src="/assets/securteTrust.png" />
            </div>
          </div>
        </div>
        <div className="block md:hidden mb-10 mt-5">
          <div className="flex flex-wrap gap-2">
            <img
              src="/assets/IATA_logo.png"
              className="pr-5"
              width="70"
              height="25"
            />
            <img
              src="/assets/veri.png"
              className="pr-5"
              width="70"
              height="25"
            />
            <img
              src="/assets/mastercard.png"
              className="pr-5"
              width="70"
              height="25"
            />
            <img
              src="/assets/visa.png"
              className="pr-5"
              width="70"
              height="25"
            />
            <img src="/assets/securteTrust.png" width="70" height="25" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
