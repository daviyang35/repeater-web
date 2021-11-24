const contentTemplate = {
    "degrade": false,
    "exceptionThreshold": 1000,
    "httpEntrancePatterns": [
        "^/regress/.*$",
    ],
    "javaEntranceBehaviors": [
        {
            "classPattern": "com.alibaba.repeater.console.service.impl.RegressServiceImpl",
            "includeSubClasses": false,
            "methodPatterns": [
                "getRegress",
            ],
        },
    ],
    "javaSubInvokeBehaviors": [
        {
            "classPattern": "com.alibaba.repeater.console.service.impl.RegressServiceImpl",
            "includeSubClasses": false,
            "methodPatterns": [
                "getRegressInner",
            ],
        },
        {
            "classPattern": "com.alibaba.repeater.console.service.impl.RegressServiceImpl",
            "includeSubClasses": false,
            "methodPatterns": [
                "findPartner",
            ],
        },
        {
            "classPattern": "com.alibaba.repeater.console.service.impl.RegressServiceImpl",
            "includeSubClasses": false,
            "methodPatterns": [
                "slogan",
            ],
        },
    ],
    "pluginIdentities": [
        "mybatis",
        "apache-http-client",
        "hibernate",
        "spring-data-jpa",
        "dubbo",
        "redis",
        "ibatis",
        "okhttp",
        "http",
        "caffeine-cache",
        "eh-cache",
        "guava-cache",
        "java",
        "socketio",
    ],
    "repeatIdentities": [
        "java",
        "http",
        "dubbo",
    ],
    "sampleRate": 10000,
    "useTtl": true,
};

export default contentTemplate;
