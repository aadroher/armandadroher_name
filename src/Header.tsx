import React from "react";
import figlet from "figlet";
import { strict } from "assert";

interface HeaderProps {
  fontName?: string;
}
const Header = ({ fontName }: HeaderProps) => (
  <pre className="header">Armand Adroher Salvia</pre>
);

export default Header;
