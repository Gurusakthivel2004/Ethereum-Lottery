"use client"
import React, { useEffect } from "react"
import { useMoralis } from "react-moralis"
function ManualHeader() {
    const { enableWeb3, account, Moralis, isWeb3Enabled, isWeb3EnableLoading, deactivateWeb3 } =
        useMoralis()

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== undefined) {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged(async (account) => {
            console.log(`Account changed to ${account}`)
            if (account === null) {
                window.localStorage.removeItem("connected")
                await deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 7)}....{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    disabled={isWeb3EnableLoading}
                    onClick={async () => {
                        enableWeb3()
                        if (typeof window !== undefined) {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                >
                    Connect
                </button>
            )}
        </div>
    )
}

export default ManualHeader
