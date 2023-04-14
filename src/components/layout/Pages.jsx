import '../../styles/Pages.css'
import PageView from "../PageView"
import { Menu, Sets } from "../layout"
import {IoMdAdd} from 'react-icons/io'
import {ImMenu} from 'react-icons/im'
import { useRef, useState } from 'react'
import { openMenu } from '../../utils/functions'

function Pages() {

  //useHook ?
  const [toggleMenu, setToggleMenu] = useState(false)
  const ref = useRef()

  const handleMenu = () => {
    setToggleMenu(toggle => !toggle)
    toggleMenu ? ref.current.className = "menu2" : ref.current.className = "menu"
  }

  return (
    <div className="pages">
      <div className="container-slide">
        <div className="absolute-slide-flex">
        <PageView title="Título de prueba"/>
        </div>
      </div>
      <div  ref={ref} className='menu'>
          <div className='menu-icon'>
              <ImMenu onClick={handleMenu}/>
          </div>
          <div className="botonera">
              <div className='array-botonera'>
                {/* {} // un círculo por cada map */}
                <div className="circle-one"></div>
              </div>
              <div className="plus">
                <IoMdAdd />
              </div>
          </div>
          <Sets />
          <Menu />
      </div>
    </div>
  )
}

export default Pages
