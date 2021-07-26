

const validation = (values) => {
    let errors = {}

    if (!values.nama) {
        errors.nama = "Nama tidak boleh kosong"
    }
    if (!values.username) {
        errors.username = "Username tidak boleh kosong"
    }
    return errors;
}
export default validation