import * as THREE from "three";
import gsap from "gsap";

// export function generateNoiseTexture(size = 256) {
//   const data = new Uint8Array(size * size);
//   for (let i = 0; i < size * size; i++) {
//     data[i] = Math.floor(Math.random() * 256);
//   }

//   const texture = new THREE.DataTexture(data, size, size, THREE.LuminanceFormat);
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//   texture.minFilter = texture.magFilter = THREE.LinearFilter;
//   texture.needsUpdate = true;

//   return texture;
// }

export function createBladeGeometry() {
  const width = 0.1;
  const height = 1;
  const segments = 20;
  const offset = 0.02;

  const positions = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= segments; i++) {
    const y = (i / segments) * height;
    const t = i / segments;

    const factor = 1 - t;
    const curveX = Math.sin(t * Math.PI) * 0.05;
    const curveZ = Math.sin(t * Math.PI) * 0.01;

    const leftBack = [-width * 0.5 * factor + curveX, y, -offset + curveZ];
    const rightBack = [width * 0.5 * factor + curveX, y, -offset + curveZ];
    const leftFront = [-width * 0.5 * factor + curveX, y, offset - curveZ];
    const rightFront = [width * 0.5 * factor + curveX, y, offset - curveZ];

    positions.push(...leftBack, ...rightBack, ...leftFront, ...rightFront);
    uvs.push(0, t, 1, t, 0, t, 1, t);
  }

  for (let i = 0; i < segments; i++) {
    const stride = 4;
    const base = i * stride;

    indices.push(base, base + 4, base + 1);
    indices.push(base + 1, base + 4, base + 5);
    indices.push(base + 2, base + 3, base + 6);
    indices.push(base + 3, base + 7, base + 6);
    indices.push(base, base + 2, base + 4);
    indices.push(base + 2, base + 6, base + 4);
    indices.push(base + 1, base + 5, base + 3);
    indices.push(base + 3, base + 5, base + 7);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}
export const selectMeditation = (emotion) => {
    let title = "";
  let description = "";
  let meditations = [];
  switch (emotion) {
    case "anxiety":
    
       title = "Anchor Moments";
      description = "Short grounding meditations to help you steady your breath and thoughts.";
      meditations = ["Anchor to Breath", "Safe Space", "You’re Okay"];
      break;
      
    case "stress":
      title = "Reset Rituals";
      description = "Quick meditations to help you decompress and refocus.";
      meditations = ["Breathe & Reset", "Grounding Scan"];
      break;
    case "sadness":
      title = " Compassion Drops";
      description = "Gentle meditations to offer warmth and emotional space.";
      meditations = ["Light in the Fog", "Gentle Presence"];
      break;
    case "tired":
      title = "Deep Ends";
      description = "Wind-down meditations to help you release the day.";
      meditations = ["Release the Day", "Sleep On It"];
      break;
    case "angry":
      title = " Cooling Sessions";
      description = "Quick practices to release tension and return to calm.";
      meditations = ["Cooling the Flame", "Observe the Storm"];
      break;
    case "calm":
      title = "Stillness Snippets";
      description = "Short meditations to stay grounded and mindful.";
      meditations = ["Soft Center", "Open Awareness"];
      break;
    case "grateful":
      title = "Spark Sessions";
      description = "Activate appreciation and joy in the small things.";
      meditations = ["Tiny Sparks", "Thankful Pause"];
      break;
    case "happy":
      title = "Connection Moments";
      description = "Extend and share your joy through mindful presence.";
      meditations = ["Share the Light", "Smile Within"];
      break;
    default:
      title = "Emotion Not Recognized";
      description = "";
  }
  
  return { title, description, meditations };
}

export const sideBarAnimation = (sidebarRef, closeButtonRef, dropdownRef, nextButtonRef, footerRef, sidebarOpen,openTl, logoSidebarRef, headlineRef) => {
   if (!sidebarOpen || !sidebarRef.current) return;

  gsap.set(sidebarRef.current, { x: "100%" });

  const tl = gsap.timeline();
  openTl.current = tl;

  tl.to(sidebarRef.current, {
    x: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  tl.fromTo(
    closeButtonRef.current,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    "-=0.5"
  );

  tl.fromTo(
    logoSidebarRef.current,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    "-=0.3"
  );

  tl.fromTo(
    headlineRef.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
  );

  tl.fromTo(
    dropdownRef.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    "-=0.3"
  );

  tl.fromTo(
    nextButtonRef.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    "-=0.3"
  );

  tl.fromTo(
    footerRef.current,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    "-=0.2"
  );

  return () => tl.kill();
}