import React from 'react';
import styles from './headerBackground.module.scss';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function HeaderBackground(props) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className={styles.body}>
      <img
        src={
          router.pathname === '/train'
            ? '/assets/trainBGG.png'
            : '/assets/busBGGG.png'
        }
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
