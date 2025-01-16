import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'sonner'

const Hero = () => {
    const titleRef = useRef(null)
    const descRef = useRef(null)
    const fname =  useRef(null)
    const lname = useRef(null)
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(null)

    console.log(edit)

    const handleCreate = e => {
        e.preventDefault()
        const title = titleRef.current.value
        const desc = descRef.current.value

        if(!title || !desc){
            return toast.warning("biror nima yozing")
        }

        if(edit){
          // update
          setData(prev => prev.map((item) => item.id === edit.id ? {...edit, title, desc} : item))
          setEdit(null)
        }
        else{
const post = {
  id: uuidv4(),
  title,
  desc,
};
setData((prev) => [...prev, post]);
        }

        
        
        titleRef.current.value = ""
        descRef.current.value = ""
        
    }

    const handleDeleate = (id) => {
      if(edit.id === id){
        setEdit(null)
        titleRef.current.value = "";
        descRef.current.value = "";
      }
      setData(prev => prev.filter((item) => item.id !== id))
      
    }

    const handleEdit = (item) => {
      titleRef.current.value = item.title
      descRef.current.value = item.desc
      setEdit(item)
    }

    
  return (
    <div>
      <form onSubmit={handleCreate} action="">
        <input ref={titleRef} className="border" type="text" placeholder='title'/>
        <input ref={descRef} className="border" type="text" placeholder='description' />
        <button>{edit ? "Save" : "Create"}</button>
      </form>
      <div className="flex p-5 gap-3 flex-wrap">
        {data?.map((item) => (
          <div key={item.id} className="w-80 p-3 shadow-md">
            <h3 className="text-2xl font-medium">{item.title}</h3>
            <p>{item.desc}</p>
            <button onClick={() => handleDeleate(item.id)}  className="bg-red-300">
              Delete
            </button>
            <button onClick={() => handleEdit(item)}  className='bg-green-500'>Edit</button>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
}

export default Hero