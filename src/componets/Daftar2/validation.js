

const validation = (values) => {
    let errors = {}

    if (!values.name) {
        errors.name = "Nama tidak boleh kosong"
    }
    if (!values.bio) {
        errors.bio = "bio tidak boleh kosong"
    }
    if (!values.profilePicture) {
        errors.profilePicture = " foto profile tidak boleh kosong"
    }
    return errors;
}
export default validation