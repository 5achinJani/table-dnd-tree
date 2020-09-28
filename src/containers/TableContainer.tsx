import React, { useState, Fragment, useEffect } from "react";
import { IData } from "../types";
import { Table, Row } from "../components/react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IDataRow } from "../types";
import { getSourceValues, moveArrayElements } from "../utils";

import {
  AiOutlineDrag,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDelete,
} from "react-icons/ai";
import { useMount } from "react-use";

const dataSource = [
  {
    id: "0",
    body: "Mike",
    indent: 0,
  },
  {
    id: "1",
    body: "John",
    indent: 0,
  },
  {
    id: "2",
    body: "Cena",
    indent: 1,
  },
  {
    id: "3",
    body: "Cena1",
    indent: 2,
  },
  {
    id: "4",
    body: "Sachin",
    indent: 0,
  },
  {
    id: "5",
    body: "Max",
    indent: 0,
  },
];

export const TableContainer = () => {
  const [data, setData] = useState<IData>(dataSource);

  useMount(() => {});

  useEffect(() => {
    console.log("on state(data) update");
    console.log(data);
  }, [data]);

  const onChange = ({ index, value }: { index: number; value: string }) => {
    const cloned_data = [...data];
    cloned_data[index].body = value;
    setData(cloned_data);
  };

  const onDelete = ({ index }: { index: number }) => {
    const { source_from_index, source_to_index } = getSourceValues({
      array: data,
      source_from_index: index,
    });

    const updated_data = data.filter((value, index) => {
      if (index >= source_from_index && index <= source_to_index) {
        return false;
      }

      return true;
    });

    setData(updated_data);

    //console.log({ updated_data });
  };

  const onIndent = ({ index }: { index: number }) => {
    const cloned_data = [...data];
    cloned_data[index].indent = cloned_data[index].indent + 1;
    setData(cloned_data);
  };

  const onOutdent = ({ index }: { index: number }) => {
    if (data[index].indent == 0) {
      return;
    }

    const cloned_data = [...data];
    cloned_data[index].indent = cloned_data[index].indent - 1;
    setData(cloned_data);
  };

  const onDragEnd = (result: {
    source: { index: number };
    destination: { index: number };
  }) => {
    if (!result.destination) {
      return;
    }

    // const updated_array = moveArrayElements({
    //   array: data,
    //   source_from_index: 0,
    //   source_to_index: 0,
    //   target_index: 0,
    // });
  };

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
                            <div className="d-flex justify-content-around align-items-center">
                              <div className="" {...provided.dragHandleProps}>
                                <AiOutlineDrag title="Move" />
                              </div>

                              <div
                                className=""
                                role="button"
                                title="Outdent"
                                onClick={() => {
                                  onOutdent({ index });
                                }}
                              >
                                <AiOutlineArrowLeft />
                              </div>

                              <div
                                className=""
                                role="button"
                                title="Indent"
                                onClick={() => {
                                  onIndent({ index });
                                }}
                              >
                                <AiOutlineArrowRight />
                              </div>

                              <div
                                className=""
                                role="button"
                                title="Delete"
                                onClick={() => {
                                  onDelete({ index });
                                }}
                              >
                                <AiOutlineDelete />
                              </div>
                            </div>
                          </td>

                          <td className="col-11">
                            <div className="h-100 w-25 d-flex justify-content-around align-items-center">
                              <div
                                className="h-100 d-flex justify-content-center align-items-center"
                                style={{
                                  width: "40px",
                                  backgroundColor: "ghostwhite",
                                }}
                              >
                                {row.indent}
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                style={{ border: "none" }}
                                value={row.body}
                                onChange={(event) => {
                                  onChange({
                                    index,
                                    value: event.target.value,
                                  });
                                }}
                              />
                            </div>
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
