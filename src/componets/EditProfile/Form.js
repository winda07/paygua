import React, { useState } from "react"
import EditProfile from "./EditProfile"
import Settings from "../Settings/Settings"

const Form = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)
    const submitForm = () => {
        setFormIsSubmitted(true)
    }
    return <div>
        {!formIsSubmitted ? <EditProfile submitForm={submitForm} /> : <Settings />}
    </div>
}

export default Form