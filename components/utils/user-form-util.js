import { useRouter } from 'next/router'
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

function UserFormUtil ({ formAction }) {
    const { pathname } = useRouter();
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: ''
    })
    const [isEmpty, setIsEmpty] = useState(true);

    const checkInput = (e) => {
        setIsEmpty(true)
        if (e.target.value === "") e.target.classList.add('input_error')
        else {
            e.target.classList.remove('input_error')
            setIsEmpty(false)
        }
    }

    const form = [
        pathname === "/signup" && {placeholder: "Account Name", data_name: "fullname", type: "text"},
        {placeholder: "Email", data_name: "email", type: "email"},
        {placeholder: "password", data_name: "password", type: "password"}
    ].filter(elementIsTrue => elementIsTrue)
    .map(({placeholder, data_name, type}) => (
    <input type={type}
           key={placeholder}
           name={data_name}
           className="form-control mb-5 bg-transparent p-3 text-white"
           placeholder={placeholder}
           value={user[data_name]}
           onChange={e => setUser({
               ...user,
               [data_name]: e.target.value
           })}
           onBlur={checkInput}
    />
))

    return (

        <>
            <Head>
                <title>{ pathname === "/login" ? "Login" : "Signup"  }</title>
            </Head>
            <div className="col-md-4 card signup-card">
                <form className="text-center p-5" onSubmit={e => formAction(e, user,  () => {
                    setUser({
                        fullname: '',
                        password: '',
                        email: ''
                    })
                })}>

                    <p className="h1 mb-4">{ pathname === "/login" ? "Login" : "Sign Up" }</p>
                    { form }

                    { pathname === "/login" && (
                        <div className="d-flex  justify-content-around">
                            <div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="" id="defaultLoginFormRemember"/>
                                    <label className="custom-control-label px-2" htmlFor="defaultLoginFormRemember"> Remember
                                        me</label>
                                </div>
                            </div>
                            <div>
                                <a href="">Forgot password?</a>
                            </div>
                        </div>
                    ) }

                    {<button className={`btn btn-primary btn-block my-4 w-100 ${ isEmpty && 'disabled'} `}
                             type="submit">{pathname === "/login" ? "Login" : "Sign Up"}</button>}

                    <p>
                        { pathname === "/login" ? "Not a member?" : "Already a memeber?" }
                        <Link href={ pathname === "/login" ? "/signup" : "/login" } >
                            <a> { pathname === "/login" ? " Register" : " Login" }</a>
                        </Link>
                    </p>

                </form>

            </div>

        </>
    )
}

export default UserFormUtil