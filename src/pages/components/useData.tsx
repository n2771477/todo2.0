import React, { useEffect, useState } from 'react';
//请求封装 路由,参数对象传值,method默认get,body json字符串

import { history } from 'umi';

let data = [
  {
    key: 1,
    name: '任务1',

    description: {
      dataSource: [
        {
          key: '0',
          name: '作业',
          Date: '456',
          id: 1,
        },
        {
          key: '1',
          name: '下课',
          Date: '123',
          id: 1,
        },
      ],
      count: 2,
    },
  },
  {
    key: 2,
    name: '任务2',

    description: {
      dataSource: [
        {
          key: '0',
          name: '作业',
          Date: 456,
          id: 2,
        },
        {
          key: '1',
          name: '下课',
          Date: '123',
          id: 2,
        },
      ],
      count: 2,
    },
  },
  {
    key: 3,
    name: '任务3',

    description: {
      dataSource: [
        {
          key: '0',
          name: '学习',
          Date: '111',
          id: 3,
        },
        {
          key: '1',
          name: '上课',
          Date: '789',
          id: 3,
        },
      ],
      count: 2,
    },
  },
];
interface DataType {
  
    key: number;
    name:string;
    description: {
      dataSource: Array<{ key: number; name: string; Date: string; id: number }>;
      count: number;
    };
}
export function useData() {
  interface TyepData {
    key: number;
    name: string;
    Date: unknown;
  }
  const [state, setstate] = useState(data);

  const addNote = () => {
    const newState = JSON.parse(JSON.stringify(data));
    console.log(newState[newState.length - 1].key);
    const newData = {
      key: newState[newState.length - 1].key + 1,
      name: `请输入便签名称`,
      description: {
        dataSource: [
          {
            key: '0',
            name: '请输入任务',
            Date: new Date().toLocaleDateString(),
          },
        ],
        count: 1,
      },
    };
    newState.push(newData);
    data = newState;
    setstate(newState);
  };
  const removeNote = (key: number) => {
    console.log(key);
    const newState = JSON.parse(JSON.stringify(data));
    const newStates = newState.filter(
      (item: { key: number }) => item.key !== key,
    );
    data = newStates;
    console.log(data);
    setstate(newStates);
  };
  //newlist
  const handleDelete = (
    text: unknown,
    record: { key: string; name: string; Date: string },
    keyOne: number,
  ) => {
    console.log(text, record);
    const newState = JSON.parse(JSON.stringify(data));
    const newdata = newState.map(
      (data: {
        key: number;
        description: {
          dataSource: Array<{
            key: string;
            name: string;
            Date: string;
            id: number;
          }>;
          count: number;
        };
      }) => {
        if (data.key == keyOne) {
          const newData = data.description.dataSource.filter(
            (item: { key: string }) => item.key !== record.key,
          );
          data.description.dataSource = newData;
          console.log(data);
          return data;
        }
        return data;
      },
    );
    data = newdata;
    console.log(newdata, data);
    setstate(data);
    // setlist(!list);
  };

  const handleSave = (row: {
    Date: string;
    key: number;
    name: string;
    id: number;
  }) => {
    console.log(row);
    const newState = JSON.parse(JSON.stringify(data));
    if (!row.Date) {
      const index = newState.findIndex((item:DataType) => row.key === item.key);
      console.log(index);
      const item = newState[index];
      console.log(item);
      newState.splice(index, 1, { ...item, ...row });
      setstate(newState);
      data = newState;
    } else {
      newState.map((data:DataType) => {
        if (row.id === data.key) {
          data.description.dataSource.map((item:{key:number,name:string}) => {
            if (item.key === row.key) {
              item.name = row.name;
              return item;
            } else {
              return item;
            }
          });
          return data;
        } else {
          return data;
        }
      });

      data = newState;
      setstate(newState);

      console.log(data);
    }
    console.log(data);
  };
  const handleAdd = (keyOne: number) => {
    const newState = JSON.parse(JSON.stringify(data));

    newState.map((data: any) => {
      if ((data.key = keyOne)) {
        const newData = {
          key: String(data.description.count),
          name: `请输入要布置的任务`,

          Date: new Date().toLocaleDateString(),
          id: keyOne,
        };
        data.description.dataSource.push(newData);
        data.description.count += 1;
        return data;
      } else {
        return data;
      }
    });

    data = newState;

    setstate(newState);
  };

  console.log(data);

  // 数据值传入
  // console.log(dataNote);
  return {
    state,
    removeNote,
    handleSave,
    addNote,
    handleDelete,
    handleAdd,
  };
}
