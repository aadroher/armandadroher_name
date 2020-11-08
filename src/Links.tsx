import React, { ReactText } from "react";
import styled from "styled-components";

import Icon from "./Icon";

const linkData = [
  ["fa-twitter", "@", "aadroher", "twitter.com", "Twitter"],
  ["fa-github-alt", "", "aadroher", "github.com", "Github"],
  ["fa-facebook-f", "/", "aadroher", "www.facebook.com", "Facebook"],
  ["fa-linkedin-in", "", "armandadroher", "www.linkedin.com/in", "LinkedIn"],
];

const StyledList = styled.ul`
  padding: 0;
  li {
    list-style-type: none;
    a {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

type Links = React.FunctionComponent;
const Links: Links = () => (
  <StyledList>
    {linkData.map(([iconClassName, handlePrefix, handle, urlBase, title]) => (
      <li key={`${urlBase}/${handle}`}>
        <a
          href={`https://${urlBase}/${handle}`}
          rel="external"
          aria-label={`${title} profile`}
        >
          <Icon iconClassName={iconClassName} />
          {`${handlePrefix}${handle}`}
        </a>
      </li>
    ))}
  </StyledList>
);

export default Links;
