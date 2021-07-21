

const validation = (values) => {
    let errors = {}

    if (!values.name) {
        errors.name = "Nama tidak boleh kosong"
    }
    if (!values.nominal) {
        errors.nominal = "Nominal tidak boleh kosong"
    } else if (values.nominal < 0) {
        errors.nominal = "Nominal tidak boleh 0"
    }
    if (!values.accNumber) {
        errors.accNumber = "Nomor Rekening tidak boleh kosong"
    } if (!values.bank) {
        errors.bank = "Pilihan bank tidak boleh kosong"
    }
    return errors;
}
export default validation