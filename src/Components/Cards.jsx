import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Cards({addData}) {
  return (
    <>
    <div>
    <div className='ml-12'>
     <Card className='w-60' sx={{ maxWidth: 345 }}>
                 <CardContent className='bg-blue-300 h-48'>
                     <Typography gutterBottom variant="h5" component="div">
                         <h1>{addData.name}</h1>
                     </Typography>
                     <Typography className='w-44' variant="body2" color="text.secondary">
                         <h3>{addData.description}</h3>
                     </Typography>
                 </CardContent>
             </Card>

    </div>
    
    </div>
    </>
  )
}

export default Cards