import UserFormUtil from "../components/utils/user-form-util";
import useRequest from "../hook/use-request";
import FormLayout from "../components/layout/FormLayout";
import Router from "next/router";
import {useContext} from "react";
import { signIn as nextSignIn, getCsrfToken } from "next-auth/react";
// import {useCookies} from 'react-cookie'

import NotificationContext from "../store/notification-context";
import LoaderContext from "../store/loading-context";

const Login = ({ csrfToken }) => {
    // const [cookie, setCookie] = useCookies(["token"]);
    const notificationCtx = useContext(NotificationContext);
    const loaderCtx = useContext(LoaderContext);

    // const { doRequest, error } = useRequest({
    //     // url: 'https://pluto-backend-api.herokuapp.com/api/users/login',
    //     // url: 'http://localhost:7001/api/users/login',
    //     url: 'http://localhost:3000/api/auth/callback/credentials',
    //     method: 'post'
    // })

    const signIn = async ( e, user ) => {
        e.preventDefault()
        console.log("this is user data ", user)
        user.username = user.email
        loaderCtx.showLoader(true)
        try {
            // const { token } = await doRequest(user);

            const res = await nextSignIn('credentials', {
                redirect: false,
                username: user.email,
                password: user.password,
                callbackUrl: `${window.location.origin}`,
            });

            Router.push('/')
            loaderCtx.hideLoader()

        }catch (e) {
            console.log(e.message)
            notificationCtx.showNotification({title: "Login fail", message: e.response.data.message, status: 'error'})
            loaderCtx.hideLoader()
        }

    }
    return (
        <>
            <UserFormUtil formAction={signIn} />
            <button style={{zIndex: 1000}} onClick={() => nextSignIn()}>sign in </button>

        </>
    );
}

Login.getLayout = (page)  => (
    <FormLayout>
        {page}
    </FormLayout>
)

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken()
        }
    }
}

export default Login