import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LangContext } from "@context/LangContext";
import { DropDown } from "@components/DropDown";
import { FormInput } from "../Form";

import { getCities, getCountries } from "@api/CountriesAndCities";
import { checkValidity } from "@helpers/checkValidity";
import { translate } from "@helpers/translation";
import { placeOrderInputs } from "@data/placeOrderInputs";

export const PlaceOrder = () => {
  const [countries, setCountries] = useState(null);
  const [cities, setCities] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isError, setIsError] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);
  const [formFields, setFormFields] = useState(placeOrderInputs);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: selectedCountry,
    city: selectedCity,
    shipAddressFirst: "",
    shipAddressSecond: "",
  });
  const lang = useContext(LangContext);
  const navigate = useNavigate();

  const updateInputs = () => {
    setFormFields((current) => {
      return current.map((input) => {
        if (input.name === "city") {
          return {
            ...input,
            isEmpty: false,
            children: (
              <DropDown
                dropdownList={cities}
                selectedValue={selectedCity}
                onSelect={setSelectedCity}
                itemClassName="dropdown__form__item"
                valueClassName="dropdown__form__value"
              />
            ),
          };
        }

        if (input.name === "country") {
          return {
            ...input,
            isEmpty: false,
            children: (
              <DropDown
                dropdownList={countries}
                selectedValue={selectedCountry}
                onSelect={setSelectedCountry}
              />
            ),
          };
        }

        return input;
      });
    });
  };

  useEffect(() => {
    setInfo((current) => ({
      ...current,
      city: selectedCity,
      country: selectedCountry,
    }));

    updateInputs();
    setIsError(false);
  }, [selectedCity, selectedCountry]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getCountries();

        const countries = data.map((item) => item.country);
        const country = countries.find((country) =>
          country.toLowerCase().includes("ukr")
        );

        const uniqueCountries = Array.from(new Set(countries));

        setCountries(uniqueCountries);
        setSelectedCountry(country);
      } catch (error) {
        setIsRequestError(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    updateInputs();
  }, [countries, cities]);

  useEffect(() => {
    if (!selectedCountry) {
      return;
    }

    const fetchData = async () => {
      setIsRequestError(false);

      try {
        const { data } = await getCities(selectedCountry);

        setCities(data);
        setSelectedCity("");

        setInfo((current) => ({
          ...current,
          country: selectedCountry,
        }));
      } catch (error) {
        setIsRequestError(true);
      }
    };

    fetchData();
  }, [selectedCountry]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfo((current) => ({
      ...current,
      [name]: value,
    }));

    setFormFields((current) => {
      return current.map((input) => {
        if (input.name === name) {
          return { ...input, isEmpty: false };
        }

        return input;
      });
    });

    setIsError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkValidity(formFields, setIsError, info)) {
      navigate("../pay");
    } else {
      Object.entries(info).forEach(([prop, value]) => {
        setFormFields((current) =>
          current.map((input) => {
            if (input.name === prop && !value) {
              return { ...input, isEmpty: true };
            }

            return input;
          })
        );
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__wrapper">
        {formFields.map(
          ({
            id,
            name,
            type,
            children,
            pattern,
            isEmpty,
            keysForTranslate,
            keysForTranslateError,
            keysForTranslatePlaceholder,
          }) => (
            <FormInput
              name={name}
              key={id}
              keysForTranslate={keysForTranslate}
              keysForTranslateError={keysForTranslateError}
              keysForTranslatePlaceholder={keysForTranslatePlaceholder}
              type={type}
              onChange={handleChange}
              pattern={pattern}
              isInputEmpty={isEmpty}
              value={info[name]}
              lang={lang}
            >
              {children}
            </FormInput>
          )
        )}
      </div>

      <div className="form__controls">
        <button className="page__button order__button">
          {translate(lang, ["PURCHASE"])}
        </button>

        {isError && (
          <span className="form__error">
            {translate(lang, ["ERROR", "FILL"])}
          </span>
        )}

        {isRequestError && (
          <div className="form__error">
            {translate(lang, ["ERROR", "REQUEST_FIRST"])}
            <div>{translate(lang, ["ERROR", "REQUEST_SECOND"])}</div>
          </div>
        )}
      </div>
    </form>
  );
};
