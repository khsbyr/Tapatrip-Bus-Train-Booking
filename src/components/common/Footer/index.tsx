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
                <a key={company.id} href={company.route}>
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
                <a key={contact.id} href={contact.route}>
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
