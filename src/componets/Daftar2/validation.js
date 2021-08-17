

const validation = (values) => {
    let errors = {}

    if (!values.name) {
        errors.name = "Nama tidak boleh kosong"
    }
    if (!values.bio) {
        errors.bio = "Bio tidak boleh kosong"
    } else if (values.bio.length < 25) {
        errors.bio = "Bio Minimum 25 karakter"
    }
    return errors;
}
export default validation