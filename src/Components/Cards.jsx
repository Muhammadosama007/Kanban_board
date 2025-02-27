import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Cards({ addData,key,onDel, setEditData, onDragStart }) {

  const bgColor = (status) => {
    switch (status) {
      case "Todo":
        return "bg-blue-300";
      case "In-progress":
        return "bg-orange-400";
      case "Done":
        return "bg-green-600";
      default:
        return "bg-blue-200";
    }
  }
  return (
    <>
      <div>
        <div className='ml-12 mb-2' draggable onDragStart={onDragStart}>
          <Card className='w-60' sx={{ maxWidth: 345 }}>
            <CardContent className={`${bgColor(addData.stat)} h-48 relative`}>
              <Typography gutterBottom variant="h5" component="div">
                <h1>{addData.name}</h1>
              </Typography>
              <Typography className='w-44' variant="body2" color="text.secondary">
                <h3>{addData.description}</h3>
              </Typography>
              <div className='flex justify-end space-x-2 absolute bottom-2 right-2'>
                <button onClick={setEditData} className='p-1 border rounded-md font-medium'>Update</button>
                <button onClick={onDel} className='bg-red-600 p-1 border rounded-md font-medium'>Delete</button>
              </div>
            </CardContent>

          </Card>

        </div>

      </div>
    </>
  )
}

export default Cards