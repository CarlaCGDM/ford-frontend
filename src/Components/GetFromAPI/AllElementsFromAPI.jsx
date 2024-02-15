import { useState, useEffect } from 'react'

export default function AllElementsFromAPI()
{

    const [elements, setElements ] = useState([
        {id:1, name: 'John'},
        {id:2, name: 'Jane'},
        {id:3, name: 'Sudo'},
        {id:4, name: 'Boy'}
    ])

    // a variable to know which one is selected

    const [selectedEnvironmentId, setSelectedEnvironmentId ] = useState("")

    /* Fetch data from the API */

    const getElements = async () =>
    {
        const response = await fetch('http://localhost:4000/api/environments')
        const result = await response.json()

        setElements(result)
        console.log(result)
    }

    useEffect(() =>
    {
        getElements()
    }, [])

    return <div style={{backgroundColor:"blue"}}>
        <div className="banner">list of all elements</div>
        <p>Selected is: {selectedEnvironmentId}</p>
        <ul>
            {
                elements.map((element) => {
                    return <button key={element.id} onClick={setSelectedEnvironmentId}>{element.name}</button>
                })
            }
        </ul>
        
    </div>
}