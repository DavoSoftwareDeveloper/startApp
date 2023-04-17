
import '../styles/PageView.css'
import {IoMdAdd} from 'react-icons/io'
import {MdFormatQuote, MdAddTask, MdOutlineAddPhotoAlternate, MdAudiotrack} from 'react-icons/md'
import {AiOutlineClose} from "react-icons/ai"
import {BsCardText} from 'react-icons/bs'
import {CgFormatText} from "react-icons/cg"
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Block from './Block'
import List from './List'
import { v4 as uuidv4 } from 'uuid';
import { addBlock, addTitlePage, deleteTitlePage } from '../redux/stateSlice'


function PageView({title, image, id, position}) {
    const dispatch = useDispatch()

    console.log(id)

    const viewData = useSelector(state => state.state.collection[0].views[position].blocks)
    const [titleInput, setTitleInput] = useState("")
    const [dragged, setDragged] = useState(null)
    const [toggleMenu, setToggleMenu] = useState(false)

    const ref = useRef()

    useEffect(()=>{
        toggleMenu ? ref.current.className = "navbar2" : ref.current.className = "navbar"
    },[toggleMenu])

    const handleMenu = () => {
        setToggleMenu(toggle => !toggle)
    }
    const handleAdd = (e) => {
        e.preventDefault()
        setToggleMenu(toggle => !toggle)
        let blockType = e.target.dataset.name
        console.log(blockType)
                // he tenido que añadir propiedad de css para que funcione bien con svg's
                //solo con dataset ( data-whatever) he podido acceder a la propiedad aunque haga refresh
                //switch
                switch(blockType) {
                    case "delete":
                        return console.log ( "delete page")
                        break;
                    case "audio":
                      return console.log ( "add audio set")
                        break;
                    case "photo":
                        return console.log ( "add photo page")
                        break;
                    case "title":
                        const title = "new Title"
                        return dispatch(addTitlePage({
                            position: position,
                            title: title.title,
                            modify:true,
                        }))
                        break;
                    case "text":
                        console.log ( "add text block")
                        return dispatch(addBlock({
                            position: position,
                            id: uuidv4(),
                            modify: false,
                            content:{
                                title:"Bienvenido" ,
                                text: "Empieza rellenando uno de los bloques con una frase motivadora corta y una pequeña explicación si es necesario",   
                            }
                        }))
                        break;
                    case "quote":
                        return dispatch(addBlock({
                            position: position,
                            id: uuidv4(),
                            modify: false,
                            content:{
                                text: "Empieza rellenando uno de los bloques con una frase motivadora corta y una pequeña explicación si es necesario",
                                author: "David Larrosa",
                            }
                        }))
                        break;
                    case "task":
                        return dispatch(addBlock({
                            position: position,
                            id: uuidv4(),
                            modify: false,
                            content:{
                                task:"First task",
                                complete: false,        
                            }
                        }))
                        break;        
                }
    }

    console.log(viewData)
    const deleteTitle = (e) => {
       return dispatch(deleteTitlePage({position}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addTitlePage({
            title: titleInput,
            position: position,
            modify:false,
        }))

    }
    const handleChange = (e) => {
        setTitleInput(e.target.value)
    }
    console.log(titleInput)

return (
    <div className="PageView">
        <img src={image} alt="fondo" className='fondo'/>
        <div ref={ref} name="current" className="navbar">
            <IoMdAdd className='button-nav' onClick={handleMenu}/>
            <AiOutlineClose data-name="delete" onClick={handleAdd}/>
            <MdAudiotrack data-name="audio" onClick={handleAdd}/>
            <MdOutlineAddPhotoAlternate data-name="photo" onClick={handleAdd}/>
            <CgFormatText data-name="title" onClick={handleAdd}/>
            <BsCardText data-name="text" onClick={handleAdd}/>
            <MdFormatQuote data-name="quote" onClick={handleAdd}/>
            <MdAddTask data-name="task" onClick={handleAdd}/>
        </div>
        { !title.modify ? (
            <div className='flex-title'>
                    <h1 className='title'>{title.title}</h1>
                    { title.title && <div className='title-close'><AiOutlineClose className="close" onClick={deleteTitle}/></div>}
            </div>
        ) : (
            <div className='flex-title'>
            <input autofocus onChange={handleChange} onBlur={handleSubmit} type="text" className='title-input' placeholder={title.title}/>
        </div>
        )
        }
        <div className='trello'>
        {viewData.map((item,index) => (
            <List key={`list-${index}`}>
                <Block viewId={id} positionPage={position} {...item} key={`block-${index}`}/>
            </List>
        ))}
        </div>
    </div>
    )
}

export default PageView
