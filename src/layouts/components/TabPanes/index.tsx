import React, {useCallback, useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";

import {Alert, Dropdown, Menu, message, Tabs} from "antd";
import {SyncOutlined} from "@ant-design/icons";

import Error404 from "@/pages/Error/404";
import Routes from "@/route/routes";


import {flattenRoutes} from "@/assets/js/publicFunc";

const {TabPane} = Tabs;


type CommonObjectType<T = any> = Record<string, T>

const Menus = flattenRoutes(Routes);
// 获取第一个菜单
let initPane: any[] = [];
let FirstMenu: any = {};
if (Menus && Menus.length > 0) {
    let first = Menus[0];
    if (first.children) {
        FirstMenu = first.children[0];
    } else {
        FirstMenu = first;
    }
    initPane = [FirstMenu];
}

const TabPanes: React.FC = () => {

    const history = useHistory();
    const {pathname, search} = useLocation();

    const [activeKey, setActiveKey] = useState<string>(FirstMenu.key);
    let [panes, setPanes] = useState<CommonObjectType[]>(pathname !== "/" ? [] : initPane);
    const [isReload, setIsReload] = useState<boolean>(false);

    const fullPath = pathname + search;

    // 记录当前打开的tab
    const storeTabs = useCallback(
        (ps): void => {
            const pathArr = ps.reduce(
                (prev: CommonObjectType[], next: CommonObjectType) => [
                    ...prev,
                    next.path,
                ],
                [],
            );
            console.log(pathArr);
        },
        [],
    );

    // 从本地存储中恢复已打开的tab列表
    const resetTabs = useCallback(async () => {
        if (pathname === "/") {
            setActiveKey(FirstMenu.path);
            return;
        }
        const obj = Menus.find((item: any) => item.path === pathname);
        // 不存在
        if (!obj) {
            // 如果不存在404就创建一份
            if (!panes.find(item => item.path === "/404")) {
                panes.push({
                    title: "404",
                    key: "/404",
                    component: Error404,
                    closable: true,
                    path: "/404",
                });
            }
            setActiveKey("/404");
        } else {
            const oldPane = panes.find(item => item.path === pathname);
            if (oldPane) {
                oldPane.search = search;
                setActiveKey(oldPane.path);
            } else {
                obj.search = search;
                panes.push(obj);
                setActiveKey(obj.path);
            }
        }
    }, [pathname, panes, search]);

    // 初始化页面
    useEffect(() => {
        void resetTabs();
    }, [resetTabs]);

    // tab切换
    const onChange = (tabKey: string): void => {
        const curPane: any = panes.find(item => item.path === tabKey);
        if (curPane.search) {
            history.push(curPane.path + curPane.search);
        } else {
            history.push({pathname: tabKey});
        }
    };
    // 移除tab
    const remove = (targetKey: string): void => {
        if (panes.length === 1) {
            message.warning("不能关闭当前页");
            return;
        }
        const delIndex = panes.findIndex(
            (item: CommonObjectType) => item.path === targetKey,
        );
        const prevPane = panes[delIndex - 1] || {};
        panes = panes.filter(item => item.path !== targetKey) || [];


        // 删除非当前tab
        if (targetKey !== activeKey) {
            const nextKey = activeKey;
            setActiveKey(nextKey);
            setPanes(panes);
            storeTabs(panes);
            return;
        }
        // 删除当前tab，地址往前推
        history.push({pathname: prevPane.path});
        setPanes(panes);
        storeTabs(panes);
    };
    // tab新增删除操作
    const onEdit = (targetKey: string | any, action: string) => {
        if (action === "remove") {
            remove(targetKey);
        }
    };

    // 刷新当前 tab
    const refreshTab = (): void => {
        setIsReload(true);
        setTimeout(() => {
            setIsReload(false);
        }, 1000);
    };
    // tab右击菜单
    const menu = (
        <Menu>
            <Menu.Item
                key="refresh"
                onClick={() => refreshTab()}
            >
                刷新
            </Menu.Item>
            <Menu.Item
                key="close"
                onClick={(e) => {
                    remove(activeKey);
                    e.domEvent.stopPropagation();
                }}
            >
                关闭
            </Menu.Item>
            {/* <Menu.Item
                key="closeAll"
                onClick={(e) => {
                    e.domEvent.stopPropagation()
                }}
            >
                全部关闭
            </Menu.Item> */}
        </Menu>
    );

    // 阻止右键默认事件
    const preventDefault = (e: CommonObjectType, panel: object) => {
        e.preventDefault();
    };
    return (
        <div className="ax-panesBox">
            <Tabs
                hideAdd
                onChange={onChange}
                activeKey={activeKey}
                type="editable-card"
                onEdit={onEdit}
                tabBarGutter={0}
                className="ax-Tabs"
            >
                {panes.map((pane: CommonObjectType) => (
                    <TabPane
                        closable={pane.closable}
                        key={pane.path}
                        tab={
                            <Dropdown
                                overlay={menu}
                                placement="bottomLeft"
                                trigger={["contextMenu"]}
                            >
                                <span onContextMenu={(e) => preventDefault(e, pane)}>
                                    {isReload &&
                                    pane.path === fullPath &&
                                    pane.path !== "/403" && (
                                        <SyncOutlined title="刷新" spin={isReload}/>
                                    )}
                                    {pane.title}
                                </span>
                            </Dropdown>
                        }>
                        {
                            isReload ? <div style={{height: "50vh", padding: "20px"}}>
                                    <Alert message="刷新中..." type="info"/>
                                </div>
                                : <pane.component path={pane.path + (pane.search || "")}/>
                        }
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default TabPanes;
