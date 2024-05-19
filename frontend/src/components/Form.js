import React, { useEffect, useState } from "react";
import "../styles/Form.css";

const Form = ({ addItem, updateItem, editing, currentItem }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (editing) {
      setName(currentItem.name);
      setEmail(currentItem.email);
      setMobileNumber(currentItem.mobile_number);
      setDateOfBirth(formatDate(currentItem.date_of_birth));
    } else {
      setName("");
      setEmail("");
      setMobileNumber("");
      setDateOfBirth("");
    }
  }, [editing, currentItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name,
      email,
      mobile_number: mobileNumber,
      date_of_birth: formatDate(dateOfBirth),
    };
    if (editing) {
      updateItem(currentItem.id, newItem);
    } else {
      addItem(newItem);
      // Clear text fields after adding item
      setName("");
      setEmail("");
      setMobileNumber("");
      setDateOfBirth("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editing ? "Update Information" : "Add Information"}</h2>
      <input
        className="text-field"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="text-field"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="text-field"
        type="text"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        required
      />
      <input
        className="text-field"
        type="date"
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />
      <button className="btn" type="submit">
        {editing ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default Form;
