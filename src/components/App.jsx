import React from "react";

import { nanoid } from "nanoid";
import InputPhoneBook from "./inputPhoneBook/inputPhoneBook";
import ContactsList from "./contactsList/contactsList";
import FindContact from "./findContact/findContact";
import { Formik } from "formik";
import css from "./app.module.css";

export class App extends React.Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  //add loccalStorage
  componentDidMount() {
    const contacts = localStorage.getItem("phoneBook");

    if (JSON.parse(contacts)) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }
  // download from locale storage
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("phoneBook", JSON.stringify(this.state.contacts));
    }
  }

  // add name in phonebook
  addContact = (contact) => {
    const sameNsame = this.state.contacts.some(
      ({ name }) =>
        name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
    );

    if (sameNsame) {
      alert(`${contact.name} is already in contacts!`);
      return;
    }

    const newUser = {
      ...contact,
      id: nanoid(),
    };
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newUser],
    }));
  };

  //delete contact
  handleDeleteContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  // filter of contacts
  handleFilter = (filterData) => {
    this.setState({ filter: filterData });
  };

  getFilterContacts = () => {
    const { contacts } = this.state;
    return contacts.filter((contacts) =>
      contacts.name
        .toLowerCase()
        .includes(this.state.filter.toLocaleLowerCase())
    );
  };

  //listener of input
  filterValue = (e) => {
    const value = e.currentTarget.value.toUpperCase();
    this.handleFilter(value);
  };

  render() {
    const { contacts } = this.state;
    const filtered = this.getFilterContacts(contacts);
    return (
      <Formik>
        <div className={css.appContainer}>
          <h1>Phonebook</h1>
          <InputPhoneBook submitChange={this.addContact} />
          <h1>Contacts</h1>
          <FindContact findContact={this.filterValue} />
          <ContactsList
            contacts={filtered}
            deleteContact={this.handleDeleteContact}
          />
        </div>
      </Formik>
    );
  }
}
