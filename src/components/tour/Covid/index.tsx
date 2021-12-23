import React from 'react';
import s from './covid.module.scss';
import tourData from '@data/tourData.json';

const Covid = () => {
  return (
    <div className={s.main}>
      <h1 className={s.covidText}>КОВИДЫН ҮЕИЙН АЯЛЛЫН ШААРДЛАГА</h1>

      <div className={s.covidImage}>
        {tourData?.covid.map(covid => (
          <img key={covid.id} src={covid.image} className={s.programImage} />
        ))}
      </div>
    </div>
  );
};

export default Covid;
