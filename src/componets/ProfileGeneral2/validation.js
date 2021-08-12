

const validation = (values) => {
    let errors = {}

    if (!values.name) {
        errors.name = "Nama tidak boleh kosong"
    }
    if (!values.nominal) {
        errors.nominal = "Nominal tidak boleh kosong"
    }
    return errors;
}
export default validation