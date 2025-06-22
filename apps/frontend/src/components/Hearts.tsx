import React from 'react';
import styles from './Hearts.module.css';

const hearts = [
  { colorClass: styles.colorMintGreen, style: styles.colorMintGreen }, // mintGreen
  { colorClass: styles.colorBlueViolet, style: styles.colorBlueViolet }, // blueViolet
  { colorClass: styles.colorSoftMauve, style: styles.colorSoftMauve }, // softMauve
  { colorClass: styles.colorGoldenYellow, style: styles.colorGoldenYellow }, // goldenYellow
];

export default function Hearts() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Central white heart */}
      <div className={styles.centralHeart}>
        ❤️
      </div>
      {/* Colored hearts around */}
      <div className={styles.position1}>
        <span className={hearts[0].colorClass}>
          ❤️
        </span>
      </div>
      <div className={styles.position2}>
        <span className={hearts[1].colorClass}>
          ❤️
        </span>
      </div>
      <div className={styles.position3}>
        <span className={hearts[2].colorClass}>
          ❤️
        </span>
      </div>
      <div className={styles.position4}>
        <span className={hearts[3].colorClass}>
          ❤️
        </span>
      </div>
    </div>
  );
}
