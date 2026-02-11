import "./Footer.css";
import logo from "../../assets/images/logo.png";
import github from "../../assets/images/github.png";
import notion from "../../assets/images/notion.png";
import figma from "../../assets/images/figma.png";
import zep from "../../assets/images/zep.png";

const FOOTER_SECTIONS = {
  "Our Team": [
    "오찬경",
    "박명환",
    "권도희",
    "정소연",
    "김가인",
    "오현진",
    "전건호",
  ],
};

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <img src={logo} alt="logo" className="footer-logo" />
          <div className="social-icons">
            <img src={github} alt="github" />
            <img src={figma} alt="figma" />
            <img src={notion} alt="notion" />
            <img src={zep} alt="zep" />
          </div>
        </div>

        {Object.entries(FOOTER_SECTIONS).map(([title, items]) => (
          <div key={title} className="footer-section">
            <h4>{title}</h4>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
