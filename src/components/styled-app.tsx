import styled, { keyframes } from "styled-components";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/brands.css";

import "../css/fira.css";

import App from "./app";

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
  font-size: 21px;
  line-height: 1;
  color: #ec68f4 44.33%;

  a {
    color: inherit;
    &:hover,
    &:active {
      text-decoration: underline;
    }
  }
`;

export default StyledApp;
