import { useEffect, useState, useRef } from "react"
import ModelsTab from "./ModelsTab"
import UsersTab from "./UsersTab"
import EnvironmentsTab from "./EnvironmentsTab"
import InfoPanelsTab from "./InfoPanelsTab"
import LightingPresetsTab from "./LightingPresetsTab"

export default function TabSelectorPanel() {

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

        
        {currentTab === "Environments" && < EnvironmentsTab />}
        {currentTab === "3D Models" && <ModelsTab />}
        {currentTab === "Info Panels" && <InfoPanelsTab />}
        {currentTab === "Lighting Presets" && <LightingPresetsTab />}
        {currentTab === "Users" && <UsersTab />}
    </>
}