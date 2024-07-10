"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "../DragItem";
import { DropItem } from "../DropItem";

export interface BoxesTypes {
  [key: string]: {
    top: number;
    left: number;
    title: string;
  };
}

export default function DragNDropComp() {
  const [boxes, setBoxes] = useState<BoxesTypes>({
    a: { top: 20, left: 80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" },
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[700px] h-[500px] border border-gray-200 rounded flex">
          <div className="bg-blue-200 w-[200px] box-border p-3 flex flex-col gap-3">
            <DragItem
              id="c"
              item={{ title: "Name", left: 0, top: 0 }}
              boxes={boxes}
              setBoxes={setBoxes}
            />
            <DragItem
              id="d"
              item={{ title: "Title", left: 0, top: 0 }}
              boxes={boxes}
              setBoxes={setBoxes}
            />
            <DragItem
              id="e"
              item={{ title: "Date", left: 0, top: 0 }}
              boxes={boxes}
              setBoxes={setBoxes}
            />
          </div>
          <div className="bg-lime-100 w-[500px] box-border relative">
            <DropItem
              hideSourceOnDrag={true}
              boxes={boxes}
              setBoxes={setBoxes}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
