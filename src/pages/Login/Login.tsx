import React, {useState} from "react";

import {Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

import styles from "./Login.module.less";

import {getAuthority} from "@/utils/authority";

import services from "@/services/Login";

const Login: React.FC = () => {

    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            let response = await services.login(values);
            const {data = {}} = response;
            const {menus, buttons} = getAuthority(data.menus || []);
            localStorage.setItem("auth_menus", JSON.stringify(menus));
            localStorage.setItem("auth_buttons", JSON.stringify(buttons));
            localStorage.setItem("userInfo", JSON.stringify(data));
            localStorage.setItem("token", data.token || "");
            void message.info("登录成功");
            setTimeout(() => {
                setLoading(false);
                window.location.replace("/");
            }, 500);
        } catch (e) {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginLayout} id="login-layout">
            <div className={styles.loginContent}>
                <div className={styles.logoBox}>
                    <span className={styles.logoName}>Repeater 登录</span>
                </div>
                <Form className={styles.loginForm} name="login-form" onFinish={onFinish}>
                    <Form.Item name="username" rules={[{required: true, message: "请输入用户名"}]}>
                        <Input placeholder="用户名" prefix={<UserOutlined/>} size="large" data-testid="username"/>
                    </Form.Item>
                    <Form.Item name="password" rules={[{required: true, message: "请输入密码"}]}>
                        <Input.Password placeholder="密码" prefix={<LockOutlined/>} size="large" data-testid="password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" size="large" type="primary" block loading={loading}
                                data-testid="loginBtn">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
