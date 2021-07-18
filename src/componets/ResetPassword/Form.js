import React, {useState} from "react"
import ResetPassword from "./ResetPassword"
import VerivLupas from "../VerivLupas/VerivLupas"

const Form =()=>{
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)
    const submitForm =()=>{
        setFormIsSubmitted(true)
    }
    return <div>
        {!formIsSubmitted ? <ResetPassword submitForm={submitForm}/> : <VerivLupas/>}
    </div>

}

export default Form