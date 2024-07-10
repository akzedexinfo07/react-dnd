import update from "immutability-helper";
import type { CSSProperties, Dispatch, FC, SetStateAction } from "react";
import { useCallback } from "react";
import type { XYCoord } from "react-dnd";
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

  const [, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top, item.title);
        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <div ref={drop} style={styles}>
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
