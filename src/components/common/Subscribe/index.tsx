import { MailIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';
import styles from './subscribe.module.scss';
import Image from 'next/image';
import apple from '@public/assets/apple.png';
import playStore from '@public/assets/playStore.png';
import huawei from '@public/assets/huawei.png';
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
              <a
                className="mr-1"
                target="_blank"
                href="https://apps.apple.com/mn/app/tapatrip-hotel-flight-travel/id1563199559?fbclid=IwAR3t5NGJY47n1B1yZA2VssPtRtdpZykA0dxF6yPLZBB-hZLHHYZ1eocNnhE"
              >
                <div className="flex justify-center rounded-md bg-black text-white w-full h-10 hover:bg-gray-400 mt-1 py-1 w-[7.75rem]">
                  <div className="pr-1 pt-1">
                    <Image src={apple} height="24" width="24" />
                  </div>
                  <div className="">
                    <h1 className="text-[10px] text-white">Download on the</h1>
                    <h1 className="text-base text-white font-medium -mt-1">
                      App Store
                    </h1>
                  </div>
                </div>
              </a>
              <a
                className="mr-1"
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.tapatrip"
              >
                <div className="flex justify-center rounded-md bg-black text-white w-full h-10 hover:bg-gray-400 mt-1 py-1 w-[7.75rem]">
                  <div className="pr-1 pt-1">
                    <Image src={playStore} height="24" width="24" />
                  </div>
                  <div className="">
                    <h1 className="text-[10px] text-white">GET IT ON</h1>
                    <h1 className="text-base text-white font-medium -mt-1">
                      Google Play
                    </h1>
                  </div>
                </div>
              </a>
              <a
                className="mr-1"
                target="_blank"
                href="https://appgallery.huawei.com/?fbclid=IwAR1-w45U-mLLn7IC23ClYziQPiZWTRU7lqfC5ODJUpkiqaRHL9i08XCvVPc#/app/C104355437"
              >
                <div className="flex justify-center rounded-md bg-black text-white w-full h-10 hover:bg-gray-400 mt-1 py-1 w-[7.75rem]">
                  <div className="pr-1 pt-1">
                    <Image src={huawei} height="24" width="24" />
                  </div>
                  <div className="">
                    <h1 className="text-[10px] text-white">EXPLORE IT ON</h1>
                    <h1 className="text-base text-white font-medium -mt-1">
                      AppGallery
                    </h1>
                  </div>
                </div>
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
