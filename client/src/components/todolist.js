import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { useQueryClient } from 'react-query';
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function TodoList() {
  const queryClient = useQueryClient();
  const { data: todos, isLoading } = useQuery('todos', () => fetch("http://localhost:3000/todos/getAll").then((res) => res.json()))

  function getAllDones() {
    [].forEach.call(document.querySelectorAll('.active'), function (el) {
      el.style.display = 'none';
    });
    [].forEach.call(document.querySelectorAll('.done'), function (el) {
      el.style.display = 'inline-block';
    });
  }

  function getAllTodo() {
    [].forEach.call(document.querySelectorAll('.done'), function (el) {
      el.style.display = 'none';
    });
    [].forEach.call(document.querySelectorAll('.active'), function (el) {
      el.style.display = 'inline-block';
    });
  }

  function getAll() {
    [].forEach.call(document.querySelectorAll('.active'), function (el) {
      el.style.display = 'inline-block';
    });
    [].forEach.call(document.querySelectorAll('.done'), function (el) {
      el.style.display = 'inline-block';
    });
  }

  const editTodo = async (id, queryClient, title) => {
    console.log(id);

    if (!id) return null;

    var newTitle = prompt('Nouveau nom de la tache', title);

    if (newTitle !== null && newTitle !== "") {
      const { data: response } = await fetch('http://localhost:3000/todos/edit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          title: newTitle,
        })
      })
        .then(response => response.json())
        .then(() => {
          queryClient.invalidateQueries('todos')
        });
      return response;
    }


  };

  const removeTodo = async (id, queryClient) => {
    if (!id) return null
    const { data: response } = await fetch('http://localhost:3000/todos/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(response => response.json())
      .then(() => {
        queryClient.invalidateQueries('todos')
      });
    return response;
  };

  const toggleTodo = async (id, queryClient) => {
    if (!id) return null
    const { data: response } = await fetch('http://localhost:3000/todos/toggle', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(response => response.json())
      .then(() => {
        queryClient.invalidateQueries('todos')
      });
    return response;
  };

  const deleteAll = async (queryClient) => {

    const { data: response } = await fetch('http://localhost:3000/todos/deleteAll', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(() => {
        queryClient.invalidateQueries('todos')
      });
    return response;
  };

  const deleteAllDone = async (queryClient) => {
    const { data: response } = await fetch('http://localhost:3000/todos/deleteAllDone', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(() => {
        queryClient.invalidateQueries('todos')
      });
    return response;
  };

  if (isLoading) {
      return <div style={{ textAlign: "center" }}>Chargement...</div>;
  }

  return (
    <>
      <div fullwidth>
        <Button variant="outlined" color="info" onClick={ () => { getAll() } } style={{ width: "29.33%", margin:"15px 2%" }}>Tous</Button>
        <Button variant="outlined" color="warning" onClick={ () => { getAllDones() } } style={{ width: "29.33%", margin:"15px 2%" }}>A Faire</Button>
        <Button variant="outlined" color="success" onClick={ () => { getAllTodo() } } style={{ width: "29.33%", margin:"15px 2%" }}>Faits</Button>
      </div>
      {
        todos.map(todo =>
          <Card className={ todo.state ? 'done' : 'active' } style={{ width: "46%", display: "inline-block", margin: "15px 2%" }}>
            <CardContent style={{ padding: "15px", display: "flex" }}>
              { todo.state ?
                <>
                  <CheckBoxOutlineBlankIcon style={{ marginRight: "15px", color: "grey"}} id={ todo.id } onClick={ (e) => toggleTodo(e.target.id, queryClient) }/>
                  <Typography style={{ marginRight: "auto"}}>{todo.title}</Typography>
                  <div style={{ marginLeft: "auto" }}>
                    <div style={{ marginLeft: "10px", display: "inline-block" }} id={ todo.id } onClick={ (e) => editTodo(todo.id, queryClient, todo.title) }>
                      <ModeEditIcon style={{ color: "grey", display: "inline-block"}} />
                    </div>
                    <div style={{ marginLeft: "10px", display: "inline-block" }} id={ todo.id } onClick={ (e) => removeTodo(e.target.parentElement.id, queryClient) }>
                      <RemoveCircleOutlineIcon style={{ color: "grey"}} />
                    </div>
                  </div>
                </>
                :
                <>
                  <CheckBoxIcon style={{ marginRight: "15px", color: "green" }} id={ todo.id } onClick={ (e) => toggleTodo(e.target.id, queryClient) }/>
                  <Typography style={{ marginRight: "auto", textDecoration: 'line-through' }}>{ todo.title }</Typography>
                  <div style={{ marginLeft: "auto" }}>
                    <div style={{ marginLeft: "10px", display: "inline-block" }} id={ todo.id } onClick={ (e) => editTodo(todo.id, queryClient, todo.title) }>
                      <ModeEditIcon style={{ color: "grey", display: "inline-block"}} />
                    </div>
                    <div style={{ marginLeft: "10px", display: "inline-block" }} id={ todo.id } onClick={ (e) => removeTodo(e.target.parentElement.id, queryClient) }>
                      <RemoveCircleOutlineIcon style={{ color: "grey"}} />
                    </div>
                  </div>
                </>
              }
            </CardContent>
          </Card>
        )
      }
      <div fullwidth>
        <Button variant="outlined" color="error" onClick={ () => deleteAll(queryClient) } style={{ width: "46%", margin:"15px 2%" }}>Supprimer tous</Button >
        <Button variant="outlined" color="error" onClick={ () => deleteAllDone(queryClient) } style={{ width: "46%", margin:"15px 2%" }}>Supprimer terminés</Button >
      </div>
    </>
  )
}

export default TodoList
