import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const edit = ({ closeModal, addEditCard, selectedCard }) => {
  const [formData, setFormData] = useState({
    title: selectedCard ? selectedCard.title : "",
    description: selectedCard ? selectedCard.description : "",
    column: selectedCard ? selectedCard.column : "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEditCard(formData);
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <Modal isOpen onRequestClose={closeModal} >
      <h2 className="text-center">{selectedCard ? "Edit Card" : "Add Card"}</h2>
      <form onSubmit={handleSubmit} className="form w-100 d-flex flex-column align-items-center">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          className="form-control mb-3 w-50"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="form-control mb-3 w-50"
          minLength={25}
          required
        />
        <label>Select Column:</label>
        <select
          name="column"
          value={formData.column}
          onChange={handleChange}
          className="form-control mb-3 w-50"
        >
          <option value="1">Column 1</option>
          <option value="2">Column 2</option>
          <option value="3">Column 3</option>
        </select>
        <button type="submit" className="btn btn-primary w-25">{selectedCard ? "Update" : "Add"}</button>
        <br />
        <button type="button" className="btn btn-danger w-25" onClick={closeModal}>Cancel</button>
      </form>
    </Modal>
  );
};

export default edit;
