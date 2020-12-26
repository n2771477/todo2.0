import React from 'react';
import { Table, Input, Button, Popconfirm } from 'antd';
// import { TodoList } from './src/TodoList/TodoList';
import { EditableTable } from './List';
// const { Table } = antd;

const columns = [
  {
    title: (
      <Button
        // onClick={this.handleAdd}
        type="primary"
        style={{
          marginBottom: 0,
          alignItems: 'center',
        }}
      >
        添加标签
      </Button>
    ),
    dataIndex: 'name',
    key: 'name',
    width: '500px',
    align: 'center',
    textAlign: 'center',
  },

  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () => (
      <Popconfirm
        title="确定要删除此标签吗?"
        okText="确定"
        cancelText="取消"
        onConfirm={() => {
          console.log('确认按钮');
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

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable22',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description:
      'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];
export default () => {
  return (
    <div>
      <Table
        pagination={false}
        columns={columns}
        expandRowByClick={true}
        expandable={{
          expandedRowRender: (record) => (
            <EditableTable />
            // <Input style={{ margin: 0 }} placeholder="Basic usage" />
            // <p style={{ margin: 0 }}>{record.description}</p>
          ),
          // rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
    </div>
  );
};
