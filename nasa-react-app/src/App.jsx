import { useState, useEffect } from "react"
import Main from './components/Main';
import Footer from './components/Footer';
import SideBar from './components/SideBar';

function App() {

  const [data, setData]=useState(null);
  const[loading, setLoading]= useState(false);

  const [showModal, setShowModal]=useState(false);

  function handleToggleModal(){
    setShowModal(!showModal);
  }

  useEffect(()=>{
    async function fetchAPIData(){
      const NASA_KEY=import.meta.env.VITE_NASA_API_KEY;
      const url='https:/api.nasa.gov/planetary/apod' //GET request link
      +`?api_key=${NASA_KEY}`

      try{
        const response=await fetch(url);
        const apiData=await response.json();
        setData(apiData);
        console.log('DATA\n', apiData);
      } catch(err){
        console.log(err.message);
      }
       }
    fetchAPIData();
  }, [])

  return (
    <>
    {data? (<Main data={data}/>) :(
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
    )}
     {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal}/>)}
     {data && (<Footer data={data} handleToggleModal={handleToggleModal}/>)}
    </>
  )
}

export default App
