import React from "react";
import { useDrag, useDrop } from "react-dnd";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ReactComponent as TrashIcon } from "@src/assets/icons/trash-icon.svg";
import Alert from "@src/components/common/alert/alert.component";

export const itemType = "item";

interface Props {
  index: number;
  id: string;
  text?: string;
  moveItem?: (id: string, to: number) => void;
  findItem: (id: string) => { index: number };
  deleteItem: (id: string) => void;
}

const EditableListItem: React.FC<Props> = ({ index, id, text, moveItem, findItem, deleteItem }: Props) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: itemType,
      item: { id, originalIndex: index },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const handledByDropTarget = monitor.didDrop();
        if (!handledByDropTarget) {
          !!moveItem && moveItem(droppedId, originalIndex);
        }
      },
    }),
    [id, index, moveItem],
  );

  const [, drop] = useDrop(
    () => ({
      accept: itemType,
      hover({ id: draggedId }: { id: string }) {
        if (draggedId !== id) {
          const { index: overIndex } = findItem(id);
          !!moveItem && moveItem(draggedId, overIndex);
        }
      },
    }),
    [findItem, moveItem],
  );

  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={moveItem ? node => drag(drop(node)) : undefined} style={{ opacity }}>
      <Alert
        key={id}
        title={text}
        content={id}
        color="neutral"
        icon={
          <Typography variant="h9" marginTop={1} noWrap>
            {index + 1}
          </Typography>
        }
        action={{
          content: (
            <IconButton onClick={() => deleteItem(id)}>
              <TrashIcon />
            </IconButton>
          ),
        }}
        sx={{ cursor: moveItem ? "move" : undefined, opacity, wordBreak: "break-word" }}
      />
    </div>
  );
};

export default EditableListItem;
