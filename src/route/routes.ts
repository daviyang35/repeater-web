import {
    aboutUs,
    Configuration,
    Home,
    Module,
    Regress,
    Replay,
    SaveOrUpdate,
    Traffic,
    TrafficDetails,
} from "./components";

import {AlertOutlined, DesktopOutlined, HeartOutlined} from "@ant-design/icons";
import {RouteComponentProps} from "react-router-dom";
import React from "react";

interface Menu {
    title: string,
    key: string,
    path: string,
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
    icon?: any,
    isHide?: boolean,
    closable?: boolean,
    static?: boolean,
    children?: Menu[],
}

/**
 * title 标题
 * key 唯一键值
 * component 对应路径显示的组件
 * closable 是否可关闭 默认为true
 * path 跳转的路径
 * isHide 是否隐藏 默认false
 * icon 图标
 * children 子菜单
 * static 前端静态路由 不做权限控制
 */
let menus: Menu[] = [
    {
        title: "首页",
        key: "home",
        component: Home,
        path: "/home",
        closable: false,
        isHide: false,
        icon: DesktopOutlined,
    }, {
        title: "流量管理",
        key: "traffic",
        component: Traffic,
        path: "/traffic",
        icon: HeartOutlined,
        static: true,
    }, {
        title: "流量详情",
        key: "trafficDetails",
        component: TrafficDetails,
        path: "/trafficDetails",
        icon: HeartOutlined,
        static: true,
        isHide: true,
    }, {
        title: "配置管理",
        key: "manage",
        component: Configuration,
        path: "/configuration",
        icon: HeartOutlined,
        static: true,
    }, {
        title: "配置详情",
        key: "manageDetails",
        component: SaveOrUpdate,
        path: "/configurationDetail",
        icon: HeartOutlined,
        static: true,
        isHide: true,
    },
    {
        title: "模块管理",
        key: "module",
        component: Module,
        path: "/module",
        icon: HeartOutlined,
        static: true,
    }, {
        title: "回放记录",
        key: "replay",
        component: Replay,
        path: "/replay",
        icon: HeartOutlined,
        static: true,
    }, {
        title: "测试页面",
        key: "test",
        component: Regress,
        path: "/test",
        icon: HeartOutlined,
        static: true,
    },
    {
        title: "关于我们",
        key: "aboutUs",
        component: aboutUs,
        path: "/aboutUs",
        icon: AlertOutlined,
        static: true,
    },
];

//获取到菜单权限  进行路由过滤
let auth_menus: any[] = [];
try {
    const menus = localStorage.getItem("auth_menus");
    if (menus) {
        auth_menus = JSON.parse(menus);
    }
} catch (error) {
}
menus = menus.filter((item: any) => {
    if (item.children) {
        item.children = item.children.filter((child: any) => {
            return child.static || auth_menus.includes(child.key);
        });
    }
    return item.static || auth_menus.includes(item.key);
});

export default menus;
