import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Air() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [size_btu, setSize_btu] = useState(0);
  const [price, setPrice] = useState(0);

  const [air, setAir] = useState([]);
  const [editAir, setEditAir] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/air").then((response) => {
      setAir(response.data);
      setEditAir(response.data);
    });
  });
 
  // เพิ่มข้อมูล
  const addAir = () => {
    window.location.reload();
    axios
      .post("http://localhost:3001/create", {
        name: name,
        type: type,
        brand: brand,
        size_btu: size_btu,
        price: price,
      })
      .then(() => {
        setAir([
          ...air,
          {
            name: name,
            type: type,
            brand: brand,
            size_btu: size_btu,
            price: price,
          },
        ]);
      });
  };

  // ลบ
  const deleteAir = (id) => {
    axios.delete('http://localhost:3001/delete/'+id)
    .then(res => {
      
    }).catch(err => console.log(err))
  };
  return (
    <>
      <div className=" px-60 mt-10 ">
        <div className=" bg-white p-5 px-20 rounded-lg">
          <h1 className="text-4xl text-center">air conditioner</h1>
          <div className="grid grid-cols-2 gap-10 ">
            <div className="mt-10 ">
              <label htmlFor="small-input" className="block mb-2   text-2xl">
                Name
              </label>
              <input
                type="text"
                onChange={(e)=>{setName(e.target.value)}}
                id="small-input"
                class="block rounded-lg bg-slate-200 w-full p-1 text-gray-900 border "
              />
            </div>
            <div className="mt-10">
              <label htmlFor="small-input" className="block mb-2 text-2xl">
                Type
              </label>
              <input
                type="text"
                onChange={(e)=>{setType(e.target.value)}}
                id="small-input"
                class="block rounded-lg bg-slate-200 w-full p-1 text-gray-900 border "
              />
            </div>
            <div className=" ">
              <label htmlFor="small-input" className="block mb-2  text-2xl">
                Brand
              </label>
              <input
                type="text"
                onChange={(e)=>{setBrand(e.target.value)}}
                id="small-input"
                class="block rounded-lg bg-slate-200 w-full p-1 text-gray-900 border "
              />
            </div>
            <div class="">
              <label htmlFor="small-input" className="block mb-2  text-2xl">
                Size_btu
              </label>
              <input
                type="number"
                onChange={(e)=>{setSize_btu(e.target.value)}}
                id="small-input"
                class="block rounded-lg bg-slate-200 w-full p-1 text-gray-900 border "
              />
            </div>
            <div className="">
              <label htmlFor="small-input" className="block mb-2  text-2xl">
                price
              </label>
              <input
                type="number"
                onChange={(e)=>{setPrice(e.target.value)}}
                id="small-input"
                class="block rounded-lg bg-slate-200 w-full p-1 text-gray-900 border "
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addAir}
            class="mt-10 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            เพิ่มข้อมูล
          </button>

          {/* ตาราง */}
          <h1 className="mt-10 text-2xl">ข้อมูล</h1>
          
          <div className="grid grid-cols-3 gap-3">
          {air.map((val,key)=>{
          return(
            <div className="result">
            <p>ไอดี : {val.id}</p>
            <p>ชื่อ : {val.name}</p>
            <p>ชนิด : {val.type}</p>
            <p>แบรนด์ : {val.brand}</p>
            <p>ขนาด BTU : {val.size_btu}</p>
            <p>ราคา : {val.price}</p>
            <td class="px-6 text-center  py-4">
                          <Link to={`/update/${val.id}`}>
                            <button  className="bg-blue-500 p-1 rounded-md text-white">
                              update
                            </button>
                          </Link>
                        </td>
                        <td class="px-6 py-4 text-center ">
                          <button onClick={() => deleteAir(val.id)} className="bg-red-500 p-1 text-white rounded-md">
                            delete
                          </button>
                        </td>
            </div>
          );
        })}
        </div>
        </div>
      </div>
    </>
  );
}

export default Air;
