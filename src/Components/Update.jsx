import React from 'react'

const Update = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-700">
      <h1 className="text-3xl text-center text-yellow-600">Add User</h1>
      <div className="flex flex-col w-1/2 p-8 mt-5 rounded-lg bg-slate-500">
        <form>
          <input
            type="text"
            placeholder="name"
            autoComplete="off"
            className="w-full p-3 mb-5 text-yellow-600 placeholder-yellow-600 bg-transparent border-2 border-yellow-600 rounded-md outline-none"
            name="name"
            value={input.name}
            onChange={input_value}
          />
          <input
            type="text"
            placeholder="Location "
            autoComplete=""
            className="w-full p-3 mb-5 text-yellow-600 placeholder-yellow-600 bg-transparent border-2 border-yellow-600 rounded-md outline-none"
            name="address"
            value={input.address}
            onChange={input_value}
          />

          <input
            placeholder="Enter Mobile Number"
            autoComplete="new-password"
            className="w-full p-3 mb-5 text-yellow-600 placeholder-yellow-600 bg-transparent border-2 border-yellow-600 rounded-md outline-none"
            type="text"
            name="mobile"
            value={input.mobile}
            onChange={input_value}
          />
          <button
            onClick={handle_submit}
            className="w-1/2 px-8 py-2 text-white bg-yellow-600 border border-yellow-600 rounded hover:text-white hover:border-transparent"
          >
            Add New
          </button>
        </form>
      </div>
    </div>
      
    
  )
}

export default Update
