
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
    } else if (parseInt(values.nominal.replace(/\./g, '')) < 2000) {
        errors.nominal = "Minimal Rp2.000"
    } else if (parseInt(values.nominal.replace(/\./g, '')) > 5000000) {
        errors.nominal = "Maksimal Rp5.000.000"
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