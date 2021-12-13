import React, { FC } from 'react';
import styles from './tapaService.module.scss';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

interface Props {
  tapaServiceList?: any;
  tapaNews?: any;
}

const TapaService: FC<Props> = ({ tapaServiceList, tapaNews }) => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <div className={styles.content}>
        {tapaNews?.map(news => (
          <Link key={news.id} href={`/news/` + news.head}>
            <a className={styles.card} target="_blank">
              <img src={news.src} alt="" />
              <div className="space-y-0 sm:space-y-3">
                <h1 className={styles.title}>{t(`${news.title}`)}</h1>
                <p className="hidden sm:block">{t(`${news.subTitle}`)}</p>
              </div>
            </a>
          </Link>
        ))}
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
