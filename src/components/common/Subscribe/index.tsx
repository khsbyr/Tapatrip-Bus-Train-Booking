import { MailIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';
import styles from './subscribe.module.scss';

const Subscribe: FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.application}>
        <div className="flex">
          <div className={styles.image}>
            <img src="assets/Application.png" className="h-32" />
          </div>
          <div className={styles.childBody}>
            <h1 className={styles.title}>Тапатрип аппликэйшн татах</h1>
            <p className={styles.description}>
              Нислэг, зочид буудал, аялал, автобус, галт тэрэгний тасалбарыг нэг
              дороос захиалах боломжтой.
            </p>
            <div className={styles.download}>
              <a href="https://apps.apple.com/mn/app/tapatrip-hotel-flight-travel/id1563199559?fbclid=IwAR3t5NGJY47n1B1yZA2VssPtRtdpZykA0dxF6yPLZBB-hZLHHYZ1eocNnhE">
                <img src="assets/App store.png" className="h-8 md:h-10" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.tapatrip">
                <img src="assets/Google play.png" className="h-8 md:h-10" />
              </a>
              <a href="https://appgallery.huawei.com/?fbclid=IwAR1-w45U-mLLn7IC23ClYziQPiZWTRU7lqfC5ODJUpkiqaRHL9i08XCvVPc#/app/C104355437">
                <img src="assets/App gallery.png" className="h-8 md:h-10" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.application}>
        <div className="flex">
          <div className={styles.image}>
            <img src="assets/mail1.png" className="h-28 px-5" />
          </div>
          <div className={styles.childBody}>
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
                <button className={styles.button}>Бүртгэх</button>
              </div>{' '}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
