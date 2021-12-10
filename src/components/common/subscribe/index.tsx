import { MailIcon } from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import styles from './subscribe.module.scss';
import AuthService from '@services/auth';
import { message, Input, Form, Modal } from 'antd';
import ContentWrapper from './style';
import { validateMessages } from '@helpers/constantValidation';
import { useTranslation } from 'next-i18next';

const Subscribe: FC = () => {
  const [emailInput, setEmailInput] = useState();
  const { t } = useTranslation(['common']);
  const email = e => {
    setEmailInput(e.target.value);
  };

  const emailRegister = async () => {
    if (emailInput === undefined || emailInput === '') {
      message.warning(t('messageWarningEmail'));
    } else {
      try {
        const result = await AuthService.emailSubscribe(emailInput);
        if (result.status === 200) {
          message.info(t('messageWarningInfo'));
        }
        if (result.status === 201) {
          message.success(t('messageWarningSuccess'));
        }
      } catch (e) {
        Modal.error({
          title: t('errorOrderTitle'),
          content: e.message,
        });
      }
    }
  };

  return (
    <ContentWrapper>
      <Form validateMessages={validateMessages}>
        <div className={styles.body}>
          <div className={styles.application}>
            <div className="flex">
              <div className={styles.image}>
                <img src="assets/Application.png" className="h-32" />
              </div>
              <div className={styles.childBody}>
                <h1 className={styles.title}>{t('appDownloadTitle')}</h1>
                <p className={styles.description}>{t('appDownloadBody')}</p>
                <div className={styles.download}>
                  <a
                    className="mr-1"
                    target="_blank"
                    href="https://apps.apple.com/mn/app/tapatrip-hotel-flight-travel/id1563199559?fbclid=IwAR3t5NGJY47n1B1yZA2VssPtRtdpZykA0dxF6yPLZBB-hZLHHYZ1eocNnhE"
                  >
                    <div className="flex justify-between px-2 rounded-md bg-black text-white w-28 h-10 hover:bg-gray-700 items-center">
                      <div className="">
                        <img src="/assets/apple.png" height="24" width="24" />
                      </div>
                      <div className="">
                        <h1 className="text-small text-white">
                          Download on the
                        </h1>
                        <h1 className="text-xs text-white font-medium">
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
                    <div className="flex justify-between px-2 rounded-md bg-black text-white w-28 h-10 hover:bg-gray-700 items-center">
                      <div className="">
                        <img
                          src="/assets/playStore.png"
                          height="24"
                          width="24"
                        />
                      </div>
                      <div className="">
                        <h1 className="text-small text-white">GET IT ON</h1>
                        <h1 className="text-xs text-white font-medium">
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
                    <div className="flex justify-between px-2 rounded-md bg-black text-white w-28 h-10 hover:bg-gray-700 items-center">
                      <div className="">
                        <img src="/assets/huawei.png" height="24" width="24" />
                      </div>
                      <div className="">
                        <h1 className="text-small text-white">EXPLORE IT ON</h1>
                        <h1 className="text-xs text-white font-medium">
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
                <h1 className={styles.title}>{t('getIncentivesGmail')}</h1>
                <div className="flex flex-wrap gap-1">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        type: 'email',
                        message: t('getIncentivesError'),
                      },
                    ]}
                  >
                    <div className={styles.subBody}>
                      <MailIcon
                        className="w-8 h-8 ml-4"
                        style={{ color: '#8AB1D5' }}
                      />
                      <Input
                        placeholder={t('getIncentivesWarning')}
                        onChange={email}
                      />

                      <button className={styles.button} onClick={emailRegister}>
                        {t('registrationButton')}
                      </button>
                    </div>
                  </Form.Item>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </ContentWrapper>
  );
};

export default Subscribe;
