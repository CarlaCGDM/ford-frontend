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
        const response = await fetch('http://localhost:4000/api/exhibits')
        const result = await response.json()

        setElements(result)
        //console.log(result)
    }

    useEffect(() =>
    {
        getElements()
    }, [])

    return <div style={{backgroundColor:"blue"}}>
        <div className="banner">list of all elements</div>
        <p>Selected is: {selectedEnvironmentId}</p>
        <div className="elements-grid">
            {
                elements.map((element) => {
                    return <>
                    <div className="element">
                        <img className="model-preview-image" src={element.imgURL}></img>
                        <button key={element._id}>{element.name}</button>
                    </div>
                    </>
                })
            }
        </div>
        
    </div>
}