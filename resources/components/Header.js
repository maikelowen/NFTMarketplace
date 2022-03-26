import React from 'react';
import Image from 'next/image';
import imagenes from '../assets/imagenes'
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { BiWallet } from 'react-icons/bi'

// Instalar react icons --> npm install react-icons --save


// Estilos TailwindCSS
const style = {
    wrapper: `bg-[#272727] w-full px-[1.2rem] pt-[0.8rem] flex  fuente`,
    searchBar: `basis-1/5 flex  w-96 items-center bg-[#272727] rounded-[0.8rem] hover:bg-[#4c505c] mb-3`,
    searchIcon: `text-[#8a939b] mx-3  text-lg`,
    searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
    containerItems1: `basis-1/5 w-96  flex items-end justify-end text-xs font-bold cursor-pointer `,
    containerItems2: `basis-1/5 w-96 flex items-end justify-start text-xs font-bold cursor-pointer `,
    headerItem: ` text-[#323f40] px-4  text-[#c8cacd] hover:border-b-2  border-b-fuchsia-600 pb-3 `,
    containerIcon:`basis-1/5 w-96 flex items-center justify-end`,
    headerLogo: ` absolute inset-x-50% top-0 bg-gradient-to-r from-[#ff48f9] to-blue-500`,
    static: `basis-1/5 static  grid place-items-center justify-center rounded-[0.8rem] text-center `,
    logo:`mt-3`,
    headerIcon:`text-[#8a939b] mx-3 font-bold text-lg px-4 hover:text-white cursor-pointer mb-3`,
  }

const Header = () =>{
    return( 
        <nav className={style.wrapper}>
            
            {/* Barra Buscador */}
            <div className={style.searchBar}>
                <div className={style.searchIcon}>
                    <AiOutlineSearch />
                </div>
                <input className={style.searchInput} />
            </div>
            
            {/* Navegador 1 IZQ*/}
            <div className={style.containerItems1}>
                <Link href="/collections/0x5131e1a32856C67ed47F54744C0C70722B69954c">
                    <div className={style.headerItem} > HOME </div>
                </Link>
                <div className={style.headerItem}> PAGES </div>
                <div className={style.headerItem}> PORTFOLIO </div>
                
            </div>

           {/* Logotipo central */}
            <Link href="/">
                <div className={style.static}>
                    <div className={style.headerLogo} style={{clipPath: 'polygon(0 0, 100% 0, 78% 50%, 22% 50%)',width:'220px',height:'200px'}}>
                        <div className={style.logo}>
                            <Image src={imagenes.logo} height={65} width={65} />
                        </div>
                    </div>
                </div>
            </Link>
            
            {/* Navegador 2 DRCH*/}
            <div className={style.containerItems2}>
                <Link href="/collections/0x5131e1a32856C67ed47F54744C0C70722B69954c">
                    <div className={style.headerItem}> BLOG </div>
                </Link>
                <div className={style.headerItem}> SHOP </div>
                <div className={style.headerItem}> ELEMENT </div>
                {/* <div className={style.headerItem}> Create </div> */}
            </div>
            
            {/* Iconos DRCH */}
            <div className={style.containerIcon}>
                <div className={style.headerIcon}>
                        <BiUser />
                    </div>
                    <div className={style.headerIcon}>
                        <BiWallet />
                </div>
            </div>
            
        </nav>
    )
}

export default Header;