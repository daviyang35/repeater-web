import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";


import {Layout, Menu} from "antd";

import classNames from "classnames";
import Menus from "@/route/routes";

import Styles from "./index.module.less";
import {getKeyName} from "@/assets/js/publicFunc";

const {SubMenu} = Menu;

type CommonObjectType<T = any> = Record<string, T>

type MenuType = CommonObjectType<string>

// 获取可展开的菜单
const getOpenKeys = (pathname: any): string[] => {
    let keys = [];
    const curPane = getKeyName(pathname);
    if (curPane && curPane.parentPath) {
        keys.push(curPane.parentPath);
        keys = keys.concat(getOpenKeys(curPane.parentPath));
    }
    return keys;
};
// 获取第一个菜单
let FirstMenu: any = {};
if (Menus && Menus.length > 0) {
    let first = Menus[0];
    if (first.children) {
        FirstMenu = first.children[0];
    } else {
        FirstMenu = first;
    }
}


const SideMenu: React.FC = () => {
    let {pathname} = useLocation();
    if (pathname === "/") {
        pathname = FirstMenu.path;
    }

    const [collapsed, setCollapsed] = useState<boolean>(false);

    let openKeys: string[] = getOpenKeys(pathname);

    // const { permission = [] } = {};

    // 创建可跳转的多级子菜单
    const createMenuItem = (data: MenuType): JSX.Element => {
        if (data.isHide) {
            return <React.Fragment key={data.path || data.key}></React.Fragment>;
        }
        const icon = data.icon ? React.createElement(data.icon) : null;
        return <Menu.Item key={data.path || data.key} title={data.title} icon={icon}>
            <Link to={data.path}>{data.title}</Link>
        </Menu.Item>;
    };

    // 创建可展开的第一级子菜单
    const creatSubMenu = (data: CommonObjectType): any => {
        const menuItemList: any = [];
        data.children.forEach((item: MenuType) => {
            // 这儿进行权限判断
            // const arr = permission.filter((ele: MenuType) => item.key === ele.code)
            // if (arr.length > 0) {
            //     menuItemList.push(renderMenu(item))
            // }
            // return arr;
            menuItemList.push(renderMenu(item));
        });
        if (menuItemList.length > 0) {
            const icon = data.icon ? React.createElement(data.icon) : null;
            return (!data.isHide) && <SubMenu key={data.path || data.key} title={data.title} icon={icon}>
                {menuItemList}
            </SubMenu>;
        }
        return null;
    };
    // 创建菜单树
    const renderMenuMap = (list: CommonObjectType): JSX.Element[] => {
        return list.map((item: any) => renderMenu(item));
    };

    // 判断是否有子菜单，渲染不同组件
    function renderMenu(item: MenuType) {
        if (Array.isArray(item.children) && item.children.length > 0) {
            return creatSubMenu(item);
        }
        return createMenuItem(item);
    }

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout.Sider id="sider" collapsed={collapsed} collapsedWidth={60} width={220} className={Styles.sider}>
            <Menu
                mode="inline"
                theme="dark"
                defaultOpenKeys={openKeys}
                selectedKeys={[pathname]}
                style={{background: "#333857", marginTop: 5}}
            >
                {renderMenuMap(Menus)}
            </Menu>
            <div onClick={() => handleCollapse()}
                 className={classNames(Styles.collapsedImg, collapsed ? Styles.open : "")}/>
        </Layout.Sider>
    );
};

export default SideMenu;
