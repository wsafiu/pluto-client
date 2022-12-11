import BreadCrumb from "../../components/utils/BreadCumb";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
// import buildClient from "../api/build-client";
import Badge from "../../components/ui/Badge";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../api/auth/[...nextauth]";
import axios from "axios";
const Invoices = ({invoice}) => {
    // console.log(invoice)

    return (
        <>
            <Head>
                {/*<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.css"/>*/}
            </Head>
            <div className={`pluto-top-padding vh-100 w-100 position-relative overflow-auto`}>
                <BreadCrumb title={'Invoices'} />

                <div className={`card bg-dark-pluto p-5 overflow-auto`}>
                    <table className="table align-middle mb-0 text-white table-borderless">
                        <thead className={`bg-pluto`}>
                            <tr >
                                <th>Date/Time</th>
                                <th>Phone Number</th>
                                <th>Amount(#)</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            invoice.map(item => (
                                <Link href={`/invoice/${item._id}`} key={item._id}>
                                    <tr style={{
                                        cursor: "pointer"
                                    }}>
                                        <td>{ item.createdAt }</td>
                                        <td>{ item.phone }</td>
                                        <td className={`text-center`}>{item.amount}</td>
                                        <td>
                                            <Badge status={item.status}  />
                                        </td>
                                    </tr>
                                </Link>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export async function getServerSideProps ({ req, res }) {

    const session = await unstable_getServerSession(req, res, authOptions);
    req.headers.authorization = `bearer ${session.user.accessToken}`;

    // const client = buildClient(req);
    let invoice = []
    try {
        // const { data } = await client.get('/api/users/currentuser') || null
        const { data } = await axios.get("https://pluto-sjj8.onrender.com/api/users/currentuser", {
            headers: {
                "Accept-Encoding": "gzip,deflate,compress",
                "Authorization": `bearer ${session?.user.accessToken}`
            }
        })

        if (data) {
            const invoiceResp = await axios.get(`https://pluto-sjj8.onrender.com/api/invoice?user=${data._id}`, {
                headers: {
                    "Accept-Encoding": "gzip,deflate,compress",
                    "Authorization": `bearer ${session?.user.accessToken}`
                }
            })

            invoice = invoiceResp.data
        }

    } catch (e) {
        // console.log(e.message)
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

export default Invoices