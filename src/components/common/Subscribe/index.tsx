import { MailIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';
import styles from './subscribe.module.scss';

const Subscribe: FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.application}>
        <div className="flex">
          <div className="flex items-center">
            <img src="assets/Application.png" />
          </div>
          <div className={styles.childBody}>
            <h1 className={styles.title}>Тапатрип аппликэйшн татах</h1>
            <p className={styles.description}>
              Нислэг, зочид буудал, аялал, автобус, галт тэрэгний тасалбарыг нэг
              дороос захиалах боломжтой.
            </p>
            <div className="flex flex-wrap">
              <img src="assets/App store.png" className="h-10 " />
              <img src="assets/Google play.png" className="h-10 " />
              <img src="assets/App gallery.png" className="h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.application}>
        <div className="flex items-center">
          <div className="flex items-center">
            <img src="assets/mail.png" className="h-auto" />
          </div>
          <div className="space-y-7">
            <h1 className={styles.title}>
              Онцгой хөнгөлөлт, урамшуулал, шинчлэлийг имэйлээр авахыг хүсэж
              байна уу?
            </h1>
            <div className="flex flex-wrap gap-1">
              <div className={styles.subBody}>
                <MailIcon
                  className="w-8 h-8 ml-4"
                  style={{ color: '#8AB1D5' }}
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder="И-Мэйл хаягаа оруулна уу"
                  aria-label="Full name"
                />
              </div>{' '}
              <div>
                <button className={styles.button}>Бүртгэх</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
