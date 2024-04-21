import { Card, CardBody, Chip, Typography } from '@material-tailwind/react'
import React from 'react'

function Slot() {
  return (
    <div>
        <Card className='w-[300px] mt-1'>
            <CardBody className='p-8'>
                <Typography  variant="lead" color="blue-gray" className="mb-2">
                    Client: Mr. Rahul Gandhi
                </Typography>
                <div className=' justify-between items-center '>
                <Chip color="green" value="ongoing" className='w-fit'/>
                <Typography variant="paragraph" color="blue-gray" className="">
                    Date: 2023-03-08
                </Typography>

                <Typography variant="paragraph" color="blue-gray" className="mb-2">
                    Time: 10:00 AM - 11:00 AM
                </Typography> 
                </div>
                <Typography variant="paragraph" color="blue-gray" className="mb-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit....
                </Typography>
            </CardBody>
        </Card>
    </div>
  )
}

export default Slot