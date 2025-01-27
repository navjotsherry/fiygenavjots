import React, { useEffect } from "react";
import FormCard from "./FormCard";
import {useDispatch,useSelector} from 'react-redux'
import {fetchForms} from "../../store/formSlice"

const Dashboard = () => {
  
  const dispatch = useDispatch()
  const forms = useSelector((state)=>state.form.forms)

  useEffect(()=>{
    try {
      dispatch(fetchForms())
    } catch (error) {
      alert(error)
      
    }
  },[])
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Dashboard Header */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Fiyge Form Dashboard</h1>
        <p className="text-gray-600">Welcome back! Manage your forms here.</p>
      </div>

      {/* Actions */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition">
          Create New Form
        </button>
        <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      {/* Forms List */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Forms</h2>
        <ul className="space-y-4">
          {forms && forms.length > 1 ? forms.map((form)=>{
            return <FormCard key={form.id} name={form.formName} createdAt={form.createdAt}/>
          }) : <h1>No Forms Yet! Please Crete new Form.</h1>}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
