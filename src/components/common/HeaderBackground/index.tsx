import React, { FC } from 'react';
import styles from './background.module.scss';

const HeaderBackground: FC = () => {
  return (
    <div className={styles.body}>
      <img src="assets/Header.png" alt="Logo" className={styles.image} />
      <div className={styles.card}>
        <h1 className={styles.title}>Аяллын цогц шийдэл</h1>
        <p className={styles.description}>Тийз захиалгын онлайн платформ</p>
      </div>
    </div>
  );
};

export default HeaderBackground;
