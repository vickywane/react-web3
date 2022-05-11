import React, {useEffect, useReducer} from "react";

export const initialState = {
    isModalOpen: false,
    dispatch: () => {
    },
    showToast: false,
    createContract: () => {
    },
    adoptPet: (id) => {
    },
    retrieveAdopters: (id) => {
    },
};

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

    } catch (e) {
        console.log('Unable to create ethereum contract. Error:', e)
    }
}

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const instantiateWeb3 = async _ => {

    }

    const adoptPet = async id => {
        try {

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

        } catch (e) {
            console.log("RETRIEVING:", e)
        }
    }

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
