import UserFormUtil from "../components/utils/user-form-util";
import useRequest from "../hook/use-request";
import Router from 'next/router'
import FormLayout from "../components/layout/FormLayout";
import { useContext } from "react";
import NotificationContext from "../store/notification-context";
import LoaderContext from "../store/loading-context";

function Signup () {
    const notificationCtx = useContext(NotificationContext)
    const loaderCtx = useContext(LoaderContext);


    const { doRequest, errors }  = useRequest({
        url: 'https://pluto-sjj8.onrender.com/api/users/signup',
        // url: ' http://localhost:7001/api/users/signup',
        method: 'post',
        onSuccess: () => { console.log("data saved successfully")}
    })

    const signUp = async (e, user, cb) => {
        e.preventDefault()
        notificationCtx.hideNotification()

        const isFill = Object.values(user).every(value => {
            if (value != "") return true
            return false
        })

        if (!isFill) return  notificationCtx.showNotification({title: "Sign Up", message: "Fill all the required detail", status: 'error'})

        loaderCtx.showLoader(true)
        try {
            await doRequest(user)
            notificationCtx.showNotification({title: "signup", message: "registration successful \n check your email for verification", status: "success"})
            loaderCtx.hideLoader()

        } catch (e) {
            notificationCtx.showNotification({title: "signup fail", message: e.response.data.message, status: "error" } )
            loaderCtx.hideLoader()
        }
        cb()
    }

    return <UserFormUtil formAction={signUp} />
}

Signup.getLayout =  (page) => (<FormLayout>{page}</FormLayout>)


export default Signup