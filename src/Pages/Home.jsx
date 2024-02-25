import { Canvas } from '@react-three/fiber'
import Experience from '../Components/3D Canvases/Experience.jsx'
import { ScrollControls } from '@react-three/drei'

export default function App() {
  return <>
    <div className="header">
        <div className="title">Main page</div>
        <div className="navbar">
            Navbar
            <button><a href="/admin">Admin settings</a></button>
        </div>
    </div>


    <Canvas>
        <ScrollControls pages={5} damping={0.3}>
          <Experience />
        </ScrollControls>
    </Canvas>

    <div className="footer">
        About
    </div>
  </>
}