import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button } from '@mui/material';
import { URL_REQUEST } from '../util/util';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { BufferGeometry } from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface Props {
  addCubes: any,
  removeCubes: any
}

const Box = (props: Props) => {
  const addComponent = (e: any) => {
    console.log("press box", e);
    props.addCubes(2)
  }
  return (
    <>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI, 0, 0]}
        onPointerMissed={() => props.removeCubes()}
        onPointerUp={(e) => addComponent(e)}
      >
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="blue" />
      </mesh>
    </>
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
  const [arrayCubes, setArrayCubes] = useState<number[]>([])

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
        <Stars count={99990} />
        <spotLight
          angle={0.3}
          position={[10, 15, 10]}
        />
        <Box addCubes={() => {
          let size: number = arrayCubes.length;
          let a: number[] = [];
          for (let i = 0; i <= size; i++)
            a.push(i)
          setArrayCubes(a);
        }}
          removeCubes={() => {
            let size: number = arrayCubes.length - 2;
            if (size > 0) {

              let a: number[] = [];
              for (let i = 0; i <= size; i++)
                a.push(i)
              console.log("size", size);
              setArrayCubes(a);
            }

          }} />


        <mesh geometry={geometry} position={[1, 0, 0]}
          rotation={[0, 3, 2]}
        >
          <meshStandardMaterial color="#cc00cc" />
        </mesh>

        {
          arrayCubes.map((key, index) => <mesh position={[index, 2, 0]}

            rotation={[0, 3, 2]}
          >
            <boxBufferGeometry attach="geometry" />
            <meshStandardMaterial color="#cc0000" />
          </mesh>
          )
        }

      </Canvas>
    </div>
  );
}
export default ThreeD;