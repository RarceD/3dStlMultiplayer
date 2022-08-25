import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button } from '@mui/material';
import { URL_REQUEST } from '../util/util';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import {BufferGeometry} from 'three'
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'


const Box = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI, 0, 0]}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="blue" />
    </mesh>
  )
}

const Plane = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

const ThreeD = () => {
  const [geometry, setGeometry] = useState<BufferGeometry>()

  useEffect(() => {
    const stlLoader = new STLLoader()
    stlLoader.load("/Models/colored.stl", geo => {
      setGeometry(geo)
    })
  }, [])
  return (
    <div style={{ width: "100vw", height: "100vh" }}>

      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <Stars count={999990} />
        <spotLight
          angle={0.3}
          position={[10, 15, 10]}
        />
        <Box />
        <mesh geometry={geometry}>
          <meshStandardMaterial color="#cc00cc" />
        </mesh>
      </Canvas>
    </div>
  );
}
export default ThreeD;