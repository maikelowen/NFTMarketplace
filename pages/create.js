import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { FileUploader } from "react-drag-drop-files";
import {
    nftaddress, nftmarketaddress
  } from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

const fileTypes = ["JPG", "PNG", "GIF"];
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', URL:'' })
  const router = useRouter()
  const [file, setFile] = useState(null);

  const handleChange = file => {
    setFile(file);
  };

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (e) {
      console.log('Error uploading file: ', e)
    }  
  }
  async function createItem() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      
      createSale(url);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    /* const url = await uploadToIPFS() */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()

    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    
    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer, tokenId, price)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem (
        nftaddress, tokenId, price, { value: listingPrice}
    )
    await transaction.wait()
    /* userCreated () */
    router.push('/')
  }

/* const userCreated = ( toastHandler = toast) => {
    console.log("entrando en welcomeUser")
    const userDoc = {
      _type: 'marketItems',
      _id: 
      name: 'title',
      description: 'description',
      price: 'floorPrice',
      userName: account,
      walletAddress: account,
      createdBy: account,
      owner: account,
  }

  const result = await client.createIfNotExists(userDoc)
    toastHandler.success(
      `Welcome back${userName !== 'Unnamed' ? ` ${userName}` : ''}!`,
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      }
    )
    console.log("saliendo de welcomeUser")

  } */

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <h1>
          Create a new NFT
        </h1>
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <textarea
          placeholder="External URL"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, URL: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl ? (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          ) : (
            //No funciona correctamente todavía. Falta hacer la lógica del componente
          <FileUploader 
            handleChange={onChange} 
            name="Asset" 
            types={fileTypes} 
          />
          )
        }
        <button 
            onClick={createItem} 
            className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                Create NFT
        </button>
      </div>
    </div>
  )
}
