

const validation = (values) => {
    let errors = {}

    if (!values.name) {
        errors.name = "Nama tidak boleh kosong"
    } else if (values.name.length > 20) {
        errors.name = "Nama maksimum 20 karakter"
    }
    if (!values.bio) {
        errors.bio = "Bio tidak boleh kosong"
    } else if (values.bio.length < 25) {
        errors.bio = "Bio Minimum 25 karakter"
    } else if (values.bio.length > 100) {
        errors.bio = "Bio Maksimum 100 karakter"
    }
    return errors;
}
export default validation