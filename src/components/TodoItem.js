import React from 'react';
import PropTypes from 'prop-types';

export default function TodoItem (props) {

	return (
		<div key={props.todo.id} className="todo-item">
            <div className="todo-item-left">
              <input type="checkbox" 
                     onChange={()=>props.checkToDo(props.index)}
                     checked={props.todo.completed} />
              
              {props.todo.editing ? props.editBox(props.todo,props.index) : props.todoLabel(props.todo,props.index)}
            </div>

            <div className="remove-item" onClick={()=>props.removeToDo(props.index)}>
              &times;
            </div>
        </div>
	);
}


TodoItem.propTypes = {
     
     todo:PropTypes.object.isRequired,
     index:PropTypes.number.isRequired,
     checkToDo:PropTypes.func.isRequired,
     editBox:PropTypes.func.isRequired,
     removeToDo:PropTypes.func.isRequired,
     todoLabel:PropTypes.func.isRequired,

}
