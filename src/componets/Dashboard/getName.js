// import React, { useState, useEffect } from "react"
// import axios from "axios";

// const GetName = () => {
//     const [data, setValues] = useState({
//         name: ""
//     })
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             axios.get("https://paygua.com/api/invoice/getMyInvoice", {
//                 headers: {
//                     Authorization: token,
//                 }
//             })
//                 .then((result) => {
//                     setValues({
//                         ...data,
//                         name: result.data.data[0].name
//                     })
//                 })
//             console.log(data)
//         }
//     }, []);
//     return (
//         <p>{data.name}</p>
//     )
// }
// export default GetName