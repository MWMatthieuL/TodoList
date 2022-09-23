import { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

import { useQueryClient } from 'react-query';

import InputAdornment from '@mui/material/InputAdornment';

const createTodo = async (title, queryClient) => {
    if (!title) return null
    const { data: response } = await fetch('http://localhost:3000/todos/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            state: 'false',
        })
    })
      .then(response => response.json())
      .then(() => {
          queryClient.invalidateQueries('todos')
      });
    return response;
};

const TodoInput = () => {
    const queryClient = useQueryClient();
    const [newTodo, setNewTodo] = useState();

    const handleChange = ((e) => {
        setNewTodo(e.target.value)
    });

    const handleClick = useCallback(
      async (event) => {
          event.preventDefault();
          await createTodo(newTodo, queryClient)
      },
      [newTodo, queryClient],
    );

    return (
        <Card fullwidth style={{ margin: "35px 2% 20px 2%" }}>
            <CardContent>
                <TextField
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="input-with-icon-textfield"
                    label="Titre de la nouvelle tache"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AddIcon />
                            </InputAdornment>
                        ),
                    }}
                    color="primary"
                />
            </CardContent>
            <CardActions style={{ display: "flex", marginRight: "10px", marginBottom: "10px" }}>
                <Button type='submit' style={{ marginLeft: "auto" }} color="success" variant="contained" size="small" onClick={handleClick}>Ajouter</Button>
            </CardActions>
        </Card>
    );
}
export default TodoInput;
