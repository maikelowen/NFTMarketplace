import React from 'react'
import imagenes from '../assets/imagenes.js'
import Image from 'next/image'


// Estilos TailwindCSS
const style = {
    // Imagen de fondo en style.wrapper
    wrapper: `relative `,
    container: ` before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url(../assets/cartel.png)] before:bg-cover before:bg-center before:opacity-30 before:blur`,
    contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
    copyContainer: `w-1/2`,
    title: `relative text-white text-[46px] font-semibold`,
    description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
    ctaContainer: `flex`,
    accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-blue-500 rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
    button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
    cardContainer: `w-96 rounded-[3rem]`,
    infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
    author: `flex flex-col justify-center ml-4`,
    infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
    lineBottom: `bg-fuchsia-500 h-8 w-full`,
}

const Hero = () => {
    return (
        
        <div className={style.wrapper}>           
            <div className={style.container}>
                <div className={style.contentWrapper}>
                    <div className={style.copyContainer}>
                        <h1 className={style.title}>
                        Discover, collect, and sell extraordinary NFTs
                        </h1>
                        <div className={style.description}>
                        DreamHub is the world&apos;s first and largest NFT marketplace
                        </div>
                        <div className={style.ctaContainer}>
                            <button className={style.accentedButton}>Explore</button>
                            <button className={style.button}>Create</button>
                        </div>
                    </div>
                    <div className={style.cardContainer}>
                        <Image
                        className="rounded-t-lg"
                        src={imagenes.fondo}
                        alt="fondo"
                        />
                        <div className={style.infoContainer}>
                        <img
                        className="rounded-t-lg"
                        src="https://lh3.googleusercontent.com/qQj55gGIWmT1EnMmGQBNUpIaj0qTyg4YZSQ2ymJVvwr_mXXjuFiHJG9d3MRgj5DVgyLa69u8Tq9ijSm_stsph8YmIJlJQ1e7n6xj=s64"
                        alt="fondo"
                        />
                            <div className={style.author}>
                                <div className={style.name}>Jolly</div>
                                    <a
                                    className="text-[#1868b7]"
                                    href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/2324922113504035910649522729980423429926362207300810036887725141691069366277"
                                    >
                                    hola-kanola
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* div separador */}
                <div className={style.lineBottom} style={{clipPath: 'polygon(30% 0, 38% 0, 40% 55%, 61% 55%, 63% 0, 71% 0, 73% 80%, 100% 80%, 100% 100%, 0 100%, 0 80%, 28% 80%)'}}></div>
            </div>
            
        </div>
    )
}

export default Hero