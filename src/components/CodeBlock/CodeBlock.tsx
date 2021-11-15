import React from "react";
import AceEditor from "react-ace";
import styles from "./CodeBlock.module.less";
import "ace-builds/webpack-resolver";

export interface CodeBlockProps {
    mode?: string;
    value?: string;
    readOnly?: boolean;
    onEditorChanged?: (value: string, event?: any) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = (props: CodeBlockProps = {mode: "json", readOnly: false}) => {

    return (
        <AceEditor className={styles.InputLine} mode={props.mode}
                   theme="github"
                   onChange={props.onEditorChanged}
                   name="AceEditor"
                   value={props.value || ""}
                   editorProps={{$blockScrolling: true}}
                   setOptions={{
                       enableBasicAutocompletion: true,
                       enableLiveAutocompletion: true,
                       enableSnippets: true,
                       tabSize: 2,
                   }}
                   readOnly={props.readOnly}
                   highlightActiveLine
                   width="100%"
        />);
};

export default CodeBlock;
