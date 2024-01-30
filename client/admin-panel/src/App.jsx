import { useEffect, useState } from 'react'
import './App.css'
import CreateCategoryForm from './components/Category/CreateCategoryForm'
import DeleteCategoryForm from './components/Category/DeleteCategoryForm'
import EditCategoryForm from './components/Category/EditCategoryForm'
import CreateGoodForm from './components/Good/CreateGoodForm'
import DeleteGoodForm from './components/Good/DeleteGoodForm'
import EditGoodForm from './components/Good/EditGoodForm'

const HOST = import.meta.env.VITE_HOST;

function App() {

  const [categories, setCategories] = useState([]);
  const [goods, setGoods] = useState([]);
  
  
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(`${HOST}/categories`);
      return await res.json();
    }
    const getGoods = async () => {
      const res = await fetch(`${HOST}/goods`);
      return await res.json();
    }
    getCategories().then(res => setCategories(res));
    getGoods().then(res => setGoods(res));
  }, []);
  return (
    <>
      <h2>Admin Panel</h2>
      <h3>Categories</h3>
      <CreateCategoryForm categories={categories}/>
      <hr/>
      <EditCategoryForm categories={categories}/>
      <hr/>
      <DeleteCategoryForm categories={categories}/>
      <hr/>
      <h3>Goods</h3>
      <CreateGoodForm categories={categories}/>
      <hr/>
      <EditGoodForm categories={categories} goods={goods}/>
      <hr/>
      <DeleteGoodForm goods={goods}/>
    </>
  )
}

export default App
