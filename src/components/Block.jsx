import "../styles/Block.css"
import {AiFillEdit, AiOutlineClose} from "react-icons/ai"
import { useDispatch } from "react-redux"
import { addBlock, deleteBlock } from "../redux/stateSlice"
import { v4 as uuidv4 } from 'uuid';
import {MdFormatQuote} from 'react-icons/md'

function Block({viewId,id, modify, content, positionBlock, positionPage, setDragged}) {
    
    const dispatch = useDispatch()

    const HandleDragStart = () =>{
        console.log("dragging")
        setDragged({
            id,
            modify,
            content,
            positionBlock,
            position:positionPage
        })
    }
    const handleDeleteBlock = () => {
        dispatch(deleteBlock({id, viewId, positionPage}))
    }
console.log(id)
  return (
    <div className="block-component">
        <div draggable onDragStart={HandleDragStart} className="block">
          <div className="content">
          {content.title && (
                <div>
                <h4>{content.title}</h4>
                <p>{content.text}</p>
                </div>
            )}
              {content.author && (
                <>
                <div className="flex">
                <MdFormatQuote/>
                <p>{content.text}</p>
                <MdFormatQuote/>
                </div>
                <p style={{fontSize:"14px", marginTop:"-5px"}}>by {content.author}</p>
                </>
            )}
                {content.task && (
                <div className="flexspace">
                <p>{content.task}</p>
                <p className={content.complete ? "true" : "false"}>{content.complete ? "true" : "false"}</p>
                </div>
            )}
          </div>
        </div>
        {content.task ? (
           <div className="container-edit-task">
           <div className="edit-button-task">
               < AiOutlineClose className="icon-task" onClick={handleDeleteBlock}/>
           </div>
           <div className="edit-button-task">
               < AiFillEdit className="icon-task"/>
           </div>
       </div>  
        ) : (
            <div className="container-edit">
            <div className="edit-button">
                < AiOutlineClose className="icon" onClick={handleDeleteBlock}/>
            </div>
            <div className="edit-button">
                < AiFillEdit className="icon"/>
            </div>
        </div>
        )}
 
    </div>
  )
}

export default Block
