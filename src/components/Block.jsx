import "../styles/Block.css"
import {AiFillEdit, AiOutlineClose} from "react-icons/ai"
import { useDispatch } from "react-redux"
import { addTextBlock, addTitleBlock, deleteBlock, updateBlock, addAuthorBlock, addAuthorTitleBlock, addTaskBlock } from "../redux/stateSlice"
import { v4 as uuidv4 } from 'uuid';
import {MdFormatQuote} from 'react-icons/md'
import $ from "jquery";
import { useEffect, useRef, useState } from "react";

function Block({viewId,id, modify, content, positionBlock, positionPage, setDragged}) {
    const ref = useRef()
    const [titleInput, setTitleInput] = useState("")
    const [textInput, setTextInput] = useState("")
    const [author, setAuthor] = useState("")
    const [authorTitle, setAuthorTitle] = useState("")
    const [task, setTask] = useState("")
    
    
    const dispatch = useDispatch()
    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        switch(e.target.name){
            case "title-input":
                return dispatch(addTitleBlock({
                            positionBlock,
                            positionPage,
                            modify:false,
                            id,
                            newTitle: titleInput,
                        }))
                break;
            case "text-input":
                return dispatch(addTextBlock({
                            positionBlock,
                            positionPage,
                            modify:false,
                            id,
                            newText: textInput,
                        }))
                break;
                case "author-input":
                    return dispatch(addAuthorBlock({
                                positionBlock,
                                positionPage,
                                modify:false,
                                id,
                                newAuthor: author,
                            }))
                    break;
                case "author-title-input":
                    return dispatch(addAuthorTitleBlock({
                                positionBlock,
                                positionPage,
                                modify:false,
                                id,
                                newTitleAuthor: authorTitle,
                            }))
                    break;
                case "task-input":
                    return dispatch(addTaskBlock({
                                positionBlock,
                                positionPage,
                                modify:false,
                                id,
                                newTask: task,
                            }))
                    break;    
        }
    }
    const handleChange = (e) => {
        switch(e.target.name){
            case "title-input":
                return setTitleInput(e.target.value)
                break;
            case "text-input":
                return setTextInput(e.target.value)
                break;
            case "author-title-input":
                return setAuthorTitle(e.target.value)
                break;
            case "author-input":
                return setAuthor(e.target.value)
                break;    
            case "task-input":
                return setTask(e.target.value)
                break;        
        }
    }

    const HandleDragStart = () =>{
        setDragged({
            id,
            modify,
            content,
            positionBlock,
            position:positionPage
        })
    }

    const handleUpdateBlock = () => {
        dispatch(updateBlock({id, viewId, positionPage, positionBlock}))
    }
    
    const handleDeleteBlock = () => {
        dispatch(deleteBlock({id, viewId, positionPage}))
    }

    const handleVisibility = (e) => {
        e.preventDefault()
        let selectedDiv = e.currentTarget.dataset.id
        console.log(selectedDiv)
        let count = false
            $('.block-component').hover(function(){
                count = !count
                if (count){
                    $('[data-show = ' + selectedDiv + ']').css({
                        "visibility": "visible"
                    });
                } else {
                    $('[data-show = ' + selectedDiv + ']').css({
                        "visibility": "hidden"
                    });
                    selectedDiv = null
                }
            });
    
    }

return (
    <div name="id" ref={ref} data-id={id} onMouseEnter={handleVisibility} className="block-component">
        <div draggable onDragStart={HandleDragStart} className="block">
            <div className="content">
            {content.title && (
                <div className={modify ? "flex-title2" : "flex-title"}>
                {!modify ? (
                <>
                    <h4>{content.title}</h4>
                    <p>{content.text}</p>
                </>
                ) : (
                <>
                    <input name="title-input" placeholder={content.title} className="title-input" onChange={handleChange} onBlur={handleSubmit} type="text" />
                    <input name="text-input" placeholder={content.text} className="title-input" onChange={handleChange} onBlur={handleSubmit} type="text" />
                    <br/>
                </>
                )}
                </div>
            )}
            {content.author && (
                <div>
                    {!modify ? (
                        <>
                        <div className="flex2">
                            <MdFormatQuote className="quote"/>
                            <p>{content.text}</p>
                            <MdFormatQuote className="quote"/>
                        </div>
                        <p style={{fontSize:"14px", marginTop:"-5px"}}>by {content.author}</p>
                        </>
                        ) : (
                        <>
                        <div className="flex-title2">
                            <input name="author-title-input" placeholder={content.text} className="title-input" onChange={handleChange} onBlur={handleSubmit} type="text" />
                            <input name="author-input" placeholder={content.author} className="title-input" onChange={handleChange} onBlur={handleSubmit} type="text" />
                            <br/>
                        </div>
                        </>
                        )}
                </div>
            )}
                {content.task && (
                <div className="flexspace">
                    {!modify ? (
                        <>
                            <p>{content.task}</p>
                            <input name="check" id={uuidv4()} className="check" type="checkbox"/>
                        </>
                        ):(
                        <>
                            <input autoFocus name="task-input" placeholder={content.text} className="title-input" onChange={handleChange} onBlur={handleSubmit} type="text" />
                        </>)}
                </div>
            )}
            </div>
        </div>
        <div className="blur"></div>
            <div data-show={id} className="options-edit">
        {content.task ? (
            <div className="container-edit-task">
                <div className="edit-button-task">
                    < AiOutlineClose className="icon-task" onClick={handleDeleteBlock}/>
                </div>
                <div className="edit-button-task">
                    < AiFillEdit className="icon-task" onClick={handleUpdateBlock}/>
                </div>
            </div>  
        ) : (
            <div className="container-edit">
                <div className="edit-button">
                    < AiOutlineClose className="icon" onClick={handleDeleteBlock}/>
                </div>
                <div className="edit-button">
                    < AiFillEdit className="icon" onClick={handleUpdateBlock}/>
                </div>
            </div>
            )}
        </div>
    </div>
    )
}

export default Block
