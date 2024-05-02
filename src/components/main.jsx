import React from "react";

const main = ({ toggleModal }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <form className="container-fluid justify-content-around">
        <button className="btn btn-outline-success me-2" type="button" onClick={toggleModal}>
          Add Card
        </button>
        <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => window.location.reload()}>
          Reset
        </button>
      </form>
    </nav>
  );
};

export default main;
