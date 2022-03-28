import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Hero from '../components/Hero'
import Section1 from '../components/Section1'
import Section2 from '../components/Section2'
import Footer from '../components/Footer'
import Fondo from '../components/Fondo'
import { BiHeart } from 'react-icons/bi'
import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'


const style = {
  wrapper: `bg-[#303339] flex-auto w-[16rem] h-[24rem]  my-4 sm:my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer shadow-xl  shadow-fuchsia-500`,
  imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
}


export default function Home() {
  const [nfts, setNfts] = useState([])
  const [isListed, setIsListed] = useState(false)
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
    const data = await contract.fetchMarketItems()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  
  if (loadingState === 'loaded' && !nfts.length) return (
    <div>
      <Hero/>
      {/* <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1> */}
    </div>
  )
  return (
   <div>
    <Hero/>
    {
        nfts.map((nft, i) => (
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
                <Image src={nft.image} alt='image'className={style.nftImg} />
            </div>
            <div className={style.details}>
                <div className={style.info}>
                <div className={style.infoLeft}>
                    <div className={style.collectionName}>title</div>
                    <div className={style.assetName}>nftItem.name</div>
                </div>
                {isListed && (
                    <div className={style.infoRight}>
                    <div className={style.priceTag}>Price</div>
                    <div className={style.priceValue}>
                        <img
                        src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                        alt="eth"
                        className={style.ethLogo}
                        />
                        {price}
                    </div>
                    </div>
                )}
                </div>
                <div className={style.likes}>
                <span className={style.likeIcon}>
                    <BiHeart />
                </span>
                nftItem.likes
                </div>
            </div>
            </div>
              /* <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
                  <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div>
              </div> */
            ))
          }
   </div>
        
     
  )
}