import React from "react";
import PropTypes from "prop-types";

import { DropDown } from "@components/DropDown";

import "./SelectLanguage.scss";
import { languages } from "@data/languages";

export const SelectLanguage = ({ onSelect, lang }) => {
  return (
    <DropDown
      dropdownList={languages}
      onSelect={onSelect}
      selectedValue={lang}
      parentClassName="select-language"
      valueClassName="select-language__value"
      listClassName="select-language__list"
      itemClassName="select-language__list--opened"
      valueClassNameOpened="select-language__value--opened"
    />
  );
};

SelectLanguage.propTypes = {
  onSelect: PropTypes.func,
  lang: PropTypes.string,
};
