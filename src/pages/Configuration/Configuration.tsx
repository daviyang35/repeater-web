import React, {useEffect, useState} from "react";
import service, {ConfigParams} from "./service";
import styles from "./Configuration.module.less";
import {Button, Form, Input, message, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useHistory} from "react-router-dom";

export interface Module {
    id: number,
    appName: string,
    environment: string,
    configModel: any,
    config: any,
    gmtCreate: string,
    gmtModified: string
    configPreview: string
}

const Configuration: React.FC = () => {
    const [queryParam, setQueryParam] = useState<ConfigParams>({page: 1, size: 10});
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const resp = await service.getModuleConfig(queryParam);
            if (resp) {
                setDataSource(resp.data || []);
            }
        };
        void fetch();
    }, [queryParam]);

    const history = useHistory();
    const columns: ColumnsType<Module> = [
        {
            title: "应用名",
            dataIndex: "appName",
            key: "appName",
        }, {
            title: "环境",
            dataIndex: "environment",
            key: "environment",
        }, {
            title: "配置信息",
            dataIndex: "configPreview",
            key: "configPreview",
        }, {
            title: "创建时间",
            dataIndex: "gmtCreate",
            key: "gmtCreate",
        }, {
            title: "修改时间",
            dataIndex: "gmtModified",
            key: "gmtModified",
        }, {
            title: "操作",
            dataIndex: "action",
            key: "action",
            render: (_: any, record: Module) => {
                return (<Space className={styles.ActionPanel}>
                    <Button type={"primary"} size="small" onClick={() => {
                        history.push("/configurationDetail?appName=" + record.appName + "&environment=" + record.environment);
                    }}>详情</Button>
                    <Button type={"ghost"} size="small" danger onClick={() => {
                        void (async (appName: string, environment: string) => {
                            const resp = await service.pushConfig(appName, environment);
                            message.info(resp.message);
                        })(record.appName, record.environment);
                    }}>推送</Button>
                </Space>);
            },
        },
    ];

    const onSearchClicked = (values: any) => {
        setQueryParam({...queryParam, ...values});
    };

    return (
        <div className={styles.ManagePanel}>
            <Button className={styles.NewButton} htmlType="submit" type="primary">新建配置</Button>

            <Form className={styles.SearchPanel} layout="inline"
                  onFinish={(values) => onSearchClicked(values)}>
                <Form.Item label="应用名" name="appName">
                    <Input autoComplete="off" placeholder="请输入应用名"/>
                </Form.Item>
                <Form.Item label="环境" name="environment">
                    <Input autoComplete="off" placeholder="请输入环境名"/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">查询</Button>
                </Form.Item>
            </Form>

            <Table size="small" rowKey={record => record.id} dataSource={dataSource} columns={columns}/>
        </div>
    );
};

export default Configuration;
