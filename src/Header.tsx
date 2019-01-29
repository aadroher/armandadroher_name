import React from "react";
import figlet from "figlet";
import styled from "styled-components";
import classnames from "classnames";

const fontName = "Calvin S";
const headerText = "armand adroher";

type getBannerText = (
  args: { text: string; font?: figlet.Fonts }
) => Promise<string>;
const getBanner: getBannerText = ({ text, font }) =>
  new Promise((resolve: Function, reject: Function) => {
    figlet(text, { font }, (err, bannerText) => {
      if (err) {
        reject(err);
      } else {
        resolve(bannerText);
      }
    });
  });

type Banner = React.FunctionComponent<{
  key?: string;
  className?: string;
  text?: string;
}>;

const Banner: Banner = ({ key, className, text }) => {
  const lines = (text || "").split("\n");
  const [firstLine] = lines;
  const numColumns = firstLine.length;
  const underline = new Array(numColumns).fill("=").join("");
  return (
    <div key={key} className={classnames("header", className)}>
      <pre key={text}>
        {text}
        <br />
        {underline}
      </pre>
    </div>
  );
};

type getBanners = () => Promise<BannerData[]>;

const getBannersData = () => {
  const oneLineHeaderData = {
    className: "desktop",
    headerText
  };
  const twoLineHeaderData = {
    className: "mobile",
    headerText: headerText.replace(" ", "\n")
  };
};

interface BannerData {
  className?: string;
  bannerText?: string;
}
interface HeaderProps {
  fontName?: string;
  className?: string;
}
class Header extends React.Component<HeaderProps> {
  state: {
    banners: BannerData[];
  };

  constructor(props: HeaderProps) {
    super(props);
    this.state = { banners: [] };
  }

  componentDidMount() {
    getBanner({ text: headerText, font: fontName }).then(bannerText => {
      this.setState({
        banner: {
          bannerText
        }
      });
    });
  }

  render() {
    const { className } = this.props;
    const {
      banner: { bannerText }
    } = this.state;

    return <Banner text={bannerText} key={bannerText} />;
  }
}

const StyledHeader = styled(Header)`
  font-weight: 900;
`;

export default StyledHeader;
