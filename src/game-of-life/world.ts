interface Point {
  column: number;
  row: number;
}

interface Cell {
  point: Point;
}

type CreateCells = (cells: number[][]) => Cell[];
const createCells: CreateCells = coordinates =>
  coordinates.map(([column, row]) => ({ point: { column, row } }));

type SerialisedPointSet = Set<string>;
interface World {
  aliveCellSerialisedPoints: SerialisedPointSet;
}

type SerialisePoint = (point: Point) => string;
const serialisePoint: SerialisePoint = ({ column, row }) => `${column},${row}`;

type DeserialisePoint = (serialisedPoint: string) => Point;
const deserialisePoint: DeserialisePoint = serialisedPoint => {
  const [column, row] = serialisedPoint.split(',').map(n => parseInt(n, 10));
  return {
    column,
    row,
  };
};

type CreateWorld = (cells: Cell[]) => World;
const createWorld: CreateWorld = cells => ({
  aliveCellSerialisedPoints: new Set(
    cells.map(({ point }) => serialisePoint(point))
  ),
});

type GetWorldAliveCells = (world: World) => number[][];
const getWorldAliveCells: GetWorldAliveCells = ({
  aliveCellSerialisedPoints,
}) =>
  [...aliveCellSerialisedPoints].map(serialisedPoint => {
    const [column, row] = serialisedPoint
      .split(',')
      .map((n: string) => parseInt(n, 10));
    return [column, row];
  });

type GetNeighbours = (cell: Cell) => Cell[];
const neighbourMatrix: number[][] = [
  [+1, +0],
  [+1, -1],
  [+0, -1],
  [-1, -1],
  [-1, +0],
  [-1, +1],
  [+0, +1],
  [+1, +1],
];
const getNeighbours: GetNeighbours = ({ point: { column, row } }) =>
  neighbourMatrix.map(([columnDelta, rowDelta]) => ({
    point: {
      column: column + columnDelta,
      row: row + rowDelta,
    },
  }));

type GetNumNeighbours = (world: World, cell: Cell) => number;
const getNumNeighbours: GetNumNeighbours = (
  { aliveCellSerialisedPoints },
  cell
) =>
  getNeighbours(cell)
    .map(({ point }) => serialisePoint(point))
    .filter(serialisedPoint => aliveCellSerialisedPoints.has(serialisedPoint))
    .length;

type ShouldLive = (world: World, cell: Cell) => boolean;
const shouldLive: ShouldLive = (world, cell) =>
  [2, 3].includes(getNumNeighbours(world, cell));

type ShouldBeBorn = (world: World, cell: Cell) => boolean;
const shouldBeBorn: ShouldBeBorn = (world, cell) =>
  getNumNeighbours(world, cell) === 3;

type Evolve = (world: World) => World;
const evolve: Evolve = world => {
  const { aliveCellSerialisedPoints } = world;
  const aliveCells = [...aliveCellSerialisedPoints].map(
    (serialisedPoint: string) => {
      const point = deserialisePoint(serialisedPoint);
      return { point };
    }
  );
  const survivingCells = aliveCells.filter(cell => shouldLive(world, cell));
  const deadNeighbours = aliveCells
    .flatMap(aliveCell => getNeighbours(aliveCell))
    .filter(
      ({ point }) => !aliveCellSerialisedPoints.has(serialisePoint(point))
    );
  const newbornCells = deadNeighbours.filter(deadNeighbour =>
    shouldBeBorn(world, deadNeighbour)
  );
  const newAliveCells = [...survivingCells, ...newbornCells];
  return createWorld(newAliveCells);
};

export { createWorld, createCells, getWorldAliveCells, evolve };
