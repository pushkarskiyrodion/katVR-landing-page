export const placeOrderInputs = [
  {
    id: 1,
    name: "firstName",
    isEmpty: false,
    type: "text",
    keysForTranslate: ["FIRST_NAME"],
    keysForTranslateError: ["ERROR", "NAME"],
    pattern: "^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]{3,16}$",
  },
  {
    id: 2,
    name: "lastName",
    isEmpty: false,
    type: "text",
    keysForTranslate: ["LAST_NAME"],
    keysForTranslateError: ["ERROR", "NAME"],
    pattern: "^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]{3,16}$",
  },
  {
    id: 3,
    name: "email",
    isEmpty: false,
    type: "email",
    keysForTranslate: ["EMAIL"],
    keysForTranslateError: ["ERROR", "EMAIL"],
    pattern: "^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9.]+$",
  },
  {
    id: 4,
    name: "phone",
    isEmpty: false,
    type: "number",
    keysForTranslate: ["PHONE"],
    keysForTranslateError: ["ERROR", "PHONE"],
    pattern: "^.{19}$",
  },
  {
    id: 5,
    name: "country",
    isEmpty: false,
    keysForTranslate: ["COUNTRY"],
    keysForTranslatePlaceholder: ["PLACEHOLDER_COUNTRY"],
    children: null,
  },
  {
    id: 6,
    name: "city",
    isEmpty: false,
    keysForTranslate: ["CITY"],
    keysForTranslatePlaceholder: ["PLACEHOLDER_CITY"],
    children: null,
  },
  {
    id: 7,
    isEmpty: false,
    name: "shipAddressFirst",
    type: "text",
    keysForTranslate: ["SHIPADDRESS_FIRST"],
  },
  {
    id: 8,
    name: "shipAddressSecond",
    isEmpty: false,
    type: "text",
    keysForTranslate: ["SHIPADDRESS_SECOND"],
  },
];
