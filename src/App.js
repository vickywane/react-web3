import './App.css';
import AppContext from "./state/context";
import {useContext, useEffect, useState} from "react";

import PetsData from './pets.json'
import {Toast} from "./components/toast";

const empty_addr = '0x0000000000000000000000000000000000000000'

function App() {
    const {adoptPet, showToast, retrieveAdopters} = useContext(AppContext)
    const [adoptedPets, setAdoptedPets] = useState([])

    useEffect(() => {
        (async () => {
            const data = await retrieveAdopters()

            setAdoptedPets(data)
        })()
    }, [])

    return (
        <div className="App">

            <div style={{marginTop: showToast ? '30px' : '20px'}} className={'m-8'}>
                <h1 className={'text-2xl font-bold'}> Pete's Pet Shop </h1>
            </div>
            <hr/>

            {showToast && (<Toast petName={'Gina'}/>)}

            <ul className="grid grid-cols-4 gap-10 mt-5 p-4">
                {PetsData.map(({id, name, picture, age, breed, location}, index) => (
                    <li key={id}>
                        <div style={{
                            border: '1px solid #00000',
                        }}>
                            <li className="flex justify-center items-center">
                                <div className="mb-8">
                                    <div
                                        style={{width: '17rem'}}
                                        className="shadow-xl bg-white rounded-r p-4 flex flex-col leading-normal"
                                    >

                                        <div className={'pb-4'}>
                                            <img
                                                style={{height: '250px', objectFit: 'contain'}}
                                                alt={name}
                                                src={require(`/${picture}`)}
                                            />
                                        </div>

                                        <div>
                                            <p className={'text-left'}><b>Breed </b>: {breed}  </p>
                                            <p className={'text-left'}><b>Age </b>: {age}  </p>
                                            <p className={'text-left'}><b>Location </b>: {location}  </p>
                                        </div>

                                        <br/>

                                        <button
                                            className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            style={{ backgroundColor: adoptedPets[index] !== empty_addr && 'grey' }}
                                            onClick={_ => adoptPet(id)}
                                            disabled={adoptedPets[index] !== empty_addr}
                                        >
                                            Adopt {name}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default App;
