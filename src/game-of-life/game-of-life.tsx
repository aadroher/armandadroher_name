import React, { useRef, useEffect, useState } from 'react';
import { createCells, createWorld, evolve } from './world';

const initialCoordinates: number[][] = [
  [0, 0],
  [1, 0],
  [-1, 0],
];

type WorldDimensions = {
  width: number;
  height: number;
};
const worldDimensions: WorldDimensions = {
  width: 200,
  height: 150,
};

type GetRandomInt = (range: number) => number;
const getRandomInt: GetRandomInt = range =>
  Math.floor(Math.random() * range - range / 2);

type GetRandomCoordinates = (
  worldDimensions: WorldDimensions,
  numCells: number
) => number[][];
const getRandomCoordinates: GetRandomCoordinates = (
  { width, height },
  numCells
) =>
  [...Array(numCells).keys()].map(() => [
    getRandomInt(width),
    getRandomInt(height),
  ]);

type WorldSVG = React.FunctionComponent<{
  aliveCells: number[][];
  worldDimensions: WorldDimensions;
}>;
const WorldSVG: WorldSVG = ({
  aliveCells,
  worldDimensions: { width, height },
}) => (
  <svg
    version="1.1"
    baseProfile="full"
    width="800"
    height="600"
    viewBox={[-width / 2, -height / 2, width, height].join(' ')}
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

type GameOfLife = React.FunctionComponent<{}>;
const GameOfLife: GameOfLife = () => {
  const [aliveCells, setAliveCells] = useState(
    getRandomCoordinates(worldDimensions, 2000)
  );
  return (
    <>
      <p>The game of life</p>
      <WorldSVG aliveCells={aliveCells} worldDimensions={worldDimensions} />
    </>
  );
};

export default GameOfLife;
