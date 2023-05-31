import React, { useContext, useState } from "react";

import Container from "../Container/Container";
import classNames from "classnames";
import CloseIcon from "../Icons/CloseIcon";

import { LangContext } from "../../context/LangContext";
import { translate } from "../../helpers/translation";
import { touchIcons } from "../../data/data";

const Techspecs = () => {
  const [opened, setOpened] = useState(0);
  const lang = useContext(LangContext);

  const handleClose = () => {
    setOpened(0);
  };

  return (
    <section className="techspecs page__section" id="tech">
      <Container>
        <h2 className="page__title techspecs__title">
          {translate("tech__title", lang)}
          <span className="page__title--secondary">
            &nbsp;{translate("tech__title--secondary", lang)}
          </span>
        </h2>

        <div className="techspecs__content">
          {touchIcons.map(({ id, nameOfClass }) => (
            <i
              className={`techspecs__touch ${nameOfClass}`}
              key={id}
              onClick={() => setOpened(id)}
            />
          ))}

          <div
            className={classNames(
              "techspecs__description techspecs__description--sensor",
              { open: opened === 1 }
            )}
            id="sensor"
          >
            <i className="techspecs__icon-close">
              <CloseIcon onClose={handleClose} />
            </i>

            <h3 className="techspecs__description-title">
              {translate("tech__sensor", lang)}
            </h3>

            <p
              className="page__text"
              dangerouslySetInnerHTML={{
                __html: translate("tech__sensor-text", lang),
              }}
            />
          </div>

          <div
            className={classNames(
              "techspecs__description techspecs__description--connection",
              { open: opened === 2 }
            )}
            id="connection"
          >
            <i className="techspecs__icon-close">
              <CloseIcon onClose={handleClose} />
            </i>

            <h3 className="techspecs__description-title">
              {translate("tech__connection", lang)}
            </h3>

            <p
              className="page__text"
              dangerouslySetInnerHTML={{
                __html: translate("tech__connection-text", lang),
              }}
            />
          </div>

          <div
            className={classNames(
              "techspecs__description techspecs__description--batterries",
              { open: opened === 3 }
            )}
            id="batterries"
          >
            <i className="techspecs__icon-close">
              <CloseIcon onClose={handleClose} />
            </i>

            <h3 className="techspecs__description-title">
              {translate("tech__battery", lang)}
            </h3>

            <p
              className="page__text"
              dangerouslySetInnerHTML={{
                __html: translate("tech__battery-text", lang),
              }}
            />
          </div>

          <div className="techspecs__vectors">
            <div className="techspecs__vector techspecs__vector--1"></div>
            <div className="techspecs__vector techspecs__vector--2"></div>
            <div className="techspecs__vector techspecs__vector--3"></div>
            <div className="techspecs__vector techspecs__vector--4"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Techspecs;