import React from 'react'
import { useEffect, useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import Router from 'next/router'
import Image from 'next/image'
import imagenes from '../assets/imagenes'


const style = {
    wrapper: ` relative  flex-auto w-[16rem] my-4 sm:my-10  mx-5 rounded-b-lg overflow-hidden cursor-pointer `,
    imgContainer: ` w-full overflow-hidden flex justify-center items-center  marco`,
    nftImg: `w-full object-cover   overflow-hidden   `,
    // details: `p-3`,
    // info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
    // infoLeft: `flex-0.6 flex-wrap`,
    // collectionName: `font-semibold text-sm text-[#8a939b]`,
    // assetName: `font-bold text-lg mt-2`,
    // infoRight: `flex-0.4 text-right`,
    // priceTag: `font-semibold text-sm text-[#8a939b]`,
    // priceValue: `flex items-center text-xl font-bold mt-2`,
    // ethLogo: `h-5 mr-2`,
    // likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
    // likeIcon: `text-xl mr-2`,
    marco:'  marco'
}





const NFT2 = () => {
    const [isListed, setIsListed] = useState(false)
    const [price, setPrice] = useState(0)

    // useEffect(() => {
    //     const listing = listings.find((listing) => listing.asset.id === nftItem.id)
    //     if (Boolean(listing)) {
    //     setIsListed(true)
    //     setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
    //     }
    // }, [listings, nftItem])

    return (
        <div
           
            className={style.wrapper}
            onClick={() => {
                Router.push({
                pathname: `/nfts/${nftItem.id}`,
                query: { isListed: isListed },
                })
            }}
            >
            <div className={style.imgContainer}>
                    <Image src={imagenes.fondo} alt='image' className={style.nftImg}/>
                    
            </div>
            
            {/* Aqui iria el los datos  de coleccion o NFT */}
        </div>
        
    )
    }

export default NFT2