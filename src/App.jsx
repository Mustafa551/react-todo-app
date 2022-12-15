import React, { useEffect, useState } from 'react'
import './App.css';
import { collection, addDoc, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { async } from '@firebase/util';
import Swal from 'sweetalert2'
import { db } from './firebase.utils'
function App() {
  const [Input, setInput] = useState('');
  const [Todos, setTodos] = useState([])


  useEffect(() => {
    
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
     onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var data = doc.data().todo;
        setTodos(arr => [...arr , data]);
        // setTodos([doc.data().todo])
      });
    });
  }, [])

  console.log(Todos)



  const addingtodofirebase = async (e) => {
    e.preventDefault()
    if (Input.trim() === "") {
      Swal.fire({
        title: 'Error!',
        text: 'please enter value',
        icon: 'error',
        confirmButtonText: 'ok'
      })
    } else {

      const docRef = await addDoc(collection(db, "todos"), {
        todo: Input,
        timestamp: new Date()
      });
      setInput("")
    }
  }



  const addingtodo = (e) => {
    let inputvalue = e.target.value
    setInput(inputvalue)

  }
  return (

    <div className="main">
      <div className="header">
        <h1>ToDoApp</h1>
      </div>

      <div className="container bg-white ">
        <div className="row mt-5 pt-3">
          <form action="">
            <div className="col-md-12 text-center">
              <input type="text" placeholder="Enter your value" className="w-75" value={Input} onChange={addingtodo} id="input" />
            </div>
            <div className="d-flex w-75 gap-2 ms-auto me-auto pt-2  justify-content-center">
              <button className="w-100 btn btn-primary" onClick={addingtodofirebase} type='submit' >Add</button>
              <button className="w-100 btn btn-danger" >Delete All</button>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col-md-12 " >
            <ul id="list" className="h-auto">
              {Todos.map((item) => {
                return (
                  <li className='d-flex  h-auto  justify-content-between p-2'>
                    {item}
                    <div className='hh'>
                      <button className="btn btn-primary  ">edit</button>
                      <button className="btn btn-primary ">delete</button>
                    </div>
                  </li>
                )
              })}


            </ul>

          </div>

        </div>
      </div>

    </div>


    // <div className="App">
    //   <div className="card">
    //     <h1>TODO LIST</h1>
    //     <form className="input-group mb-3">
    //       <input type="text" value={Input} className='form-control' onChange={addingtodo} placeholder='Enter your text' />
    //       <button onClick={addingtodofirebase} type='submit' className='btn btn-primary' >Add Todo</button>
    //     </form>
    //      <div className="error">Enter your text</div> 
    //   </div>

    //   <div className="card">
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th scope='col'>ID</th>
    //           <th scope='col'>TODO</th>
    //           <th scope='col'></th>
    //           <th scope='col'></th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>

    //           <th>1</th>
    //           <th>hello</th>
    //           <th>
    //             <button type='button' className='btn btn-success'>Update</button>
    //           </th>
    //           <th>
    //             <button className='btn btn-danger'>Delete</button>
    //           </th>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}

export default App;
