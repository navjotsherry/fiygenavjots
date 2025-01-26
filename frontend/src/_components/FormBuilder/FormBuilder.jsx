import React, { useEffect, useState } from "react";
import DropArea from "./DropArea";
import DraggableElement from "./DraggableComponent";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveForm } from "../../store/formSlice.js";

function YourFormBuilder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [formName, setFormName] = useState("Editable Form Name"); // Default form name
  const formComponents = useSelector((state) => state.form.components); // Fetch current components from Redux state

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate]);

  const handleSaveForm = () => {
    // Dispatch saveForm action with form data
    const formData = {
      formName,
      components: formComponents,
    };
    dispatch(saveForm(formData));
  };

  return (
    <>
      {/* Editable Form Name Heading */}
      <div className="mb-6">
        <input
          type="text"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="text-3xl font-bold w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter Form Name"
        />
      </div>

      <div className="flex gap-4 p-4">
        {/* Sidebar */}
        <div className="w-1/4 sticky top-0 bg-gray-100 p-3 rounded shadow h-screen overflow-auto">
          <h3 className="text-lg font-semibold mb-4">Form Elements</h3>
          <DraggableElement type="text" label="Text Input" />
          <DraggableElement type="textarea" label="Text Area" />
          <DraggableElement
            type="dropdown"
            label="Dropdown"
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
            ]}
          />
          <DraggableElement type="checkbox" label="Checkbox" />
          <DraggableElement
            type="radio"
            label="Radio Group"
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />
          <DraggableElement type="date" label="Date Picker" />
          <DraggableElement type="file" label="File Upload" />
        </div>

        {/* Drop Area */}
        <div className="flex-1 bg-white border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Form Canvas</h3>
          <DropArea />
          {/* Save Button */}
          <div className="mt-4 text-right">
            <button
              onClick={handleSaveForm}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 focus:outline-none"
            >
              Save Form
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourFormBuilder;
