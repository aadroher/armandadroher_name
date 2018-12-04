import React from "react";
import styled from "styled-components";

const Header = ({ className }: { className: string }) => (
  <h1 className={className}>Armand Adroher Salvia</h1>
);

const StyledHeader = styled(Header)`
  font-family: "Roboto";
`;

const App = () => (
  <div className="App">
    <StyledHeader className="header" />
    <p>Software engineer and school teacher</p>
    <p>
      You may <b>find me</b> here:
    </p>
    <ul>
      <li>
        <a href="https://www.facebook.com/aadroher">/aadroher</a>
      </li>
      <li>
        <a href="https://twitter.com/">@aadroher</a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/armandadroher/">armandadroher</a>
      </li>
      <li>
        <a href="https://github.com/aadroher">aadroher</a>
      </li>
    </ul>
  </div>
);

export default App;
