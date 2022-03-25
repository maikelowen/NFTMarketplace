import React from 'react'
import NFT from './NFTCard'
import Section1 from './Section1'
import Section2 from './Section2'
import Image from 'next/image'
import imagenes from '../assets/imagenes.js'



const style ={
    wrapper: `relative`,
    container: `flex flex-wrap flex-row justify-center sm:justify-between border-t  border-cyan-300`,
    titulo:`text-sky-100 text-2xl text-center sm:text-left tracking-widest   fuente`,
    // boxNft:`    mx-0 md:mx:2`,
    // boxNft2:`    mx-0 md:mx:2`,
    // boxNft:`md:mr-6 xl:mr-10`,
    // boxNft2:`md:mr-6 xl:mr-10 hidden md:inline-flex`,
}


const Main = () => {


    return (
        
        <div className={style.wrapper}>     
            <h2 className={style.titulo}>Live auctions</h2>      
            <div className={style.container}>
                
                    <div className={style.boxNft}><NFT /></div>
                    <div className={style.boxNft}><NFT /></div>
                    <div className={style.boxNft}><NFT /></div>
                    <div className={style.boxNft}><NFT /></div>
                
                    <div className={style.boxNft}><NFT /></div>
                    <div className={style.boxNft}><NFT /></div>
                    <div className={style.boxNft}><NFT /></div>
                    <div className={style.boxNft}><NFT /></div>
                
                    <div className={style.boxNft2}><NFT /></div>
                    <div className={style.boxNft2}><NFT /></div>
                    <div className={style.boxNft2}><NFT /></div>
                    <div className={style.boxNft2}><NFT /></div>
                
            </div>
        </div>
    )
}

export default Main