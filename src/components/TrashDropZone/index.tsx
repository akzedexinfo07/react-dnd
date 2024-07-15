import { Dispatch, SetStateAction, useCallback } from "react";
import { useDrop } from "react-dnd";
import { BoxesTypes } from "../DragNDropComp";

export interface TrashDropZoneProps {
  boxes: BoxesTypes;
  setBoxes: Dispatch<SetStateAction<BoxesTypes>>;
}

export interface DragItem {
  type: string;
  id: string;
  top: number;
  left: number;
  title: string;
}

const TrashDropZone = ({ boxes, setBoxes }: TrashDropZoneProps) => {
  // const moveBoxToTrash = useCallback((id: string)=> {
  // }, [setBoxes])

  const moveBoxToTrash = useCallback(
    (id: string) => {
      setBoxes((prevBoxes) => {
        const updatedBoxes = { ...prevBoxes };
        if (updatedBoxes[id]) {
          delete updatedBoxes[id];
        }
        return updatedBoxes;
      });
    },
    [setBoxes]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item: DragItem, monitor) {
        console.log("TrashDropZone item", item);
        moveBoxToTrash(item.id);
      },
      hover: (draggingItem, monitor) => {
        console.log("TrashDropZone draggingItem", draggingItem);
      },
    }),
    [moveBoxToTrash]
  );

  return (
    <div
      ref={drop}
      className="cursor-move border border-gray-300 p-2 rounded m-1 bg-red-300"
    >
      Trash
    </div>
  );
};

export default TrashDropZone;
