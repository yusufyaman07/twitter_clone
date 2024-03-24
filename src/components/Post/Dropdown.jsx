import { useRef } from "react";

const Dropdown = ({ handleDelete, setIsEditMode }) => {
  const checkbox = useRef();
  return (
    <>
      <label className="popup">
        <input ref={checkbox} type="checkbox" />
        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Actions</legend>
          <ul>
            <li className="hover:bg-green-500">
              <button
                onClick={() => {
                  checkbox.current.checked = false;
                  // activate edit mode
                  setIsEditMode(true);
                }}
              >
                <img src="edit.svg" />
                <span>Edit</span>
              </button>
            </li>
            <hr />
            <li className="hover:bg-red-500">
              <button onClick={handleDelete}>
                <img src="/delete.svg" />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </>
  );
};

export default Dropdown;
