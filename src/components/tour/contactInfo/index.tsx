import React from 'react';
import s from './contactInfo.module.scss';
import { PhoneIcon } from '@heroicons/react/solid';
import tourData from '@data/tourData.json';

const ContactInfo = () => {
  return (
    <div className={s.main}>
      <h1 className={s.info}>
        Та доорх дугааруудруу холбогдон дэлгэрэнгүй мэдээллүүдийг авах
        боломжтой.
      </h1>

      <div className={s.phoneContent}>
        {tourData?.contact.map(contact => (
          <button className={s.button} key={contact.id}>
            <PhoneIcon className="w-5 h-5" />
            <span className="ml-3 text-lg">{contact.phone}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
