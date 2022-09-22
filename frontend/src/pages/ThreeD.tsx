import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button } from '@mui/material';
import { URL_REQUEST } from '../util/util';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { BufferGeometry } from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Connector from '../signalRConnection';
import { CubeProps } from '../interfaces/Cubes';
import { StopScreenShare } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ALLQUESTIONS } from '../interfaces/Questions';

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


interface PropsThree {
  sendWsMsg: (msg: string) => void,
  spots: CubeProps[],
  addOwnCube: (msg: any) => void,
  clear: boolean
}
const ThreeD = (props: PropsThree) => {
  const [geometry, setGeometry] = useState<BufferGeometry>()
  const [optionA, setOptionA] = useState<BufferGeometry>()
  const [optionB, setOptionB] = useState<BufferGeometry>()
  const [optionC, setOptionC] = useState<BufferGeometry>()
  const [optionD, setOptionD] = useState<BufferGeometry>()
  const [maxPulses, setMaxPulses] = useState<number>(10);

  // Añado pulsos hasta un máximo de X por pregunta:
  const [pulses, setPulses] = useState(0);

  useEffect(() => {
    const stlLoader = new STLLoader()
    /*
    stlLoader.load("/Models/angela.stl", geo => {
      setGeometry(geo)
    })
    */
    // Load options:
    stlLoader.load("/Models/monkey.stl", geo => {
      setOptionA(geo)
    })
    stlLoader.load("/Models/cat.stl", geo => {
      setOptionB(geo)
    })
    stlLoader.load("/Models/CuteUnicorn2.stl", geo => {
      setOptionC(geo);
    })
    stlLoader.load("/Models/hippo.stl", geo => {
      setOptionD(geo)
    })

    setInterval(() => {
      let n = Math.random();
      setPulses(n);
    }, 5000);

  }, [setPulses])


  const addToUnicorn = (e: any) => {
    //console.log("pulses", maxPulses);
    if (maxPulses > 0) {
      const p = e.point;
      const cube: CubeProps = {
        x: p.x, y: p.y, z: p.z
      }
      props.addOwnCube(cube);
      let msg: string = cube.x.toString() + ";" + cube.y.toString() + ";" + cube.z.toString() + ";0";
      props.sendWsMsg(msg);
      setMaxPulses(maxPulses - 1);
      //setPulses(pulses + 1);
    }
  }

  let q: number = 0;
  let qq = localStorage.getItem('question');
  if (qq !== null) {
    q = +qq;
  }

  return (
    <>
      <h5> {ALLQUESTIONS[Number(q)].Text}</h5>
      <div style={{ width: "100vw", height: "100vh" }}>

        <Canvas>
          <OrbitControls />
          <ambientLight color="#00ffff" intensity={0.8} />
          <Stars count={9999} />
          <spotLight
            angle={0.3}
            position={[10, 15, 10]}
          />
          <spotLight
            angle={0.3}
            position={[-10, 15, 10]}
          />
          {/*         
        <Box
          addCubes={(x: number, y: number, z: number) => {
            console.log("test")
            let cc: CubeProps[] = [];
            setArrayCubes([]);
            for (let i of arrayCubes)
              cc.push(i)
            let c: CubeProps = {
              x: x,
              y: y,
              z: z
            }
            cc.push(c)
            c.x += 0.1;
            cc.push(c)

            //setArrayCubes(cc);
          }}
          removeCubes={() => {

          }} /> */}


          {/*                 <mesh geometry={geometry}
          //scale={[0.04, 0.04, 0.04]}
          // position={[0, -1, -1]}
          position={[0, 0, 0]}
          scale={[0.004, 0.004, 0.004]}
          rotation={[0 / 2 * Math.PI, -0 / 2 * Math.PI, -1 / 2 * Math.PI]}
        >
          <meshStandardMaterial
            color="#000000" />
        </mesh>  */}

          <mesh geometry={optionA}
            position={[-1, -2.5, 0]}
            scale={[0.04, 0.04, 0.04]}
            rotation={[3 / 2 * Math.PI, -4 / 2 * Math.PI, -4 / 2 * Math.PI]}
            onPointerUp={(e) => addToUnicorn(e)}
          >
            <meshStandardMaterial
              metalness={0.55}
              roughness={0.29}
              color="#ff0000" />
          </mesh>
          <mesh geometry={optionB}
            position={[-1.5, 1, 2]}
            scale={[0.02, 0.02, 0.02]}
            rotation={[3 / 2 * Math.PI, -4 / 2 * Math.PI, -4 / 2 * Math.PI]}
            onPointerUp={(e) => addToUnicorn(e)}
          >
            <meshStandardMaterial
              metalness={0.35}
              roughness={0.29}
              color="#06911f" />
          </mesh>
          <mesh geometry={optionC}
            position={[1, -2, 2]}
            scale={[0.2, 0.2, 0.2]}
            rotation={[3 / 2 * Math.PI, -4 / 2 * Math.PI, -4 / 2 * Math.PI]}
            onPointerUp={(e) => addToUnicorn(e)}
          >
            <meshStandardMaterial
              metalness={0.45}
              roughness={0.39}
              emissive={"#0000ff"}
              emissiveIntensity={0.9}
              color="#ff2be6"
            />
          </mesh>

          <mesh geometry={optionD}
            position={[-1, 1, -1]}
            scale={[0.05, 0.05, 0.05]}
            rotation={[-1 / 2 * Math.PI, 0 / 2 * Math.PI, 1 / 2 * Math.PI]}
            onPointerUp={(e) => addToUnicorn(e)}
          >
            <meshStandardMaterial
              metalness={0.35}
              roughness={0.39}
              //emissive="#ffffff"
              color="#6669ff" />
          </mesh>



          {
            props.spots.map((key, index) => {
              return <mesh
                key={index}
                position={[key.x, key.y, key.z]}
                scale={[0.1, 0.1, 0.1]}
              >
                <boxBufferGeometry attach="geometry"/>
                 <meshStandardMaterial color="#000000" />
              </mesh>;

              /*
              return <mesh geometry={geometry}
                position={[key.x, key.y, key.z]}
                scale={[0.0005, 0.001, 0.001]}
                rotation={[0 / 2 * Math.PI, -0 / 2 * Math.PI, -1 / 2 * Math.PI]}
              >
                <meshStandardMaterial
                  color="#000000" />
              </mesh>
              */

            }

            )
          }

        </Canvas>
      </div>
    </>
  );
}
export default ThreeD;