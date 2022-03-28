import React from 'react'
import NFT from './NFTCard'
import NFT2 from './NFT2'
import Image from 'next/image'
import imagenes from '../assets/imagenes.js'



// Estilos TailwindCSS

const style ={
    wrapper: `relative mb-16 mt-8`,
    container: `flex flex-wrap  justify-center sm:justify-between border-t  border-cyan-300`,
    titulo:`text-sky-100 text-2xl text-center sm:text-left tracking-widest   fuente`,
    // boxNft:``,

}




const section1 = () => {


    return (
        
        <div className={style.wrapper}>           
            <h2 className={style.titulo}>Hot collections</h2>
            <div className={style.container}>
                    <div className={style.boxNft}> <NFT2 /> </div>
                    <div className={style.boxNft}> <NFT2 /> </div>
                    <div className={style.boxNft}> <NFT2 /> </div>
                    <div className={style.boxNft}> <NFT2 /> </div>
            </div>
        </div>
    )
}

export default section1