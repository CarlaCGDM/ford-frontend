import { useEffect, useState} from "react"

export default function UsersTab() {

    // Elements to display
    const [elements, setElements ] = useState([])

    // Selected element
    const [selectedId, setSelectedId] = useState("")

    // Getting response data from the API

    const getElements = async () =>
    {
        const response = await fetch('http://localhost:4000/api/users')
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
        <p>This is the Users tab</p>
        
        {(elements.length == 0) && <p>No Users to display.</p>}

        <div className="elements-grid">
            {
                elements.map((element) => {
                    return <div key={element._id} className="element">
                        <button>{element.username}</button>
                    </div>
                })
            }
        </div>

        <button>Register new user</button>
    </>
}