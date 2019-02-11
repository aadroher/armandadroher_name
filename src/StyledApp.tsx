import styled, { keyframes } from "styled-components";
import tinycolor from "tinycolor2";
import App from "./App";

const fontColourNames = [
  "pink",
  "hotpink",
  "deeppink"
  // "green"
  //   "blue",
  //   "indigo",
  //   "violet"
];

const numColours = fontColourNames.length;

type getKeyFramesFragment = (
  stepName: string,
  attributeName: string,
  attributeValue: string
) => string;
const getKeyFramesFragment: getKeyFramesFragment = (
  stepName,
  attributeName,
  attributeValue
) => `
    ${stepName} { 
      ${attributeName}: ${attributeValue};
    }
  `;

// return `
//   ${stepName} {
//     color: #${colour.toHex()};
//     text-shadow: 0px 0px 1rem #${colour.darken(30).toHex()};
//   }
// `;

const colourPairs = fontColourNames.map(fontColourName => {
  const colour = tinycolor(fontColourName);
  return {
    fontColour: colour.toHex(),
    shadowColour: colour.brighten(10).toHex()
  };
});

type getPercentageStepName = (i: number, numColours: number) => string;
const getPercentageStepName: getPercentageStepName = (i, numColours) =>
  `${(i * 100) / (numColours - 1)}%`;

console.log({ colourPairs });

// const keyFramesFragments =

// console.log(keyFramesFragments);

const colourAnimation = keyframes``;

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
    width: 30rem;
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
