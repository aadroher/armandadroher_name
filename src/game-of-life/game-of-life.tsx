import React, { useRef, useEffect, useState } from 'react';
import { createCells, createWorld, evolve, getWorldAliveCells } from './world';

const initialCoordinates: number[][] = [
  [0, 0],
  [1, 0],
  [-1, 0],
];

const ticksPerSecond = 12;

type UseInterval = (callback: Function, delay: number) => void;
const useInterval: UseInterval = (callback, delay) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

type WorldDimensions = {
  width: number;
  height: number;
};
const worldDimensions: WorldDimensions = {
  width: 300,
  height: 200,
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

const initialCells = createCells(getRandomCoordinates(worldDimensions, 5000));
const initialWorld = createWorld(initialCells);

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
    width="1280"
    height="720"
    viewBox={[-width / 2, -height / 2, width, height]
      .map(x => x * 1.1)
      .join(' ')}
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
  const [world, setWorld] = useState(initialWorld);
  useInterval(() => {
    const newWorld = evolve(world);
    setWorld(newWorld);
  }, 1000 / ticksPerSecond);
  return (
    <>
      <p>The game of life</p>
      <WorldSVG
        aliveCells={getWorldAliveCells(world)}
        worldDimensions={worldDimensions}
      />
    </>
  );
};

export default GameOfLife;
