import { unstable_getServerSession } from "next-auth/next";

import style from '../styles/Home.module.css'
import Link from "next/link";

// import BuildClient from "./api/build-client";
import Router from "next/router";
import {authOptions} from "./api/auth/[...nextauth]";
import axios from "axios";

const Home = () => {

    return (
        <div className="pluto-top-padding vh-100 w-100 position-relative">
           <div className={`container text-center mt-4`} style={{background: "var( --pluto-e-blue)"}}>
               <div className={`stats row align-items-center py-2`}>
                   <div className={`col-md-4 col-6 py-3`}>
                       <div className={`d-grid d-flex gap-2 justify-content-center`}>
                           <div className={``}>
                               <svg width="30" height="30" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <circle cx="16.5" cy="16.5" r="16.5" fill="#FFDB58" fillOpacity="0.2"/>
                                   <path d="M11.6667 15.6H19.1667C20.2718 15.6 21.3316 16.0215 22.113 16.7716C22.8944 17.5217 23.3334 18.5392 23.3334 19.6C23.3334 20.6609 22.8944 21.6783 22.113 22.4285C21.3316 23.1786 20.2718 23.6 19.1667 23.6H11.6667V8.40002H17.9167C18.9112 8.40002 19.8651 8.77931 20.5683 9.45444C21.2716 10.1296 21.6667 11.0452 21.6667 12C21.6667 12.9548 21.2716 13.8705 20.5683 14.5456C19.8651 15.2207 18.9112 15.6 17.9167 15.6" stroke="#FFDB58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   <path d="M10 8.40002H11.6667" stroke="#FFDB58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   <path d="M10 23.6H11.6667" stroke="#FFDB58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   <path d="M14.1667 8.4V6" stroke="#FFDB58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   <path d="M17.5 8.4V6" stroke="#FFDB58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   <path d="M14.1667 26V23.6" stroke="#FFDB58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                   <path d="M17.5 26V23.6" stroke="#FFDB58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                               </svg>
                           </div>
                           <div className={`pt-2 h5 text-white`}>Bitcoin</div>
                       </div>
                   </div>
                   <div className={`col-md-2 col-6 py-3`}>
                        <p className={`h3`} style={{color: 'var(--pluto-green)'}}>+2.4%</p>
                   </div>
                   <div className={`col-md-3 col-6 py-3`}>
                       <svg width="63" height="45" viewBox="0 0 63 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M1 36.8766L2.11585 24.6299L8.06707 36.8766L12.9024 19.8377V36.8766L23.689 14.7792V36.8766L27.7805 43V36.8766L32.6159 42.2013L37.0793 36.8766L39.311 6.25974L43.4024 36.8766L50.0976 2L62 36.8766" stroke="white"/>
                       </svg>

                   </div>
                   <div className={`col-md-3 col-6 py-3`}>
                       <p className={`h3 text-white`}>$67316,00</p>
                   </div>
               </div>
           </div>

            <div className={`w-75 align-items-center position-absolute top-50 start-50 translate-middle`}>
                <Link href={`/invoice/create-invoice`}>
                    <a className={`btn w-100 p-4 ${style.btn_create} d-flex align-items-center justify-content-center gap-3`}>
                        <svg width="50" height="50" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 37H69" stroke="#4679BA" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M37 5V69" stroke="#4679BA" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <span className={`display-5`}>Crate Invoice</span>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export async function getServerSideProps ({req, res}) {

    const session = await unstable_getServerSession(req, res, authOptions);
    // console.log("session comes in ", session);
    // req.headers.authorization = ;

    // const client =  BuildClient(req);
    // let user;

    try {
        const { data } = await axios.get("https://pluto-sjj8.onrender.com/api/users/currentuser", {
            headers: {
                "Accept-Encoding": "gzip,deflate,compress",
                "Authorization": `bearer ${session?.user.accessToken}`
            }
        })


        // console.log("direct axios usage", )
        return {
            props: { user: data }
        }
    }catch (e) {
        // console.log("error", e.message)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
}

export default Home;