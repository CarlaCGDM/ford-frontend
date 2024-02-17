import { useEffect, useState} from "react"

export default function EnvironmentsTab() {

    // Elements to display
    const [elements, setElements ] = useState([])

    // Selected element
    const [selectedId, setSelectedId] = useState("")

    // Getting response data from the API

    const getElements = async () =>
    {
        const response = await fetch('http://localhost:4000/api/environments')
        const result = await response.json()

        setElements(result)
        console.log(result)
    }

    // Displaying list of elements

    useEffect(() =>
    {
        getElements()
    }, [])

    return <>
        <p>This is the Environments tab</p>

        {(elements.length == 0) && <p>No 3D Environments to display.</p>}

        <div className="elements-grid">
            {
                elements.map((element) => {
                    return <div key={element._id} className="element">
                            <img className="model-preview-image" src={element.imgURL}></img>
                            <button>{element.name}</button>
                    </div>
                })
            }
        </div>

        <button>Upload new 3D environment</button>
    </>
}