import { useEffect, useState } from "react"

export default function ModelSelector(models) {

    // console.log(models)

    // Send selected mesh to parent

    const [selectedMesh, setSelectedMesh] = useState();
    
    return <>
        <select name="select">
            <option value={models[0]} defaultValue>1</option>
            <option value={models[1]}>2</option>
        </select>
    </>
}