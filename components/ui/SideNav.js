import { useRouter } from "next/router";

import style from '../../styles/sidenav.module.css'
import Link from "next/link";


const SideNav = () => {
    const { pathname } = useRouter();

    return (
        <div className={`${style.sidenav} ${style.cursor} pluto-top-padding navigator Pr-2`}>
           <ul className={`list-unstyled text-center w-100`}>
               <Link href={`/`}>
                   <li className={`mb-5 list-group-item ${ pathname === "/" ? style.active : null}  py-4`}>
                       <div className={`icon`}>
                           <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M49 49V22.3771C48.9951 22.0838 48.9299 21.7944 48.8081 21.526C48.6863 21.2576 48.5105 21.0156 48.2909 20.8142L26.4727 1.55563C26.0705 1.19822 25.5451 1 25 1C24.4549 1 23.9295 1.19822 23.5273 1.55563L1.70909 20.8142C1.48954 21.0156 1.3137 21.2576 1.19192 21.526C1.07014 21.7944 1.00489 22.0838 1 22.3771V49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                               <path d="M1 49L49 49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                               <path d="M31.5455 49V34.1654C31.5455 33.6033 31.3156 33.0643 30.9065 32.6669C30.4973 32.2694 29.9423 32.0461 29.3637 32.0461H20.6364C20.0578 32.0461 19.5028 32.2694 19.0936 32.6669C18.6845 33.0643 18.4546 33.6033 18.4546 34.1654V49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>

                       </div>
                       <p className={`text-white fw-bolder pt-2`}>Home</p>
                   </li>
               </Link>
               <Link href={`/ongoing`}>
                   <li className={`mb-5 list-group-item py-4 ${ pathname.includes("/ongoing") ? style.active : null}`}>
                       <div className={`icon`}>
                           <svg width="30" height="30" viewBox="0 0 34 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M17 25L1.8 13.6C1.55303 13.4124 1.35245 13.1705 1.21375 12.8931C1.07504 12.6157 1.00191 12.3101 1 12V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H31C31.5304 1 32.0391 1.21071 32.4142 1.58579C32.7893 1.96086 33 2.46957 33 3V11.9C32.9981 12.2101 32.925 12.5157 32.7863 12.7931C32.6475 13.0705 32.447 13.3124 32.2 13.5L17 25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                               <path d="M17 25L1.8 36.4C1.55303 36.5876 1.35245 36.8295 1.21375 37.1069C1.07504 37.3843 1.00191 37.6899 1 38V47C1 47.5304 1.21071 48.0391 1.58579 48.4142C1.96086 48.7893 2.46957 49 3 49H31C31.5304 49 32.0391 48.7893 32.4142 48.4142C32.7893 48.0391 33 47.5304 33 47V38.1C32.9981 37.7898 32.925 37.4843 32.7863 37.2069C32.6475 36.9295 32.447 36.6876 32.2 36.5L17 25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                               <path d="M1 9H33" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                       </div>
                       <p className={`text-white fw-bolder pt-2`}>Ongoing</p>
                   </li>
               </Link>
               <Link href={`/invoice`} >
                   <li className={`mb-5 list-group-item py-4 ${ pathname.includes("/invoice") ? style.active : null}`}>
                       <div className={`icon`}>
                           <svg width="30" height="30" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M31 49H3C2.46957 49 1.96086 48.7893 1.58579 48.4142C1.21071 48.0391 1 47.5304 1 47V11C1 10.4696 1.21071 9.96086 1.58579 9.58579C1.96086 9.21071 2.46957 9 3 9H23L33 19V47C33 47.5304 32.7893 48.0391 32.4142 48.4142C32.0391 48.7893 31.5304 49 31 49Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                               <path d="M9 9V3C9 2.46957 9.21071 1.96086 9.58579 1.58579C9.96086 1.21071 10.4696 1 11 1H31L41 11V39C41 39.5304 40.7893 40.0391 40.4142 40.4142C40.0391 40.7893 39.5304 41 39 41H33" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                               <path d="M11 31H23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                               <path d="M11 39H23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                       </div>
                       <p className={`text-white fw-bolder pt-2`}>Invoice</p>
                   </li>
               </Link>
           </ul>
        </div>

    )
}

export default SideNav;