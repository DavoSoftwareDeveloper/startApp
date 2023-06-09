
function List({children, handleDrop, positionPage, positionList}) {

    const handleDragOver = (e) => {
        e.preventDefault()
    }

  return (
    <div className="list" data-list={positionList} onDragOver={handleDragOver} onDrop={handleDrop}>
      {children}
    </div>
  )
}

export default List
