import style from '../../styles/Layout.module.css'
import {Fragment, useContext, useState} from "react";
import Nav from '../ui/Nav'
import Notification from "../ui/Notification";
import NotificationContext from "../../store/notification-context";
import SideNav from "../ui/SideNav";
import Loading from "../ui/Loading";
import LoaderContext from "../../store/loading-context";
import buildClient from "../../pages/api/build-client";
import MyApp from "../../pages/_app";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import useSWR from "swr"


function PageLayout(props) {
    const notificationCtx = useContext(NotificationContext);
    const loaderCtx = useContext(LoaderContext)

    const activeNotification = notificationCtx.notification
    const isLoading = loaderCtx.loading

    const [ user, setUser ] = useState(null)
    const fetcher = async (url) => {
        const { user: { accessToken } } = await getSession()

        const { data } = await axios.get(url, {
            headers: {
                authorization: `bearer ${accessToken}`
            }
        })
        return data
    }
    const { data, error } = useSWR("http://localhost:7001/api/users/currentuser", fetcher);
    if (error) console.log(error);
    if (data && user === null) setUser(data)
    // console.log("user",user)


    return(
        <Fragment>
            { isLoading && <Loading/> }
            {/*<Nav />*/}
            <Nav username={user?.fullname} />

            <main className={`vh-100 bg-pluto`}>
                {/*<Nav />*/}
                <div className={`container-fluid border-2 border-danger px-0 m-0`}>
                    <div className="row p-0 m-0">
                        <div className={`col-sm-2 p-0 ${style.small}`}>
                            <SideNav />
                        </div>
                        <div className="col-sm-10">
                            {props.children}
                        </div>
                    </div>
                </div>
            </main>
            {activeNotification && <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status}/>}
        </Fragment>

    )
}


export default PageLayout