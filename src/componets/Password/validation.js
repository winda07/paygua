

const validation = (values) => {
    let errors = {}

    if (!values.passwordLama) {
        errors.passwordLama = "Password Lama tidak boleh kosong"
    } else if (values.passwordLama.length < 6) {
        errors.passwordLama = "Password harus lebih dari 6 karakter"
    }
    if (!values.passwordBaru) {
        errors.passwordBaru = "Password Baru tidak boleh kosong"
    } else if (values.passwordBaru.length < 6) {
        errors.passwordBaru = "Password harus lebih dari 6 karakter"
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Konfirmasi Password tidak boleh kosong"
    } else if (values.confirmPassword.length < 6) {
        errors.confirmPassword = "Password harus lebih dari 6 karakter"
    }
    if (values.passwordBaru !== values.confirmPassword) {
        alert("Password baru dan konfirmasi password tidak sama")
    }

    return errors;
}
export default validation