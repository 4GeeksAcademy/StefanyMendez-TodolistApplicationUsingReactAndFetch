import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


const Home = () => {
	const [todo, setTodo] = useState("")
	const [todos, setTodos] = useState([])
	const [numberTasks, setTasks] = useState("No tasks, add a task")

	useEffect(() => {
		getTodo();

	}, []);

	const handleSubmit = () => {

		if (todo !== "") {
			sendTodo();
			setTodos([{id: uuidv4(), label: todo, done:false }, ...todos])
			setTasks(todos.length + 1)
			setTodo("")
		}
		else{
			alert("Please add a Task")
		}
	}
	const deleteTodos = (id) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const delTodo = todos.filter((to,index) => to.id !== id);

		setTodos([...delTodo])
		setTasks(todos.length-1)

		todos.length-1 === 0 ? setTasks("No tasks, add a task"):null

		var raw = JSON.stringify(delTodo)

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/tefis15",
			requestOptions
		)
			.then(response => response.json())
			.then(result => getTodo())
			.catch(error => "Error en deleteTodo" + error)

	}

	function getTodo() {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		fetch(
			
			"https://assets.breatheco.de/apis/fake/todos/user/tefis15",
			requestOptions
		)
			.then(response => response.json())
			.then(result =>setTodos(result))
			.catch(error => console.log("Error en getTodo", error));	
	}
	function sendTodo() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify([{id: uuidv4(), label: todo, done:false }, ...todos]);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/tefis15",
			requestOptions
		)
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log("Error en sentTodo", error))
	}

	return (
		<div className="conteiner-fluid">
			<h1>Todos</h1>
			<div className="container-todos" >

				<input className="input" name="task" type="text" placeholder="What needs to be done?" value={todo} onChange={(e) => { setTodo(e.target.value) }} onKeyDown={(e) => {
					if (e.keyCode === 13) {
						handleSubmit();
					}
				}} />

				<ul className="list-group list-group-flush">
					{todos.map((t, index) => {
						return (
							<li className="list-group-item" key={index}>
								<label>{t.label}</label>
								<button className="btnClose" onClick={() => deleteTodos(t.id)}><i className="fa-solid fa-xmark"></i></button>
							</li>
						)
					})
					}

				</ul>
				<hr />
				<label className="footer">{numberTasks + " items left"} </label>
			</div>
			<span id="place1" className="placeholder placeholder-xs shadow"></span>
			<br />
			<span id="place2" className="placeholder placeholder-xs shadow"></span>
		</div>
	);
};

export default Home;
