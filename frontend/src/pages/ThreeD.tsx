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
    var p = e.point;
    props.addCubes(p.x, p.y, p.z)
  }
  return (
    <>
      <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI]}
        onPointerMissed={() => props.removeCubes()}
        onPointerUp={(e) => addComponent(e)}
      >
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="blue" />
      </mesh>
    </>
  )
}

interface CubeProps {
  x: number,
  y: number,
  z: number
}
const ThreeD = () => {
  const [geometry, setGeometry] = useState<BufferGeometry>()
  const [arrayCubes, setArrayCubes] = useState<CubeProps[]>([])

  useEffect(() => {
    const stlLoader = new STLLoader()
    stlLoader.load("/Models/CuteUnicorn2.stl", geo => {
      setGeometry(geo)
    })

    setTimeout(makeMagic.bind(this), 5000);
  }, [])

  const makeMagic = () => {
    // console.log("magic");
    // const stlLoader = new STLLoader()
    // stlLoader.load("/Models/CuteUnicorn.stl", geo => {
      // setGeometry(geo)
    // })
  }

  const addToUnicorn = (e: any) => {
    console.log(e);
    var p = e.point;
    const cube: CubeProps = {
      x: p.x, y: p.y, z: p.z
    }
    let cc: CubeProps[] = [];
    cc.push(cube)
    setArrayCubes(cc);
  }
  return (
    <div style={{ width: "100vw", height: "100vh" }}>

      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.8} />
        <Stars count={99990} />
        <spotLight
          angle={0.3}
          position={[10, 15, 10]}
        />
        <spotLight
          angle={0.3}
          position={[-10, 15, 10]}
        />
        <Box
          addCubes={(x: number, y: number, z: number) => {
            let cc: CubeProps[] = [];
            for (let i of arrayCubes)
              cc.push(i)
            let c: CubeProps = {
              x: x,
              y: y,
              z: z
            }
            cc.push(c)
            setArrayCubes(cc);
          }}
          removeCubes={() => {

          }} />


        <mesh geometry={geometry}
          //scale={[0.04, 0.04, 0.04]}
          // position={[0, -1, -1]}
          position={[0, 0, 2]}
          scale={[0.4, 0.4, 0.4]}
          rotation={[3 / 2 * Math.PI, -4 / 2 * Math.PI, -4 / 2 * Math.PI]}
          onPointerUp={(e) => addToUnicorn(e)}
        >
          <meshStandardMaterial
            color="#cc0000" />
        </mesh>

        {
          arrayCubes.map((key, index) => {
            return <mesh
              key={index}
              position={[key.x, key.y, key.z]}
              rotation={[0, 3, 2]}
              scale={[0.1, 0.1, 0.1]}
            >
              <boxBufferGeometry
                attach="geometry"
              />
              <meshStandardMaterial color="#000000" />
            </mesh>;
          }
          )
        }

      </Canvas>
    </div>
  );
}
export default ThreeD;