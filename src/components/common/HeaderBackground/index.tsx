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
        className={`${pathname === '/bus' ? styles.image : styles.image1} `}
      />
      <div className={`${pathname === '/bus' ? styles.card : styles.card1} `}>
        <h1
          className={`${pathname === '/bus' ? styles.title : styles.title1} `}
        >
          Аяллын цогц шийдэл
        </h1>
        <p
          className={`${
            pathname === '/bus' ? styles.description : styles.description1
          } `}
        >
          Онлайн аяллын платформ
        </p>
      </div>
    </div>
  );
}
