import React from "react";
import { useDrag } from "react-dnd";

function DraggableElement({ type, label, options = [] }) {
  const [, dragRef] = useDrag(() => ({
    type: "FORM_ELEMENT",
    item: { type, label, options },
  }));

  const renderElement = () => {
    switch (type) {
      case "text":
        return <input type="text" disabled placeholder={label} className="w-full p-2 border border-gray-300 rounded-md" />;
      case "textarea":
        return <textarea disabled placeholder={label} className="w-full p-2 border border-gray-300 rounded-md" rows="2" />;
      case "dropdown":
        return (
          <select disabled className="w-full p-2 border border-gray-300 rounded-md">
              <option value="Option 1">
                Option 1
              </option>
          </select>
        );
      case "checkbox":
        return (
          <div className="flex items-center">
            <input disabled type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label className="ml-2">{label}</label>
          </div>
        );
      case "radio":
        return (
              <div className="flex items-center">
                <input disabled type="radio" name={label} value="Option 1" className="h-4 w-4 text-blue-600 border-gray-300" />
                <label className="ml-2">Option 1</label>
              </div>
        );
      case "date":
        return <input disabled type="date" className="w-full p-2 border border-gray-300 rounded-md" />;
      case "file":
        return <input disabled type="file" className="w-full p-2 border border-gray-300 rounded-md" />;
      default:
        return <div>Unsupported element type</div>;
    }
  };

  return (
    <div ref={dragRef} className="p-4 bg-white my-2 shadow-md rounded-md cursor-move">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {renderElement()}
    </div>
  );
}

export default DraggableElement;
