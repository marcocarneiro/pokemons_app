import React, { useCallback, useReducer } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

interface Task {
  id: string;
  title: string;
}

const initialTasks: Task[] = [
  { id: "1a2b", title: "Primeira Tarefa" },
  { id: "3c4d", title: "Segunda Tarefa" }
];

const containerStyle: React.CSSProperties = {
  border: "1px solid lightgrey",
  borderRadius: "2px",
  fontFamily: "monospace",
  marginBottom: "8px",
  padding: "8px"
};

const itemStyle: React.CSSProperties = {
  border: "1px solid lightgrey",
  borderRadius: "2px",
  fontFamily: "monospace",
  margin: "8px",
  padding: "8px"
};

interface State {
  tasks: Task[];
}

type Action = {
  type: "MOVE";
  fromIndex: number;
  toIndex: number;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "MOVE": {
      if (action.toIndex === action.fromIndex) return state;
      const newState = Array.from(state.tasks);
      const [removed] = newState.splice(action.fromIndex, 1);
      newState.splice(action.toIndex, 0, removed);
      return { tasks: newState };
    }
    default:
      return state;
  }
}

function TestDragable() {
  const [state, dispatch] = useReducer(reducer, { tasks: initialTasks });

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    dispatch({
      type: "MOVE",
      fromIndex: result.source.index,
      toIndex: result.destination.index,
    });
  }, []);

  return (
    <div style={containerStyle}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ minHeight: "100px" }}
            >
              {state.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        ...itemStyle,
                      }}
                    >
                      {task.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TestDragable;
