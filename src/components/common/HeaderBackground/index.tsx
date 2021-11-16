import React, { FC } from 'react';
import styles from './background.module.scss';

export default function HeaderBackground() {
  return (
    <div className={styles.body}>
      <img src="assets/Header.png" alt="Logo" className={styles.image} />
      <div className={styles.card}>
        <h1 className={styles.title}>Аяллын цогц шийдэл</h1>
        <p className={styles.description}>Онлайн аяллын платформ</p>
      </div>
    </div>
  );
}
