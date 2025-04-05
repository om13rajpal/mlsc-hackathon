import * as React from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export function ScoreDrawer({score}: any) {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">View Score</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  Your Score is {score}
                </div>
              </div>
            </div>
            <div className="mt-3 h-[120px]"></div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
