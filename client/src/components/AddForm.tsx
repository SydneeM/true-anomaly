import {useState} from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';



const AddForm = (props:any) => {
  const [id, setId] = useState("");

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-controlled"
        label="Satellite"
        value={id}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setId(event.target.value);
        }}
      />
      <Button onClick={() => props.handleAddSat(id)}>
        Add
      </Button>
    </Box>
  );
}

export default AddForm