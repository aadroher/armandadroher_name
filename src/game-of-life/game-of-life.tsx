import React, { useRef, useEffect, useState } from 'react';
import { createCells, createWorld, evolve, getWorldAliveCells } from './world';
import WorldCanvas from './world-canvas';

const initialCoordinates: number[][] = [
  [0, 0],
  [1, 0],
  [-1, 0],
];

const frameToCanvasScaleFactor = 4;
const ticksPerSecond = 60;

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
  width: (window.innerWidth - 10) / frameToCanvasScaleFactor,
  height: (window.innerHeight - 10) / frameToCanvasScaleFactor,
};
const initialNumCells = Math.floor(
  worldDimensions.width * worldDimensions.height * 0.2
);

console.log({ initialNumCells });

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

const initialCells = createCells(
  getRandomCoordinates(worldDimensions, initialNumCells)
);
console.log({ initialCells });
const initialWorld = createWorld(initialCells);

type GameOfLife = React.FunctionComponent<{}>;
const GameOfLife: GameOfLife = () => {
  const [world, setWorld] = useState(initialWorld);
  useInterval(() => {
    const newWorld = evolve(world);
    setWorld(newWorld);
  }, 1000 / ticksPerSecond);

  const aliveCells = getWorldAliveCells(world);
  return (
    <WorldCanvas aliveCells={aliveCells} worldDimensions={worldDimensions} />
  );
};

export default GameOfLife;
