import { useEffect, useState} from "react"
import Axios from "axios"

export default function ListModelSlots(props) {

    // List of placeholder or current info panels that can be assigned through drag and drop

    const [slots, setSlots] = useState([])

    const getSelectedEnvironment= async () =>
    {
        Axios.get(`http://localhost:4000/api/environments/selected`)
        .then((response) => {

            // Make the request with valid ids from here. Don't involve the server in this
            console.log('Slots in this environment (list of Ids):')
            const modelSlots = response.data.modelSlots.map((s) => s ? s : 'null').join('&').split('&')
            console.log(modelSlots)

            // Careful! If the list is empty, it will make a call to the get all exhibits method. 
            return Axios.get(`http://localhost:4000/api/exhibits/ids/${modelSlots.join('&')}`)
        })
        .then((response) => {
            console.log("Elements from list of Ids:")
            console.log(response.data)
            setSlots(response.data)
        })
        .catch(error => {
            console.error(error)
        })
    }

    useEffect(() =>
    {
        getSelectedEnvironment()
    }, [props.environmentId])

    // 5: Drag and drop from model list to slot

    // 6: Update DB info with new object


    return <div>

        <button>Previous page</button>

         {(slots.length == 0) && <p>No 3D Models to display.</p>}

            <div className="elements-grid">
                {
                    slots.map((element) => {
                        if (element)
                        {
                            return <div 
                                key={element._id} 
                                >

                                <img className="model-preview-image" src={element.imgURL}></img>
                                <p>{element.name}</p>

                            </div>
                        } else
                        {
                            return <div 
                                key={"null"} 
                                >

                                <img className="model-preview-image" src=""></img>
                                <p>Unassigned</p>

                            </div>
                        }
                        
                    })
                }
            </div> 

        <button>Next page</button>
    </div>
}