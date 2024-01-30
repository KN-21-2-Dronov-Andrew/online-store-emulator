import React, { useState } from 'react'

const HOST = import.meta.env.VITE_HOST;

const DeleteGoodForm = (props) => {

  const [activeGood, setActiveGood] = useState("");
  
  const handleDeleteGood = async () => {
    const item = JSON.parse(activeGood);
    await fetch(`${HOST}/goods/${item.partitionKey}/${item.rowKey}`, {
      method: 'DELETE',
    });
  }
  return (
    <>
        <form>
            <div>
                <label>Good</label>
                <select value={activeGood} onChange={(e) => setActiveGood(e.target.value)}>
                  <option></option>
                  {
                    props.goods.map(item => (
                      <option key={item.rowKey} value={JSON.stringify(item)}>{item.name}</option>
                    ))
                  }
                </select>
            </div>
            <button onClick={() => handleDeleteGood()}>Delete Good</button>
        </form>
    </>
  )
}

export default DeleteGoodForm