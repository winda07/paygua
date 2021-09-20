
const validation = (values) => {
    let errors = {}
    if (!values.email) {
        errors.email = "Email tidak boleh kosong"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email tidak valid"
    }
    if (!values.nama) {
        errors.nama = "Nama tidak boleh kosong"
    }
    if (!values.nominal) {
        errors.nominal = "Nominal tidak boleh kosong"
    } else if (parseInt(values.nominal.replace(/\./g, '')) < 10000) {
        errors.nominal = "Minimal Rp10.000"
    } else if (parseInt(values.nominal.replace(/\./g, '')) > 25000000) {
        errors.nominal = "Maksimal Rp25.000.000"
    }
    if (!values.bank) {
        errors.bank = "Metoda pembayaran tidak boleh kosong"
    }
    if (values.bank === "ovo" && !values.nomor) {
        errors.nomor = "Nomor tidak boleh kosong"
    }
    return errors;
}
export default validation