
const Validation = (values) => {
    let errors = {}

    if (!values.nominal) {
        errors.nominal = "Nominal tidak boleh kosong"
    } else if (parseInt(values.nominal.replace(/\./g, '')) < 1500) {
        errors.nominal = "Minimal Rp1.500"
    } else if (parseInt(values.nominal.replace(/\./g, '')) > 5000000) {
        errors.nominal = "Maksimal Rp5.000.000"
    }
    return errors;
}
export default Validation