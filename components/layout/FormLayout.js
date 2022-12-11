import style from '../../styles/Layout.module.css'
import {Fragment, useContext, useState} from "react";
import Nav from "../ui/Nav";
import Notification from "../ui/Notification";
import NotificationContext from "../../store/notification-context";
import Loading from "../ui/Loading";
import LoaderContext from "../../store/loading-context";

function FormLayout(props) {

    const notificationCtx = useContext(NotificationContext);
    const loaderCtx = useContext(LoaderContext)

    const activeNotification = notificationCtx.notification;
    const isLoading = loaderCtx.loading;

    return(
        <Fragment>
            { isLoading && <Loading/> }
           <Nav />
            <main className={`d-flex w-100 vh-100 justify-content-center align-items-center ${style.bg}`}>
                <div className="overlay"></div>
                {props.children}
            </main>

            {activeNotification && <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status}/>}
        </Fragment>

    )
}

export default FormLayout