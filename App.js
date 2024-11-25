import { useState } from 'react';
import './App.css';

function App() {
  const heading = ["Backlog","Inprogress","Done"]
  const [tasklist,settasklist] = useState([
    {
      id:Math.random(),
      title:"login page design",
      status:"Backlog"
    },
    {
      id:Math.random(),
      title:"API Integration",
      status:"Inprogress"
    },
    {
      id:Math.random(),
      title:"Testing page",
      status:"Done"
    },
    
    
  ])
 const [isAddtask,setIsAddtask] = useState(false)
 const [taskerr,setTaskerr]=useState(false);
 const [addtasklist,setaddtasklist]=useState("");
 const [taskId,settaskId]=useState("");

const Addtasktext= (event) =>{  
  setaddtasklist(event.target.value);
    
}
const addtask = () =>{
  setIsAddtask(true)
}
const taskclose = () =>{
  setIsAddtask(false)
}

const deleteTask = (id) =>{
  const newtasklist = tasklist.filter((task) =>(
     task.id != id
  ))
  settasklist(newtasklist)
  setaddtasklist("")

}

const editTask = (id) =>{
  const editTaskinfo = tasklist.filter((task) =>(
    task.id == id  
 ))
 setaddtasklist(editTaskinfo[0].title)
 console.log('-------editTaskinfo-----------',editTaskinfo[0].title);
 setaddtasklist(editTaskinfo[0].addtasklist)
 settaskId(editTaskinfo[0].id)
}
const tasksave = ()=>{
  const editid=taskId;
  if(addtasklist.length>0){
    setTaskerr(false);
    let newobj = {
      id:Math.random(),
      title:addtasklist,
      status:"Backlog"
    }
    settasklist([...tasklist,newobj])  
  if(!editid){
    let newtasklistarray=newobj;
    settasklist([...tasklist,newtasklistarray]);  
  }
  else{ 
        let newlistarray= tasklist.map((task)=>
          task.id == editid ? {...task , title: addtasklist} : task
          )          
          settasklist(newlistarray);  
      }
  } else{
    setTaskerr(true);
  }
  setaddtasklist("")
}
  const rendercolumnData = (value) => {
    let newTaskArrary = [];
    for (let index = 0; index < tasklist.length; index++) {
      if(tasklist[index].status == value){
        newTaskArrary.push(
        <>
       <li className='task'id='little' onClick={()=>editTask(tasklist[index].id)} key={tasklist[index].id}>{tasklist[index].title}
       <button className='deletetask' onClick={()=>deleteTask (tasklist[index].id)}>Delete</button></li>
        </>

      )
      }
    }

    return newTaskArrary
}

  // console.log('----tasklist------------',tasklist);
  return (
    <div className='App'>
      <div className='container'> 
        {heading.map((column,index) =>(
           <div className='child' key={index}>
           <h1 className='heading'>{column}</h1>
           <ul>
           {rendercolumnData(column)}
           </ul>
           {column == "Backlog" ? <button type='button' className='btn' onClick={addtask}>+</button> : ""}
           {column == "Backlog" && isAddtask== true ? <input type='text' className='addtask' id='addtasklist'value={addtasklist}  onChange={Addtasktext} /> : ""}
           {taskerr == true && column == "Backlog" && isAddtask== true ?<span id='taskerr'>please enter task</span> :"" }
           {column == "Backlog" && isAddtask== true  ? <button  className='addtasksave'onClick={tasksave} >save</button> : ""}
           {column == "Backlog"&& isAddtask== true ?  <button  className='addtaskclose' onClick={taskclose} >Close</button> : ""}
         </div>
        ))}
       
        <div className='child'>
        

        </div>
        <div className='child'>
        
        </div>
        <div className='child'>
          
        </div>
      </div>
    </div>
  );
}

export default App;