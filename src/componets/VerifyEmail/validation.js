

const validation = (values) =>{
    let errors={}

    if(!values.email){
        errors.email="Email tidak boleh kosong"
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email tidak valid"
    }
    return errors;
}
export default validation   