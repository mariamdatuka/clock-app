import React from 'react'
import styles from './AdditionalInfo.module.css';
import { Time } from '../../interfaces/Interface';

export interface Props{
  info: Time | null;
}

function AdditionalInfo({info}:Props) {
  return (
    <div className={styles.divv}>{info?.day_of_week}</div>
  )
}

export default AdditionalInfo