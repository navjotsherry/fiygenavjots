import React from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { addComponent, moveComponent, updateComponent,removeComponent } from "../../store/formSlice";
import DraggableEditableComponent from "./DraggableEditableComponent";

function DropArea() {
  const dispatch = useDispatch();
  const components = useSelector((state) => state.form.components);

  // Handle drop
  const [, dropRef] = useDrop(() => ({
    accept: "FORM_ELEMENT",
    drop: (item) => {
      const newItem = {
        id: `${item.type}-${components.length + 1}`,
        ...item,
        attributes: { ...item.attributes, label: item.label || "Label" },
      };
      dispatch(addComponent(newItem));
    },
  }));

  return (
    <div
      ref={dropRef}
      className="min-h-[80vh] p-4 border-2 rounded bg-gray-50 border-gray-300"
    >
      {components && components.length === 0 ? (
        <p className="text-sm text-gray-500">Drag elements here to build your form</p>
      ) : (
        <form className="space-y-4">
          {components && components.map((component, index) => (
            <DraggableEditableComponent
              key={component.id}
              index={index}
              component={component}
              moveComponent={(dragIndex, hoverIndex) =>
                dispatch(moveComponent({ dragIndex, hoverIndex }))
              }
              updateComponent={(id, updatedAttributes) =>
                dispatch(updateComponent({ id, updatedAttributes }))
              }
              removeComponent={(id) =>
                dispatch(removeComponent({ id }))
              }
            />
          ))}
        </form>
      )}
    </div>
  );
}

export default DropArea;
