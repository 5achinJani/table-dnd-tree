import React, { useState, Fragment } from "react";
import { IData } from "../types";
import { Table, Row } from "../components/react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IDataRow } from "../types";

import {
  AiOutlineDrag,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDelete,
} from "react-icons/ai";
import { useMount } from "react-use";

const dataSource = [
  {
    id: "1",
    body: "Mike",
    indent: 0,
  },
  {
    id: "2",
    body: "John",
    indent: 0,
  },
  {
    id: "3",
    body: "Test",
    indent: 0,
  },
  {
    id: "4",
    body: "Sachin",
    indent: 0,
  },
];

export const TableContainer = () => {
  const [data, setData] = useState<IData>(dataSource);

  useMount(() => {});

  const onChange = ({ index, value }: { index: number; value: string }) => {
    const cloned_data = [...data];
    cloned_data[index].body = value;
    setData(cloned_data);
  };

  const onDragEnd = () => {};

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Table
              hover
              ref={provided.innerRef}
              style={{ width: "100%", tableLayout: "fixed" }}
            >
              <thead>
                <tr className="d-flex">
                  <th scope="col" className="col-1">
                    <div>Actions</div>
                    <div
                      className="font-weight-lighter"
                      style={{ fontSize: "small" }}
                    >
                      Move, Indent, Outdent, Delete
                    </div>
                  </th>
                  <th scope="col" className="col-11">
                    <div>Standard</div>
                    <div
                      className="font-weight-lighter"
                      style={{ fontSize: "small" }}
                    >
                      Text of the standard
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => {
                  return (
                    <Draggable key={row.id} draggableId={row.id} index={index}>
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                          key={row.id}
                          className="d-flex"
                        >
                          <td className="col-1">
                            <span {...provided.dragHandleProps}>
                              <AiOutlineDrag title="Move" />
                            </span>
                            <AiOutlineArrowLeft
                              title="Outdent"
                              className="ml-3"
                              style={{ cursor: "pointer" }}
                            />
                            <AiOutlineArrowRight
                              title="Indent"
                              className="ml-3"
                              style={{ cursor: "pointer" }}
                            />
                            <AiOutlineDelete
                              title="Delete"
                              className="ml-3"
                              style={{ cursor: "pointer" }}
                            />
                          </td>
                          <td className="col-11">
                            <input
                              type="text"
                              className="form-control"
                              value={row.body}
                              onChange={(event) => {
                                onChange({ index, value: event.target.value });
                              }}
                            />
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </tbody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
};
