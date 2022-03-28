import React from 'react'
import NFT from './NFTCard'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import {
    marketplaceAddress
  } from '../config'
  
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

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
    const [nfts, setNfts] = useState([])
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