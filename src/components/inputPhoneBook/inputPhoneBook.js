import React from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import css from "./inputPhoneBook.module.css";

class InputPhoneBook extends React.Component {
  state = {
    name: "",
    number: "",
  };

  // add to input name value
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  // listener submit
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitChange({ ...this.state });

    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const change = this.handleChange;
    const { name, number } = this.state;
    return (
      <div>
        <form
          type="submit"
          onSubmit={this.handleSubmit}
          className={css.formContainer}
        >
          <label className={css.labelStyle}>
            Name
            <Field
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={change}
              value={name}
            />
          </label>
          <label className={css.labelStyle}>
            Number
            <Field
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={change}
              value={number}
            />
          </label>

          <button type="submit" className={css.buttonAddStyle}>
            Add contact
          </button>
          <ErrorMessage name="name" component="div" />
        </form>
      </div>
    );
  }
}

InputPhoneBook.propTypes = {
  submitChange: PropTypes.func.isRequired,
};
export default InputPhoneBook;
