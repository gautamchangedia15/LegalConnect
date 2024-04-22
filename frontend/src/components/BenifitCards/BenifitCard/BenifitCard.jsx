import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";

export function BenifitCard(props) {
  return (
    <Card className="max-w-[16rem] overflow-hidden h-full mb-10">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-48 w-full"
      >
        <img className="ml-10"
          src={props.image}
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody className="w-full h-48">
        
        <Typography variant="h5" color="blue-gray">
          {props.title}
        </Typography>
        <Typography variant="small" color="gray" className="mt-3 font-normal">
          {props.description}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
         
          
        </div>
      </CardFooter>
    </Card>
  );
}