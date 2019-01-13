import styled, { keyframes } from "styled-components";
import App from "./App";

const fontColours = [
  ["violet", "darkviolet"],
  ["green", "darkgreen"],
  ["red", "darkred"],
  ["orange", "darkorange"],
  ["hotpink", "deeppink"]
];

const colourAnimation = keyframes`
    from {
        color: ${fontColours[0][0]};
        text-shadow: ${fontColours[0][1]} 0 0 0.3rem;
    }

    to {
        color: ${fontColours[3][0]};
        text-shadow: ${fontColours[3][1]} 0 0 0.3rem;
    }
`;

const [fontColour, shadowColour] = fontColours[4];
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
  animation: ${colourAnimation} 2s linear infinite alternate;

  a {
    animation: ${colourAnimation} 2s linear infinite alternate;
    color: ${fontColour};
  }

  & > .main-container {
    width: 27rem;
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
