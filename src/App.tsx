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

type App = React.FunctionComponent<{
  className?: string;
}>;
const App: App = ({ className }) => (
  <div className={classnames("app", className)}>
    <Layout>
      <Header className="header" />
      <p>Software engineer and school teacher</p>
      <p>You may find me here:</p>
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

const fontColour = "violet";
const shadowColour = "darkviolet";
const StyledApp = styled(App)`
  padding: 8px;
  background-color: #0f0f0f;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  font-family: "Fira Mono";
  color: ${fontColour};
  text-shadow: ${shadowColour} 0 0 0.3rem;

  h1 {
    font-weight: 400;
  }

  a {
    color: ${fontColour};
  }

  & > .main-container {
    width: 27rem;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: 40%;
    transform: translateY(-50%);

    padding: 2rem;
    border: solid ${fontColour};
    box-shadow: ${shadowColour} 0 0 0.3rem;

    ul {
      li {
        list-style-type: none;
      }
    }
  }
`;

// class DynamicApp extends React.Component<{}> {
//   maxBlurRadius = 2;
//   minBlurRadius = 1;
//   blurRadiusChangeStep = 0.01;
//   // blurRadiusUpdateDelay = 10; //ms

//   state: {
//     blurAnimationOn: boolean;
//     blurRadiusDirection: number;
//     blurRadius: number;
//   };

//   intervalId: undefined | number;

//   constructor(props: {}) {
//     super(props);

//     this.state = {
//       blurAnimationOn: false,
//       blurRadiusDirection: 1,
//       blurRadius: 1
//     };
//   }

//   componentDidMount() {
//     this.animateBlurRadius();
//   }

//   componentWillUnmount() {
//     window.clearInterval(this.intervalId);
//   }

//   animateBlurRadius = () => {
//     window.requestAnimationFrame(() => {
//       this.updateBlurRadius();
//       const { blurAnimationOn } = this.state;
//       if (blurAnimationOn) {
//         this.animateBlurRadius();
//       }
//     });
//   };

//   updateBlurRadius = () => {
//     const { blurRadius, blurRadiusDirection } = this.state;
//     const shouldChangeDirection =
//       blurRadius < this.minBlurRadius || this.maxBlurRadius < blurRadius;
//     const newBlurRadiusDirection = shouldChangeDirection
//       ? -blurRadiusDirection
//       : blurRadiusDirection;
//     const newBlurRadius =
//       newBlurRadiusDirection * this.blurRadiusChangeStep + blurRadius;

//     this.setState({
//       blurRadiusDirection: newBlurRadiusDirection,
//       blurRadius: newBlurRadius
//     });
//   };

//   render = () => {
//     const style = {
//       textShadow: `${fontColour} 0 0 ${this.state.blurRadius}rem`
//     };
//   };
// }

const AnimatedApp = styled(StyledApp)`
  @keyframes shadow-blur {
    from {
      text-shadow: ${fontColour} 0 0 0.3rem;
    }

    to {
      text-shadow: ${fontColour} 0 0 0.4rem;
    }
  }

  animation-name: shadow-blur;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-out;
`;

export default StyledApp;
