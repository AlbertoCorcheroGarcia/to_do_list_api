import React, { useEffect, useState, Fragment } from "react";
import Button from "react-bootstrap/Button";

function List() {
	const newURL = "https://assets.breatheco.de/apis/fake/todos/user/"; //la url de nuestra api o el path del servidor donde entra o sale la informacion que queremos
	const [listado, setListado] = useState([]); // declaramos esta constante para tener nuestra variable que guarda la informacion de la API (listado)
	// y nuestra super funcion que cambiara esa variable listado (setListado) {TODO ESTO SE HACE A TRAVEZ DE UN useState de tipo array []}
	const [pintedList, setPintedList] = useState(""); // declaramos esta constante para tener nuestra variable que RENDERIZA en la pagina las tareas que existen en la API
	// y nuestra super funcion que cambiara esa variable (setPintedList) [TODO ESTO SE HACE A TRAVEZ DE UN useState de tipo string ""]
	const [bool, setBool] = useState(true); // cosntante para limpiar los elementos del imput. declaro un booleano para ver el estado del input , si esta ha cambiado que lo ponga limpio

	//primer fetch para cargar los datos
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

	// segundo fetch para actualizar los cambios en la bbdd  METODO PUT
	useEffect(() => {
		console.log("estado :D", listado);
		fetch(newURL.concat("alberto"), {
			method: "PUT",
			mode: "cors",
			body: JSON.stringify(listado),
			headers: new Headers({
				"Content-Type": "application/json"
			})
		})
			.then(res => res.json())
			.then(function(response) {
				console.log(response);
			});
	}, [bool]);

	////////////borrar de las lista
	//  guardar en un array temporal
	const deleteList = indexToDelete => {
		const result = listado.filter(_ => indexToDelete);
		return result;
	};

	// mapeo de la lista de datos
	useEffect(() => {
		setPintedList(
			listado.map((element, index) => {
				return (
					// element.done no lo muestra por que es un bolean y no muestra eso pinta txt
					<li key={index.toString()}>
						{element.label}
						<button
							onClick={event => {
								{
									event.preventDefault();
									setListado([
										...listado,
										{
											label: event.target.value,
											done: false
										}
									]);
									deleteList(index);
								}
							}}>
							✐
						</button>
					</li>
				);
			})
		);
	}, [listado]);
	return (
		<div className="card container">
			<div className="my-3">
				<input
					type="text"
					placeholder="New Task ✏"
					onKeyPress={event => {
						// if (event.key === "");
						if (event.key === "Enter") {
							event.preventDefault();
							setListado([
								...listado,
								{ label: event.target.value, done: false }
							]);
							setBool(!bool);
							event.target.value = "";
						}
					}}
				/>
			</div>

			<div className="card-body">
				<h5 className="card-title">Things to do 🗒:</h5>
				<div className="print">{pintedList}</div>
			</div>
		</div>
	);
}
export default List;
