
import '../styles/PageView.css'
import {IoMdAdd} from 'react-icons/io'
import {MdFormatQuote, MdAddTask, MdOutlineAddPhotoAlternate, MdAudiotrack} from 'react-icons/md'
import {BiText} from 'react-icons/bi'
import { useRef, useState } from 'react'


function PageView({title}) {

    const [toggleMenu, setToggleMenu] = useState(false)
    const ref = useRef()
  
    const handleMenu = () => {
      setToggleMenu(toggle => !toggle)
      toggleMenu ? ref.current.className = "navbar2" : ref.current.className = "navbar"
    }
    const handleAdd = (e) => {
        e.preventDefault()
        let blockType = e.target.dataset.name
        console.log(blockType)
                // he tenido que añadir propiedad de css para que funcione bien con svg's
                //solo con dataset ( data-whatever) he podido acceder a la propiedad aunque haga refresh
            //switch

      }
  
  return (
    <div className="PageView">
      <div ref={ref} name="current" className="navbar">
        <IoMdAdd className='button-nav' onClick={handleMenu}/>

        <MdFormatQuote data-name="quote" onClick={handleAdd}/>
        <MdOutlineAddPhotoAlternate data-name="photo" onClick={handleAdd}/>
        <BiText data-name="text" onClick={handleAdd}/>
        <MdAudiotrack data-name="audio" onClick={handleAdd}/>
        <MdAddTask data-name="task" onClick={handleAdd}/>
      </div>
      { title && <h1 className='title'>{title}</h1>}
      <div className='trello'>

      </div>
    </div>
  )
}

export default PageView
