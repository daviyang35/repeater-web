import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import styles from "./SaveOrUpdate.module.less";
import {UnControlled as CodeMirror} from "react-codemirror2";
import {useHistory} from "react-router-dom";
import service from "./service";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/javascript/javascript");

require("codemirror/addon/selection/active-line");

require("codemirror/addon/fold/foldgutter.js");
require("codemirror/addon/fold/foldgutter.css");
require("codemirror/addon/fold/foldcode.js");
require("codemirror/addon/fold/brace-fold.js");
require("codemirror/addon/fold/comment-fold.js");
require("codemirror/addon/edit/closebrackets");

require("codemirror/addon/lint/lint");
require("codemirror/addon/lint/lint.css");
require("codemirror/addon/lint/json-lint");
require("@/assets/css/codemirror.css");

const SaveOrUpdate: React.FC = () => {
    let history = useHistory();
    const search = new URLSearchParams(history.location.search);
    const appName = search.get("appName");
    const environment = search.get("environment");

    const [config, setConfig] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const resp = await service.getModuleConfig(appName as string, environment as string);
            setConfig(JSON.stringify(resp.data.configModel, null, 2));
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
            <CodeMirror
                value={config}
                options={{
                    mode: {
                        name: "javascript",
                        json: true,
                    },
                    theme: "material",
                    lineNumbers: true,
                    lineWrapping: true,
                    indentWithTabs: false,
                    tabSize: 2,
                    readonly: "nocursor",
                    autofocus: true,//自动获取焦点
                    styleActiveLine: true,//光标代码高亮
                    foldGutter: true,
                    gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    autoCloseBrackets: true,
                    matchBrackets: true,
                    lint: true,
                }}
            />
        </div>
    );
};

export default SaveOrUpdate;
