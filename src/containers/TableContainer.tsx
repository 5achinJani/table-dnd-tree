import React, { useState, Fragment, useEffect } from "react";
import { IData } from "../types";
import { Table, Row, Button } from "../components/react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IDataRow } from "../types";
import {
  getPaddingByIndent,
  getSourceValues,
  moveArrayElements,
} from "../utils";

import {
  AiOutlineDrag,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDelete,
} from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { useMount } from "react-use";
import cuid from "cuid";

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
    //console.log("on state(data) update");
    //console.log(data);
  }, [data]);

  const onAdd = () => {
    const lastItem = data[data.length - 1];
    const indent = lastItem?.indent || 0;
    const id = cuid();
    const row = {
      id,
      indent,
      body: "",
    };
    const updated_data = [...data, row];
    setData(updated_data);
  };

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
    const {
      source: { index: source_index },
      destination: { index: destination_index },
    } = result;

    console.log({ source_index, destination_index });
    if (source_index == destination_index) {
      return;
    }

    const { source_from_index, source_to_index } = getSourceValues({
      array: data,
      source_from_index: source_index,
    });

    console.log({ source_from_index, source_to_index });

    const updated_array = moveArrayElements({
      array: data,
      source_from_index,
      source_to_index,
      target_index: destination_index,
    });
    console.log(updated_array);
    setData(updated_array);
  };

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Table
              hover
              responsive
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
                            <div
                              style={{
                                paddingLeft: getPaddingByIndent({
                                  indent: row.indent,
                                }),
                              }}
                              className="h-100 w-25 d-flex justify-content-around align-items-center"
                            >
                              <div
                                title="indent size"
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
              <tfoot>
                <tr className="col-12 d-flex justify-content-center align-items-center">
                  <Button
                    variant="primary"
                    className="d-flex justify-content-center align-items-center btn-block"
                    onClick={() => {
                      onAdd();
                    }}
                  >
                    <MdAddCircleOutline className="mr-1" /> Add Standard
                  </Button>
                </tr>
              </tfoot>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
};
