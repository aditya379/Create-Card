import React, { useState } from "react";
import Main from "./components/main";
import CardContainer from "./components/card";
import AddEditCardModal from "./components/edit";
import { v4 as uuidv4 } from "uuid"; 
import "./App.css";

const App = () => {
  const [cardData, setCardData] = useState({
    columns: {
      "1": [{ id: uuidv4(), title: "Card 1", description: "Description 1" }],
      "2": [{ id: uuidv4(), title: "Card 2", description: "Description 2" }],
      "3": [{ id: uuidv4(), title: "Card 3", description: "Description 3" }],
    },
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const toggleModal = () => setShowModal(!showModal);

  const addEditCard = (formData) => {
    if (selectedCard) {
      // Edit existing card
      const updatedColumns = { ...cardData.columns };
      const { column, id } = selectedCard;
      const columnIndex = updatedColumns[column].findIndex((card) => card.id === id);
      if (columnIndex !== -1) {
        updatedColumns[column][columnIndex] = { ...formData, id };
        setCardData({ columns: updatedColumns });
      }
    } else {
      // Add new card
      const { title, description, column } = formData;
      const newCard = { id: uuidv4(), title, description };
      const updatedColumns = { ...cardData.columns };
      updatedColumns[column].push(newCard);
      setCardData({ columns: updatedColumns });
    }
    setSelectedCard(null);
    toggleModal();
  };

  const deleteCard = (column, id) => {
    const updatedColumns = { ...cardData.columns };
    const columnIndex = updatedColumns[column].findIndex((card) => card.id === id);
    if (columnIndex !== -1) {
      updatedColumns[column].splice(columnIndex, 1);
      setCardData({ columns: updatedColumns });
    }
  };

  return (
    <div className="App">
      <Main toggleModal={toggleModal} />
      <CardContainer
        cardData={cardData}
        deleteCard={deleteCard}
        setSelectedCard={setSelectedCard}
        toggleModal={toggleModal}
      />
      {showModal && <AddEditCardModal closeModal={toggleModal} addEditCard={addEditCard} selectedCard={selectedCard} />}
    </div>
  );
};

export default App;