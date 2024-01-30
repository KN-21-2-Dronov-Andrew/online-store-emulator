import React, { useState } from 'react'

const HOST = import.meta.env.VITE_HOST;

const EditCategoryForm = (props) => {
    const [name, setName] = useState("");
    const [parentCategory, setParentCategory] = useState("root");

    const [activeCategory, setActiveCategory] = useState(props.categories[0]);

    const handleChangeActiveCategory = (e) => {
        const value = JSON.parse(e.target.value);
        setName(value.name);
        setParentCategory(value.parentCategory);
        setActiveCategory(e.target.value);
    }

    const handleEditCategory = async () => {
        const newValue = JSON.parse(activeCategory);
        await fetch(`${HOST}/categories/${newValue.partitionKey}/${newValue.rowKey}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, parentCategory}),
        });
    }
  return (
    <>
        <form>
            <div>
                <label>Category</label>
                <select value={activeCategory} onChange={(e) => handleChangeActiveCategory(e)}>
                    {
                        props.categories.map(item => (
                            <option key={item.rowKey} value={JSON.stringify(item)}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label>New Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}/>
                <label>New Parent Category</label>
                <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
                    <option value="root">root</option>
                    {
                        props.categories.map(item => (
                            <option key={item.rowKey} value={item.name}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            <button onClick={() => handleEditCategory()}>Edit category</button>
        </form>
    </>
  )
}

export default EditCategoryForm