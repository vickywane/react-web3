import React, {useEffect, useReducer} from "react";
import Web3 from "web3";
import {ethers, providers} from "ethers";

const {abi} = require('../contracts/adoptionAbi.json')

export const initialState = {
    isModalOpen: false,
    dispatch: () => {
    },
    showToast: false,
    adoptPet: (id) => {
    },
    retrieveAdopters: (id) => {
    },
};

const {ethereum, web3} = window

const AppContext = React.createContext(initialState);
export default AppContext;

const reducer = (state, action) => {
    switch (action.type) {
        case 'INITIATE_WEB3':
            return {
                ...state,
                isModalOpen: action.payload,
            }
        case 'SENT_TOAST':
            return {
                ...state,
                showToast: action.payload.toastVisibility
            }
        default:
            return state;
    }
};

const createEthContractInstance = () => {
    try {
        const provider = new providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contractAddress = process.env.REACT_APP_ADOPTION_CONTRACT_ADDRESS

        return new ethers.Contract(contractAddress, abi, signer)
    } catch (e) {
        console.log('Unable to create ethereum contract. Error:', e)
    }
}

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const instantiateWeb3 = async _ => {
        if (ethereum) {
            try {
                // Request account access
                return await ethereum.request({method: "eth_requestAccounts"})
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        } else if (web3) {
            return
        }

        return new Web3(Web3.givenProvider || "ws://localhost:8545")
    }

    const adoptPet = async id => {
        try {
            const instance = createEthContractInstance()
            const accountData = await instantiateWeb3()

            await instance.adopt(id, {from: accountData[0]})

            dispatch({
                type: 'SENT_TOAST', payload: {
                    toastVisibility: true
                }
            })

            // close success toast after 3s
            setTimeout(() => {
                dispatch({
                    type: 'SENT_TOAST', payload: {
                        toastVisibility: false
                    }
                })
            }, 3000)

        } catch (e) {
            console.log("ERROR:", e)
        }
    }

    const retrieveAdopters = async _ => {
        try {
            const instance = createEthContractInstance()

            return await instance.getAdopters()
        } catch (e) {
            console.log("RETRIEVING:", e)
        }
    }

    useEffect(() => {
        (async () => {
            await instantiateWeb3()
        })()
    })

    return (
        <AppContext.Provider
            value={{
                ...state,
                dispatch,
                adoptPet,
                retrieveAdopters
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
