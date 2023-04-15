import '../../styles/Pages.css'
import PageView from "../PageView"
import { Menu, Sets } from "../layout"
import {IoMdAdd} from 'react-icons/io'
import {ImMenu} from 'react-icons/im'
import { useRef, useState } from 'react'
import { openMenu } from '../../utils/functions'
import { useSelector } from 'react-redux'

function Pages() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const viewData = useSelector(state => state.state.collection[0].views)

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
  console.log("addView")
}

  return (
    <div className="pages">
      <div className="container-pages">
      <div style={{transform:`translateX(-${currentSlide * 100}vw)`}} className="container-slide"> 
        {viewData.map((item,index) => (
          <PageView key={index} {...item} image={item.backgroundUrl} title={item.title}/>
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
