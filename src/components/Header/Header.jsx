import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import PropTypes from "prop-types";

import { Menu } from "@components/Menu";
import { Modal } from "@components/Modal";
import { Accordion } from "@components/Accordion";
import { Sidebar } from "@components/Sidebar";
import { SelectLanguage } from "@components/SelectLanguage";
import { PlayButton } from "@components/PlayButton";
import { Container } from "@components/Container";
import { Help } from "@components/Help";
import { Swiper } from "@components/Swiper";
import { Logo } from "@components/Logo";

import "./Header.scss";

import { translate } from "@helpers/translation";
import { productPhotos } from "@data/images";
import { menuSections } from "@data/menuSections";

export const Header = ({ onPlay, onSelect, lang }) => {
  const [photos] = useState(productPhotos);
  const [menuItems] = useState(menuSections);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleScreenChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    handleScreenChange(mediaQuery); // Initial check

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  const handleHelpOpen = () => {
    document.body.classList.add("modal--open");
    setIsHelpOpen(true);
  };

  const handleFaqOpen = () => {
    document.body.classList.add("modal--open");

    setIsFaqOpen(true);
  };

  const handleHelpClose = () => {
    document.body.classList.remove("modal--open");

    setIsHelpOpen(false);
  };

  const handleFaqClose = () => {
    document.body.classList.remove("modal--open");

    setIsFaqOpen(false);
  };

  const handleClickFaq = () => {
    handleHelpClose();
    handleFaqOpen();
  };

  const handleClickSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <header className="header" id="header">
      <Container>
        {isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={setIsSidebarOpen}
            onFaq={handleFaqOpen}
            onHelp={handleHelpOpen}
            onSelect={onSelect}
          />
        )}

        <div className="header__wrapper">
          <div className="header__nav">
            <div className="header__left">
              <Logo />

              <SelectLanguage onSelect={onSelect} lang={lang} />
            </div>

            <div className="header__right">
              <Link
                className="icon icon--menu icon--hide"
                onClick={handleClickSidebar}
              />
              <Menu menuData={menuItems} isOffOnTablet={true} />

              <button className="page__button page__button--switch">
                <Link to="order/place-order" className="page__button-link">
                  {translate(lang, ["BUY_NOW"])}
                </Link>
              </button>
            </div>
          </div>

          <div className="header__content">
            <div className="header__content-wrapper">
              <h1 className="page__title header__title">
                {translate(lang, ["HEADER_TITLE"])}

                <div className="page__title--secondary header__title--secondary">
                  VR Locomotion
                </div>
              </h1>

              <div className="header__about">
                <p className="header__about-paragraph">
                  {translate(lang, ["HEADER_ABOUT"])}
                </p>

                <span className="header__about-price">1200$</span>

                <PlayButton onPlay={onPlay} />
              </div>

              <div className="header__content-bottom">
                <div className="header__help">
                  <div
                    className="header__bottom-text"
                    id="faq"
                    onClick={handleFaqOpen}
                  >
                    {translate(lang, ["MENU", "FAQ"])}
                  </div>

                  <div className="header__bottom-text" onClick={handleHelpOpen}>
                    {translate(lang, ["MENU", "HELP"])}
                  </div>
                </div>
                <div className="header__bottom-wrapper header__content-bottom--center">
                  <HashLink
                    to="#more"
                    className="header__bottom-advanced icon--polygon"
                  >
                    {translate(lang, ["MENU", "MORE"])}
                    <svg
                      className="header__bottom-advanced--icon"
                      width="9"
                      height="5"
                      viewBox="0 0 9 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 5L0.602885 0.5L8.39711 0.500001L4.5 5Z"
                        fill="#05C2DF"
                      />
                    </svg>
                  </HashLink>
                </div>
              </div>

              {isFaqOpen && (
                <Modal
                  title="FAQ"
                  onClose={handleFaqClose}
                  isOpen={isFaqOpen}
                  className="modal__content modal__tablet"
                >
                  <Accordion />
                </Modal>
              )}

              {isHelpOpen && (
                <Modal
                  title="Help"
                  onClose={handleHelpClose}
                  isOpen={isHelpOpen}
                  className="modal__content modal__tablet"
                >
                  <Help onFAQ={handleClickFaq} onHelpClose={handleHelpClose} />
                </Modal>
              )}
            </div>

            {isSmallScreen ? (
              <div className="header__image-wrapper"></div>
            ) : (
              <div className="header__some">
                <Swiper
                  items={photos}
                  controlsClassName={"header__image"}
                  swiperClassName={"header__swiper"}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

Header.propTypes = {
  onPlay: PropTypes.func,
  onSelect: PropTypes.func,
  lang: PropTypes.string,
};
