
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import instagram from "../../assets/svg/instagram.svg";
import facebook from "../../assets/svg/facebook.svg";
import twitter from "../../assets/svg/twitter.svg";
import footkfc from "../../assets/svg/footkfc.svg";

const FooterStyled = styled.div`
  text-align: center;

  .footermaindiv {
    background-color: rgb(32, 33, 36);
    width: 100%;
    height: fit-content;
    padding: 2% 0% 3% 0%;
    box-sizing: border-box;
  }

  .container44 {
    width: 85%;
    display: grid;
    text-align: justify;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    margin: auto;
  }

  p {
    width: 100%;
    font-size: 12px;
  }

  .boxes44 {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 50px;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  li {
    font-size: 12px;
    margin-bottom: 1rem;
  }

  li:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .cards44 {
    width: 100%;
  }

  ul > p {
    font-size: 14px;
    font-weight: bold;
  }

  .lastbox44 {
    display: flex;
    min-height: 40px;
    margin-top: 60px;
    align-items: center;
  }

  .section44 {
    display: flex;
    width: 75%;
    margin-right: 3rem;
  }

  .section44 > div {
    width: 100%;
  }

  .section44 > div:hover {
    text-decoration: underline;
  }

  .lastLinefoot {
    visibility: visible;
  }

  .lastLinefootsvg {
    visibility: hidden;
  }

  /* Student project credits */
  .student-credits {
    border-top: 1px solid #555;
    margin-top: 30px;
    padding-top: 20px;
    text-align: center;
    color: #fefffc;
    font-size: 14px;
    line-height: 1.8;
  }

  .student-credits p {
    color: #ffffff;
    font-size: 14px;
    margin: 5px 0;
  }

  .student-credits strong {
    color: #f3f1f1;
  }

  .student-credits .developed-by {
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .student-credits .copyright {
    color: #cccccc;
    font-size: 12px;
    margin-top: 12px;
  }

  @media all and (max-width: 1024px) {
    .footermaindiv {
      width: 100%;
      padding: 20px 0;
    }

    .container44 {
      width: 90%;
      display: block;
      text-align: center;
    }

    .boxes44 {
      flex-direction: column;
      align-items: center;
      margin-top: 25px;
    }

    .cards44 {
      width: 95%;
      height: 40px;
      overflow: hidden;
      text-align: center;
    }

    .cards44:nth-child(1) {
      width: fit-content;
      height: 150px;
      margin: auto;
    }

    .lastLinefoot {
      visibility: hidden;
      display: none;
    }

    .lastLinefootsvg {
      visibility: visible;
      display: flex;
      justify-content: center;
      margin-top: 15px;
    }

    .lastbox44 {
      margin-top: 0;
    }

    li {
      font-size: 12px;
      margin-bottom: 0;
    }

    .student-credits {
      margin-top: 20px;
      padding: 18px 5px 0;
    }

    .student-credits p {
      font-size: 13px;
    }
  }
`;

export const Footer = () => {
  return (
    <FooterStyled>
      <footer className="footermaindiv">
        <div className="container44">
          <p>Calorie Statement</p>

          <p>
            2,000 calories a day is used for general nutrition advice, but
            calorie needs vary. Additional nutrition information available
            upon request in-store and on kfc.com. Prices, participation,
            and product availability may vary.
          </p>

          <br />

          <p>
            Pepsi, Pepsi Globe, Mtn Dew, Mtn Dew Sweet Lightning, Sierra Mist
            are registered trademarks of PepsiCo, Inc.
            <br />
            Dr Pepper is a registered trademark of Dr Pepper/Seven Up, Inc.
          </p>

          <br />

          <div className="boxes44">
            <div className="cards44">
              <img
                height="110rem"
                style={{ padding: "0px 5px", cursor: "pointer" }}
                src={footkfc}
                alt="KFC logo"
              />
            </div>

            <div className="cards44">
              <ul>
                <p>KFC Food</p>
                <li>Menu</li>
                <li>Full Nutrition Guide</li>
                <li>Nutrition Calculator</li>
                <li>Food Allergies &amp; Sensitivities</li>
              </ul>
            </div>

            <div className="cards44">
              <ul>
                <p>Company</p>
                <li>About KFC</li>
                <li>How We Make Chicken</li>
                <li>KFC Foundation</li>
                <li>Company Responsibility</li>
                <li>Franchise a KFC</li>
                <li>Responsible Disclosure</li>
                <li>KFC Newsroom</li>
              </ul>
            </div>

            <div className="cards44">
              <ul>
                <p>Career</p>
                <li>Restaurant Careers</li>
                <li>Corporate Careers</li>
                <li>Culture</li>
                <li>Growth</li>
              </ul>
            </div>

            <div className="cards44">
              <ul>
                <p>Resources</p>
                <li>FAQs</li>
                <li>Contact Us</li>
                <li>KFC App</li>
              </ul>
            </div>

            <div className="cards44">
              <ul>
                <p>Find a KFC</p>
                <li>Find a KFC</li>
              </ul>
            </div>
          </div>

          <div className="lastbox44">
            <div className="section44">
              <div className="lastLinefoot"><p>Privacy Policy</p></div>
              <div className="lastLinefoot"><p>Updated 01/2022</p></div>
              <div className="lastLinefoot"><p>Terms Of Use</p></div>
              <div className="lastLinefoot"><p>Our Cookies &amp; Ads</p></div>
              <div className="lastLinefoot">
                <p>Do Not Sell My Personal Information</p>
              </div>
            </div>

            <div className="lastLinefoot">
              <p>Copyright © KFC Corporation 2022 All Rights Reserved</p>
            </div>

            <div
              style={{ display: "flex" }}
              className="lastLinefoot"
            >
              <Link to="https://www.instagram.com/_mad___boxer_/">
                <img height="30rem" style={{ padding: "0.3vw 1vw" }} src={instagram} alt="Instagram" />
              </Link>

              <Link to="https://www.facebook.com/people/Arshad-Khan/100004164048208/">
                <img height="30rem" style={{ padding: "0.3vw 1vw" }} src={facebook} alt="Facebook" />
              </Link>

              <Link to="https://www.linkedin.com/in/md-arshad-khan-350206154/">
                <img height="30rem" style={{ padding: "0.3vw 1vw" }} src={twitter} alt="Social media" />
              </Link>
            </div>
          </div>

          <div className="lastLinefoot">
            <p>Accessibility Statement</p>
          </div>

          {/* Student project credits */}
          <div className="student-credits">
            <p className="developed-by">Developed by</p>

            <p>
              <strong>Muhammad Raima</strong>
              {" — "}
              Registration No: <strong>S25D14/021</strong>
            </p>

            <p>
              <strong>Nsajja Comfort Shalom</strong>
              {" — "}
              Registration No: <strong>S25D14/017</strong>
            </p>

            <p className="copyright">
              © {new Date().getFullYear()} KFC Clone Project
            </p>
          </div>
        </div>

        <div className="lastLinefootsvg">
          <Link to="https://www.instagram.com/_mad___boxer_/">
            <img height="30rem" style={{ padding: "0.3vw 1vw" }} src={instagram} alt="Instagram" />
          </Link>

          <Link to="https://www.facebook.com/people/Arshad-Khan/100004164048208/">
            <img height="30rem" style={{ padding: "0.3vw 1vw" }} src={facebook} alt="Facebook" />
          </Link>

          <Link to="https://www.linkedin.com/in/md-arshad-khan-350206154/">
            <img height="30rem" style={{ padding: "0.3vw 1vw" }} src={twitter} alt="Social media" />
          </Link>
        </div>
      </footer>
    </FooterStyled>
  );
};
