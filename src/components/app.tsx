import React, { ReactText } from "react";
import styled from "styled-components";
import classnames from "classnames";

import Title from "./title";
import Links from "./links";
import GradientText from "./gradient-text";

const Layout = styled.div`
  width: 15rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top: 45%;
  transform: translateY(-55%);
`;

type App = React.FunctionComponent<{
  className?: string;
}>;
const App: App = ({ className }) => (
  <div className={classnames("app", className)}>
    <Layout>
      <GradientText>
        <Title />
        <Links />
      </GradientText>
    </Layout>
  </div>
);

export default App;
