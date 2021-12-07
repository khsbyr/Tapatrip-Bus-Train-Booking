import React, { FC } from 'react';
import styles from './tapaService.module.scss';
import { useTranslation } from 'next-i18next';
interface Props {
  tapaServiceList?: any;
}

const TapaService: FC<Props> = ({ tapaServiceList }) => {
  const { t } = useTranslation(['common']);
  return (
    <div className={styles.body}>
      {tapaServiceList.map(service => (
        <div key={service.id} className={styles.card}>
          <img src={service.image} className="w-32 h-28" />
          <div className="ml-5">
            <h1 className={styles.title}>{t(`${service.title}`)}</h1>
            <p className="text-sm" style={{ color: '#0A3761' }}>
              {/* {t(`${service.body}`)} */}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TapaService;
