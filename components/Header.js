"use client"
import { ConnectButton } from "web3uikit"

function Header() {
    return (
        <div className="p-5 border-b-2 my-4 flex flex-row">
            <p className="ml-2 text-4xl font-blog">Decentralized Lottery</p>
            <div className="ml-auto pr-3">
                <ConnectButton />
            </div>
        </div>
    )
}

export default Header
