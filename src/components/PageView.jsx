
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
import { addBlock, addBlocks, addTitlePage, addViewPage, deleteTitlePage, deleteViewPage } from '../redux/stateSlice'


function PageView({title, image, id, position, setCurrentSlide}) {
    const dispatch = useDispatch()

    const viewData = useSelector(state => state.state.collection[0].views[position].blocks)
    const viewPages = useSelector(state => state.state.collection[0].views)

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
                // he tenido que añadir propiedad de css para que funcione bien con svg's
                //solo con dataset ( data-whatever) he podido acceder a la propiedad aunque haga refresh
                switch(blockType) {
                    case "delete":
                        return dispatch(deleteViewPage({position, id, setCurrentSlide}))
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
                        return dispatch(addBlock({
                            list:[
                                {position: position,
                            id: uuidv4(),
                            modify: false,
                            content:{
                                title:"Bienvenido" ,
                                text: "Empieza rellenando uno de los bloques con una frase motivadora corta y una pequeña explicación si es necesario",   
                            }
                        }]}))
                        break;
                    case "quote":
                        return dispatch(addBlock({
                            list:[
                                {position: position,
                            id: uuidv4(),
                            modify: false,
                            content:{
                                text: "Empieza rellenando uno de los bloques con una frase motivadora corta y una pequeña explicación si es necesario",
                                author: "David Larrosa",
                            }
                        }] }))
                        break;
                    case "task":
                        return dispatch(addBlock({
                          list:[
                            {
                                position: position,
                                id: uuidv4(),
                                modify: false,
                                content:{
                                    task:"First task",
                                    complete: false,        
                                }
                            }]
                            }
                          ))
                        break;        
                }
    }

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
    
    const handleDrop = (e) => {
        e.preventDefault()
        let origen = dragged.positionBlock // posición del bloque que se mueve
        const destino = +e.currentTarget.dataset.list // posición de la lista donde cae

        const stateClone = structuredClone(viewPages[position].blocks)

        stateClone[origen].list[0] = []
        while (origen < destino){
            origen++
            stateClone[origen-1].list[0] = stateClone[origen].list[0]
            stateClone[origen].list[0] = []
        }
        while (origen > destino){  
            origen--         
            stateClone[origen+1].list[0] = stateClone[origen].list[0] 
            stateClone[origen].list[0] = []   
        }
        stateClone[origen].list[0] = dragged
        origen = dragged.positionBlock 
        dispatch(addBlocks({stateClone, origen, position}))
    }
    const onKeyUpevent = (e) => {
        let keycode = e.keyCode;
        if(keycode == '13'){
            e.preventDefault()
            dispatch(addTitlePage({
                title: titleInput,
                position: position,
                modify:false,
            }))
        }
      }

return (
    <div className="PageView">
        <img src={image} alt="fondo" className='fondo'/>
        <div ref={ref} name="current" className="navbar">
            <IoMdAdd className='button-nav' onClick={handleMenu}/>
            <AiOutlineClose className="nav-item" data-name="delete" onClick={handleAdd}/>
            <MdAudiotrack className="nav-item" data-name="audio" onClick={handleAdd}/>
            <MdOutlineAddPhotoAlternate className="nav-item" data-name="photo" onClick={handleAdd}/>
            <CgFormatText className="nav-item" data-name="title" onClick={handleAdd}/>  
            {"||"}
            <BsCardText className="nav-item" data-name="text" onClick={handleAdd}/>
            <MdFormatQuote className="nav-item" data-name="quote" onClick={handleAdd}/>
            <MdAddTask className="nav-item" data-name="task" onClick={handleAdd}/>
        </div>
        { !title.modify ? (
            <div className='flex-title'>
                    <div className="testbox"></div>
                    <h1 className='title'>{title.title}</h1>
                    { title.title && <div className='title-close'><AiOutlineClose className="close" onClick={deleteTitle}/></div>}
            </div>
        ) : (
            <div className='flex-titles'>
            <input onKeyUp={onKeyUpevent} autoFocus onChange={handleChange} onBlur={handleSubmit} type="text" className='title-input' placeholder={title.title}/>
        </div>
        )
        }
        <div className='trello'>
        {viewData.map((item,index) => (
            <List positionPage={position} positionList={index} handleDrop={handleDrop} key={`list-${index}`}>
                <Block positionPage={position} setDragged={setDragged} viewId={id} positionBlock={index} modify={item.list[0].modify} content={item.list[0].content} id={item?.list[0].id} key={`block-${index}`}/>
            </List>
        ))}
        </div>
    </div>
    )
}

export default PageView
