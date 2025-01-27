import React from 'react'

const FormCard = ({name,createdAt}) => {
  return (
    <>
    <li className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
              <p className="text-sm text-gray-500">Created On: {createdAt}</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-500 cursor-pointer  text-white text-sm rounded-md shadow hover:bg-green-600 transition">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-500 cursor-pointer text-white text-sm rounded-md shadow hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </li>
    </>
  )
}

export default FormCard