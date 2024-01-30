import React, { useState } from 'react'

const HOST = import.meta.env.VITE_HOST;

const CreateGoodForm = (props) => {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState(null);
  

  const handleCreateGood = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", img);

    const imgRes = await fetch(`${HOST}/upload`, {
      method: 'POST',
      body: formData
    })
    const imgUrl = (await imgRes.json())[0];

    await fetch(`${HOST}/goods`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, category, price, imgUrl}),
    })
  }

  return (
    <>
        <form>
            <input type='file' onChange={(e) => setImg(e.target.files[0])}/>
            <div>
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}/>
                <label>Price</label>
                <input type='number' value={price} onChange={(e) => setPrice(e.target.value)}/>
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option></option>
                    {props.categories.map(item => (
                      <option key={item.rowKey} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={(e) => handleCreateGood(e)}>Create Good</button>
        </form>
    </>
  )
}

export default CreateGoodForm