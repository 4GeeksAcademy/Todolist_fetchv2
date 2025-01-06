import React from "react";
import { Todolist } from "./Todolist";
import { TodoListFetch } from "./TodoListFetch";



//create your first component
const Home = () => {
	return (
		<div>
			<TodoListFetch/>
		</div>

		/*
		<Todolist/>
		*/


	);
};

export default Home;