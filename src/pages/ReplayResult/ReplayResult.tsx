import React, {useEffect, useState} from "react";
import styles from "./ReplayResult.module.less";
import {Descriptions, Divider, message, Radio, Table, Tag} from "antd";
import service, {DifferenceBO, MockInvocationBO, ReplayResultVO} from "./service";
import {useHistory} from "react-router-dom";
import CodeBlock from "@/components/CodeBlock";
import {diff as DiffEditor} from "react-ace";
import tables from "./table";

// import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const ReplayResult: React.FC = () => {
    let history = useHistory();
    const search = new URLSearchParams(history.location.search);
    const repeatId = search.get("repeatId");
    const appName = search.get("appName");

    const [dataSource, setDataSource] = useState<ReplayResultVO>();
    const [showCallCodeBlock, setShowCallCodeBlock] = useState(false);
    const [codeBlock, setCodeBlock] = useState("");
    const [diffValues, setDiffValues] = useState<string[]>(["", ""]);
    const [expectDataSources, setExpectDataSources] = useState<DifferenceBO[]>();
    const [mockDataSources, setMockDataSources] = useState<MockInvocationBO[]>();
    const [showResponse, setShowResponse] = useState({
        showBasic: true,
        showExpect: false,
        showDiff: false,
        showMock: false,
    });

    useEffect(() => {
        const fetch = async () => {
            if (appName && repeatId) {
                const resp = await service.replayResult({appName: appName!, repeatId: repeatId!});
                if (!resp.success) {
                    message.error("获取回放结果失败:" + resp.message);
                    return;
                }

                setDataSource(resp.data);
                setDiffValues([resp.data?.record?.response!, resp.data?.response! || ""]);
                setExpectDataSources(resp.data?.differences);
                setMockDataSources(resp.data?.mockInvocations);

            } else {
                console.log("因路由意外触发，跳过fetch");
            }
        };
        void fetch();
    }, [appName, repeatId]);

    const onCallPanelChanged = (key: string) => {
        setShowCallCodeBlock(key !== "basic");
        switch (key) {
            case "request":
                setCodeBlock(dataSource?.record?.request || "");
                break;
            case "response":
                setCodeBlock(dataSource?.record?.response || "");
                break;
            case "subInvocations":
                setCodeBlock(dataSource?.record?.subInvocations || "");
                break;
        }
    };

    const onResultPanelChanged = (key: string) => {
        let showBasic = false;
        let showExpect = false;
        let showDiff = false;
        let showMock = false;
        switch (key) {
            case "basic":
                showBasic = true;
                break;
            case "expect":
                showExpect = true;
                break;
            case "diff":
                showDiff = true;
                break;
            case "mock":
                showMock = true;
                break;
        }
        setShowResponse({
            showBasic: showBasic,
            showExpect: showExpect,
            showDiff: showDiff,
            showMock: showMock,
        });
    };

    let executeResult = "";
    if (dataSource?.status === "PROCESSING") {
        executeResult = "执行中";
    } else {
        executeResult = dataSource?.success ? "成功" : "失败";
    }

    return (
        <div className={styles.Panel}>
            <div>
                <p className={styles.CallPanel}>调用快照</p>
                <Radio.Group style={{marginBottom: "8px"}} defaultValue="basic"
                             buttonStyle="solid"
                             onChange={(e) => {
                                 onCallPanelChanged(e.target.value);
                             }}>
                    <Radio.Button checked value="basic">基础信息</Radio.Button>
                    <Radio.Button value="request">请求参数</Radio.Button>
                    <Radio.Button value="response">返回结果</Radio.Button>
                    <Radio.Button value="subInvocations">子调用详情</Radio.Button>
                </Radio.Group>

                {
                    showCallCodeBlock ?
                        <CodeBlock value={codeBlock}/>
                        :
                        <Descriptions size="small" bordered>
                            <Descriptions.Item label="应用名"
                                               span={1}>{dataSource?.record?.appName}</Descriptions.Item>
                            <Descriptions.Item label="流量入口"
                                               span={1}>{dataSource?.record?.entranceDesc}</Descriptions.Item>
                            <Descriptions.Item label="录制机器" span={1}>{dataSource?.record?.host}</Descriptions.Item>
                            <Descriptions.Item label="TraceId"
                                               span={1}>{dataSource?.record?.traceId}</Descriptions.Item>
                            <Descriptions.Item label="录制时间"
                                               span={1}>{dataSource?.record?.gmtRecord}</Descriptions.Item>
                            <Descriptions.Item label="录制环境"
                                               span={1}>{dataSource?.record?.environment}</Descriptions.Item>
                        </Descriptions>
                }

                <Divider/>
            </div>

            <div>
                <p className={styles.ResultPanel}>回放结果</p>
                <Radio.Group style={{marginBottom: "8px"}} defaultValue="basic" buttonStyle="solid"
                             onChange={(e) => {
                                 onResultPanelChanged(e.target.value);
                             }}>
                    <Radio.Button checked value="basic">基础信息</Radio.Button>
                    <Radio.Button value="expect">差异节点</Radio.Button>
                    <Radio.Button value="diff">结果Diff</Radio.Button>
                    <Radio.Button value="mock">MOCK</Radio.Button>
                </Radio.Group>

                {
                    showResponse.showBasic &&
                    <Descriptions size="small" bordered>
                      <Descriptions.Item label="执行结果" span={1}>{executeResult}</Descriptions.Item>
                      <Descriptions.Item label="执行时间"
                                         span={1}>{dataSource?.gmtCreate}</Descriptions.Item>
                      <Descriptions.Item label="耗时"
                                         span={1}>{dataSource?.cost}ms</Descriptions.Item>
                      <Descriptions.Item label="执行环境" span={1}>{dataSource?.environment}</Descriptions.Item>
                      <Descriptions.Item label="执行机器" span={1}>{dataSource?.ip}</Descriptions.Item>
                      <Descriptions.Item label="RepeatId"
                                         span={1}>{dataSource?.repeatId}</Descriptions.Item>
                      <Descriptions.Item label="TraceId"
                                         span={1}>{dataSource?.traceId}</Descriptions.Item>
                    </Descriptions>
                }

                {
                    showResponse.showDiff &&
                    (
                        <div>
                            <Tag style={{marginBottom: "8px"}} color="magenta">预期</Tag>
                            <Tag style={{marginLeft: "780px"}} color="magenta">实际</Tag>
                            < DiffEditor
                                theme="github"
                                name="AceEditor"
                                value={diffValues}
                                editorProps={{$blockScrolling: true}}
                                enableBasicAutocompletion={true}
                                enableLiveAutocompletion={true}
                                showGutter={true}
                                showPrintMargin={false}
                                tabSize={2}
                                readOnly={true}
                                highlightActiveLine
                                width="100%"
                                fontSize={12}
                                setOptions={{useWorker: false}}
                            />
                        </div>
                    )
                }

                {
                    showResponse.showExpect &&
                    <Table rowKey={record => record.nodeName} columns={tables.expectColumns}
                           dataSource={expectDataSources}/>
                }

                {
                    showResponse.showMock &&
                    <Table rowKey={record => record.index} columns={tables.mockColumns} dataSource={mockDataSources}/>
                }
            </div>
        </div>
    );
};

export default ReplayResult;
