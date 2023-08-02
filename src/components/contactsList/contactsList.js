import React from "react";
import propTypes from "prop-types";
import css from "./contactList.module.css";

const ContactsList = ({ contacts, deleteContact }) => (
  <ul className={css.contactList}>
    {contacts.map(({ name, number, id }) => (
      <li key={id} id={id}>
        {name}: {number}
        <button
          className={css.contactButton}
          type="submit"
          onClick={() => deleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactsList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
      id: propTypes.string.isRequired,
    })
  ),
  deleteContact: propTypes.func.isRequired,
};

export default ContactsList;
