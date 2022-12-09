import React from 'react'
import styles from './AdditionalInfo.module.css';
import {motion, AnimatePresence} from 'framer-motion';

export interface Props{
  timezone:string;
  isClicked:boolean;
  currentTime:string;
}

function AdditionalInfo({ isClicked, currentTime, timezone}:Props) {

  const currentDay: Date | number | bigint | any =new Date();
  const weekDay:number = currentDay.getDay();
  const fullYear: Date | number | bigint | any = new Date(currentDay.getFullYear(), 0, 0);
  const difference: number = currentDay - fullYear;
  const oneDay: number = 1000 * 60 * 60 * 24;
  const dayOfYear: number = Math.floor(difference / oneDay);
  const week = Math.floor(dayOfYear / 7);
 


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
          <p className={styles.information}>{timezone}</p>
        </div>
        <div>
          <p className={styles.header}>DAY OF THE WEEK</p>
          <p className={styles.information}>{weekDay}</p>
        </div>
        <div>
          <p className={styles.header}>DAY OF THE YEAR</p>
          <p className={styles.information}>{dayOfYear}</p>
        </div>
        <div>
          <p className={styles.header}>WEEK NUMBER</p>
          <p className={styles.information}>{week}</p>
        </div>
      </motion.div>
      }
   
    </AnimatePresence>
  )
}

export default AdditionalInfo