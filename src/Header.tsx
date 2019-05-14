import React from "react";
import figlet from "figlet";
import styled from "styled-components";
import classnames from "classnames";

const fontName = "Calvin S";
const headerText = "Armand Adroher";

type getBannerText = (args: {
  text: string;
  font?: figlet.Fonts;
}) => Promise<string>;
const getBannerText: getBannerText = ({ text, font }) =>
  new Promise((resolve: Function, reject: Function) => {
    const lowerCaseText = text.toLowerCase();
    figlet(lowerCaseText, { font }, (err, bannerText) => {
      if (err) {
        reject(err);
      } else {
        resolve(bannerText);
      }
    });
  });

interface BannerData {
  className?: string;
  bannerText?: string;
}

type getBannersData = () => Promise<BannerData[]>;
const getBannersData = () => {
  const oneLineHeaderData = {
    className: "desktop",
    headerText
  };
  const twoLineHeaderData = {
    className: "mobile",
    headerText: headerText.replace(" ", "\n")
  };
  return Promise.all(
    [oneLineHeaderData, twoLineHeaderData].map(({ className, headerText }) =>
      getBannerText({ text: headerText, font: fontName }).then(bannerText => ({
        className,
        bannerText
      }))
    )
  );
};

type Banner = React.FunctionComponent<{
  key?: string;
  className?: string;
  text?: string;
}>;

const Banner: Banner = ({ className, text }) => {
  const lines = (text || "").split("\n");
  const [firstLine] = lines;
  const numColumns = firstLine.length;
  const underline = new Array(numColumns).fill("=").join("");
  return (
    <pre
      className={className}
      role="heading"
      aria-level={1}
      aria-label={headerText}
    >
      {text}
      <br />
      {underline}
    </pre>
  );
};

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
    this.setBanners = this.setBanners.bind(this);
  }

  componentDidMount() {
    this.setBanners();
  }

  setBanners() {
    getBannersData()
      .then(banners => {
        this.setState({ banners });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { className } = this.props;
    const { banners } = this.state;

    return (
      <div className={classnames("header", className)}>
        {banners.map(({ className, bannerText }) => (
          <Banner key={bannerText} className={className} text={bannerText} />
        ))}
      </div>
    );
  }
}

const StyledHeader = styled(Header)`
  font-weight: 900;

  .desktop {
    display: block;
  }
  .mobile {
    display: none;
  }

  @media (max-width: 35rem) {
    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }
  }
`;

export default StyledHeader;
