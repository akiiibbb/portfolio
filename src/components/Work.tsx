import "./styles/Work.css";
import { useRef } from "react";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const track = trackRef.current;

      if (!section || !container || !track) {
        return;
      }

      const media = gsap.matchMedia();

      media.add("(min-width: 1026px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".work-box", track);

        if (cards.length === 0) {
          return;
        }

        const getDistance = () => {
          const lastCard = cards[cards.length - 1];
          const containerRight = container.getBoundingClientRect().right;
          const lastCardRight = lastCard.getBoundingClientRect().right;

          return Math.max(0, lastCardRight - containerRight);
        };

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: "work-horizontal",
          },
        });

        const refresh = () => ScrollTrigger.refresh();
        const refreshFrame = window.requestAnimationFrame(refresh);
        const refreshTimer = window.setTimeout(refresh, 350);
        window.addEventListener("load", refresh, { once: true });

        return () => {
          window.cancelAnimationFrame(refreshFrame);
          window.clearTimeout(refreshTimer);
          window.removeEventListener("load", refresh);
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container" ref={containerRef}>
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex" ref={trackRef}>
          {portfolioData.projects.map((project, index) => (
            <div className="work-box" key={project.name}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Project overview</h4>
                <p>{project.summary}</p>
                <h4>Tools and features</h4>
                <p>{project.stack}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.alt}
                link={project.link}
                video={project.video}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
