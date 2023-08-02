import React from "react";
import propTypes from "prop-types";
import { Field } from "formik";

const FindContact = ({ findContact }) => {
  return (
    <div>
      <h4>Find contacts by name</h4>
      <Field name="name" onChange={findContact}></Field>
    </div>
  );
};

FindContact.propTypes = {
  findContact: propTypes.func.isRequired,
};
export default FindContact;
