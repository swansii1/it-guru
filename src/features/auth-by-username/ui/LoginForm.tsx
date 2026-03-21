import { Button, Checkbox, Form, Input, message } from "antd";
import { loginRequest } from "../api/login";
import type { LoginFormFields } from "../model/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/entities/user/model/store";

export const LoginForm = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const { mutate, isPending } = useMutation({
    mutationKey: [],
    mutationFn: loginRequest,
    onSuccess: (data, variables) => {
      setToken(data.accessToken, !!variables.remember);
      message.success("Добро пожаловать!");
      navigate("/products");
      console.log(data);
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || "Ошибка входа!";
      message.error(errorMsg);
    },
  });

  const onFinish = (values: LoginFormFields) => {
    mutate(values);
  };

  return (
    <Form
      name="auth_form"
      layout="vertical"
      onFinish={onFinish}
      style={{ width: 400 }}
      disabled={isPending}
    >
      <Form.Item
        name="username"
        label="Почта"
        rules={[{ required: true, message: "Введите логин" }]}
      >
        <Input placeholder="emilys" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[{ required: true, message: "Введите пароль" }]}
      >
        <Input.Password placeholder="emilyspass" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Запомнить данные</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isPending}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
