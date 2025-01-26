import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaTrash } from "react-icons/fa";
import EditableComponent from "./EditableComponent";

function DraggableEditableComponent({
  component,
  index,
  moveComponent,
  updateComponent,
  removeComponent,
}) {
  const { id } = component;

  const [, dragRef] = useDrag(() => ({
    type: "FORM_COMPONENT",
    item: { index },
  }));

  const [, dropRef] = useDrop(() => ({
    accept: "FORM_COMPONENT",
    hover: (item) => {
      if (item.index !== index) {
        moveComponent(item.index, index);
        item.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className="relative p-2 bg-white rounded shadow cursor-move"
    >
      {/* Delete Button */}
      <div onClick={() => removeComponent(id)} className="flex items-end text-xs text-red-400 justify-end hover:cursor-pointer">
        <FaTrash />
      </div>
      
      <EditableComponent component={component} updateComponent={updateComponent} />
    </div>
  );
}

export default DraggableEditableComponent;
