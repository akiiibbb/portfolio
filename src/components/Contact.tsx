import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { portfolioData } from "../data/portfolio";

const Contact = () => {
  const currentYear = new Date().getFullYear();
  const contactEmail = "istiak.ahmed.akib@gmail.com";
  const contactPhone = "+880 1884502066";
  const whatsappUrl = "https://wa.me/qr/XK5POFHIMKNWK1";

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a 
                href={`mailto:${contactEmail}`} 
                data-cursor="disable"
                title={`Send email to ${contactEmail}`}
              >
                {contactEmail}
              </a>
            </p>
            <h4>Phone (WhatsApp)</h4>
            <p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                title={`Message ${contactPhone} on WhatsApp`}
              >
                {contactPhone}
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            {portfolioData.socialLinks.map((link) => (
              <a
                href={link.href}
                key={link.label}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
                title={`Visit ${link.label} profile (opens in new tab)`}
              >
                {link.label} <MdArrowOutward />
              </a>
            ))}
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>{portfolioData.brand.name}</span>
            </h2>
            <h5>
              <MdCopyright /> {currentYear}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
