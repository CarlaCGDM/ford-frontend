import { useState } from "react"
import ListModels from "./ListModels"
import ListUsers from "./ListUsers"
import ListEnvironments from "./ListEnvironments"
import ListInfoPanels from "./ListInfoPanels"
import ListLightingPresets from "./ListLightingPresets"

export default function SelectResource(props) {

    // Keeping track of which tab is currently selected

    const [currentTab, setCurrentTab] = useState("Environments")

    return <>
        <div>
            <button onClick={() => setCurrentTab("Environments")}>Environments</button>
            <button onClick={() => setCurrentTab("3D Models")}>3D Models</button>
            <button onClick={() => setCurrentTab("Info Panels")}>Info Panels</button>
            <button onClick={() => setCurrentTab("Lighting Presets")}>Lighting Presets</button>
            <button onClick={() => setCurrentTab("Users")}>Users</button>
        </div>

        
        {currentTab === "Environments" && < ListEnvironments environmentId={props.environmentId} setEnvironmentId={(Id) => {props.setEnvironmentId(Id)}} />}
        {currentTab === "3D Models" && <ListModels />}
        {currentTab === "Info Panels" && <ListInfoPanels />}
        {currentTab === "Lighting Presets" && <ListLightingPresets />}
        {currentTab === "Users" && <ListUsers />}
    </>
}