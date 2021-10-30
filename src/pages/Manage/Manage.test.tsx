import React from "react";

const dataSource: any = [{
    id: 1,
    gmtCreate: "2021-09-14 01:37:18",
    gmtModified: "2021-09-14 02:49:26",
    appName: "todo",
    environment: "prod",
    configModel: {
        useTtl: true,
        degrade: false,
        exceptionThreshold: 1000,
        sampleRate: 10000,
        pluginsPath: null,
        httpEntrancePatterns: [
            "^/todo.*$",
        ],
        javaEntranceBehaviors: [
            {
                classPattern: "com.example.todo.*",
                methodPatterns: [
                    "*",
                ],
                includeSubClasses: false,
            },
        ],
        javaSubInvokeBehaviors: [
            {
                classPattern: "com.example.todo.*",
                methodPatterns: [
                    "*",
                ],
                includeSubClasses: false,
            },
        ],
        pluginIdentities: [
            "http",
            "java-entrance",
            "java-subInvoke",
            "hibernate",
            "spring-data-jpa",
        ],
        repeatIdentities: [
            "java",
            "http",
        ],
    },
    config: "{\n  \"useTtl\" : true,\n  \"degrade\" : false,\n  \"exceptionThreshold\" : 1000,\n  \"sampleRate\" : 10000,\n  \"pluginsPath\" : null,\n  \"httpEntrancePatterns\" : [ \"^/todo.*$\" ],\n  \"javaEntranceBehaviors\" : [ {\n    \"classPattern\" : \"com.example.todo.*\",\n    \"methodPatterns\" : [ \"*\" ],\n    \"includeSubClasses\" : false\n  } ],\n  \"javaSubInvokeBehaviors\" : [ {\n    \"classPattern\" : \"com.example.todo.*\",\n    \"methodPatterns\" : [ \"*\" ],\n    \"includeSubClasses\" : false\n  } ],\n  \"pluginIdentities\" : [ \"http\", \"java-entrance\", \"java-subInvoke\",\"hibernate\", \"spring-data-jpa\" ],\n  \"repeatIdentities\" : [ \"java\", \"http\" ]\n}",
},
];

describe("配置管理页", function () {
    it("filter", () => {
    });
});
