interface Point {
  column: number;
  row: number;
}

type SerialisePoint = (point: Point) => string;

interface World {}

const serialisePoint: SerialisePoint = ({ column, row }) => `${column},${row}`;
