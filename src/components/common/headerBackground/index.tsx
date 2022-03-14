import React from 'react';
import styles from './headerBackground.module.scss';
import { useTranslation } from 'next-i18next';

export default function HeaderBackground(props) {
  const { t } = useTranslation();
  return (
    <div className={styles.body}>
      <img
        src="/assets/backgroundBus.png"
        alt="Logo"
        className={`${props.isBorderRadius ? styles.image1 : styles.image} `}
      />
      <div className={`${props.isBorderRadius ? styles.card1 : styles.card} `}>
        <h1
          className={`${props.isBorderRadius ? styles.title1 : styles.title} `}
        >
          {t('hometitle')}
        </h1>
        <p
          className={`${
            props.isBorderRadius ? styles.description1 : styles.description
          } `}
        >
          {t('homesubtitle')}
        </p>
      </div>
    </div>
  );
}
