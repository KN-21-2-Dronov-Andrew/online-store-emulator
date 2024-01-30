import React, { useState } from 'react'

const HOST = import.meta.env.VITE_HOST;

const EditGoodForm = (props) => {

    const [activeGood, setActiveGood] = useState("");

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState(null);

    const handleChangeActiveGood = (e) => {
        const value = JSON.parse(e.target.value);
        setName(value.name);
        setCategory(value.category);
        setPrice(value.price);

        setActiveGood(e.target.value);
    }

    const handleEditGood = async (e) => {
        e.preventDefault();
        const item = JSON.parse(activeGood);
        let imgUrl = item.imgUrl;
        if (img != null) {
            const formData = new FormData();
            formData.append("files", img);
            imgUrl = (await (await fetch(`${HOST}/upload`, {method: 'POST', body: formData})).json())[0];
        }
        await fetch(`${HOST}/goods/${item.partitionKey}/${item.rowKey}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, category, price, imgUrl}),
        })
    }
    
  return (
    <>
        <form>
            <div>
                <label>Good</label>
                <select value={activeGood} onChange={(e) => handleChangeActiveGood(e)}>
                    <option value={""}></option>
                    {
                        props.goods.map(item => (
                            <option key={item.rowKey} value={JSON.stringify(item)}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            <input type='file' onChange={(e) => setImg(e.target.files[0])}/>
            <div>
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}/>
                <label>Price</label>
                <input type='number' value={price} onChange={(e) => setPrice(e.target.value)}/>
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {
                        props.categories.map(item => (
                            <option key={item.rowKey} value={item.name}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            <button onClick={(e) => handleEditGood(e)}>Edit Good</button>
        </form>
    </>
  )
}

export default EditGoodForm