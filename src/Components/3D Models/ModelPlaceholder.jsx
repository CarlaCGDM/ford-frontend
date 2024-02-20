/**
 * A placeholder 3D model meant to represent an empty slot to which a custom 3D model can be assigned.
 * @param {*} props 
 * @returns 
 */

export default function ModelPlaceholder(props)
{
    // In the props we will need an index number so it can be displayed fancifully in HTML
    // We will also use the default base 
    //(we need to get it from the API in the parent component and pass it as a prop so we make 1 call and not as many calls as placeholders we have)
    return <mesh { ...props }> 
        <boxGeometry args={[1,1,1,2,2,2]}/>
        <meshStandardMaterial color="red" wireframe/>
    </mesh>
}