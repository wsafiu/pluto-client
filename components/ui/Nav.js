import Link from "next/link";
import Image from "next/image";

export default function Nav ({ username }) {

    return (

        <nav className="navbar navbar-expand-lg scrolling-navbar double-nav py-3 fixed-top">
            <div className="container">
                <Link href="/client/pages">
                    <a className="navbar-brand text-white d-flex align-items-center" >
                        <Image src="/pluto_5.png" alt={"pluto"}  width={"50px"} height={"50px"}/>
                        <h2>pluto</h2>
                    </a>
                </Link>
                { username && <div className="justify-content-end" id="navbarSupportedContent">
                    <div className="dropdown">
                        <div className="px-3 fw-bolder text-white dropdown-toggle" id="navbarDropdownMenuLink-4"
                             data-bs-toggle="dropdown"
                             aria-haspopup="true" aria-expanded="false">
                            <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.webp"
                                 className="rounded-circle z-depth-0"
                                 alt="avatar image" height="35"/>
                            <span className="d-none d-md-inline px-3">{username}</span>
                        </div>
                        <div className="dropdown-menu w-100"
                             aria-labelledby="navbarDropdownMenuLink-4">
                            <a className="dropdown-item" href="#">My account</a>
                            <a className="dropdown-item" href="#">Log out</a>
                        </div>
                    </div>
                </div> }
            </div>
        </nav>
    )
}