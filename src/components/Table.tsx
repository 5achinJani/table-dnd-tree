import React, { Fragment, useState } from "react";
import { Table as AntTable, Row, Col, Space } from "antd";
import {
  ArrowLeftOutlined,
  DragOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { useMount } from "react-use";

const DragHandle = SortableHandle(() => {
  return <DragOutlined title="Move" style={{ cursor: "pointer" }} />;
});

const SortableTableItem = SortableElement((props) => <tr {...props} />);
const SortableTableContainer = SortableContainer((props) => (
  <tbody {...props} />
));

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
];

const columns = [
  {
    title: () => {
      return (
        <Fragment>
          <Row>
            <h3>Actions</h3>
          </Row>
          <Row>Move, Indent, Outdent, Delete</Row>
        </Fragment>
      );
    },
    dataIndex: "actions",
    key: "actions",
    width: 250,
    render: () => {
      return (
        <Fragment>
          <Space>
            <DragHandle />
            <ArrowLeftOutlined title="Outdent" style={{ cursor: "pointer" }} />
            <ArrowRightOutlined title="Indent" style={{ cursor: "pointer" }} />
            <DeleteOutlined title="Delete" style={{ cursor: "pointer" }} />
          </Space>
        </Fragment>
      );
    },
  },
  {
    title: "Standard",
    dataIndex: "body",
    key: "body",
  },
];

export const Table = () => {
  useMount(() => {
    //load data from json and setState
    console.log("mounted");
  });
  const [state, setState] = useState(dataSource);

  return (
    <AntTable
      rowKey="id"
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      bordered={false}
      title={() => "Header"}
      footer={() => "Footer"}
    />
  );
};
