const validation = (values) => {
    let errors = {}

    if (!values.email) {
        errors.email = "Email tidak boleh kosong"
    }
    if (!values.password) {
        errors.password = "Password tidak boleh kosong"
    }
    return errors;
}
export default validation