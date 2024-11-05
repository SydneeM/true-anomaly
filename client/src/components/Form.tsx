import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';


interface FormProps {
  handleAddSat: (id: string) => void
  handleDeleteSat: (id: string) => void
}

const Form = (props: FormProps) => {
  const [addId, setAddId] = useState("");
  const [deleteId, setDeleteId] = useState("");

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
        value={addId}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAddId(event.target.value);
        }}
      />
      <Button onClick={() => props.handleAddSat(addId)}>
        Add
      </Button>
      <TextField
        id="outlined-controlled"
        label="Satellite"
        value={deleteId}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setDeleteId(event.target.value);
        }}
      />
      <Button onClick={() => props.handleDeleteSat(deleteId)}>
        Delete
      </Button>
    </Box>
  );
}

export default Form