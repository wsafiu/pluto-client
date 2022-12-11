import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

import PageLayout from "../components/layout/PageLayout";
import {NotificationContextProvider} from "../store/notification-context";
import Head from "next/head";
import {LoaderContextProvider} from "../store/loading-context";
// import buildClient from "./api/build-client";
import Nav from "../components/ui/Nav";
import Router from "next/router";
import axios from "axios";

function MyApp({ Component, pageProps, session }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  const getLayout = Component.getLayout || (page => (
      <PageLayout>
          {page}
      </PageLayout>
  ))

  return (

      <NotificationContextProvider>
          <LoaderContextProvider>
              <SessionProvider session={session}>
                  <Head>
                      <meta name="viewport" content="width=device-width, initial-scale=1" />
                  </Head>

                  {getLayout(<Component {...pageProps} />)}
              </SessionProvider>
          </LoaderContextProvider>
      </NotificationContextProvider>

  )
}

// MyApp.getInitialProps = async ({ ctx: { req } }) => {
//     // const client = buildClient(req);
//     let user = null;
//     try {
//         // const { data } = await client.get('/api/users/currentuser')
//
//         const { data } = await axios.get("https://pluto-sjj8.onrender.com/api/users/currentuser", {
//             headers: {
//                 authorization: req.headers.authorization
//             }
//         })
//         user = data;
//     }catch (e) {
//         user = null
//     }
//
//     return {
//         user
//     };
// }
export default MyApp
