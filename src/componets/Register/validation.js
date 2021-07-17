const validation = (values) =>{
    let errors={}

    if(!values.email){
        errors.email="Email tidak boleh kosong"
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email tidak valid"
    }
    if(!values.username){
        errors.username="Username tidak boleh kosong"
    }
    if(!values.password){
        errors.password="Password tidak boleh kosong"
    }else if(values.password.length < 6){
        errors.password="Password harus lebih dari 6 karakter"
    }
    return errors;
}
export default validation   