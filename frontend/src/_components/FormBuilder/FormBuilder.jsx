import React,{useEffect} from "react";
import DropArea from "./DropArea";
import DraggableElement from "./DraggableComponent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function YourFormBuilder() {
  const navigate = useNavigate()
  const auth  = useSelector((state)=>state.auth)
  useEffect(()=>{
    if(!auth.user){
      navigate('/login')
    }
  },[])
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 rounded shadow">
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
      </div>
    </div>
  );
}

export default YourFormBuilder;
