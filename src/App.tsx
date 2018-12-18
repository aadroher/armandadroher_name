import React, { ReactText } from "react";
import styled from "styled-components";
import classnames from "classnames";

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

type BlurRadiusStyle = {
  textShadow: string;
};
type App = React.FunctionComponent<{
  className?: string;
  style: BlurRadiusStyle;
}>;
const App: App = ({ className, style }) => (
  <div className={classnames("app", className)} style={style}>
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

const fontColour = "yellowgreen";
const StyledApp = styled(App)<{ style: BlurRadiusStyle }>`
  padding: 8px;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  font-family: "Fira Mono";
  color: ${fontColour};

  a {
    color: ${fontColour};
  }

  & > .main-container {
    width: 62.5%;
    min-width: 30rem;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: 40%;
    transform: translateY(-50%);

    ul {
      li {
        list-style-type: none;
      }
    }
  }
`;

class DynamicApp extends React.Component<{}> {
  maxBlurRadius = 1.5;
  minBlurRadius = 1;
  blurRadiusChangeStep = 0.01;
  blurRadiusUpdateDelay = 50; //ms

  state: {
    blurRadiusDirection: number;
    blurRadius: number;
  };

  intervalId: undefined | number;

  constructor(props: {}) {
    super(props);

    this.state = {
      blurRadiusDirection: 1,
      blurRadius: 1
    };
  }

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.updateBlurRadius();
    }, this.blurRadiusUpdateDelay);
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  updateBlurRadius = () => {
    const { blurRadius, blurRadiusDirection } = this.state;
    const shouldChangeDirection =
      blurRadius < this.minBlurRadius || this.maxBlurRadius < blurRadius;
    const newBlurRadiusDirection = shouldChangeDirection
      ? -blurRadiusDirection
      : blurRadiusDirection;
    const newBlurRadius =
      newBlurRadiusDirection * this.blurRadiusChangeStep + blurRadius;

    this.setState({
      blurRadiusDirection: newBlurRadiusDirection,
      blurRadius: newBlurRadius
    });
  };

  render = () => {
    const style = {
      textShadow: `${fontColour} 0 0 ${this.state.blurRadius}rem`
    };
    return <StyledApp style={style} />;
  };
}

export default DynamicApp;
