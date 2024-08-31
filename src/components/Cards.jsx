
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

    // min-h-[409px]
    <Card className="card min-w-[500px]  rounded-[16px]">
      {/* <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader> */}
      
        <CardContent className="flex flex-col gap-4 p-5">
          {children}
          
        </CardContent>
   
    </Card>
  );
}

export default Cards;
