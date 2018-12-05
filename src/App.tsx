import React, { ReactText } from "react";
import styled from "styled-components";
import classnames from "classnames";

// import

interface LayoutProps {
  className?: string;
  children?: React.ReactElement<any>[];
}
type Layout = React.FunctionComponent<LayoutProps>;

const Layout: Layout = ({ className, children }) => (
  <div className={classnames("main-container", className)}>{children}</div>
);

const Header = ({ className }: { className: string }) => (
  <h1 className={className}>Armand Adroher Salvia</h1>
);

const StyledHeader = styled(Header)`
  font-family: "Roboto";
`;

type App = React.FunctionComponent;
const App: App = () => (
  <div className="App">
    <Layout>
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
    </Layout>
  </div>
);

export default App;
