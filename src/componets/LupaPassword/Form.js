import React, {useState} from "react"
import Lupas from "./Lupas"
import VerivLupas from "../VerivLupas/VerivLupas"

const Form =()=>{
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)
    const submitForm =()=>{
        setFormIsSubmitted(true)
    }
    return <div>
        {!formIsSubmitted ? <Lupas submitForm={submitForm}/> : <VerivLupas/>}
    </div>

}

export default Form