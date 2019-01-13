import React, { ReactText } from "react";
import styled from "styled-components";
import classnames from "classnames";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/brands.css";

import Header from "./Header";

interface LayoutProps {
  className?: string;
  children?: React.ReactElement<any>[];
}
type Layout = React.FunctionComponent<LayoutProps>;
const Layout: Layout = ({ className, children }) => (
  <div className={classnames("main-container", className)}>{children}</div>
);

const getLinks = () => {
  const links = [
    ["fa-twitter", "@", "aadroher", "twitter.com", "Twitter"],
    ["fa-github", "", "aadroher", "github.com", "Github"],
    ["fa-facebook", "/", "aadroher", "www.facebook.com", "Facebook"],
    ["fa-linkedin", "", "armandadroher", "www.linkedin.com/in", "LinkedIn"]
  ];

  const linkElements = links.map(
    ([iconClassName, handlePrefix, handle, urlBase, title]) => (
      <li key={`${urlBase}/${handle}`}>
        <pre>
          <span
            style={{
              fontSize: "1rem"
            }}
          >
            <i className={classnames("fab", iconClassName)} />
          </span>
          <a href={`https://${urlBase}/${handle}`} target="__blank">
            {`${handlePrefix}${handle}`}
          </a>
        </pre>
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
      <pre>Software engineer and school teacher</pre>
      <pre>You may find me here:</pre>
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
  font-size: 120%;
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
    /* border: solid ${fontColour}; */
    /* box-shadow: ${shadowColour} 0 0 0.3rem; */

    .header {
      font-weight: bolder;
    }

    ul {
      li {
        list-style-type: none;
        a {
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
        svg {
          margin-right: 0.5rem;
          /* vertical-align: -0.25rem; */
        }
      }
    }
  }
`;

export default StyledApp;
