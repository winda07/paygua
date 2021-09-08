
const validation = (values) => {
    let errors = {}

    if (!values.nominal) {
        errors.email = "Nominal tidak boleh kosong"
    }
    return errors;
}