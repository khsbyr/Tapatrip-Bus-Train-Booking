import React from 'react';
import s from './package.module.scss';
import tourData from '@data/tourData.json';

const Package = () => {
  return (
    <div className={s.main}>
      <h1 className={s.packageText}>АЯЛЛЫН ҮНЭД БАГТСАН ЗҮЙЛС</h1>

      <div className={s.packageContent}>
        <div className="p-12 -mt-6">
          <img src="/assets/tourImages/island.png" />
        </div>

        <div className={s.packageList}>
          <ul>
            {tourData?.package1?.map(package1 => (
              <li className={s.list} key={package1.id}>
                <img src={package1.image} className="h-12 w-12" />
                {package1.text}
              </li>
            ))}
          </ul>

          <ul>
            {tourData?.package2?.map(package1 => (
              <li className={s.list} key={package1.id}>
                <img src={package1.image} className="h-12 w-12" />
                {package1.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Package;
