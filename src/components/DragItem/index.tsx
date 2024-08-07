import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { useDrag } from "react-dnd";
import { BoxesTypes } from "../DragNDropComp";

interface DragItemProps {
  top: number;
  left: number;
  title: string;
}

const DragItem = ({
  id,
  item,
  boxes,
  setBoxes,
  className,
}: {
  id: string;
  item: DragItemProps;
  boxes: BoxesTypes;
  setBoxes: Dispatch<SetStateAction<BoxesTypes>>;
  className: string;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { id, ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // end(draggedItem, monitor) {
    //   const draggingItemMonitor = monitor.getClientOffset();
    // },
  }));

  return (
    <div
      ref={drag}
      className={classNames(
        "cursor-move border border-gray-300 p-2 rounded m-1 bg-pink-200",
        isDragging ? "opacity-50" : "opacity-100",
        className
      )}
    >
      {item.title}
    </div>
  );
};

export default DragItem;
