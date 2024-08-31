
import "./cards.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function Cards({children, title, description}) {
  return (


    <Card className="card min-w-[500px]  rounded-[16px]">

      
        <CardContent className="flex flex-col gap-[29px] p-6">
          {children}
          
        </CardContent>
   
    </Card>
  );
}

export default Cards;
