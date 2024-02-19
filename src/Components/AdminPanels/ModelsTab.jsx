import { useEffect, useState} from "react"
import ModelUploadForm from "../Forms/ModelUploadForm"
import ModelPreview from "../3D Models/ModelPreview"
import ModelEditForm from "../Forms/ModelEditForm"
import Axios from "axios"

export default function ModelsTab() {

    // Elements to display

    const [elements, setElements ] = useState([])
    const [selectedElement, setSelectedElement] = useState("")
    const [showCreateNew,setShowCreateNew] = useState(false)
    const [showEdit,setShowEdit] = useState(false)

    // Keeping track of the selected element

    const [selectedId, setSelectedId] = useState("")

    const handleClick = (id) => {
        setSelectedId(id)
        getElement(id)
    }

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
                                onClick={() => {handleClick(element._id)}}
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

            <ModelPreview 
                    model={selectedElement} 
                    showEditForm={() => setShowEdit(true)}
                    deleteElement={(elementId) => deleteElement(elementId)}/>

            {/* Written info for the model */}

        </div>
    </div>
       {showCreateNew && <ModelUploadForm 
                        showThisModal={() => setShowCreateNew(false)}/>}
       {showEdit && <ModelEditForm 
                        model={selectedElement} 
                        showThisModal={() => setShowEdit(false)}/>
       }
    </>
}