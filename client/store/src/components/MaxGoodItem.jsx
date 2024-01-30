import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'

const MaxGoodItem = (props) => {
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const getImgObj = async () => {
            const resp = await fetch(props.data.imgUrl);
            const blob = await resp.blob();
            return URL.createObjectURL(blob);
        }
        getImgObj()
            .then(res => setImgSrc(res))
            .catch(err => console.log(err));
    }, []);
  return (
    <div className='max-good-wrapper'>
        <button onClick={() => props.backClickHandler()}>&lt;</button>
        <img src={imgSrc} alt="" />
        <h2>{props.data.name}</h2>
        <p>{props.data.price}</p>
    </div>
  )
}

export default MaxGoodItem