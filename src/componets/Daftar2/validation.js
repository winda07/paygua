

const validation = (values) => {
    let errors = {}

    if (!values.nama) {
        errors.nama = "Nama tidak boleh kosong"
    }
    if (!values.bio) {
        errors.bio = "bio tidak boleh kosong"
    }
    return errors;
}
export default validation