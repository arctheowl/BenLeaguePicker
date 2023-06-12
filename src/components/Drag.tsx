import { useDragDropContext } from "@thisbeyond/solid-dnd";
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter,
} from "@thisbeyond/solid-dnd";
import { createEffect, createSignal, For } from "solid-js";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "solid-icons/ai";
import OGTable from "/data/originalTable.json";

const Sortable = (props: any) => {
  const sortable = createSortable(props.item);
  const [state] = useDragDropContext();
  const [ogRank, setOGRank] = createSignal(0);
  const [rank, setRank] = createSignal(0);
  const [image, setImage] = createSignal("");
  const [change, setChange] = createSignal(0);

  createEffect(() => {
    setImage("");
    setOGRank(0);
    OGTable.find((item: any, i: any) => {
      if (item.Team === props.item) {
        setOGRank(i + 1);
      }
    });
    setRank(props.items.indexOf(props.item) + 1);
    OGTable.find((item: any) => {
      if (item.Team === props.item) {
        setImage(item.image);
      }
    });
    setChange(ogRank() - rank());
  });
  return (
    <div
      use:sortable
      class={`sortable  rounded-lg py-4 hover:cursor-pointer bg-blue-300 hover:bg-blue-400 hover:border-green-600 my-1 ${
        rank() == 18 ? " border-t-2 border-red-600 rounded-t-none" : "border-2"
      }`}
      classList={{
        "opacity-35": sortable.isActiveDraggable,
        // "transition-transform": !!state.active.draggable,
      }}
    >
      {/* <div
        class={`border-red-500 ${rank() == 18 ? "bt-2 border-2" : "invisible"}`}
      /> */}
      <div class={`grid grid-cols-4 w-full align-middle items-center`}>
        <div class="col-span-1">{rank()}</div>

        <img src={image()} width={50} height={50} draggable={false} />

        <div class="">{props.item}</div>
        {change() == 0 ? (
          <></>
        ) : (
          <>
            {change() > 0 ? (
              <div class="flex text-green-7 text-right">
                <AiOutlineArrowUp color="#16803c" size={24} />
                <div class="text-green-700 font-bold text-right">{change()}</div>
              </div>
            ) : (
              <div class="flex text-right">
                <AiOutlineArrowDown color="#16803c" size={24} />
                <div class="text-red-500 font-bold text-right">{change()}</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const SortableVerticalListExample = () => {
  const [items, setItems] = createSignal(OGTable.map((item: any) => item.Team));
  const [activeItem, setActiveItem] = createSignal(null);
  const ids = () => items();

  const onDragStart = ({ draggable }: any) => setActiveItem(draggable.id);

  const onDragEnd = ({ draggable, droppable }: any) => {
    if (draggable && droppable) {
      const currentItems = ids();
      const fromIndex = currentItems.indexOf(draggable.id);
      const toIndex = currentItems.indexOf(droppable.id);
      if (fromIndex !== toIndex) {
        const updatedItems = currentItems.slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setItems(updatedItems);
      }
    }
  };

  createEffect(() => {
    console.log(items());
  });

  return (
    <DragDropProvider
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetector={closestCenter}
    >
      <DragDropSensors />
      <div class="column self-stretch w-1/3 mx-auto ">
        <SortableProvider ids={ids()}>
          <For each={items()}>
            {(item) => <Sortable item={item} items={items()} />}
          </For>
        </SortableProvider>
      </div>
      {/* <DragOverlay>
        <div class="sortable">{activeItem()}</div>
      </DragOverlay> */}
    </DragDropProvider>
  );
};
