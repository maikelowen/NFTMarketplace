import React from 'react'
import NFT from './NFTCard'
import NFT2 from './NFT2'
import Image from 'next/image'
import imagenes from '../assets/imagenes.js'


const style ={
    wrapper: ` w-full h-36 bg-gradient-to-r from-fuchsia-500 to-cyan-400 mt-52`,
    container: `  `,

}

const Footer = () => {

    return (
        
        <div className={style.wrapper}>           
            <div className={style.container}>
        
                {/* Contenido de footer */}

            </div>
        </div>
    )
}

export default Footer