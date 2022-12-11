// import axios from 'axios'
// import * as https from "https";
//
// const client =  (url, method, req) => {
//     return axios[method](url, {
//         headers: req.headers
//     })
// }
//
// export default (req) => {
//     console.log(req.headers.authorization, "in build client")
//     console.log(typeof window)
//
//     // const httpsAgent = new https.Agent({
//     //     rejectUnauthorized: false
//     // })
//
//     if (typeof window === 'undefined') {
//         //server
//         return axios.create({
//             baseURL: 'https://pluto-sjj8.onrender.com',
//             headers: req.headers,
//             // httpAgent: new http.Agent({ keepAlive: true }),
//             httpsAgent: new https.Agent({ keepAlive: true }),
//             // httpsAgent: httpsAgent,
//             // baseURL: 'http://localhost:7001',
//             // baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
//         });
//     }else  {
//         // browser
//         return axios.create({
//             // baseURL: 'https://pluto-sjj8.onrender.com',
//             headers: req.headers,
//             // baseURL: '/'
//             baseURL: 'http://localhost:7001',
//         })
//     }
// }
//
//
// export { client }