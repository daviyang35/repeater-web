import React, {useEffect, useState} from "react";
import {Button, Form, Input, message} from "antd";
import styles from "./SaveOrUpdate.module.less";
import {useHistory} from "react-router-dom";
import service from "./service";
import CodeBlock from "@/components/CodeBlock";
import template from "./template";


const SaveOrUpdate: React.FC = () => {
    let history = useHistory();

    const [state, setState] = useState({
        isPreviewMode: false,
        isCreateMode: false,
        appName: "",
        environment: "",
        rules: [{}],
    });
    const [contentValue, setContentValue] = useState("");
    const [contentReadOnly, setContentReadOnly] = useState(false);
    const [formReadOnly, setFormReadOnly] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const search = new URLSearchParams(history.location.search);
        const mode = search.get("mode");
        const isPreviewMode = mode === "preview";
        const isCreateMode = mode === "create";
        const appName = search.get("appName");
        const environment = search.get("environment");

        if (mode === "preview") {
            setContentReadOnly(true);
            setFormReadOnly(true);
        } else if (mode === "edit") {
            setFormReadOnly(true);
        } else if (mode === "create") {
            // 都允许修改
            setContentValue("");
            setFormReadOnly(false);
            setContentReadOnly(false);
        }

        setState({
            isPreviewMode,
            isCreateMode,
            appName: appName as string,
            environment: environment as string,
            rules: isCreateMode ? [{required: true, message: "必填项"}] : [{}],
        });
    }, [history.location.search]);

    useEffect(() => {
        const fetch = async () => {
            if (state.appName && state.environment) {
                const resp = await service.getModuleConfig(state.appName, state.environment);
                const content = JSON.stringify(resp.data.configModel, null, 2);
                console.log(content);
                setContentValue(content);
            }
        };

        if (!state.isCreateMode) {
            form.setFieldsValue({
                appName: state.appName,
                environment: state.environment,
            });
            void fetch();
        } else {
            setContentValue(JSON.stringify(template, null, "\t"));
        }
    }, [state.appName, state.environment, state.isCreateMode]); // eslint-disable-line react-hooks/exhaustive-deps

    const onEditorChanged = (newValue: string) => {
        setContentValue(newValue);
    };

    const onCreate = async (value: any) => {
        console.log("onCreate", value);
        console.log("content:", contentValue);
        const resp = await service.saveOrUpdate({
            ...value,
            config: contentValue,
        });
        if (resp.success) {
            message.info("创建成功");
            history.push("/configuration");
        }
    };

    return (
        <div className={styles.EditorPanel}>
            <Form form={form} className={styles.InputLine} layout="inline"
                  onFinish={() => {
                      form.validateFields()
                          .then((values) => {
                              form.resetFields();
                              void onCreate(values);
                          })
                          .catch(err => {
                              console.log(err);
                          });
                  }}>
                <Form.Item label="应用名" name="appName" rules={state.rules}>
                    <Input readOnly={formReadOnly} autoComplete="off" placeholder="请输入应用名"/>
                </Form.Item>
                <Form.Item label="环境" name="environment" rules={state.rules}>
                    <Input readOnly={formReadOnly} autoComplete="off" placeholder="请输入环境名"/>
                </Form.Item>
                {state.isPreviewMode ||
                <Form.Item>
                    {
                        state.isCreateMode ?
                            <Button htmlType="submit" type="primary">{"创建"}</Button> :
                            <Button htmlType="submit" type="primary">{"更新"}</Button>
                    }
                </Form.Item>}
            </Form>
            <CodeBlock onEditorChanged={onEditorChanged} readOnly={contentReadOnly}
                       value={contentValue}/>
        </div>
    );
};

export default SaveOrUpdate;
