import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import methods from "../../services/Service";
import Resource from "../../resource/resource";

const Buscador = (props) => {
   const lista = [{codAlumno:"12345",cedulaRepresentante:"103456789",nombreAlumno:"ANDY",representante:"ANDRES",fechaNacimiento:"2022-01-20",curso:"Primero"},
                  {codAlumno:"45678",cedulaRepresentante:"193456789",nombreAlumno:"JHON",representante:"PACO",fechaNacimiento:"2022-01-20",curso:"Segundo"},
                  {codAlumno:"32164",cedulaRepresentante:"183456789",nombreAlumno:"MAIKEL",representante:"LUIS",fechaNacimiento:"2022-01-20",curso:"Cuarto"},
                  {codAlumno:"98712",cedulaRepresentante:"173456789",nombreAlumno:"TRISTAN",representante:"MACARENA",fechaNacimiento:"2022-01-20",curso:"Quinto"},
                  {codAlumno:"25894",cedulaRepresentante:"123456789",nombreAlumno:"MICAELA",representante:"CHIPUXI",fechaNacimiento:"2022-01-20",curso:"Tercero"}]
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();

    const [listaAlumno, setListaAlumno] = useState("");

    const Search = (item, data) => {
        // const QueryString = Resource.convertObjectToQueryStringUnique("json", data);
        // methods.Get("BuscaAlumno/Get" + QueryString).then(async (result) => {
        //     if (result.code == "1") {
        //         if (!(result.payload == null)) {
        //             setListaAlumno(JSON.parse(result.payload))
        //         }
        //     } else {
        //         alert(result.message);
        //         console.log(result.payload);
        //     }
        // });
       
    }

    const UpdateEvent = (item) => {

        props.set(item)
    }

    const onSubmit = (data, evento) => {
        Search(data);
    }

    return (
        <Fragment>

            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
                        <input onChange={(event)=>{setListaAlumno(event.target.value)}} className="form-control me-2" id="busca" type="search" placeholder="Digite la cédula del estudiante" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
                    </form>

                    <div className="card mt-2">
                        <div className="card-body">
                            <table className="table table-stripe table hover">
                                <thead>
                                    <tr>
                                        <th escope="col">Cod</th>
                                        <th escope="col">Cedula</th>
                                        <th escope="col">Nombre Completo</th>
                                        <th escope="col">Resprensentante</th>
                                        <th escope="col">Fecha Nacimiento</th>
                                        <th escope="col">Descripción</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        lista.filter((val) =>{
                                            if(setListaAlumno==""){
                                                return val
                                            } else if(val.cedulaRepresentante.toLowerCase().includes(listaAlumno.toLowerCase()))
                                            {
                                                return val
                                            }
                                        }).map((item, index)=>{
                                            return( <tr key={index} onClick={() => UpdateEvent(item)} data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                            <td>{item.codAlumno}</td>
                                            <td>{item.cedulaRepresentante}</td>
                                            <td>{item.nombreAlumno}</td>
                                            <td>{item.representante}</td>
                                            <td>{item.fechaNacimiento}</td>
                                            <td>{item.curso}</td>

                                        </tr>);
                                        }
                                           
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}
export default Buscador;