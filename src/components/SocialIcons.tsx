import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { type ReactNode, useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { portfolioData, type SocialPlatform } from "../data/portfolio";

const iconMap: Record<SocialPlatform, ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedinIn />,
  twitter: <FaXTwitter />,
  instagram: <FaInstagram />,
};

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const cleanup = Array.from(social.querySelectorAll("span")).map((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement | null;
      if (!link) {
        return () => undefined;
      }

      const resetPosition = () => {
        link.style.setProperty("--siLeft", "50%");
        link.style.setProperty("--siTop", "50%");
      };

      const onMouseMove = (event: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        link.style.setProperty("--siLeft", `${x}px`);
        link.style.setProperty("--siTop", `${y}px`);
      };

      elem.addEventListener("mousemove", onMouseMove);
      elem.addEventListener("mouseleave", resetPosition);
      resetPosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseleave", resetPosition);
      };
    });

    return () => {
      cleanup.forEach((dispose) => dispose());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {portfolioData.socialLinks.map((link) => (
          <span key={link.label}>
            <a href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
              {iconMap[link.platform]}
            </a>
          </span>
        ))}
      </div>
      {portfolioData.brand.resumeUrl ? (
        <a
          className="resume-button"
          href={portfolioData.brand.resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          <HoverLinks text="RESUME" />
          <span>
            <TbNotes />
          </span>
        </a>
      ) : (
        <span className="resume-button resume-button-disabled">
          <HoverLinks text="RESUME" />
          <span>
            <TbNotes />
          </span>
        </span>
      )}
    </div>
  );
};

export default SocialIcons;
