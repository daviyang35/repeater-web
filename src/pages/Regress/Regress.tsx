import React, {useState} from "react";
import {Button, Space} from "antd";
import styles from "./Regress.module.less";
import service from "./service";
import {UnControlled as CodeMirror} from "react-codemirror2";

const jsonlint = require("jsonlint-mod");
// @ts-ignore
window.jsonlint = jsonlint;

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

const Regress: React.FC = () => {

    const [codeBlock, setCodeBlock] = useState("");

    const doSlogan = async () => {
        const resp: any = await service.slogan();
        setCodeBlock(resp);
    };

    const doRepeater3 = async () => {
        const resp: any = await service.repeater3();
        setCodeBlock(JSON.stringify(resp, null, "\t"));
    };

    const doGetWithCache = async () => {
        const resp: any = await service.getWithCache();
        setCodeBlock(JSON.stringify(resp, null, "\t"));
    };

    return <div className={styles.Panel}>
        <Space className={styles.ActionPanel}>
            <Button type={"primary"} size="small" onClick={() => {
                void doSlogan();
            }}>/regress/slogan</Button>
            <Button type={"primary"} size="small" onClick={() => {
                void doRepeater3();
            }}>/regress/get/repeater/3</Button>
            <Button type={"primary"} size="small" onClick={() => {
                void doGetWithCache();
            }}>/regress/getWithCache/repeater</Button>
        </Space>
        <div className={styles.Title}><span>返回结果</span></div>
        <div data-testid="codemirror">
            <CodeMirror
                value={codeBlock}
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
    </div>;
};

export default Regress;
