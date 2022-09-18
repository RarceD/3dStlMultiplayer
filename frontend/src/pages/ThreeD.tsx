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
  const navigate = useNavigate();

  // Añado pulsos hasta un máximo de X por pregunta:
  const maxPulses = 10;
  const [pulses, setPulses] = useState(0);

  useEffect(() => {
    const stlLoader = new STLLoader()
    stlLoader.load("/Models/CuteUnicorn2.stl", geo => {
      setGeometry(geo)
    })

    // Load options:
    stlLoader.load("/Models/CuteUnicorn2.stl", geo => {
      setOptionA(geo)
    })
    stlLoader.load("/Models/CuteUnicorn2.stl", geo => {
      setOptionB(geo)
    })
    stlLoader.load("/Models/CuteUnicorn2.stl", geo => {
      setOptionC(geo)
    })
    stlLoader.load("/Models/CuteUnicorn2.stl", geo => {
      setOptionD(geo)
    })

    //setTimeout(makeMagic.bind(this), 5000);
    setInterval(() => {
      let n = Math.random();
      setPulses(n);
    }
      , 1000);
  }, [setPulses])


  const makeMagic = () => {

    console.log("magic change");
    // const stlLoader = new STLLoader()
    // stlLoader.load("/Models/CuteUnicorn.stl", geo => {
    // setGeometry(geo)
    // })
  }

  const addToUnicorn = (e: any) => {
    console.log("pulses", pulses);

    const p = e.point;
    const cube: CubeProps = {
      x: p.x, y: p.y, z: p.z
    }
    props.addOwnCube(cube);

    let msg: string = cube.x.toString() + ";" + cube.y.toString() + ";" + cube.z.toString() + ";0";


    let pp = pulses + 1;
    props.sendWsMsg(msg);
    setPulses(pp);

  }
  let q: number = 0;
  let qq = localStorage.getItem('question');
  if (qq !== null) {
    q = +qq;
  }
  return (
    <>
      <h3> {ALLQUESTIONS[Number(q)].Text}</h3>
      <Button
        onClick={() => {
          let newPage: number = Number(q) + 1;
          navigate('/3d?q=' + newPage.toString());
          props.addOwnCube(null);
        }}
      >
        next
      </Button>
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


          {/* 
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
        </mesh> */}

          <mesh geometry={optionA}
            position={[-1, -2, 2]}
            scale={[0.2, 0.2, 0.2]}
            rotation={[3 / 2 * Math.PI, -4 / 2 * Math.PI, -4 / 2 * Math.PI]}
            onPointerUp={(e) => addToUnicorn(e)}
          >
            <meshStandardMaterial
              color="#ff0000" />
          </mesh>
          <mesh geometry={optionB}
            position={[1, 1, 2]}
            scale={[0.2, 0.2, 0.2]}
            rotation={[3 / 2 * Math.PI, -4 / 2 * Math.PI, -4 / 2 * Math.PI]}
            onPointerUp={(e) => addToUnicorn(e)}
          >
            <meshStandardMaterial
              color="#00ff00" />
          </mesh>
          <mesh geometry={optionC}
            position={[1, -2, 2]}
            scale={[0.2, 0.2, 0.2]}
            rotation={[3 / 2 * Math.PI, -4 / 2 * Math.PI, -4 / 2 * Math.PI]}
            onPointerUp={(e) => addToUnicorn(e)}
          >
            <meshStandardMaterial
              color="#0000ff" />
          </mesh>
          <mesh geometry={optionD}
            position={[-1, 1, 2]}
            scale={[0.2, 0.2, 0.2]}
            rotation={[3 / 2 * Math.PI, -4 / 2 * Math.PI, -4 / 2 * Math.PI]}
            onPointerUp={(e) => addToUnicorn(e)}
          >
            <meshStandardMaterial
              color="#00ffff" />
          </mesh>



          {
            props.spots.map((key, index) => {
              return <mesh
                key={index}
                position={[key.x, key.y, key.z]}
                rotation={[0, 3, 2]}
                scale={[0.1, 0.1, 0.1]}
              >
                <boxBufferGeometry
                  attach="geometry"
                />
                <meshStandardMaterial color="#0f0f0f" />
              </mesh>;
            }
            )
          }

        </Canvas>
      </div>
    </>
  );
}
export default ThreeD;