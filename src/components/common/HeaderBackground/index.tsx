import path from 'path';
import React, { FC } from 'react';
import styles from './background.module.scss';
import styles1 from './FooterBackground.module.scss';
import { useRouter } from 'next/router';
export default function HeaderBackground(props) {
  const router = useRouter();
  const pathname = router.pathname;
  console.log(router.pathname);
  return (
    <div className={styles.body}>
      <img
        src="/assets/Header.png"
        alt="Logo"
        className={`${props.isBorderRadius ? styles.image1 : styles.image} `}
      />
      <div className={`${props.isBorderRadius ? styles.card1 : styles.card} `}>
        <h1
          className={`${props.isBorderRadius ? styles.title1 : styles.title} `}
        >
          Аяллын цогц шийдэл
        </h1>
        <p
          className={`${
            props.isBorderRadius ? styles.description1 : styles.description
          } `}
        >
          Онлайн аяллын платформ
        </p>
      </div>
    </div>
  );
}
