import React, {useState} from "react";
import {Button, Space} from "antd";
import styles from "./Regress.module.less";
import service from "./service";
import CodeBlock from "@/components/CodeBlock/CodeBlock";

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
        <CodeBlock mode="json" value={codeBlock}/>
    </div>;
};

export default Regress;
