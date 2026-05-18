import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { portfolioData } from "../data/portfolio";

const Landing = ({ children }: PropsWithChildren) => {
  const { greeting, nameLines, eyebrow, primaryRoles, secondaryRoles } =
    portfolioData.hero;

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{greeting}</h2>
            <h1>
              {nameLines[0]}
              <br />
              <span>{nameLines[1]}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{eyebrow}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{primaryRoles[0]}</div>
              <div className="landing-h2-2">{primaryRoles[1]}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{secondaryRoles[0]}</div>
              <div className="landing-h2-info-1">{secondaryRoles[1]}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
