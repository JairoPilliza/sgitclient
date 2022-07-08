import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

//https://remotestack.io/react-hook-form-set-update-form-values-with-useeffect-hook/
export default function SimpleForm() {
    const { register, handleSubmit, reset } = useForm()

    const [student, initStudent] = useState(null)

    useEffect(() => {
                initStudent({
                    name: 'Little Johnny',
                    email: 'lil@johnny.com',
                    grade: '3rd',
                })
                console.log(student)
                reset(student)
    }, [])

    useEffect(() => { 
        console.log(student)
        reset(student)
    }, [student])

    function onFormSubmit(dataRes) {
        console.log(dataRes)
        return false
    }

    return (
        <div>
            <h2 className="mb-3">
                React Initiate Form Values in useEffect Hook Example
            </h2>

            {(
                <form >
                    <div className="form-group mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            ng-model="sudent.name"
                            {...register('name')}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            {...register('email')}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Grade</label>
                        <input
                            type="text"
                            name="grade"
                            {...register('grade')}
                            className="form-control"
                        />
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Diabetes:</td>
                                <td>
                                    <div className="form-check form-switch">
                                        <input {...register("confirma")} className="form-check-input" type="radio" role="switch" id="confirmaSi" />
                                        <label className="form-check-label" htmlFor="confirmaSi">Si</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check form-switch">
                                        <input {...register("confirma")}  className="form-check-input" type="radio" role="switch" id="confirmaNo" />
                                        <label className="form-check-label" htmlFor="confirmaNo">No</label>
                                    </div>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" className="btn btn-dark">
                        Send
                    </button>
                </form>
            )}
            {!student && (
                <div className="text-center p-3">
                    <span className="spinner-border spinner-border-sm align-center"></span>
                </div>
            )}
            
        </div>
    )
}