import React, {useCallback, useEffect, useState} from "react";
import {BackTop, Layout} from "antd";
import styles from "./index.module.less";
import {useHistory, useLocation} from "react-router-dom";

const Header = React.lazy(() => import("./components/Header"));
const SideMenu = React.lazy(() => import("./components/SideMenu"));
const TabPanes = React.lazy(() => import("./components/TabPanes"));


const Layouts: React.FC = () => {

    const history = useHistory();
    const {pathname} = useLocation();

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(false); //Loading

    const checkLogin = useCallback(async () => {
        if (true) {
            const buttons = ["user:delete", "user:list", "dept:delete", "user:addSameLevel", "user:edit", "dept:add", "user:addNextLevel", "dept:tree", "user:add", "dept:edit", "role:edit", "role:add", "role:list", "role:delete"];
            const menus = ["statistics", "system", "dept", "role", "warn"];
            localStorage.setItem("auth_buttons", JSON.stringify(buttons));
            localStorage.setItem("auth_menus", JSON.stringify(menus));
            localStorage.setItem("token", "fake token");
            setLoading(true);
            return;
        }

        // 未登录
        if (!token && pathname !== "/login") {
            history.replace({pathname: "/login"});
            return;
        }
    }, [history, pathname, token]);

    useEffect(() => {
        void checkLogin();
    }, [checkLogin]);

    return (
        <>
            {
                loading && <Layout className={styles.container}>
                  <Header/>
                  <Layout>
                    <SideMenu/>
                    <Layout.Content>
                      <TabPanes/>
                    </Layout.Content>
                  </Layout>
                  <BackTop visibilityHeight={1080}/>
                </Layout>
            }
        </>
    );
};

export default Layouts;
