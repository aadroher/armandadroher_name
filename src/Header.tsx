import React from "react";
import figlet from "figlet";
import { text } from "@fortawesome/fontawesome-svg-core";
import { string } from "prop-types";

const fontIndexPath = "./fonts/index.txt";

type getFontNames = (args: { fontIndexPath: string }) => Promise<string[]>;
const getFontNames: getFontNames = ({ fontIndexPath }) =>
  fetch(fontIndexPath)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw `HTTP Error ${response.status} - ${response.statusText}`;
      }
    })
    .then(responseBody => responseBody.split("\n"))
    .then(fontFilenames =>
      fontFilenames.map(fontFileName => {
        const [fontName, ext] = fontFileName.split(".");
        return fontName;
      })
    )
    .then(x => {
      console.log(x);
      return x;
    });

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

type getBanners = (
  args: { textLines: string[]; fontIndexPath: string; receiver: Header }
) => Promise<void>;
const getBanners: getBanners = async ({ textLines, fontIndexPath, receiver }) =>
  getFontNames({ fontIndexPath }).then(async fontNames => {
    fontNames.forEach(async fontName => {
      const [text] = textLines;
      const bannerText = await getBanner({
        text,
        font: fontName as figlet.Fonts
      });
      const bannerTextLines = [bannerText];
      const { banners } = receiver.state;
      receiver.setState({
        banners: [...banners, { fontName, bannerTextLines }]
      });
    });
  });

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
    const textLines = ["Armand\nAdroher", "Adroher"];
    const receiver = this;
    getBanners({ textLines, fontIndexPath, receiver });
  }

  render() {
    const { banners } = this.state;
    const bannerComponents = banners.map(({ fontName, bannerTextLines }) => (
      <div key={fontName}>
        {bannerTextLines.map(bannerTextLine => (
          <pre key={bannerTextLine}>
            {bannerTextLine}
            <br />
          </pre>
        ))}
        <p>{fontName}</p>
      </div>
    ));
    return <div className="header">{bannerComponents}</div>;
  }
}

export default Header;
