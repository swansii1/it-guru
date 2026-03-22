import { Button, Form, Input, Modal, message } from "antd";

import style from "./ProductTable.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AddProductModal({ open, onClose }: Props) {
  return (
    <Modal
      title="Добавить новый товар"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={() => {
          message.success("Товар успешно добавлен (имитация)");
          onClose();
        }}
      >
        <Form.Item
          label="Наименование"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Цена" name="price" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Вендор" name="brand" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Артикул" name="sku" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          className={style.btn_add}
        >
          Сохранить
        </Button>
      </Form>
    </Modal>
  );
}
