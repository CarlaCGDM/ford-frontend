import { useEffect, useState } from "react"
import Axios from "axios"
import AllElementsFromAPI from "./GetFromAPI/AllElementsFromAPI"
import OneElementFromAPI from "./GetFromAPI/OneElementFromAPI"

export default function ElementSelectorPanel() {

    // first a row of four buttons (environment, displays, info panels, lighting settings)

    const selectButtons = <div>
        <button>Environment</button>
        <button>3D Displays</button>
        <button>Info Panels</button>
        <button>Lighting Presets</button>
    </div>

    // second an info card (it is different for each type)

    //"one element from API"

    // third a grid with all the images

    // "all elements from API"
    // fourth the action buttons

    // upload 3D model in the new button (send the same postman request with authorization)

    const actionButtons = <div>
        <button>Set selected as default</button>
        <button>Edit selected</button>
        <button>New</button>
        <button>Delete selected</button>
    </div>

    return <>
        {selectButtons}
        <OneElementFromAPI />
        <AllElementsFromAPI />
        {actionButtons}
    </>
}