import {ColumnsType} from "antd/es/table";
import {DifferenceBO, MockInvocationBO} from "./service";
import {Tag} from "antd";

const expectColumns: ColumnsType<DifferenceBO> = [{
    title: "节点",
    key: "nodeName",
    dataIndex: "nodeName",
}, {
    title: "期望值",
    key: "expect",
    dataIndex: "expect",
}, {
    title: "实际值",
    key: "actual",
    dataIndex: "actual",
}, {
    title: "原因",
    key: "type",
    dataIndex: "type",
}];

const mockColumns: ColumnsType<MockInvocationBO> = [{
    title: "序号",
    key: "index",
    dataIndex: "index",
}, {
    title: "录制Identity",
    key: "originUri",
    dataIndex: "originUri",
}, {
    title: "回放Identity",
    key: "currentUri",
    dataIndex: "currentUri",
}, {
    title: "录制参数",
    key: "originArgs",
    dataIndex: "originArgs",
}, {
    title: "回放参数",
    key: "currentArgs",
    dataIndex: "currentArgs",
}, {
    title: "耗时",
    key: "cost",
    dataIndex: "cost",
}, {
    title: "状态",
    key: "index",
    dataIndex: "index",
    render: (_, record) => {
        if (record.skip) {
            return (<Tag color="default">跳过</Tag>);
        } else {
            const label = record.success ? "成功" : "失败";
            const color = record.success ? "success" : "error";
            return (<Tag color={color}>{label}</Tag>);
        }

    },
}];

const tables = {expectColumns, mockColumns};

export default tables;
