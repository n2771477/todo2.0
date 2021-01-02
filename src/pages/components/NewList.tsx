import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  ReactText,
} from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
// const EditableContext = React.createContext<any>(keyOne);
import { EditableCell, EditableRow } from './useFrom';

interface dataList {
  dataSource: { key: string; name: string; Date: ReactText }[];
  count: number;
}
const EditableTable: React.FC<{
  state: dataList;
  keyOne: number;
  name: string;
  handleDelete: Function;
  handleAdd: Function;
  handleSave: Function;
}> = ({ state, keyOne, name, handleDelete, handleAdd, handleSave }) => {
  // 标题部分
  // const [list, setlist] = useState(true);
  const columns3 = [
    {
      title: '任务',
      dataIndex: 'name',
      width: '50%',
      editable: true,
    },

    {
      title: '布置时间',
      dataIndex: 'Date',
      width: '30%',
    },
    {
      title: '操作',
      width: '20%',
      dataIndex: 'operation',
      render: (text: unknown, record: dataList) =>
        state.dataSource.length >= 1 ? (
          <Popconfirm
            okText="确定"
            cancelText="取消"
            title="要删除任务吗"
            onConfirm={() => {
              handleDelete(text, record, keyOne);
              // setdata(state);
            }}
          >
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const [data, setdata] = useState(state);
  interface TyepData {
    key: string | number;
    name: string;
    Date: unknown;
  }
  // note

  // const handleAdd = (e: number) => {
  //   const newState = { ...state };

  //   const newData = {
  //     key: String(newState.count),
  //     name: `请输入要布置的任务`,

  //     Date: new Date().toLocaleDateString(),
  //   };
  //   newState.dataSource.push(newData);
  //   newState.count += 1;

  //   console.log(newState);
  //   setdata(newState);
  // };

  const columns = columns3.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  // console.log(dataSource);
  // console.log(data);
  // console.log(columns);
  return (
    <div>
      <Button
        onClick={() => {
          handleAdd(keyOne);
        }}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        添加任务
      </Button>
      <Table
        pagination={false}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={state.dataSource}
        columns={columns}
      />
    </div>
  );
};
export default EditableTable;
