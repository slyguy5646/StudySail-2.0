"use client"
import { Flashcard } from "@prisma/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export default function FlashOverviewCard({term, def}: {term:string; def: string}){
return (
  <Card>
    <CardHeader>
      <CardTitle>{term}</CardTitle>
      <CardDescription>{def}</CardDescription>
    </CardHeader>
  </Card>
);
}