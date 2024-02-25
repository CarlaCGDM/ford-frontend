import * as THREE from 'three'
import { OrbitControls, PerspectiveCamera, useScroll } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from "@react-three/fiber"
import Axios from "axios"

import Environment from '../3D Models/Environment.jsx'
import path from '../PathPreset01.json'

export default function Experience(props)
{

    // API call to get the currently selected 3D environment
    
    const [environment, setEnvironment ] = useState({})

    const getSelectedEnvironment = async () =>
    {
        Axios.get(`http://localhost:4000/api/environments/selected`)
        .then((response) => {

            //console.log(response.data)

            // Check if environment has changed
            if (response.data._id != environment._id)
            {
                setEnvironment(response.data)
            }

        })
        .catch(error => {
            console.error(error)
        })
    }

    useEffect(() =>
    {
        getSelectedEnvironment()
    }, [props.environmentId])


    // Load curve from JSON as js object
    // This should be a JSON document stored in the environment resource of the DB (environment.cameraPath)

    // console.log ("Path from JSON: ")
    // console.log(path)

    // Process the path object to convert it to a 
    //Convert points to THREE.Vector3
    // const curve = new THREE.CatmullRomCurve3( path.points.map((point) => {return new THREE.Vector3(point.x,point.y,point.z)}) );

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            path.points.map((point) => {return new THREE.Vector3(point.x,point.y,point.z)})
        );
      }, []);

    const points = curve.getPoints( curve.points.length );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

    // Create the final object to add to the scene
    const curveObject = new THREE.Line( geometry, material );


    //---

    const LINE_NB_POINTS = curve.points.length * 3;

    const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
      }, [curve]);

    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.1);
        shape.lineTo(0, 0.1);
    
        return shape;
    }, [curve]);


    // Control camera with scroll

    const cameraGroup = useRef()
    const scroll = useScroll()
    
    useFrame((_state, delta) => {
        const curPointIndex = Math.min(
            Math.round(scroll.offset * linePoints.length),
            linePoints.length - 1)
        const curPoint = linePoints[curPointIndex]
        cameraGroup.current.position.lerp(curPoint,delta*24)
    })

    

   

    return <>
    
        {/* Debugging */}

        <Perf position="top-left"/>
        <axesHelper args={[2]} />

        {/* Camera */}

        <OrbitControls enableZoom={false} />

        <group ref={cameraGroup}>
            <PerspectiveCamera position={[0,0.2,0]} fov={70} makeDefault />
        </group>

        {/* Staging */}
    
        <directionalLight position={[1,2,3]} intensity={4.5}/>
        <ambientLight intensity={1.5} />

        {/* <primitive object={ curveObject } /> */}

        <mesh>
            <extrudeGeometry args={[
                shape,
                {
                    steps: LINE_NB_POINTS,
                    bevelEnabled: false,
                    extrudePath: curve
                }
            ]} />
            <meshStandardMaterial color={"black"} opacity={0.3} transparent />
        </mesh>

        <Environment path={environment.modelURL} />
        
        <mesh rotation={ [- Math.PI * 0.5,0,0] } position={ [0,0,0] }  scale={ 10 }> 
            <planeGeometry />
            <meshStandardMaterial color="gray" wireframe/>
        </mesh>

        
        
    </>
}