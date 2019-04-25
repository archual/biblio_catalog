import React from "react";

const BookForm = ({ match, history }) => {
  return (
    <div>
      <h1>Book Form {match.params.id} </h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/Books")}
      >
        Save
      </button>
    </div>
  );
};

export default BookForm;
