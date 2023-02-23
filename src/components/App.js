import logo from '../logo.svg';
import '../App.css';
import React ,{useState,useRef} from 'react';
import { CSSTransition } from 'react-transition-group';
import TodosRemaining from "./TodosRemaining";
import TodoItem from "./TodoItem";
import Filters from "./Filters";


export default function App() {

  const [listItems,setListItems] = useState([
      {
        'filter':'all',
        'id':1,
        'title': 'Finish React Screencast',
        'completed': false,
        'editing': false,
      },
      {
        'filter':'all',
        'id':2,
        'title': 'Take over',
        'completed': false,
        'editing': false,
      },
    ]);

  const [itemId,setItemId]= useState(3);
  const [filter,setFilter]= useState('all');
  const todoInput = useRef(null);
  const todoNewLabel = useRef(null);



  const completedTodos = () => {
    return listItems.filter((item) => item.completed).length; 
  }

  const addToDo = (e) => {

    if(e.key === 'Enter'){
      const inputValue = todoInput.current.value;

      if(inputValue.trim().length === 0){
        return;
      }

      setItemId(itemId+1);

      let newElement = {
        'filter':'all',
        'id': itemId,
        'title': inputValue,
        'completed': false,
        'editing': false,
      };

      setListItems(oldArray => [...oldArray, newElement]);

      todoInput.current.value = '';
    }
  }

  const removeToDo = (index) => {

    setListItems(listItems.filter((item,i) => i !== index));

  }

  const checkToDo = (index) => {

    const updatedList = listItems.map((item,i) => {
      if (i === index) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      else{
        return item;
      }
    });

    setListItems(updatedList);

  }

  const handleEditingTodo = (index) => {

    const updatedList = listItems.map((item,i) => {
      if (i === index) {
        return {
          ...item,
          editing: true,
        };
      }
      else{
        return item;
      }
    });

    setListItems(updatedList);

  }

  const handleCheckAll = (e) => {

    const updatedList = listItems.map((item,i) => {
      if (e.target.checked) {
        return {
          ...item,
          completed: true,
        };
      }
      else{
        return {
          ...item,
          completed: false,
        };
      }
    });

    setListItems(updatedList);

  }


  const renderTodoLabel = (todo,index) =>{
    return (
        <div id="item"
           className={"todo-item-label "+(todo.completed ? 'completed' : '')} 
           onDoubleClick={(e)=>handleEditingTodo(index,e)} >
              {todo.title}
        </div>
      );
  }


  const updateTodoLabel = (todo,e,index) => {

      let inputValue = todoNewLabel.current.value;

      if(inputValue.trim().length === 0){
        inputValue = todo.title;
      }

      const updatedList = listItems.map((item,i) => {
        if (i === index) {
          return {
            ...item,
            title: inputValue,
            editing : false,
          };
        }
        else{
          return item;
        }
      });

      todoNewLabel.current.value='';
      setListItems(updatedList);
  }


  const renderEditLabelBox = (todo,index) =>{
    return (
       <input className="todo-item-edit"
              type="text"
              defaultValue={todo.title}
              onBlur={(e)=>updateTodoLabel(todo,e,index)}
              onKeyUp={(e)=>{
                  if(e.key === 'Enter'){
                    updateTodoLabel(todo,e,index)
                  }
                }}
              ref={todoNewLabel}
              autoFocus />
      );
  }

  const renderClearButton = () => {

    return (
        <div>
          <button onClick={handleClearTodos}>Clear Completed</button>
        </div>
      );

  }


  const handleClearTodos = () => {

      setListItems(listItems.filter((item) => !item.completed));

  }

  const remainingTodos = () => {
    return listItems.filter((item) => !item.completed).length; 
  }


  const filteredTodos = () => {

    if(filter === 'all'){
      return listItems;
    }
    else if(filter === 'active'){
      return listItems.filter((item) => !item.completed)
    }
    else if(filter === 'completed'){
      return listItems.filter((item) => item.completed)
    }

    return listItems;

  }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="Todo-container">
        <input type="text"
               className="todo-input"
               ref={todoInput} 
               placeholder="What needs to be done" 
               onKeyUp={addToDo} />

      {filteredTodos().map((todo,index)=>
          <TodoItem 
              key={todo.id}
              todo={todo}
              index={index}
              checkToDo={checkToDo}
              editBox={renderEditLabelBox}
              todoLabel={renderTodoLabel}
              removeToDo={removeToDo} />
      )}
        

      <div className="extra-container">
        <div><label><input type="checkbox" checked={!remainingTodos()} onChange={(e)=>handleCheckAll(e)} />Check all</label></div>

        <TodosRemaining remaining={remainingTodos()} />
      </div>

      <div className="extra-container">
        <Filters filter={filter} changeFilter={setFilter} />
        <CSSTransition classNames="fade" timeout={300}>

            {completedTodos() > 0 ? renderClearButton() : <div></div> }

        </CSSTransition>
      </div>
    </div>
  </div>
  );

}


