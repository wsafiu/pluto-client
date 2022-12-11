import BreadCrumb from "../../components/utils/BreadCumb";
// import BuildClient from "../api/build-client";
import {useState, useContext} from "react";
import useRequest from "../../hook/use-request";
import NotificationContext from "../../store/notification-context";
import LoaderContext from "../../store/loading-context";
import Router from "next/router";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../api/auth/[...nextauth]";
import axios from "axios";
import {getSession} from "next-auth/react";

const CreateInvoice = ( { user } ) => {
    const [invoice, setInvoice] = useState({
        phone: '',
        amount: ''
    });
    // const { doRequest } = useRequest({
    //     url: '/api/invoice',
    //     method: 'post'
    // })

    const notificationCtx = useContext(NotificationContext);
    const loaderCtx = useContext(LoaderContext);

    const createInvoice = async (e) => {
        e.preventDefault()
        const { user: { accessToken } } = await getSession()
        loaderCtx.showLoader(true)

        try {
            // await doRequest(invoice)
            console.log(invoice)
            await axios.post("https://pluto-sjj8.onrender.com/api/invoice", invoice, {
                headers: {
                    authorization: `bearer ${accessToken}`,
                }
            })
            Router.push('/invoice')
        }catch (e) {
            loaderCtx.hideLoader();
            notificationCtx.showNotification({
                title: "Invoice",
                message: e.response.data.message,
                status: 'error'
            })
        }
        loaderCtx.hideLoader()
        console.log(invoice)
    }
    const form = [
        {placeholder: "Amount Expected", data_name: "amount", type: "text"},
        {placeholder: "Phone Number", data_name: "phone", type: "text"},
    ].map(({placeholder, data_name, type}) => (
            <input type={type}
                   key={placeholder}
                   name={data_name}
                   className="form-control mb-5 bg-transparent p-3 text-white"
                   placeholder={placeholder}
                   value={invoice[data_name]}
                   onChange={e => setInvoice({
                       ...invoice,
                       [data_name]: e.target.value
                   })}
            />
        ))

    return(
        <div className={`pluto-top-padding vh-100 w-100 position-relative`}>
            <BreadCrumb title={'Create Invoice'} />

           <div className={`col-sm-6 col-12 position-absolute top-50 start-50 translate-middle`}>
               <div className="card w-100 signup-card">
                   <form className="text-center p-5" onSubmit={createInvoice}>
                       { form }
                       <button className="btn btn-lg btn-primary btn-block my-4 w-100" type="submit">Submit</button>
                   </form>

               </div>
           </div>
        </div>
    )
}

export async function getServerSideProps ({req, res}) {

    const session = await unstable_getServerSession(req, res, authOptions);
    // req.headers.authorization = `bearer ${session.user.accessToken}`;

    // const client =  BuildClient(req);
    let user;

    try {
        // const { data } = await client.get('/api/users/currentuser') || null

        const { data } = await axios.get("https://pluto-sjj8.onrender.com/api/users/currentuser", {
            headers: {
                "Accept-Encoding": "gzip,deflate,compress",
                "Authorization": `bearer ${session?.user.accessToken}`
            }
        })
        return {
            props: { user: data }
        }
    }catch (e) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
}

export default CreateInvoice;