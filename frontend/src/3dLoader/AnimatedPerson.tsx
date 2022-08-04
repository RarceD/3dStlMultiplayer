import React, { FC, useEffect, useRef, useState } from 'react';
import { BufferGeometry } from 'three';
import * as THREE from 'three';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
import { Canvas } from '@react-three/fiber';

interface Props {
  fileUrl: string
}
const Model: FC<Props> = ({fileUrl}) => {
  const [geometry, setGeometry] = useState<BufferGeometry>()

  useEffect(() => {
    const stlLoader = new STLLoader()
    stlLoader.load(fileUrl, geo => {
      setGeometry(geo)
    })
  }, [])

  return (
    <Canvas>
      <ambientLight />
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#cccccc" />
      </mesh>
    </Canvas>
  )
}

const AnimatedPerson = () => {
  useEffect(() => {
  });
  return (
    <>
      raad rules
      <div className="content-div">
        {/* <Model fileUrl={'./Models/colored.stl'} /> */}
        <Model fileUrl={'./Models/pr2_head_pan.stl'} />
      </div>
    </>
  );
}

export default AnimatedPerson;


