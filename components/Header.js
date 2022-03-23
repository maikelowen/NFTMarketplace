import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { ethers } from "ethers"
import { useState } from 'react'

import {
    nftaddress, nftmarketaddress
  } from '../config'
  
  import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
  import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

const style = {
    wrapper: `border border-[#dedfe0] bg-gradient-to-r from-[#2f324a] to-slate-900  w-screen px-[1.2rem] py-[0.8rem] flex`,
    logoContainer: `flex-col items-center align-center cursor-pointer`,
    logoText: ` ml-[0.8rem] text-[#1edcf8] font-semibold text-2xl`,
    searchBar: `border border-[#282b2f] flex flex-1 mx-[0.8rem] w-max-[100px] items-center bg-[#e6e8eb] rounded-[0.8rem] hover:bg-transparent border-gray-300`,
    searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
    searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
    button: `p-[0.6rem] text-m font-semibold rounded-lg cursor-pointer text-black bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500`,
    headerItem: ` px-4 font-bold text-black cursor-pointer`,
    headerIcon: `text-black text-3xl font-black px-4 hover:text-black cursor-pointer`,
    underLine: `border-b-violet-500`,
  }

function NavLink({to, children}) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}

function MobileNav({open, setOpen}) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
                <a className="text-xl font-semibold" href="/">LOGO</a>
            </div>
            <div className="flex flex-col ml-4">
                <a className="text-xl font-medium my-4" href="/marketplace" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Marketplace
                </a>
                <a className="text-xl font-normal my-4" href="/my-nfts" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    My NFTs
                </a>
                <a className="text-xl font-normal my-4" href="/create" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Create
                </a>
                <a className="text-xl font-normal my-4" href="/dashboard" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Dashboard
                </a>
                
            </div>  
        </div>
    )
}

export default function Header() {

    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [account, setAccount] = useState()
    const [nft, setNFT] = useState({})
    const [marketplace, setMarketplace] = useState({})
    // MetaMask Login/Connect
  
    const web3Handler = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0])
      // Get provider from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // Set signer
      const signer = provider.getSigner()
  
        window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      })
  
      window.ethereum.on('accountsChanged', async function (accounts) {
        setAccount(accounts[0])
        await web3Handler()
      }) 
       loadContracts(signer) 
    } 

    const loadContracts = async (signer) => {
        // Get deployed copies of contracts
        const marketplace = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        setMarketplace(marketplace)
        const nft = new ethers.Contract(nftaddress, NFT.abi, signer)
        setNFT(nft)
        setLoading(false)
        console.log(nft)
        console.log(marketplace)
      }

    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="w-3/12 flex items-center text-2xl font-semibold">
                <Link href="/">
                    LOGO
                </Link>
            </div>
            <div className="w-9/12 flex justify-end items-center">
                <div className={style.searchBar}>
                    <div className={style.searchIcon}>
                        <AiOutlineSearch />
                    </div>
                    <input
                    className={style.searchInput}
                    placeholder="Search items, collections, and accounts"
                    />
                </div>
                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex">
                    <div className={style.headerItem}>
                        <Link href="/marketplace">
                            Marketplace
                        </Link>
                    </div>  
                    <div className={style.headerItem}>
                        <Link href="/my-nfts">
                            My NFTs
                        </Link>
                    </div> 
                    <div className={style.headerItem}>
                        <Link href="/create">
                            Create
                        </Link>
                    </div>    
                    <div className={style.headerItem}>
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </div> 
                    <div className={style.headerItem}>
                            {account ? (
                                <Link
                                    href={`https://etherscan.io/address/${account}`}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <button variant="outline-light">
                                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                    </button>

                                </Link>
                            ) : (
                                <button className={style.button} onClick={web3Handler} variant="outline-light">Connect Wallet</button>
                            )}
                    </div> 
                </div>
            </div>
        </nav>
    )
}