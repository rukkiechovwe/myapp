import React, { Component } from 'react';
import './todo.css';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Functionality = ({deleteTask,completeTask}) => {
    return (
        <div>
            <a href="#" onClick={deleteTask}><FontAwesomeIcon icon={faTrashAlt}/></a>
            <a href="#" onClick={completeTask}><FontAwesomeIcon icon={faCheckCircle}/></a>
        </div>
   )
}
const Todo = ({task, deleteTask,completeTask}) => {
    return (
        <li>
            <p style={{textDecoration: task.done ? "line-through": "none"}}>{task.text}</p>
            <Functionality deleteTask={deleteTask} completeTask={completeTask}/>
        </li>
    )
}
const TodoList = ({ tasks, deleteTask,completeTask}) => {
    return (
        <ul>
            <h3>Tasks</h3>
            {tasks.map((task,i)=> <Todo task={task} key={task.id} completeTask={() => completeTask(i)} deleteTask={() => deleteTask(i)} />)}
        </ul>
    )}

class TodoApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: []
        }
        this.inputRef = React.createRef();
        this.addTodo = this.addTodo.bind(this);
    }

    focusInput() {
        this.inputRef.current.focus();
    }

    addTodo = (e) => {
        let myTodos = this.state.tasks
        const todo = {
            text: this.inputRef.value, id: Date.now(),
            done:false
        }
        if (this.inputRef.value !== "") {
            myTodos.push(todo)
            this.inputRef.value=""
        }
        //console.log(myTodos)
        this.setState({
            tasks: myTodos
        }, () => {
            window.localStorage.setItem('myTodos', JSON.stringify(myTodos));
        })
        
        e.preventDefault();
    }
    componentDidMount() {
          const list = window.localStorage.getItem('myTodos');
          const parsedList = JSON.parse(list);
          this.setState({
              tasks: parsedList,
          })
      }
    
    completeTask(index) {
        const { tasks } = this.state;
        for(let i = 0;i <= tasks.length;i ++) {
          if(index === i) {
             tasks[i].done = true;
              break;
             }
        }
        //this.setState({ tasks }) 
        this.setState({tasks}, () => {
            window.localStorage.setItem('myTodos', JSON.stringify(this.state.tasks))
        })
    }

  deleteTask(index) {
      const { tasks } = this.state;
      tasks.splice(index, 1);

      this.setState({tasks}, () => {
        window.localStorage.setItem('myTodos', JSON.stringify(this.state.tasks))
    })
  }


    render() {
        return (
            <div className="todo">
                <form onSubmit={this.addTodo} className="todo-form">
                    <input type="text" placeholder="add task for today..." /*onChange(e=>console.log(e.target))*/ ref= {(a)=>this.inputRef = a}/>
                    <button type="submit" className="add-button">+</button> 
                </form>
                <TodoList tasks={this.state.tasks} deleteTask={this.deleteTask.bind(this)} completeTask={this.completeTask.bind(this)}/>
            </div>
        )
    }
}

export default TodoApp