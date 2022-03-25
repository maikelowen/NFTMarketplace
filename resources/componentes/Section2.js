import React from 'react'
import NFT from './NFTCard'
import NFT2 from './NFT2'
import Image from 'next/image'
import imagenes from '../assets/imagenes.js'


const style ={
    wrapper: `relative flex justify-center mt-24`,
    container: `flex-row  w-full bg-cyan-400 rounded-[20px]`,
    newsletter:"mx-4 md:mx-12 py-8 md:py-12 grid place-content-center px-4 md:px-0",
    newCont:"lg:flex justify-start lg:gap-28",
    newsH2:"font-bold text-5xl text-gray-800",
    newsPar:"pt-8 md:pt-4 text-gray-600",
    newsForm:"mt-8 md:flex justify-start md:gap-4",
    newsInput:"placeholder-gray-600 w-full md:w-1/2 p-4 grid place-items-center border rounded-md focus:outline-none",
    newsButton:"w-full md:w-auto bg-blue-500 text-white px-8 py-4 border rounded-md hover:bg-indigo-700 grid place-items-center font-semibold mt-4 md:mt-0 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50",
    newsRead:"pt-4 text-xs text-gray-600",
    newsU:"cursor-pointer no-underline hover:underline",
    newsImg:"pt-8 lg:pt-0 lg:w-1/2"
    
}




const section2 = () => {


    return (
        
        <div className={style.wrapper}>           
            <div className={style.container}>
                <div className={style.newsletter}>
                    <div className={style.newCont}>
                        <div className>
                            <h2 className={style.newsH2}>Newsletter</h2>
                            <p className={style.newsPar}>Sign up for our newsletter and get weekly updates. We only send emails about our latest products on the market once a week every Friday.</p>
                            <div className={style.newsForm}>
                                <input type="email" placeholder="Your Email" className={style.newsInput} />
                                <button className={style.newsButton}>Subscribe</button>
                            </div>
                            <p className={style.newsRead}>Read our <u className={style.newsU}>privacy policy</u></p>
                        </div>
                        <div className={style.newsImg}>
                            <Image src={imagenes.cartel} alt="street" className=" lg:block" />
                            
                        </div>        
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default section2