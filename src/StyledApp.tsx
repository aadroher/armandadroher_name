import styled, { keyframes } from "styled-components";
import tinycolor from "tinycolor2";
import App from "./App";

const fontColours = [
  "pink",
  "hotpink",
  "deeppink"
  //   "green",
  //   "blue",
  //   "indigo",
  //   "violet"
];

const numColours = fontColours.length;
const keyFrames = fontColours
  .map((fontColourName, i) => {
    const isFirst = i === 0;
    const isLast = i === numColours - 1;
    const stepName = isFirst
      ? "from"
      : isLast
      ? "to"
      : `${(i * 100) / (numColours - 1)}%`;

    const colour = tinycolor(fontColourName);

    return `
        ${stepName} { 
            color: #${colour.toHex()};
            text-shadow: #${colour.darken(30).toHex()} 0 0 0.3rem;
        }
  `;
  })
  .join("\n");

const colourAnimation = keyframes`${keyFrames}`;

const StyledApp = styled(App)`
  padding: 8px;
  background-color: #0f0f0f;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  font-family: "Fira Mono";
  font-size: 16px;
  animation: ${colourAnimation} ${numColours * 10}s linear infinite alternate;

  a {
    color: inherit;
    animation: inherit;
  }

  & > .main-container {
    width: 27rem;
    @media (max-width: 27rem) {
      width: 15rem;
    }
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: 40%;
    transform: translateY(-50%);

    padding: 2rem;

    ul {
      li {
        list-style-type: none;
        a {
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

export default StyledApp;
