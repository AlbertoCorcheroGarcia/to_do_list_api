import React, { useEffect, useState, Fragment } from "react";

function List() {
	const newURL = "https://assets.breatheco.de/apis/fake/todos/user/";
	const [listado, setListado] = useState([]);
	const [pintedList, setPintedList] = useState("");

	useEffect(() => {
		fetch(newURL.concat("alberto"))
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				setListado(responseAsJson);
				console.log("JSON", responseAsJson);
			})
			.catch(function(error) {
				"Looks like there was a problem! ", error;
			});
		// si meto la variable listado en el arr se llama constatemente
	}, []);

	useEffect(() => {
		setPintedList(
			listado.map((element, index) => {
				return (
					// element.done no lo muestra por que es un bolean y no muestra eso pinta txt
					<li key={index.toString()}>
						{element.label}
						{element.done}
					</li>
				);
			})
		);
	}, [listado]);
	// segundo fetch para actualizar los cambios en la bbdd

	return <div>hello world {pintedList}</div>;
}
export default List;
