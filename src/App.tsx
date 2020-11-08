import React, { ReactText } from "react";
import styled from "styled-components";
import classnames from "classnames";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/brands.css";

import "./assets/fira.css";
import Header from "./Header";
import Title from "./Title";
import Links from "./Links";

interface LayoutProps {
  className?: string;
  children?: React.ReactElement<any>[];
}
type Layout = React.FunctionComponent<LayoutProps>;
const Layout: Layout = ({ className, children }) => (
  <div className={classnames("main-container", className)}>{children}</div>
);

type App = React.FunctionComponent<{
  className?: string;
}>;
const App: App = ({ className }) => (
  <div className={classnames("app", className)}>
    <Layout>
      <Title />
      <Links />
    </Layout>
  </div>
);

export default App;
