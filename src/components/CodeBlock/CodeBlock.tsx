import React from "react";
import AceEditor from "react-ace";
import styles from "./CodeBlock.module.less";
// import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export interface CodeBlockProps {
    mode?: string;
    value?: string;
    readOnly?: boolean;
    onEditorChanged?: (value: string, event?: any) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = (props: CodeBlockProps) => {

    console.log("mode:", props.mode);

    return (
        <AceEditor className={styles.InputLine} mode={props.mode || "json"}
                   theme="github"
                   onChange={props.onEditorChanged}
                   name="AceEditor"
                   value={props.value || ""}
                   editorProps={{$blockScrolling: true}}
                   enableBasicAutocompletion={true}
                   enableLiveAutocompletion={true}
                   enableSnippets={true}
                   showGutter={true}
                   showPrintMargin={false}
                   tabSize={2}
                   readOnly={props.readOnly}
                   highlightActiveLine
                   width="100%"
                   fontSize={14}
                   setOptions={{useWorker: false}}
        />);
};

export default CodeBlock;
