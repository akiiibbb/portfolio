import "./styles/About.css";
import { portfolioData } from "../data/portfolio";

const About = () => {
  const { title, description } = portfolioData.about;

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{title}</h3>
        <p className="para">{description}</p>
      </div>
    </div>
  );
};

export default About;
