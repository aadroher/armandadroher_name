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

type App = React.FunctionComponent<{ className?: string }>;
const App: App = ({ className }) => (
  <div className={classnames("app", className)}>
    <Layout>
      <Header className="header" />
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

const StyledApp = styled(App)`
  padding: 8px;
  background-color: black;
  color: rebeccapurple;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  & > main-container {
    width: 62.5%;
    min-width: 30rem;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default StyledApp;
