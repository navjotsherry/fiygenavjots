import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { deleteForm,removeForm } from '../../store/formSlice'

const FormCard = ({formId,name,createdAt}) => {
  const dispatch = useDispatch()
  const handleDelete = (e)=>{
    e.preventDefault()
    try {
      dispatch(deleteForm(formId))
      dispatch(removeForm({id:formId}))
      alert("Deleted Successfully!!")
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <>
    <li className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
              <p className="text-sm text-gray-500">Created On: {createdAt}</p>
            </div>
            <div className="flex space-x-2">
              <Link to={`/form-builder?edit=${formId}`}>
                <button className="px-3 py-1 bg-green-500 cursor-pointer  text-white text-sm rounded-md shadow hover:bg-green-600 transition">
                  Edit
                </button>
              </Link>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 cursor-pointer text-white text-sm rounded-md shadow hover:bg-red-600 transition">
                  Delete
                </button>
            </div>
          </li>
    </>
  )
}

export default FormCard