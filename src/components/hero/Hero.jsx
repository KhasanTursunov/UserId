import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'sonner'

const Hero = () => {

    const firstNameRef = useRef(null)
    const secondNameRef = useRef(null)
    const professionRef =  useRef(null)
    const bioRef = useRef(null)
    const ageRef = useRef(null)
    const genderRef = useRef(null)

    const [data, setData] = useState([])
    const [edit, setEdit] = useState(null)

    console.log(edit)

    const handleCreate = e => {
        e.preventDefault()
        const firstName = firstNameRef.current.value
        const secondName = secondNameRef.current.value
        const profession = professionRef.current.value
        const bio = bioRef.current.value
        const age = ageRef.current.value
        const gender = genderRef.current.value


        if(!firstName || !secondName || !profession || !bio || !age || !gender){
            return toast.warning("write something nigga")
        }

        if(edit){
          // update
          setData(prev => prev.map((item) => item.id === edit.id ? {...edit, firstName, secondName, profession, bio, age, gender} : item))
          setEdit(null)
        }
        else{
const post = {
  id: uuidv4(),
  firstName,
  secondName,
  profession,
  bio,
  age,
  gender
};
setData((prev) => [
  ...prev,
  {
    ...post,
    img:
      gender == "female"
        ? "https://thumbs.dreamstime.com/z/female-avatar-icon-women-clipart-png-vector-girl-avatar-women-clipart-bor-bisiness-icon-png-vector-233362315.jpg"
        : "https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png",
  },
]);
        }

        
        
        firstNameRef.current.value = ""
        secondNameRef.current.value = ""
        professionRef.current.value = ""
        bioRef.current.value = ""
        ageRef.current.value = ""
        genderRef.current.value = ""
        
    }

    const handleDeleate = (id) => {
      if(edit.id === id){
        setEdit(null)
        firstNameRef.current.value = "";
        secondNameRef.current.value = "";
        professionRef.current.value = "";
        bioRef.current.value = "";
        ageRef.current.value = "";
        genderRef.current.value = "";
      }
      console.log(data)
      console.log(id)
      setData(prev => prev.filter((item) => item.id !== id))
      
    }

    const handleEdit = (item) => {
      firstNameRef.current.value = item.firstName
      secondNameRef.current.value = item.secondName
      professionRef.current.value = item.profession
      bioRef.current.value = item.bio
      ageRef.current.value = item.age
      genderRef.current.value = item.gender
      setEdit(item)
    }

    
  return (
    <div>
      <form onSubmit={handleCreate} action="">
        <div className="wrapper flex flex-wrap gap-5 mt-4">
          <input
            ref={firstNameRef}
            className="border"
            type="text"
            placeholder="First Name"
            class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-transform transform hover:scale-105 cursor-pointer"
          />

          <input
            ref={secondNameRef}
            className="border"
            type="text"
            placeholder="Second Name"
            class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-transform transform hover:scale-105 cursor-pointer"
          />

          <input
            ref={professionRef}
            className="border"
            type="text"
            placeholder="profession"
            class="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-transform transform hover:scale-105 cursor-pointer"
          />

          <input
            ref={bioRef}
            className="border"
            type="text"
            placeholder="bio"
            class="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-transform transform hover:scale-105 cursor-pointer"
          />

          <input
            ref={ageRef}
            className="border"
            type="number"
            placeholder="age"
            class="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-transform transform hover:scale-105 cursor-pointer"
          />

          {/* select */}

          <label for="cars">
            <select
              ref={genderRef}
              name="cars"
              id="cars"
              class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-transform transform hover:scale-105 cursor-pointer"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          {/* select */}

          <div className="wrapper_button flex items-right justify-end text-end">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-400 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105">
              {edit ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div className="flex p-10 gap-8 flex-wrap">
        {data?.map((item) => (
          <div
            key={item.id}
            className="w-80 p-3 bg-white rounded-lg shadow-[0_4px_15px_0_rgba(0,0,0,0.15)]"
          >
            <img src={item.img} alt="" width="250px" />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {item.firstName}
            </h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              {item.secondName}
            </h2>
            <h4 className="text-2xl font-medium text-gray-700 mb-1">
              {item.profession}
            </h4>

            <p className="text-base text-gray-600 leading-tight mb-2">
              {item.bio}
            </p>
            <p className="text-base text-gray-600 leading-tight mb-2">
              {item.age} years old
            </p>
            <p className="text-base text-gray-600 leading-tight mb-2">
              {item.gender}
            </p>

            <div className="wrapper_btns flex justify-between">
              <button
                onClick={() => handleDeleate(item.id)}
                className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
}

export default Hero