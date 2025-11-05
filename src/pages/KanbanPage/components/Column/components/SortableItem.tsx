import { useSortable } from '@dnd-kit/sortable';
import type { FC, JSX } from 'react';
import { CSS } from '@dnd-kit/utilities';
import type { SortActivatorProps } from '../../../types';

interface Props {
  id: string;
  activeItem: unknown;
  render: (sortActivatorProps: SortActivatorProps) => JSX.Element;
}

export const SortableItem: FC<Props> = ({ id, activeItem, render }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { activeItem },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const sortActivatorProps: SortActivatorProps = {
    ref: setActivatorNodeRef,
    listeners,
    attributes,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {render(sortActivatorProps)}
    </div>
  );
};
