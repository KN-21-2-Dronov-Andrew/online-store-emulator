import React, { useState } from 'react'

const HOST = import.meta.env.VITE_HOST;

const DeleteCategoryForm = (props) => {
  const [activeCategory, setActiveCategory] = useState(props.categories[0]);

  const handleDeleteCategory = async () => {
    const toDelete = JSON.parse(activeCategory);
    await fetch(`${HOST}/categories/${toDelete.partitionKey}/${toDelete.rowKey}`, {
      method: 'DELETE',
    });
  }
  return (
    <>
        <form>
            <div>
                <label>Category</label>
                <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)}>
                    {
                      props.categories.map(item => (
                        <option key={item.rowKey} value={JSON.stringify(item)}>{item.name}</option>
                      ))
                    }
                </select>
            </div>
            <button onClick={() => handleDeleteCategory()}>Delete category</button>
        </form>
    </>
  )
}

export default DeleteCategoryForm