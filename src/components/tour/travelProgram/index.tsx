import React from 'react';
import s from './travelProgram.module.scss';
import tourData from '@data/tourData.json';

const TravelProgram = () => {
  return (
    <div className={s.main}>
      <h1 className={s.programText}>АЯЛАЛ, ХӨТӨЛБӨР</h1>

      <div className={s.imageContent}>
        {tourData?.travelProgramList.map(program => (
          <div key={program.id}>
            <img src={program.image} className={s.programImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelProgram;
