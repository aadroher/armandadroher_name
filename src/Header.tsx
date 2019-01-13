import React from "react";
import figlet from "figlet";
import styled from "styled-components";
import classnames from "classnames";

const fontName = "Calvin S";
const bannerText = "armand adroher";

type getBanner = (
  args: { text: string; font?: figlet.Fonts }
) => Promise<string>;
const getBanner: getBanner = ({ text, font }) =>
  new Promise((resolve: Function, reject: Function) => {
    figlet(text, { font }, (err, bannerText) => {
      if (err) {
        reject(err);
      } else {
        resolve(bannerText);
      }
    });
  });

interface BannerData {
  bannerText: string;
}
interface HeaderProps {
  fontName?: string;
  className?: string;
}
class Header extends React.Component<HeaderProps> {
  state: {
    banner: BannerData;
  };

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      banner: {
        bannerText: ""
      }
    };
  }

  componentDidMount() {
    getBanner({ text: bannerText, font: fontName }).then(bannerText => {
      this.setState({
        banner: {
          fontName,
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

    return (
      <div className={classnames("header", className)}>
        <pre key={bannerText}>
          {bannerText}
          <br />
          =========================================
        </pre>
      </div>
    );
  }
}

const StyledHeader = styled(Header)`
  font-weight: 900;
`;

export default StyledHeader;
