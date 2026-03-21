import style from "./LoginPage.module.css";
import { Card, Typography } from "antd";
import { LoginForm } from "@/features/auth-by-username";

const { Title } = Typography;

export const LoginPage = () => {
  return (
    <div className={style.loginCard}>
      <Card className={style.card}>
        <Title level={2} className={style.title}>
          Добро пожаловать!
        </Title>
        <p style={{ display: "flex", justifyContent: "center" }}>
          Пожалйста, авторизуйтесь
        </p>
        <LoginForm />
        <div className={style.text}>
          Нет аккаунта?
          <span className={style.link}>Создать</span>
        </div>
      </Card>
    </div>
  );
};
