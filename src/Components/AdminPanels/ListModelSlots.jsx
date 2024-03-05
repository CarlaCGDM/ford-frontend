import { useEffect, useState} from "react"
import Axios from "axios"

export default function ListModelSlots(props) {

    // List of placeholder or current 3D models displayed on the tour

    const [slots, setSlots] = useState([])

    // Visually highlighting the selected element

    const getSelectedClass = (id) => (props.slotId === id ? "selected" : "");

    const getSelectedEnvironment= async () =>
    {
        Axios.get(`http://localhost:4000/api/environments/selected`)
        .then((response) => {

            // Make the request with valid ids from here. Don't involve the server in this
            console.log('Slots in this environment (list of Ids):')
            const modelSlots = response.data.modelSlots.map((s) => s ? s : 'null').join('&').split('&')
            console.log(modelSlots)

            // Careful! If the list is empty, it will make a call to the get all exhibits method. 
            console.log(modelSlots)
            if (modelSlots != "") {
                return Axios.get(`http://localhost:4000/api/exhibits/ids/${modelSlots.join('&')}`)
            }
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

    useEffect(() =>
    {
        console.log("slot Id changed")
        console.log(props.slotId)
    }, [props.slotId])

    // 5: Drag and drop from model list to slot

    // 6: Update DB info with new object


    return <div>

        <button>Previous page</button>

         {(slots.length == 0) && <p>No 3D Models to display.</p>}

            <div className="elements-grid">
                {
                    slots.map((element,index) => {
                        if (element)
                        {
                            return <div 
                                key={index}
                                className={`element ${getSelectedClass(index)}`} 
                                onClick={() => {props.setSlotId(index)}} 
                                >

                                <img className="model-preview-image" src={element.imgURL}></img>
                                <p>Slot: {index}</p>
                                <p>{element.name}</p>

                            </div>
                        } else
                        {
                            return <div 
                                key={index}
                                className={`element ${getSelectedClass(index)}`} 
                                onClick={() => {props.setSlotId(index)}} 
                                >

                                <img className="model-preview-image" src=""></img>
                                <p>Slot: {index}</p>
                                <p>Empty</p>

                            </div>
                        }
                        
                    })
                }
            </div> 

        <button>Next page</button>
    </div>
}