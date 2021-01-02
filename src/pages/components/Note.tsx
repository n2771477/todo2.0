import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { EditableCell, EditableRow } from './useFrom';
import List from './NewList';
import { useData } from './useData';
import { ColumnsType } from 'antd/es/table';
export default () => {
  const {
    state,
    removeNote,
    handleSave,
    addNote,
    handleDelete,
    handleAdd,
  } = useData();
  // 标题部分
  // const EditableListContext = React.createContext<string>('0');

  // interface User {
  //   key: string;
  //   name: string;
  //   editable: boolean;
  //   render?:Element
  // }
  const columns = [
    {
      title: (
        <Button
          type="primary"
          onClick={() => {
            addNote();
          }}
        >
          添加便签
        </Button>
      ),
      // editable: true,
      dataIndex: 'name',
      key: 'name',
      width: '500px',
      align: 'center',
      textAlign: 'center',
    },

    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text: unknown, record: { key: number }) => (
        <Popconfirm
          title="确定要删除此标签吗?"
          okText="确定"
          cancelText="取消"
          onConfirm={() => {
            console.log(text, record.key);
            removeNote(record.key);
          }}
        >
          <Button
            type="primary"
            // onClick={showPopconfirm}
          >
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const date = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    console.log(col.editable);
    return {
      ...col,
      onCell: (record: unknown) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  // console.log(data);
  return (
    <div>
      <Table
        components={components}
        pagination={false}
        rowClassName={() => 'editable-row1'}
        columns={date}
        //  expandRowByClick={start}
        expandable={{
          expandedRowRender: (record) => (
            <List
              state={record.description}
              keyOne={record.key}
              name={record.name}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
              handleSave={handleSave}
            />

            // <Input style={{ margin: 0 }} placeholder="Basic usage" />
            // <p style={{ margin: 0 }}>11111</p>
          ),
        }}
        dataSource={state}
      />
    </div>
  );
};
