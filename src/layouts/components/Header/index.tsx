import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Dropdown, Layout, Menu, Modal} from "antd";
import {ExclamationCircleOutlined, LogoutOutlined} from "@ant-design/icons";


import styles from "./index.module.less";
import avatar from "@/assets/img/avatar.png";

const {confirm} = Modal;

const Header: React.FC = () => {

    // TODO 设置头部图片
    // eslint-disable-next-line
    const [fileId, setFileId] = useState(0);//文件ID

    const history = useHistory();

    const logout = () => {
        confirm({
            title: "您确定要退出系统吗?",
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                localStorage.removeItem("token");
                history.replace({pathname: "/login"});
            },
            onCancel() {
            },
        });
    };
    let userInfo: any = {};
    try {
        const user = localStorage.getItem("userInfo");
        if (user) {
            userInfo = JSON.parse(user);
        }
    } catch (error) {

    }
    const menu = (
        <Menu className={styles.menu}>
            <Menu.Item key="item1" onClick={logout}>
                <LogoutOutlined/> 安全退出
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout.Header className={styles.header}>
            <div className={styles["user-box"]}>
                <Dropdown placement={"bottomRight"} overlay={menu}>
                    <span className={styles.user}>
                        <span>您好：{userInfo.username}</span>
                        <img alt="" className={styles.avatar} src={avatar}/>
                    </span>
                </Dropdown>
            </div>
        </Layout.Header>
    );
};

export default Header;
