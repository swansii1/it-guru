import style from "./LoginPage.module.css";
import { Card, Typography } from "antd";
import { LoginForm } from "@/features/auth-by-username";

const { Title } = Typography;

export const LoginPage = () => {
  return (
    <div className={style.loginPage}>
      <Card className={style.card}>
        <div className={style.logoWrap}>
          <div className={style.logoMark}>◀</div>
        </div>
        <Title level={2} className={style.title}>
          Добро пожаловать!
        </Title>
        <p className={style.subtitle}>Пожалуйста, авторизуйтесь</p>
        <LoginForm />
        <div className={style.divider}>или</div>
        <div className={style.text}>
          Нет аккаунта?
          <span className={style.link}>Создать</span>
        </div>
      </Card>
    </div>
  );
};
