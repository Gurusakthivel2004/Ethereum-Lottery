"use client"

import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setrecentWinner] = useState("0")
    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification()
        getFeeData()
    }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            // icon: "bell",
            position: "topR",
        })
    }

    const getFeeData = async () => {
        const entranceCall = (await getEntranceFee()).toString()
        const numPlayersCall = (await getNumberOfPlayers()).toString()
        const recentWinnerCall = await getRecentWinner()
        setEntranceFee(entranceCall)
        setNumPlayers(numPlayersCall)
        setrecentWinner(recentWinnerCall)
        console.log(ethers.utils.formatUnits(entranceFee, "ether"))
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            getFeeData()
        }
    }, [isWeb3Enabled])

    return (
        <div className="p-5 my-2 flex flex-col gap-2">
            {raffleAddress ? (
                <div>
                    <p className="">
                        Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH{" "}
                    </p>
                    <p>Number of Players: {numPlayers} </p>
                    <p>Recent Winner: {recentWinner} </p>

                    <button
                        className="bg-blue-500 text-white p-3 rounded-full my-2"
                        onClick={async () => {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-4 w-4 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>
                </div>
            ) : (
                <p>No Raffle address detected</p>
            )}
        </div>
    )
}

export default LotteryEntrance
