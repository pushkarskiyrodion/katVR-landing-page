import React from "react";
import { Link } from "react-router-dom";

import "./Logo.scss";

export const Logo = () => (
  <Link to="/" className="logo">
    <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="logo" />
  </Link>
);
