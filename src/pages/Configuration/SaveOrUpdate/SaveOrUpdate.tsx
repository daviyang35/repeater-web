import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import styles from "./SaveOrUpdate.module.less";
import {useHistory} from "react-router-dom";
import service from "./service";
import CodeBlock from "@/components/CodeBlock";

const SaveOrUpdate: React.FC = () => {
    let history = useHistory();
    const search = new URLSearchParams(history.location.search);
    const mode = search.get("mode");
    const appName = search.get("appName");
    const environment = search.get("environment");

    const [contentValue, setContentValue] = useState("");
    const [form, setForm] = useState({});

    useEffect(() => {
        setForm({appName: appName, environment: environment});
        if (mode === "create") {
            setContentValue("");
        }
    }, [history.location.search]);

    useEffect(() => {
        const fetch = async () => {
            if (appName && environment) {
                const resp = await service.getModuleConfig(appName as string, environment as string);
                const content = JSON.stringify(resp.data.configModel, null, 2);
                console.log(content);
                setContentValue(content);
            }
        };

        void fetch();
    }, [appName, environment, history.location.search]);

    const onEditorChanged = (newValue: string) => {
        console.log("onEditorChanged:", newValue);
    };

    return (
        <div className={styles.EditorPanel}>
            <Form className={styles.InputLine} layout="inline" initialValues={form} onFinish={(values) => {
            }}>
                <Form.Item label="应用名" name="appName">
                    <Input autoComplete="off" placeholder="请输入应用名" value={appName as string}/>
                </Form.Item>
                <Form.Item label="环境" name="environment">
                    <Input autoComplete="off" placeholder="请输入环境名" value={environment as string}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">{mode === "create" ? "新增" : "更新"}</Button>
                </Form.Item>
            </Form>
            <CodeBlock onEditorChanged={onEditorChanged} value={contentValue}/>
        </div>
    );
};

export default SaveOrUpdate;
