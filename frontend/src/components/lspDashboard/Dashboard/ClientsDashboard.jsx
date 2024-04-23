import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Typography,
  Button,
  CardHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ClientsDashboard() {
  const { Provider } = useSelector((state) => state.loadProviders);
  const [ct, setCT] = useState([]);

  useEffect(() => {
    if (Provider && Provider.data && Provider.data.clients) {
      setCT(Provider.data.clients);
    }
  }, [Provider]); // Trigger effect when Provider or Provider.data changes

  return (
    <Card className="h-full w-full">
      <CardHeader className="text-2xl font-bold text-center"> Clients </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <tbody>
            {ct.map((item, index) => (
              <tr key={index}>
                <td>
                  <Typography
                    variant="lead"
                    color="blue-gray"
                    className="mx-10 font-normal border-gray-200 border-b-2"
                  >
                    {item.name}
                  </Typography>
                </td>
                {/* <td>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.caseDetails ? JSON.stringify(item.caseDetails) : ""}
                  </Typography>
                </td> */}
                {/* <td>
                  <Tooltip content="Edit User">
                    <IconButton variant="text">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter> */}
    </Card>
  );
}
