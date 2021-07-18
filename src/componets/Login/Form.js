import React, { useState } from "react"
import Login from "./Login"
import Daftar2 from "../Daftar2/Daftar2"
import Dashboard from "../Dashboard/Dashboard"

const Form = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)
    const submitForm = (isDataValid = false) => {
        setFormIsSubmitted(true)
        setFormIsValid(isDataValid)
    }
    return (
        <div>
            {!formIsSubmitted ? <Login submitForm={submitForm} /> : (formIsValid ? <Dashboard /> : <Daftar2 />)}
        </div>
    )

}

export default Form