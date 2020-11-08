import React from "react";
import styled from "styled-components";

const titleText = 'ARMAND ADROHER'
const underline = '=============='

type Title = React.FunctionComponent;

const StyledHeading = styled.h1`
  font-size: 1rem;
  font-weight: normal;
`;

const Title: Title = () => (
  <StyledHeading> 
    {titleText}<br />{underline} 
  </StyledHeading>
);

export default Title;
