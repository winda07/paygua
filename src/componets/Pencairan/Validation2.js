

const Validation2 = (values) => {
    let errors = {}

    if (!values.nominal) {
        errors.nominal = "Nominal tidak boleh kosong"
    }

    return errors;
}
export default Validation2