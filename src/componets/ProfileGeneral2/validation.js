

const validation = (values) => {
    let errors = {}

    if (!values.name) {
        errors.name = "Nama tidak boleh kosong"
    }
    if (!values.nominal) {
        errors.nominal = "Nominal tidak boleh kosong"
    } else if (values.nominal < 10000) {
        errors.nominal = "Nominal tidak boleh kurang dari 10000"
    }
    return errors;
}
export default validation