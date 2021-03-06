import React from "react";
import styled from "styled-components";

const GradientText = styled.div`
  @supports (-webkit-text-fill-color: transparent) {
    background: linear-gradient(135deg, hotpink, violet, lightskyblue);
    background-size: 200%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: gradient 5s ease infinite;
    -webkit-text-fill-color: transparent;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

export default GradientText;
