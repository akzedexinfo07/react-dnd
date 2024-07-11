import update from "immutability-helper";
import type { CSSProperties, Dispatch, FC, SetStateAction } from "react";
import { useCallback, useRef } from "react";
import { useDrop } from "react-dnd";

import { Box } from "../Box";
import { BoxesTypes } from "../DragNDropComp";

export interface DragItem {
  type: string;
  id: string;
  top: number;
  left: number;
  title: string;
}

const styles: CSSProperties = {
  width: "100%",
  height: "100%",
  border: "1px solid black",
  position: "relative",
};

export interface ContainerProps {
  hideSourceOnDrag: boolean;
  boxes: BoxesTypes;
  setBoxes: Dispatch<SetStateAction<BoxesTypes>>;
}

export interface ContainerState {
  boxes: { [key: string]: { top: number; left: number; title: string } };
}

export const DropItem: FC<ContainerProps> = ({
  hideSourceOnDrag,
  boxes,
  setBoxes,
}) => {
  const boundingBox = useRef<DOMRect | null>(null);

  const moveBox = useCallback(
    (id: string, left: number, top: number, title: string) => {
      setBoxes((prevBoxes) => {
        // Check if the item already exists
        if (prevBoxes[id]) {
          return update(prevBoxes, {
            [id]: {
              $merge: { left, top },
            },
          });
        } else {
          // Initialize the item with initial values when dropped for the first time
          return {
            ...prevBoxes,
            [id]: {
              left,
              top,
              title, // Set the title dynamically
            },
          };
        }
      });
    },
    [setBoxes]
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item: DragItem, monitor) {
        /*
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        console.log({ item, delta });
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top, item.title);
        return undefined;
        */
        const offset = monitor.getSourceClientOffset();
        if (offset && boundingBox.current) {
          const dropTargetXy = boundingBox.current;
          console.log("dropTargetXy", dropTargetXy);
          console.log("dropTargetXy offset", offset);
          moveBox(
            item.id,
            offset.x - dropTargetXy.left,
            offset.y - dropTargetXy.top,
            item.title
          );
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      hover: (draggingItem, monitor) => {},
    }),
    [moveBox]
  );

  console.log({ isOver, canDrop });

  function combinedRef(el: HTMLDivElement | null) {
    drop(el);
    if (el) {
      console.log("ELEMENT", el);
      boundingBox.current = el.getBoundingClientRect();
    }
  }

  return (
    <div ref={combinedRef} style={styles}>
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key] as {
          top: number;
          left: number;
          title: string;
        };
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {title}
          </Box>
        );
      })}
    </div>
  );
};
