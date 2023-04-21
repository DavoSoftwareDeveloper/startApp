import '../../styles/Pages.css'
import PageView from "../PageView"
import { Menu, Sets } from "../layout"
import {IoMdAdd} from 'react-icons/io'
import {ImMenu} from 'react-icons/im'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addViewPage } from '../../redux/stateSlice'
import { v4 as uuidv4 } from 'uuid';
import { block } from '../../utils/functions'

function Pages() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const viewData = useSelector(state => state.state.collection[0].views)

  const dispatch = useDispatch()
  //useHook ?
  const [toggleMenu, setToggleMenu] = useState(false)
  const ref = useRef()

  const handleMenu = () => {
    setToggleMenu(toggle => !toggle)
    toggleMenu ? ref.current.className = "menu2" : ref.current.className = "menu"
  }

const changeSlide = (e) =>{
  e.preventDefault()
  setCurrentSlide(e.currentTarget.dataset.page)
}

const handleAddView = () => {
   dispatch(addViewPage({
    id: uuidv4(),
    title: "Título de prueba2",
    backgroundUrl: "https://img.freepik.com/foto-gratis/piedras-zen-apiladas-fondo-arena-arte-concepto-equilibrio_53876-110629.jpg?w=2000&t=st=1681492270~exp=1681492870~hmac=e8d33f5a3bf9956b1f31feee587cea5d9ffe9c65b36fd48f3a9b3eab69d8bf4b",
    blocks: [
        block,
    
    ]
}))
}
  return ( 
    <div className="pages">
      <div className="container-pages" >
      <div style={{transform:`translateX(-${currentSlide * 100}vw)`}} className="container-slide" > 
        {viewData.map((item,index) => (
          <PageView setCurrentSlide={setCurrentSlide} key={index} {...item} position={index} image={item.backgroundUrl} title={item.title}/>
        ))}
      </div>
      </div>
      <div  ref={ref} className='menu'>
          <div className='menu-icon'>
              <ImMenu onClick={handleMenu}/>
          </div>
          <div className="botonera">
              <div className='array-botonera'>
                {viewData.map((item,index) => (
                  <div key={`circle-${index}`} data-page={index} onClick={changeSlide} className="circle-one"></div>         
                ))}
              </div>
              <div className="plus">
                <IoMdAdd onClick={handleAddView}/>
              </div>
          </div>
          <Sets />
          <Menu />
      </div>
    </div>
  )
}

export default Pages
