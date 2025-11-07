//14 and 16 -> PresentationControls

import { PresentationControls } from '@react-three/drei';
import React, { use } from 'react'
import { useRef } from 'react';
import { gsap } from 'gsap';

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
    if (!group) return;
    group.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
        }
    });
};

const moveGroup = (group, x) => {
    if (!group) return;
    gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

const ModelSwitcher = ({ scale, isMobile }) => {
    const smallMacbookRef = useRef();
    const largeMacbookRef = useRef();

    const showLargeMacbook = scale === 0.08 && !isMobile;

    useGSAP(() => {
      if (showLargeMacbook) {
        fadeMeshes(largeMacbookRef.current, 1);
        moveGroup(largeMacbookRef.current, 0);
        fadeMeshes(smallMacbookRef.current, 0);
        moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      } else {
        fadeMeshes(largeMacbookRef.current, 0);
        moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);
        fadeMeshes(smallMacbookRef.current, 1);
        moveGroup(smallMacbookRef.current, 0);
      }
    }, [scale, isMobile]);

    const controlConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    polar: [-Math.PI , Math.PI ],
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26  },
    }
   

  return (
    <>
    <PresentationControls {...controlConfig}>
        <group ref={largeMacbookRef} >
            <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
    </PresentationControls>

     <PresentationControls {...controlConfig}>
        <group ref={smallMacbookRef} >
            <MacbookModel16 scale={isMobile ? 0.03 : 0.06} />
        </group>
    </PresentationControls>
    </>
  )
}

export default ModelSwitcher