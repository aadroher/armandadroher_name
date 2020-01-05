import React, { useRef, useEffect } from 'react';
import { createCells, createWorld, evolve } from './world';

const initialCoordinates: number[][] = [
  [0, 0],
  [1, 0],
  [-1, 0],
];

type GameOfLife = React.FunctionComponent<{}>;
const GameOfLife: GameOfLife = () => {
  const canvasRef = useRef(null);
  return (
    <>
      <p>The game of life</p>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
};

export default GameOfLife;
