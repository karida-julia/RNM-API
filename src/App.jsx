import { useEffect, useState } from 'react'
import s from './App.module.css'
import { api } from "./api/api"
import { Card } from './components/card'
import InfoModal from './components/infoModal'
import logo from '/logo.webp'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';



function App() {
  const [data, setData] = useState([])
  const [searchName, setSearchName] = useState("")
  const [searchPage, setSearchPage] = useState("")
  const [modal, setModal] = useState();
  // const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    api.get(`/character/?name=${searchName}&page=${searchPage}`).then((response) => {
      setData(response.data.results)
      // setLoading(false)
      setErro(false)
    }).catch((error) => {
      if (error.response.status === 404) {
        setErro(true)
        console.error("Error, Characters Not Found!!!", error)
      }
      if (error.response.status === 500) {
        setErro(true)
        console.error("Error, Internal Server Error!!!", error)
      }
      console.error("Error, Could Not Get API!!!", error)
      // setLoading(false)
      setErro(true)
    })
  }, [searchPage, searchName])
  return (

    <>
    {modal !== undefined && <InfoModal data={data[modal]} close={() => setModal()}/>}
      

      <main>
          <img src={logo} alt="Logo" className={s.logo} />

        <div className={s.wrapPagination}>
          <ResponsivePagination
            current={searchPage}
            total={42}
            onPageChange={setSearchPage}
          />
        </div>

        <div style={{display: "flex", flexWrap: "wrap", gap:"5px", alignItems: "center", justifyContent: "center"}}>
        <input type='text' value={searchPage} onChange={(e) => setSearchPage(e.target.value)} placeholder='1/42'/>
        <input type='text' value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder='Procure um personagem'/>
       </div>

       {erro &&
          <div className={s.wrapErro}>
            <h2>Error when searching for characters ⛔</h2>
          </div>}

      
          <div className={s.wrapCards}>
            {data.map((item, index) => {
              return (
                !erro && <div key={`${searchPage}-${searchName}-${index}`} className={s.wrapCard}>
                  <Card image={item.image} name={item.name} species={item.species} />
                  <button onClick={() => setModal(index)} className={s.infoBtn}>➕ Info {item.name}</button>
                </div>
              )
            })}
          </div>
     

      </main>
 
    </>
  )
}

export default App
