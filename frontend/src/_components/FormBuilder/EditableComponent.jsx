import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

function EditableComponent({ component, updateComponent }) {
  const { id, type, attributes } = component;
  const [isDialogOpen, setIsDialogOpen] =useState(false)
  const [newOption, setNewOption] =useState("")

  const handleChange = (field, value) => {
    updateComponent(id, { ...attributes, [field]: value });
  };
  
  const handleAddOption = () => {
    if (newOption.trim()) {
      const updatedOptions = [...(attributes.options || []), newOption.trim()];
      handleChange("options", updatedOptions);
      setNewOption("");
      setIsDialogOpen(false);
    }
  };

  const renderEditableElement = () => {
    switch (type) {
      case "text":
        return (
          <div className="flex items-center justify-center">
          <input type="text" onChange={(e) => handleChange("label", e.target.value)} className="text-center border-none outline-none" placeholder="Editable Label"/> 
          : 
          <input
            type="text"
            placeholder={attributes.placeholder || "Enter Placeholder here to save..."}
            onChange={(e)=>handleChange("placeholder", e.target.value)}
            className="mx-4 p-2 w-1/4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          </div>
        );
        case "textarea":
          return (
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Editable Textarea label"
                onChange={(e) => handleChange("label", e.target.value)}
                className="p-2 border-none outline-none"
              />
              <textarea
                placeholder="Ente placeholder here to save..."
                onChange={(e) => handleChange("placeholder", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          );
        case "checkbox":
          return (
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder= "Editable Checkbox Label"
                onChange={(e) => handleChange("label", e.target.value)}
                className=" border-none outline-none"
              />
              :
              <input
                type="checkbox"
                checked={attributes.checked || false}
                onChange={(e) => handleChange("checked", e.target.checked)}
                className="w-4 mx-4 h-4"
              />
            </div>
          );
        case "dropdown":
          return (
            <div className="flex items-center justify-center space-x-4">
              <input
                type="text"
                placeholder=" Editable Dropdown Label"
                onChange={(e) => handleChange("label", e.target.value)}
                className="p-2 border-none outline-none"
              />
              :
              <select className="mx-4">
                {attributes.options && attributes.options.length > 0 ? (
                  attributes.options.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))
                ) : (
                  <option>Click on + button to add options</option>
                )}
              </select>
              <button onClick={(e)=>{
                e.preventDefault()
                setIsDialogOpen(true)
                }}><MdAdd className="cursor-pointer"/></button>
                {isDialogOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white p-6 rounded-md shadow-lg">
                  <h2 className="text-lg font-semibold mb-4">Add New Option</h2>
                   <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Enter option"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
                  />
                 <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={handleAddOption}
                      className="p-2 bg-green-400 hover:cursor-pointer text-white rounded-md hover:bg-green-600"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setIsDialogOpen(false)}
                      className="p-2 bg-red-400 hover:cursor-pointer text-white rounded-md hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div> 
                </div>
              </div>
            )}
            </div>
          );
        default:
          return <div>Unsupported component type</div>;
      }
    };
  
    return <div className="editable-component">{renderEditableElement()}</div>;
  }
  
  export default EditableComponent;
  