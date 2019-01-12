import React from "react";
import figlet from "figlet";

type getBanner = (
  args: { text: string; fontName?: figlet.Fonts }
) => Promise<string>;
const getBanner: getBanner = ({ text, fontName }) =>
  new Promise((resolve: Function, reject: Function) => {
    figlet(text, { font: fontName }, (err, bannerText) => {
      if (err) {
        reject(err);
      } else {
        resolve(bannerText);
      }
    });
  });

interface HeaderProps {
  fontName?: string;
}

class Header extends React.Component<HeaderProps> {
  state: {
    bannerText: string;
  };

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      bannerText: ""
    };
  }

  componentDidMount() {
    console.log("Component did mount");
    const text = "Armand Adroher";
    getBanner({ text, fontName: "Standard" })
      .then(bannerText => {
        console.log("getBanner resolved");
        console.log(bannerText);
        this.setState({ bannerText });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { bannerText } = this.state;
    return <pre className="header">{bannerText}</pre>;
  }
}

export default Header;
