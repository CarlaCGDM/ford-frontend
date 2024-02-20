import { useEffect, useState} from "react"
import CreateNewModelResource from "../Forms/CreateNewModelResource"
import PreviewModel from "../3D Models/PreviewModel"
import EditModelData from "../Forms/EditModelData"
import Axios from "axios"

export default function ListModels() {

    // Elements to display

    const [elements, setElements ] = useState([])
    const [selectedElement, setSelectedElement] = useState("")
    const [showCreateNew,setShowCreateNew] = useState(false)
    const [showEdit,setShowEdit] = useState(false)

    // Visually highlighting the selected element

    const [selectedId, setSelectedId] = useState("")

    const getSelectedClass = (id) => (selectedId === id ? "selected" : "");

    // API Requests

    // Get list of all elements

    const getElements = async () =>
    {
        Axios.get(`http://localhost:4000/api/exhibits`)
        .then((response) => {

            // Get list of all elements
            setElements(response.data)
            
            // Set current or first as selected element
            setSelectedElement(selectedElement ? selectedElement : response.data[0])
            setSelectedId(selectedId ? selectedId : response.data[0]._id)
            
            // Get selected element
            return Axios.get(`http://localhost:4000/api/exhibits/${selectedId ? selectedId : response.data[0]._id}`)

        })
        .then((response) => {

            // Fake a click on the selected element
            setSelectedElement(response.data)
            setSelectedId(response.data._id)
        }

        )
        .catch(error => {
            console.error(error)
        })
    }

    // Get one element

    const getElement = async (elementId) =>
    {
        Axios.get(`http://localhost:4000/api/exhibits/${elementId}`)
        .then((response) => {

            //console.log(result)
            setSelectedElement(response.data)
            setSelectedId(response.data._id)
        }

        )
        .catch(error => {
            console.error(error);
        })
    }

    // Delete one element

    const deleteElement = async (elementId) =>
    {
        Axios.delete(`http://localhost:4000/api/exhibits/${elementId}`)
        .then((response) => {

            // Element has been deleted
            console.log(`Deleted post with ID ${elementId}`);
            
            // Get new data without deleted element
            return Axios.get(`http://localhost:4000/api/exhibits`)
        })
        .then((response) => {

            // Refresh list of elements in view
            setElements(response.data)

            // Set first element as currently selected in view
            setSelectedElement(response.data[0])
            setSelectedId(response.data[0]._id)

        })
        .catch(error => {
            console.error(error);
        });
    }

    // Display the list of elements and refresh it after an element has been created or updated

    useEffect(() =>
    {
        getElements()
    }, [showCreateNew, showEdit]) // Making sure the list refreshes when we add or edit a model

    return <>
    <div className="admin-tab">
        <div>

            {(elements.length == 0) && <p>No 3D Models to display.</p>}

            <div className="elements-grid">
                {
                    elements.map((element) => {

                        return <div 
                                key={element._id} 
                                className={`element ${getSelectedClass(element._id)}`}  
                                onClick={() => {getElement(element._id)}}
                                >

                                <img className="model-preview-image" src={element.imgURL}></img>
                                <p>{element.name}</p>

                        </div>
                    })
                }
            </div>

            <button onClick={() => setShowCreateNew(true)}>Upload new 3D model</button>
        
        </div>

        <div>
            {/* 3D Canvas showing selected model */}

            <PreviewModel 
                    model={selectedElement} 
                    showEditForm={() => setShowEdit(true)}
                    deleteElement={(elementId) => deleteElement(elementId)}/>

            {/* Written info for the model */}

        </div>
    </div>
       {showCreateNew && <CreateNewModelResource 
                        showThisModal={() => setShowCreateNew(false)}/>}
       {showEdit && <EditModelData 
                        model={selectedElement} 
                        showThisModal={() => setShowEdit(false)}/>
       }
    </>
}