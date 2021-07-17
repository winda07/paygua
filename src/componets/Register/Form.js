import React, {useState} from "react"
import Register from "./Register"
import RegisterCheck from "./RegisterCheck"

const Form =()=>{
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)
    const submitForm =()=>{
        setFormIsSubmitted(true)
    }
    return <div>
        {!formIsSubmitted ? <Register submitForm={submitForm}/> : <RegisterCheck/>}
    </div>
}

export default Form