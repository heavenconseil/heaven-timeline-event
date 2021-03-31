import styles from '../styles/Main.module.scss'
import InfoItem from "./InfoItem"
import TimelineData from './data.json';
import React, { useState } from 'react';






function InfoTimeline({currentItem}) {



  return (
    <div className={styles.boxContainerCard}>

      {currentItem != null && <InfoItem currentItem={currentItem} />}
    </div>
  );
}

export default InfoTimeline;