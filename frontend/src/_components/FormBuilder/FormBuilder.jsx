import React, { useEffect, useState } from "react";
import DropArea from "./DropArea";
import DraggableElement from "./DraggableComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchForm, saveForm, updateForm } from "../../store/formSlice.js";

function YourFormBuilder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const edit = searchParams.get('edit')
  const auth = useSelector((state) => state.auth);
  const [formName, setFormName] = useState("Editable Form Name"); // Default form name
  const [editing,setEditing] = useState()
  const form = useSelector((state) => state.form); // Fetch current components from Redux state

  useEffect(() => {
    setFormName(form.formName)
    if(edit){
      try {
        dispatch(fetchForm(edit))
        setEditing(true) 
      } catch (error) {
        alert(error.message)
      }
      
    }
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate,editing,dispatch ,form.formName]);

  const handleSaveForm = () => {
    // Dispatch saveForm action with form data
    const formData = {
      userId:auth.user.id,
      formName:formName,
      formData: form.components,
    };
    if(!formName){
      alert("Please change the form name on top!")
      return
    }
    if(editing){
      formData.id=edit;
      try {
        dispatch(updateForm(formData));
        alert("Updated Successfully!")
        navigate('/dashboard')
      } catch (error) {
        alert(error.message)
      }
      return
    }
    try {
      dispatch(saveForm(formData));
      alert("Saved Successfully!")
      navigate('/dashboard')
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <>
      {/* Editable Form Name Heading */}
      <div className="mb-6">
        <input
          type="text"
          value={formName || "Editable Heading"}
          onChange={(e) => setFormName(e.target.value)}
          className="text-3xl text-center font-bold w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
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
              {editing? 'Update': 'Save'} Form
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourFormBuilder;
