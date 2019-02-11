import React, { ReactText } from "react";
import styled from "styled-components";
import classnames from "classnames";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/brands.css";

import "./assets/fira.css";
import Header from "./Header";

interface LayoutProps {
  className?: string;
  children?: React.ReactElement<any>[];
}
type Layout = React.FunctionComponent<LayoutProps>;
const Layout: Layout = ({ className, children }) => (
  <div className={classnames("main-container", className)}>{children}</div>
);

interface IconProps {
  iconClassName: string;
  className?: string;
}
type Icon = React.FunctionComponent<IconProps>;
const Icon: Icon = ({ iconClassName, className }) => (
  <i className={classnames("fab", iconClassName, className)} />
);

const StyledIcon = styled(Icon)`
  /* font-size: 100%; */
  margin-right: 0.6rem;
  min-width: 1rem;
  text-align: center;
`;

const getLinks = () => {
  const links = [
    ["fa-twitter", "@", "aadroher", "twitter.com", "Twitter"],
    ["fa-github-alt", "", "aadroher", "github.com", "Github"],
    ["fa-facebook-f", "/", "aadroher", "www.facebook.com", "Facebook"],
    ["fa-linkedin-in", "", "armandadroher", "www.linkedin.com/in", "LinkedIn"]
  ];

  const linkElements = links.map(
    ([iconClassName, handlePrefix, handle, urlBase, title]) => (
      <li key={`${urlBase}/${handle}`}>
        <a href={`https://${urlBase}/${handle}`} target="__blank">
          <StyledIcon iconClassName={iconClassName} />
          {`${handlePrefix}${handle}`}
        </a>
      </li>
    )
  );

  return <ul>{linkElements}</ul>;
};

type App = React.FunctionComponent<{
  className?: string;
}>;
const App: App = ({ className }) => (
  <div className={classnames("app", className)}>
    <Layout>
      <Header />
      {getLinks()}
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
  font-size: 16px;
  color: ${fontColour};
  text-shadow: ${shadowColour} 0 0 0.3rem;

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

    ul {
      li {
        list-style-type: none;
        a {
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

export default App;
