import { useState, useEffect } from 'react'

export default function OneElementFromAPI()
{

    const [element, setElement ] = useState({})

    /* Fetch data from the API */

    const getElements = async () =>
    {
        const response = await fetch('http://localhost:4000/api/exhibits/65cfa3c177fed896101fde8d')
        const result = await response.json()

        setElement(result)
        console.log(result)
    }

    useEffect(() =>
    {
        getElements()
    }, [])

    return <div style={{backgroundColor:"purple"}}>
        <div className="banner">details of one element</div>
        <div>
            <img style={{width: 60}} src={element.imgURL} />
            <p>Name: {element.name}</p>
            <p>Name: {element.author}</p>
            <p>Name: {element.license}</p>
            <p>Name: {element.description}</p>
        </div>
        
    </div>
}