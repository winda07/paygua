

const validation = (values) => {
    let errors = {}

    if (!values.name) {
        errors.nama = "Nama tidak boleh kosong"
    }
    if (!values.email) {
        errors.email = "Email tidak boleh kosong"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email tidak valid"
    }
    if (!values.nominal) {
        errors.nominal = "Nominal tidak boleh kosong"
    } else if (values.nominal < 10.000) {
        errors.nominal = "Nominal minimal 10.000"
    }
    return errors;
}
export default validation