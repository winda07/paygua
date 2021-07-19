

const validation = (values) => {
    let errors = {}

    if (!values.password) {
        errors.password = "Password tidak boleh kosong"
    } else if (values.password.length < 6) {
        errors.password = "Password harus lebih dari 6 karakter"
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Password tidak boleh kosong"
    } else if (values.confirmPassword.length < 6) {
        errors.confirmPassword = "Password harus lebih dari 6 karakter"
    }
    if (values.password !== values.confirmPassword) {
        alert("Password tidak sama")
    }
    return errors;
}
export default validation