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

    // Selected element

    const [selectedId, setSelectedId] = useState("")

    const handleClick = (id) => {
        setSelectedId(id);
        getElement(id)
    };

    const getSelectedClass = (id) => (selectedId === id ? "selected" : "");

    // Getting response data from the API

    const getElements = async () =>
    {
        const response = await fetch('http://localhost:4000/api/exhibits')
        const result = await response.json()

        //console.log(result)
        setElements(result)
        setSelectedElement(selectedElement || result[0])
        setSelectedId(selectedId || result[0]._id)
    }

    const getElement = async (elementId) =>
    {
        const response = await fetch(`http://localhost:4000/api/exhibits/${elementId}`)
        const result = await response.json()

        //console.log(result)
        setSelectedElement(result)
    }

    const deleteElement = async (elementId) =>
    {
        Axios.delete(`http://localhost:4000/api/exhibits/${elementId}`)
        .then((response) => {
            console.log(`Deleted post with ID ${elementId}`);
            // After the data has been uploaded to the backend:

            getElements() // Refresh
        })
        .catch(error => {
            console.error(error);
        });
    }

    // Displaying list of elements

    useEffect(() =>
    {
        getElements()
    }, [showCreateNew, showEdit]) // Making sure the list refreshes when we add a new model

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