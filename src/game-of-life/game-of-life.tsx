import React, { useRef, useEffect } from 'react';
import { createCells, createWorld, evolve } from './world';

const initialCoordinates: number[][] = [
  [0, 0],
  [1, 0],
  [-1, 0],
];

const worldDimentions = {
  width: 800,
  height: 600,
};

type WorldSVG = React.FunctionComponent<{ aliveCells: number[][] }>;
const WorldSVG: WorldSVG = ({ aliveCells }) => {
  const { width, height } = worldDimentions;
  return (
    <svg
      version="1.1"
      baseProfile="full"
      width="800"
      height="600"
      viewBox={`-100 -75 200 150`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {aliveCells.map(([column, row]) => (
        <rect
          key={`${column},${row}`}
          x={column * 1.1}
          y={row * 1.1}
          width="1"
          height="1"
          fill="violet"
          // stroke="#0f0f0f"
          // strokeWidth="0.1"
        />
      ))}
    </svg>
  );
};

type GameOfLife = React.FunctionComponent<{}>;
const GameOfLife: GameOfLife = () => {
  const canvasRef = useRef(null);
  return (
    <>
      <p>The game of life</p>
      <WorldSVG aliveCells={initialCoordinates} />
    </>
  );
};

export default GameOfLife;
