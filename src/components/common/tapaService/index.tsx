import React, { FC } from 'react';
import styles from './tapaService.module.scss';
import { useTranslation } from 'next-i18next';
interface Props {
  tapaServiceList?: any;
}

const TapaService: FC<Props> = ({ tapaServiceList }) => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <div className={styles.content}>
        <a className={styles.card} href="bus/instructions" target="_blank">
          <img src="/assets/svgIcons/anhaarah.svg" alt="" />
          <h1 className={styles.title}>{t('passengeСonsiderations')}</h1>
        </a>
        <a
          className={styles.card}
          href="/bus/instructions/considerations"
          target="_blank"
        >
          <img src="/assets/svgIcons/zaavar.svg" alt="" />
          <h1 className={styles.title}>{t('videoInstructions')}</h1>
        </a>
      </div>
      <div className={styles.body}>
        {tapaServiceList.map(service => (
          <a
            target="_blank"
            key={service.id}
            className={styles.card}
            href={service.link}
          >
            <img src={service.image} className="w-full" />
          </a>
        ))}
      </div>
    </>
  );
};

export default TapaService;
