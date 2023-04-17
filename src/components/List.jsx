
function List({children, handleDrop}) {

    const handleDragOver = () => {
        e.preventDefault()
    }

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      {children}
    </div>
  )
}

export default List
