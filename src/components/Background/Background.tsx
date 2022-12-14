import styles from './Background.module.css';
import refresh from '../../assets/desktop/icon-refresh.svg';
import axios from "axios";
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Phrases} from '../../interfaces/Interface';
import sun from '../../assets/desktop/icon-sun.svg';
import moon from '../../assets/desktop/icon-moon.svg'
import arrowup from '../../assets/desktop/icon-arrow-up.svg'
import arrowdown from '../../assets/desktop/icon-arrow-down.svg'
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';


const Background= () =>{

    const [quotes, setQuotes] =useState<Phrases | null>(null);
    const [currentTime, setCurrentTime] =useState<string>('');
    const [isClicked, setItClicked] =useState<boolean>(false);

    const isFirstRender=useRef(true);

    const timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const updateQuote=()=>{
      const URL = "https://api.quotable.io/random";
      axios.get(URL).then((response) => {
        setQuotes(response.data);
      });
    }

    const updateTime=()=>{
      const date =new Date();
      const timestamp=date.toLocaleString('en-US', {
       hour:'numeric',
       minute: 'numeric',
       hour12: false,
      });
      setCurrentTime(timestamp);
    }

       useEffect(()=>{
        updateQuote();
       }, [])


      useLayoutEffect(()=>{
        if(isFirstRender.current){
           updateTime();
           isFirstRender.current=false;
        }
      const interval=setInterval(()=>{
       updateTime();
     }, 1000);

     return()=>clearInterval(interval);

    }, []);  

   
  return (
    <>
    <div className={parseInt(currentTime)>15 || parseInt(currentTime)<6 ?`${styles.backgroundNight}`:`${styles.backgroundDay}`}>
     <div className={styles.quotesBox}>
      <div>
      <div className={styles.quotes}>"{quotes?.content}"
      </div>
       <p className={styles.author}>{quotes?.author}</p>
    </div>
     <div className={styles.refresh}
      onClick={updateQuote}>
      <img src={refresh} alt='refresh'/>
     </div>
    </div>
    <div>
    <div className={styles.timeBox}>
    {parseInt(currentTime)>15 || parseInt(currentTime)<6 ?
        <div className={styles.title}> 
        <img src={moon} alt='sun'/>Good Evening it's currently</div>
       : <div className={styles.title}> 
         <img src={sun} alt='sun'/>Good morning it's currently
         </div>}
    
    <div className={styles.currentTime}>
     <h1>{currentTime}</h1>
    </div>
    <div className={styles.timezone}>
     in {timezone}
    </div>
    </div>
     <div className={styles.box}>
    <div className={styles.buttonBox} onClick={()=>setItClicked(!isClicked)}>
    <p className={styles.button}>
      {isClicked?'LESS':'MORE'}
    </p>
    <div className={styles.arrowDown}>
    <img src={!isClicked?arrowdown:arrowup} alt='arrow-down/up'/>
    </div>
    </div>
    </div>
     <AdditionalInfo 
     isClicked={isClicked} 
     currentTime={currentTime}
     timezone={timezone}/>
    </div>
    </div>
    </>
  )
}

export default Background;