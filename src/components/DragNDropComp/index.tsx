"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "../DragItem";
import { DropItem } from "../DropItem";
import TrashDropZone from "../TrashDropZone";

export interface BoxesTypes {
  [key: string]: {
    top: number;
    left: number;
    title: string;
  };
}

export default function DragNDropComp() {
  // const [boxes, setBoxes] = useState<BoxesTypes>({
  //   a: { top: 20, left: 80, title: "Drag me around" },
  //   b: { top: 180, left: 20, title: "Drag me too" },
  // });
  const [boxes, setBoxes] = useState<BoxesTypes>({});

  console.log("boxes", boxes);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[700px] h-[500px] border border-gray-200 rounded flex">
          <div className="bg-blue-200 w-[200px] box-border p-3 flex flex-col gap-3">
            {/* <DragItem
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
            /> */}
            {boxItems.map((box, index) => {
              const key = Object.keys(box)[0];
              const item = box[key];
              const isDisabled = boxes.hasOwnProperty(key);

              return (
                <DragItem
                  key={key}
                  id={key}
                  item={{ title: item.title, left: item.left, top: item.top }}
                  boxes={boxes}
                  setBoxes={setBoxes}
                  className={
                    isDisabled ? "pointer-events-none bg-gray-300" : ""
                  }
                />
              );
            })}
            <TrashDropZone boxes={boxes} setBoxes={setBoxes} />
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

type BoxItem = {
  [key: string]: { top: number; left: number; title: string };
};

const boxItems: BoxItem[] = [
  { c: { top: 0, left: 0, title: "Name" } },
  { d: { top: 0, left: 0, title: "Title" } },
  { e: { top: 0, left: 0, title: "Date" } },
];
