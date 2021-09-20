
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
    }
    // } else if (parseInt(values.nominal.replace(/\./g, '')) < 2000) {
    //     errors.nominal = "Minimal Rp2.000"
    // } else if (parseInt(values.nominal.replace(/\./g, '')) > 25000000) {
    //     errors.nominal = "Maksimal Rp25.000.000"
    // }
    if (!values.bank) {
        errors.bank = "Metoda pembayaran tidak boleh kosong"
    }
    if (values.bank === "ovo" && !values.nomor) {
        errors.nomor = "Nomor tidak boleh kosong"
    }
    if (values.bank === "bank") {
        if (parseInt(values.nominal.replace(/\./g, '')) < 10000) {
            errors.nominal = "Minimal Rp10.000"
        } else if (parseInt(values.nominal.replace(/\./g, '')) > 25000000) {
            errors.nominal = "Maksimal Rp25.000.000"
        }
    } else if (values.bank === "qris") {
        if (parseInt(values.nominal.replace(/\./g, '')) < 1500) {
            errors.nominal = "Minimal Rp1.500"
        } else if (parseInt(values.nominal.replace(/\./g, '')) > 5000000) {
            errors.nominal = "Maksimal Rp5.000.000"
        }
    } else if (values.bank === "ovo" || values.bank === "gopay" || values.bank === "dana" || values.bank === "linkaja") {
        if (parseInt(values.nominal.replace(/\./g, '')) < 1500) {
            errors.nominal = "Minimal Rp1.500"
        } else if (parseInt(values.nominal.replace(/\./g, '')) > 2000000) {
            errors.nominal = "Maksimal Rp2.000.000"
        }
    }
    return errors;
}
export default validation