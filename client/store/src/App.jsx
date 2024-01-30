import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Category from './components/Category'
import MinGoodItem from './components/MinGoodItem'
import { useEffect } from 'react'
import MaxGoodItem from './components/MaxGoodItem'

const HOST = import.meta.env.VITE_HOST;

function App() {


  const [categories, setCategories] = useState([]);
  const [goods, setGoods] = useState([]);

  const [showFullInfo, setShowFullInfo] = useState(false);
  const [fullInfoData, setFullInfoData] = useState(null);

  const toogleFullInfo = (data={}) => {
    setFullInfoData(data);
    setShowFullInfo(!showFullInfo);
  }

  const getByCategory = async (categoryName) => {
    const res = await fetch(`${HOST}/goods/${categoryName}`);
    const resJson = await res.json();
    setGoods(resJson);
  }
  
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
    <div className='app-wrapper'>
      <div className='menu-wrapper'>
        {
          categories.map(item => (
            <Category key={item.rowKey} data={item} clickHandler={getByCategory}/>
          ))
        }
      </div>
      {
        showFullInfo
        ?
        <MaxGoodItem data={fullInfoData} backClickHandler={toogleFullInfo}/>
        :
        <div className='asorti-wrapper'>
          {
            goods.map(item => (
              <MinGoodItem key={item.rowKey} data={item} clickHandler={toogleFullInfo}/>
            ))
          }
        </div>
      }
    </div>
  )
}

export default App
