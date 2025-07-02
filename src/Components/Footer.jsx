import axios from 'axios';
import {BsFacebook, BsInstagram, BsTwitter, BsLinkedin} from 'react-icons/bs';


function Footer(){
    const currDate = new Date();
    const year = currDate.getFullYear();
    return(
        <>
        <footer className='fixed w-full bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-around text-[#333446] bg-[#EAEFEF]sm:px-20'>
                <section className='text-sm'>
                      © Copyright {year} | All rights reserved
                </section>

                <section className='flex items-center justify-center gap-5 text-sm text-[#333446]'>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer' >
                        <BsFacebook/>
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer' >
                        <BsInstagram/>
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer' >
                        <BsLinkedin/>
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer' >
                        <BsTwitter/>
                    </a>

                </section>

        </footer>
        </>
    )
}

export default Footer;