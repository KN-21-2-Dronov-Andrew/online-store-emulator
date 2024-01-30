import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'

const MinGoodItem = (props) => {

    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const getImgObj = async () => {
            const resp = await fetch(props.data.thumbImgUrl);
            const blob = await resp.blob();
            return URL.createObjectURL(blob);
          }
          getImgObj()
              .then(res => setImgSrc(res))
              .catch(err => console.log(err));
    }, []);
  return (
    <div className='good-card'>
        <img src={imgSrc} alt="" />
        <p className='good-name'>{props.data.name}</p>
        <p>{props.data.price}$</p>
        <button onClick={() => props.clickHandler(props.data)}>See more info</button>
    </div>
  )
}

export default MinGoodItem