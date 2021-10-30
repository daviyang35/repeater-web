import React, {useEffect, useState} from "react";
import styles from "./Module.module.less";
import service from "./service";
import {Button, Form, Input, Modal, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {TablePaginationConfig} from "antd/lib/table/interface";

const frozen = async (appName: string, ip: string) => {
    const resp = await service.frozen(appName, ip);
    Modal.error({
        title: "结果",
        content: resp.message,
    });
};

const reload = async (appName: string, ip: string) => {
    const resp = await service.reload(appName, ip);
    const modal = Modal.info({
        content: resp.message,
        title: "结果",
    });
};

const columns: ColumnsType<any> = [
    {
        title: "应用名",
        dataIndex: "appName",
        key: "appName",
    }, {
        title: "环境",
        dataIndex: "environment",
        key: "environment",
    }, {
        title: "机器IP",
        dataIndex: "ip",
        key: "ip",
    }, {
        title: "端口",
        dataIndex: "port",
        key: "port",
    }, {
        title: "版本号",
        dataIndex: "version",
        key: "version",
    }, {
        title: "状态",
        dataIndex: "status",
        key: "status",
        width: 80,
        render: (status: string) => (
            <Button type="primary" ghost shape="round" size="small"
                    danger={status === "FROZEN"}>{status === "ACTIVE" ? "已激活" : "未激活"}</Button>),
    }, {
        title: "心跳时间",
        dataIndex: "gmtModified",
        key: "gmtModified",
    }, {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (_, record) => {
            return (<Space className={styles.ActionPanel}>
                <Button type={"primary"} size="small" onClick={() => {
                    void frozen(record.appName, record.ip);
                }}>冻结</Button>
                <Button type={"primary"} size="small" danger onClick={() => {
                    void reload(record.appName, record.ip);
                }}>刷新</Button>
            </Space>);
        },
    },
];

const Module: React.FC = () => {
    const [dataSources, setDataSources] = useState([]);
    const [pagination, setPagination] = useState<{ total: number, pageSize: number, current: number }>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    useEffect(() => {
        const getModule = async () => {
            const resp = await service.getModule(pagination.current, pagination.pageSize);
            setDataSources(resp.data);
            setPagination({
                current: resp.pageIndex,
                pageSize: resp.pageSize,
                total: resp.count,
            });
        };

        void getModule();
    }, []);
    const paginationConfig: TablePaginationConfig = {
        total: pagination.total,
        current: pagination.current,
        pageSize: pagination.pageSize,
        showTotal: (total) => `共 ${total} 条`,
        showQuickJumper: true,
        onChange: (page, pageSize) => setPagination({
            current: page,
            pageSize: pageSize as number,
            total: pagination.total,
        }),
    };
    return (
        <div className={styles.ModulePanel}>
            <Form className={styles.SearchForm} layout="inline"
                  onFinish={(values) => {
                  }}>
                <Form.Item label="应用名" name="appName">
                    <Input autoComplete="off" placeholder="请输入应用名"/>
                </Form.Item>
                <Form.Item label="IP" name="ip">
                    <Input autoComplete="off" placeholder="请输入机器 IP"/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">查询</Button>
                </Form.Item>
            </Form>
            <Table size="small" rowKey={(record) => record.id} dataSource={dataSources} columns={columns}
                   pagination={paginationConfig}/>
        </div>
    );
};


export default Module;
