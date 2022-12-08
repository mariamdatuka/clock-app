import React from 'react'
import styles from './AdditionalInfo.module.css';
import { Time } from '../../interfaces/Interface';
import {motion, AnimatePresence} from 'framer-motion';

export interface Props{
  info: Time | null;
  isClicked:boolean;
  currentTime:string;
}

function AdditionalInfo({info, isClicked, currentTime}:Props) {
  return (
    <AnimatePresence>
      {isClicked && 
       <motion.div className={parseInt(currentTime)>16 || parseInt(currentTime)<6 ? `${styles.darkBox}`:`${styles.gridBox}`}
       initial={{
        opacity:0
       }}
       animate={{
        opacity:1
       }}
       exit={{
       opacity:0,
      }}>
        <div>
          <p className={styles.header}>CURRENT TIMEZONE</p>
          <p className={styles.information}>{info?.timezone}</p>
        </div>
        <div>
          <p className={styles.header}>DAY OF THE WEEK</p>
          <p className={styles.information}>{info?.day_of_week}</p>
        </div>
        <div>
          <p className={styles.header}>DAY OF THE YEAR</p>
          <p className={styles.information}>{info?.day_of_year}</p>
        </div>
        <div>
          <p className={styles.header}>WEEK NUMBER</p>
          <p className={styles.information}>{info?.week_number}</p>
        </div>
      </motion.div>
      }
   
    </AnimatePresence>
  )
}

export default AdditionalInfo