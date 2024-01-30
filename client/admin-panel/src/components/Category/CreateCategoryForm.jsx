import React, { useState } from 'react';

const HOST = import.meta.env.VITE_HOST;

const CreateCategoryForm = (props) => {

  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("root");

  const handleCreateCategory = async () => {
    await fetch(`${HOST}/categories`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, parentCategory}),
    })
  }
  return (
    <>
        <form>
            <div>
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}/>
                <label>Parent category</label>
                <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
                    <option key="root" value="root">root</option>
                    {
                      props.categories.map(item => (
                        <option key={item.rowKey} value={item.name}>{item.name}</option>
                      ))
                    }
                </select>
            </div>
            <button onClick={() => handleCreateCategory()}>Create category</button>
        </form>
    </>
  )
}

export default CreateCategoryForm