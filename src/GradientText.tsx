import React from "react";
import styled from "styled-components";

const GradientText = styled.div`
  @supports (-webkit-text-fill-color: transparent) {
    background: linear-gradient(
      135deg,
      #ff904e -4.24%,
      #ff5982 21.25%,
      #ec68f4 44.33%,
      #79e2ff 83.46%
    );
    background-size: 200%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: gradient 10s ease infinite;
    -webkit-text-fill-color: transparent;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default GradientText;
