import React from "react";
import figlet from "figlet";

const fontName = "Calvin S";

type getBanner = (
  args: { text: string; font?: figlet.Fonts }
) => Promise<string>;
const getBanner: getBanner = ({ text, font }) =>
  new Promise((resolve: Function, reject: Function) => {
    const msg = `Requesting ${font}`;
    console.log(msg);
    figlet(text, { font }, (err, bannerText) => {
      if (err) {
        reject(err);
      } else {
        const msg = "Received:";
        console.log(msg);
        console.log(bannerText);
        resolve(bannerText);
      }
    });
  });

interface BannerData {
  fontName: string;
  bannerTextLines: string[];
}

interface HeaderProps {
  fontName?: string;
}

class Header extends React.Component<HeaderProps> {
  state: {
    banners: BannerData[];
  };

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      banners: []
    };
  }

  componentDidMount() {
    console.log("Component did mount");
    const textLines = ["armand adroher"];
    Promise.all(
      textLines.map(text => getBanner({ text, font: fontName }))
    ).then(bannerTextLines => {
      console.log(0);
      this.setState({
        banners: [
          {
            fontName,
            bannerTextLines
          }
        ]
      });
    });
  }

  render() {
    const { banners } = this.state;
    const bannerComponents = banners.map(({ fontName, bannerTextLines }) => (
      <div key={fontName}>
        {bannerTextLines.map(bannerTextLine => (
          <pre key={bannerTextLine}>
            {bannerTextLine}
            <br />
            =========================================
          </pre>
        ))}
      </div>
    ));
    return <div className="header">{bannerComponents}</div>;
  }
}

export default Header;
