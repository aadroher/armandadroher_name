import React from "react";
import styled from "styled-components";

import GradientText from "./gradient-text";

const titleText = "Armand Adroher";
const underline = "==============";

type Title = React.FunctionComponent;

const StyledHeading = styled.h1`
  font-size: inherit;
  font-weight: normal;
`;

const Title: Title = () => (
  <StyledHeading>
    {titleText}
    <br />
    {underline}
  </StyledHeading>
);

export default Title;
