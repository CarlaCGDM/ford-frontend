import { useState } from "react"
import ListInfoPanelSlots from "./ListInfoPanelSlots"
import ListModelSlots from "./ListModelSlots"

export default function AssignResource(props) {

    // Keeping track of which tab is currently selected

    const [currentTab, setCurrentTab] = useState("3D Models")

    return <div className="assign-resource">
        <div>
            <button onClick={() => setCurrentTab("3D Models")}>3D Models</button>
            <button onClick={() => setCurrentTab("Info Panels")}>Info Panels</button>
            <button>Lighting Preset (TODO)</button>
        </div>

        {currentTab === "3D Models" && <ListModelSlots environmentId={props.environmentId} />}
        {currentTab === "Info Panels" && <ListInfoPanelSlots environmentId={props.environmentId} />}
    </div>
}