import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { bgColor } from '../helpers/Helper';

function Cards({ addData, onDel, setEditData, onDragStart }) {
  return (
    <div className="flex justify-center w-full sm:w-auto">
      <div className="m-2 card" draggable onDragStart={onDragStart}>
        <Card className="w-full sm:w-60" sx={{ maxWidth: 345 }}>
          <CardContent className={`${bgColor(addData.stat)} h-48 relative`}>
            <Typography gutterBottom variant="h5" component="div">
              <h1>{addData.name}</h1>
            </Typography>
            <Typography className="w-full sm:w-44" variant="body2" color="text.secondary">
              <h3>{addData.description}</h3>
            </Typography>
            <div className="flex justify-end space-x-2 absolute bottom-2 right-2">
              <button onClick={setEditData} className="p-1 border rounded-md font-medium">
                Update
              </button>
              <button onClick={onDel} className="bg-red-600 text-gray-300 p-1 border rounded-md font-medium">
                Delete
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Cards;
