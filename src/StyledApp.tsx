import styled, { keyframes } from "styled-components";
import tinycolor from "tinycolor2";
import App from "./App";

const fontColour = "violet";

const StyledApp = styled(App)`
  padding: 8px;
  background-color: #0f0f0f;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  font-family: "Fira Mono";
  font-size: 1rem;
  color: #${tinycolor(fontColour).toHex()};
  a {
    color: inherit;
    animation: inherit;
  }
`;

export default StyledApp;
