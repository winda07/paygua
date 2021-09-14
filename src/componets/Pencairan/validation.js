

const Validation = (values) => {
    let errors = {}

    if (!values.bank) {
        errors.bank = "bank tidak boleh kosong"
    }
    if (!values.norek) {
        errors.norek = "Nomor Rekening tidak boleh kosong"
    }
    return errors;
}
export default Validation