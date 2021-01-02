import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  FormEvent,
} from 'react';
import { Input, Form } from 'antd';
const EditableContext = React.createContext('0');
const EditableRow: React.FC<{ index: number }> = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props}></tr>
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  key: string;
  record: Item;
  handleSave: Function;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  key,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRefTag = useRef<Input>();
  const form = useContext(EditableContext);
  // console.log(record);
  // console.log(dataIndex, key);
  useEffect(() => {
    if (editing) {
      inputRefTag.current?.focus();
      console.log(inputRefTag);
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e: unknown) => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      console.log(values, form);
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        key={key}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRefTag} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
export { EditableCell, EditableRow };
