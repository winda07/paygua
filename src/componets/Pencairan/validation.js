

const validation = (values) => {
    let errors = {}

    if (!values.name) {
        errors.name = "Nama tidak boleh kosong"
    }
    if (!values.nominal) {
        errors.nominal = "Nominal tidak boleh kosong"
    } else if (values.nominal < 10.000) {
        errors.nominal = "Nominal tidak boleh kurang dari 10000"
    }
    if (!values.accNumber) {
        errors.accNumber = "Nomor Rekening tidak boleh kosong"
    } if (!values.bank) {
        errors.bank = "Pilihan bank tidak boleh kosong"
    }
    return errors;
}
export default validation