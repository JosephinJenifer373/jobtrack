import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const columns = [
  {
    id: "Applied",
    title: "Applied",
    icon: "📨",
    className: "kanban-applied",
    description: "Applications submitted",
  },
  {
    id: "Interview",
    title: "Interview",
    icon: "🎯",
    className: "kanban-interview",
    description: "Interview opportunities",
  },
  {
    id: "Offer",
    title: "Offer",
    icon: "🎉",
    className: "kanban-offer",
    description: "Offers received",
  },
  {
    id: "Rejected",
    title: "Rejected",
    icon: "❌",
    className: "kanban-rejected",
    description: "Applications closed",
  },
];

function KanbanBoard({
  applications,
  onDragEnd,
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className="kanban-board">

        {columns.map((column) => {
          const columnApplications = applications.filter(
            (application) =>
              application.status === column.id
          );

          return (
            <div
              className={`kanban-column ${column.className}`}
              key={column.id}
            >

              {/* Column Header */}
              <div className="kanban-column-header">

                <div className="kanban-title-wrapper">

                  <div className="kanban-icon">
                    {column.icon}
                  </div>

                  <div>
                    <h5>{column.title}</h5>

                    <span>
                      {column.description}
                    </span>
                  </div>

                </div>

                <div className="kanban-count">
                  {columnApplications.length}
                </div>

              </div>

              {/* Drop Area */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    className={`kanban-drop-area ${
                      snapshot.isDraggingOver
                        ? "kanban-drag-over"
                        : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >

                    {columnApplications.length === 0 && (
                      <div className="kanban-empty">

                        <div className="kanban-empty-icon">
                          ↓
                        </div>

                        <p>
                          Drop application here
                        </p>

                      </div>
                    )}

                    {columnApplications.map(
                      (application, index) => (
                        <Draggable
                          draggableId={String(
                            application.id
                          )}
                          index={index}
                          key={application.id}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`kanban-card ${
                                snapshot.isDragging
                                  ? "kanban-card-dragging"
                                  : ""
                              }`}
                            >

                              <div className="kanban-card-top">

                                <div className="kanban-company">
                                  {application.company}
                                </div>

                                <span className="drag-handle">
                                  ⋮⋮
                                </span>

                              </div>

                              <div className="kanban-role">
                                {application.role}
                              </div>

                              <div className="kanban-location">
                                📍 {application.location}
                              </div>

                              <div className="kanban-card-footer">

                                <span>
                                  {application.type}
                                </span>

                                <span>
                                  ↗
                                </span>

                              </div>

                            </div>
                          )}
                        </Draggable>
                      )
                    )}

                    {provided.placeholder}

                  </div>
                )}
              </Droppable>

            </div>
          );
        })}

      </div>

    </DragDropContext>
  );
}

export default KanbanBoard;