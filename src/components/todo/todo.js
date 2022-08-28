import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { v4 as uuid } from 'uuid';

import { useSettingsContext } from '../../context/Settings';

import Navigation from "../navigation/navigation";

const ToDo = () => {

  const { currPage, setCurrPage, postsPerPage, complete, setComplete } = useSettingsContext();
  const [defaultValues] = useState({
    difficulty: 3,
  });

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function deleteListItem(id) {
    const items = completedList.filter(item => item.id !== id);
    setCompletedList(items);
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      if (item.complete === true) {
        setCompletedList([...completedList, item])
        console.log('list Of Completed :>> ', completedList);
      }
      return item;
    });

    setList(items);
  }
  function toggleCompleteList(id) {
    const items = completedList.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      if (item.complete === false) {
        item = completedList.filter(item => item.id !== id)
      }
      return item;
    });

    setCompletedList(items);
  }

  const handleShow = () => {
    setComplete(!complete)
  }

  const lastPost = currPage * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  const currPost = list.slice(firstPost, lastPost);

  const navigate = pageNumber => setCurrPage(pageNumber);

  useEffect(() => {

    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;

  }, [list, incomplete]);

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <h2 >Add To Do Item</h2>
        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>
        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignedTo" type="text" placeholder="assignedTo Name" />
        </label>
        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>
        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>
      <button  onClick={handleShow}>{!complete ? 'Show All Completed Items' : 'Hide All Completed Items'}</button>
      {
        !complete ?
          currPost.map(item => {
            return (
              <div>
                {
                  !item.complete ? <div key={item.id} >
                    <div >
                      <button onClick={() => deleteItem(item.id)}>x</button>
                    </div>
                    <p >
                      {item.text}
                      <div >
                        <p ><small>Assigned to: {item.assignedTo}</small></p>
                        <p ><small>Difficulty: {item.difficulty}</small></p>
                      </div>
                    </p>
                    <div >
                      <input type="checkbox" onClick={() => toggleComplete(item.id)} />
                      <label htmlFor="item">Complete</label>
                    </div>
                    <hr />
                  </div>
                    : <p >Task Completed</p>
                }
              </div>
            )
          })
          : <div>
            {
              !completedList.complete ? completedList.map(item => {
                return (
                  <div key={item.id} >
                    <div >
                      <button onClick={() => deleteListItem(item.id)}>x</button>
                    </div>
                    <p >
                      {item.text}
                      <div >
                        <p><small>Assigned to: {item.assignedTo}</small></p>
                        <p ><small>Difficulty: {item.difficulty}</small></p>
                      </div>
                    </p>
                    <div>
                      <label htmlFor="item" onClick={() => toggleCompleteList(item.id)}>Completed</label>
                    </div>
                    <hr />
                  </div>
                )
              })
                : 'No Completed Tasks'
            }
          </div>
      }
      <div>
        <Navigation postsPerPage={postsPerPage}
          postsNum={list.length}
          navigate={navigate} />
      </div>
    </>
  );
};

export default ToDo;