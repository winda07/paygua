import React, { useState } from "react"
import VerifyEmail from "./VerifyEmail"
import Success from "../Success/Succes"
import LinkExpired from "../LinkExpired/LinkExpired"

const Form = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)
    const submitForm = (isDataValid = false) => {
        setFormIsSubmitted(true)
        if (isDataValid) {
            setFormIsValid(true)
        } else {
            setFormIsValid(false)
        }
    }
    return (
        <div>
            {!formIsSubmitted ? <VerifyEmail submitForm={submitForm} /> : (formIsValid ? <Success /> : <LinkExpired />)}
        </div>
    )

}

export default Form