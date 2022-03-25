import React from 'react'
import NFT from './NFTCard'
import Main from './Main'
import Section1 from './Section1'
import Section2 from './Section2'
import Footer from './Footer'
import Image from 'next/image'
import imagenes from '../assets/imagenes.js'


const style ={
    wrapper: `relative bg-[url(../assets/piedra.png)] bg-repeat `,
    container: ` flex justify-center `,
    cont:` max-w-screen-xl`
}

const Fondo = () => {


    return (
        
        <div className={style.wrapper}>           
            <div className={style.container}>
                <div className={style.cont}>
                    <Section1 />
                    <Main />
                    <Section2 />             
                </div>            
            </div>
            <Footer />
        </div>
    )
}

export default Fondo