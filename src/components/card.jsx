import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Card = ({ cardData, setCardData, deleteCard, setSelectedCard, toggleModal }) => {
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedColumns = { ...cardData.columns };
    const sourceColumn = updatedColumns[source.droppableId];
    const destColumn = updatedColumns[destination.droppableId];
    const [removedCard] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removedCard);

    setCardData({ ...cardData, columns: updatedColumns });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="containers w-100 bg-light d-flex justify-content-between">
        {Object.keys(cardData.columns).map((columnId) => (
          <div key={columnId} className="column w-100">
            <h2>Column {columnId}</h2>
            <Droppable droppableId={columnId} key={columnId}>
              {(provided = {}, snapshot = {}) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="card-list">
                  {cardData.columns[columnId].map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card col-4 w-100 m-auto"
                          onClick={() => {
                            setSelectedCard({ ...card, column: columnId });
                            toggleModal();
                          }}
                        >
                          <div className="card-body">
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">{card.description}</p>
                            <button
                              className="btn btn-danger"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevents card click event from bubbling to card click
                                deleteCard(columnId, card.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Card;
