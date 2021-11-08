import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import styles from "./SaveOrUpdate.module.less";
import {useHistory} from "react-router-dom";
import service from "./service";
import CodeBlock from "@/components/CodeBlock/CodeBlock";

const SaveOrUpdate: React.FC = () => {
    let history = useHistory();
    const search = new URLSearchParams(history.location.search);
    const appName = search.get("appName");
    const environment = search.get("environment");

    const [config, setConfig] = useState("");

    useEffect(() => {
        const fetch = async () => {
            if (appName && environment) {
                const resp = await service.getModuleConfig(appName as string, environment as string);
                setConfig(JSON.stringify(resp.data.configModel, null, 2));
            }
        };

        void fetch();
    }, [appName, environment]);

    return (
        <div className={styles.EditorPanel}>
            <Form className={styles.InputLine} layout="inline" onFinish={(values) => {
            }}>
                <Form.Item label="应用名" name="appName">
                    <Input defaultValue={appName as string} autoComplete="off" placeholder="请输入应用名"/>
                </Form.Item>
                <Form.Item label="环境" name="environment">
                    <Input defaultValue={environment as string} autoComplete="off" placeholder="请输入环境名"/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">保存</Button>
                </Form.Item>
            </Form>
            <CodeBlock value={config}/>
        </div>
    );
};

export default SaveOrUpdate;
