import React from "react";
import {
  Card as ShadcnCard,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "../ui/card";
import { Button } from "../ui/button";
import LoadingWrapper from "../layout/LoadingWrapper";

const Card = ({ children, onSave, title, buttons, loading }) => {
  return (
    <ShadcnCard className="h-full w-full">
      <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">{title}</CardTitle>

        <div className="flex flex-row gap-2">
          {onSave && (
            <Button variant="default" onClick={onSave}>
              Save
            </Button>
          )}
          {buttons}
        </div>
      </CardHeader>

      <LoadingWrapper loading={loading}>
        <CardContent>
          {children}
        </CardContent>
      </LoadingWrapper>
    </ShadcnCard>
  );
};

export default Card;