import "./Footer.css";
import logo from "../../assets/images/logo.png";

const FOOTER_SECTIONS = {
  "Use cases": [
    "UI design",
    "UX design",
    "Wireframing",
    "Diagramming",
    "Brainstorming",
    "Online whiteboard",
    "Team collaboration",
  ],
  Explore: [
    "Design",
    "Prototyping",
    "Development features",
    "Design systems",
    "Collaboration features",
    "Design process",
    "FigJam",
  ],
  Resources: [
    "Blog",
    "Best practices",
    "Colors",
    "Color wheel",
    "Support",
    "Developers",
    "Resource library",
  ],
};

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* 브랜드 영역 */}
        <div className="footer-brand">
          <img src={logo} alt="logo" className="logo-img" />
          <div className="social-icons">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* 링크 섹션 */}
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
