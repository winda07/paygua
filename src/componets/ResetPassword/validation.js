

const validation = (values) =>{
    let errors={}

    if(!values.password){
        errors.password="Password tidak boleh kosong"
    }else if(values.password.length < 6){
        errors.password="Password harus lebih dari 6 karakter"
    }
    return errors;
}
export default validation   