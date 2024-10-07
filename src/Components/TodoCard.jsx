import { useState } from 'react'

export default function TodoCard(props) {
    const { children, handleDeleteTodo, index, handleEditTodo } = props
    const [checked, setChecked] = useState(false)

    const handleChecked = () => {
      setChecked(!checked)
    }

    return (
        <li className='todoItem' >
          <input type="checkbox" className='checked-todo' checked={checked} onChange={handleChecked} />
          {!checked ? <span>{ children}</span> : <span className='crossed-todo'>{children}</span>}
            <div className='actions__container'>
                <button onClick={() => {
                    handleEditTodo(index)
                }}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={() => {
                    handleDeleteTodo(index)
                }}>
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </li>
    )
}