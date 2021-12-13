import { Button, Form, Input } from 'antd';
import ContentWrapper from './style';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useGlobalStore } from '@context/globalStore';

export default function MyProfile() {
  const { user } = useGlobalStore();
  const [isActive, setIsActive] = useState(true);
  const { t } = useTranslation();
  console.log(user);

  return (
    <div className="space-y-8">
      <h1 className="text-cardDate text-lg font-medium">
        {t('userInformation')}
      </h1>
      <ContentWrapper>
        <Form name="basic" layout="vertical">
          <div className="text-cardDate grid sm:grid-cols-2 flex-wrap sm:gap-5">
            <div>
              <label className="text-base pl-2 font-medium" htmlFor="username">
                {t('userName')}
              </label>
              <Form.Item name="username">
                <Input disabled={isActive} />
              </Form.Item>
            </div>
            <div>
              <label className="text-base pl-2 font-medium" htmlFor="email">
                {t('mailTitle')}
              </label>
              <Form.Item name="email">
                <Input disabled={isActive} />
              </Form.Item>
            </div>

            <div>
              <label className="text-base pl-2 font-medium" htmlFor="number">
                {t('numberTitle')}
              </label>
              <Form.Item name="number">
                <Input disabled={isActive} />
              </Form.Item>
            </div>
            <div>
              <label className="text-base pl-2 font-medium" htmlFor="password">
                {t('password')}
              </label>
              <Form.Item name="password">
                <Input.Password disabled={isActive} />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-center mt-4 w-full">
            <Form.Item>
              <button
                className="bg-blue-900 text-white p-3 rounded text-xs sm:text-sm w-56 sm:w-72 hover:bg-blue-800"
                onClick={() => setIsActive(!isActive)}
              >
                {isActive === true ? t('editButton') : t('saveButton')}
              </button>
            </Form.Item>
          </div>
        </Form>
      </ContentWrapper>
    </div>
  );
}
