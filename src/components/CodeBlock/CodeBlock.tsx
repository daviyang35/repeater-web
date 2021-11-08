import React from "react";
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

export interface CodeBlockProps {
    mode?: string,
    lineNumber?: boolean,
    lint?: boolean,
    value?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = (props: CodeBlockProps) => {
    const currentPros = {
        mode: "application/json",
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
        ...props,
    };
    delete currentPros.value;
    console.log(currentPros);

    return (<CodeMirror
        value={props.value || ""}
        options={currentPros}/>);
};

export default CodeBlock;
