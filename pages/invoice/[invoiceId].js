import BreadCrumb from "../../components/utils/BreadCumb";
import Image from "next/image";
// import buildClient from "../api/build-client";
import Badge from "../../components/ui/Badge";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../api/auth/[...nextauth]";
import axios from "axios";

const Invoice = ({ invoice }) => {

    console.log(invoice)
    const { status, walletAddresses, amount, phone, amountInSatoshi } = invoice || {}


    return (
        <div className={`pluto-top-padding vh-100 w-100 position-relative`}>
            <BreadCrumb title={`Invoice` } />

           <div className={`row justify-content-center text-white text-center`}>
                   <div className={`col-sm-6`}>
                       <div className={`card bg-dark-pluto`}>
                           <div className="d-flex w-100 justify-content-end">
                               <Badge status={status} />
                           </div>
                           <div className="row p-5">
                               <div className="col-6  text-start border-end border-success">
                                   <small>Phone Number</small>
                                   <p>{phone}</p>
                               </div>
                               <div className="col-6 text-end">
                                   <small>Amount Expected</small>
                                   <p>{amount}</p>
                               </div>

                               <div className="py-4">
                                   <p>send {Number(amountInSatoshi).toFixed(5)}BTC to this wallet addresses</p>
                                   <h4>{walletAddresses}</h4>
                               </div>

                               <div className="w-100 d-flex flex-column align-items-center gap-2">
                                   {
                                       status === "complete" &&
                                       <div className={`btn btn-success btn-lg w-75 disabled`}>
                                           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                                fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                               <path
                                                   d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                               <path
                                                   d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                                           </svg>
                                       </div>
                                   }
                                   { status === "pending" && <div className={`btn btn-outline-danger btn-lg w-75`}>cancel</div>}
                                   {
                                       status === "incomplete" &&
                                       <div className="btn-group w-75">
                                           <button className={`btn btn-info btn-lg`}>Refund</button>
                                           <button className={`btn btn-success btn-lg`}>Top Up</button>
                                        </div>
                                   }
                               </div>
                           </div>

                       </div>
                   </div>
                   <div className={`col-sm-6 py-5`}>
                       <Image src="/hash.png" alt={`'scan'`} width={`150`} height={`150`}/>
                   </div>
               </div>
        </div>
    )
}

export async function getServerSideProps ({ params, req, res }) {

    const session = await unstable_getServerSession(req, res, authOptions);
    // req.headers.authorization = `bearer ${session.user.accessToken}`;

    // const client = buildClient(req);
    let invoice = null
    try {
        // const { data } = await client.get('/api/users/currentuser') || null

        const { data } = await axios.get("https://pluto-sjj8.onrender.com/api/users/currentuser", {
            headers: {
                "Accept-Encoding": "gzip,deflate,compress",
                "Authorization": `bearer ${session?.user.accessToken}`
            }
        })

        if (data) {
            const invoiceResp = await axios.get(`https://pluto-sjj8.onrender.com/api/invoice?invoiceId=${params.invoiceId}`, {
                headers: {
                    "Accept-Encoding": "gzip,deflate,compress",
                    "Authorization": `bearer ${session?.user.accessToken}`
                }
            })
            invoice = invoiceResp.data
        }

    } catch (e) {
        if (e.response.status === 401){
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }else invoice = null
    }
    return {
        props: {
            invoice
        }
    }

}

export default Invoice;