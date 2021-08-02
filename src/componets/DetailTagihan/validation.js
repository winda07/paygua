

const validation = (values) => {
    let errors = {}

    if (values.nominal < 10.000) {
        errors.nominal = "Nominal minimal 10.000"
    }
    return errors;
}
export default validation