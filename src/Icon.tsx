import React from "react";
import styled from "styled-components";
import classnames from "classnames";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/brands.css";

import "./assets/fira.css";

interface IconProps {
  iconClassName: string;
  className?: string;
}
type Icon = React.FunctionComponent<IconProps>;
const Icon: Icon = ({ iconClassName, className }) => (
  <i className={classnames("fab", iconClassName, className)} />
);

const StyledIcon = styled(Icon)`
  margin-right: 1rem;
  width: 1rem;
  text-align: center;
`;

export default StyledIcon;
