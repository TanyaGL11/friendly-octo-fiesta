/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { useState } from 'react';
import { useStatistics } from '../../components/hooks/useStatistics';
import './style.css'


export const Dino = () => {
  useStatistics()
  const [flag, setFlag] = useState(false);
  const [clicked, setClicked] = useState('dino');
  const [flagGo, setFlagGo] = useState(false)

 // function jump(flag) {
  if (flag===true) {
    setClicked('jump');
    setFlag(false)
  }
  
   /*   if (flagGo === true && flag===false) {
        setClicked('dino_r')
        setFlagGo(false)
        
      }
      else {
        setClicked('dino')
        setFlagGo(true)
      }*/
  
  
  return (
    <div className='dinoconva' 
          onClick={() => 
            setFlag(true) 
            }>
      <div className={`${clicked}`} />
      <div className='cactus'></div>
    </div>
  )
}