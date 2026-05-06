module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Data/Utils/flowGraphIndexOfBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphIndexOfBlock",
    ()=>FlowGraphIndexOfBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphBlock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/CustomTypes/flowGraphInteger.js [app-ssr] (ecmascript)");
;
;
;
;
class FlowGraphIndexOfBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphBlock"] {
    /**
     * Construct a FlowGraphIndexOfBlock.
     * @param config construction parameters
     */ constructor(config){
        super(config);
        this.config = config;
        this.object = this.registerDataInput("object", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.array = this.registerDataInput("array", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.index = this.registerDataOutput("index", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeFlowGraphInteger"], new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphInteger"](-1));
    }
    /**
     * @internal
     */ _updateOutputs(context) {
        const object = this.object.getValue(context);
        const array = this.array.getValue(context);
        if (array) {
            this.index.setValue(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphInteger"](array.indexOf(object)), context);
        }
    }
    /**
     * Serializes this block
     * @param serializationObject the object to serialize to
     */ serialize(serializationObject) {
        super.serialize(serializationObject);
    }
    getClassName() {
        return "FlowGraphIndexOfBlock" /* FlowGraphBlockNames.IndexOf */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphIndexOfBlock" /* FlowGraphBlockNames.IndexOf */ , FlowGraphIndexOfBlock); //# sourceMappingURL=flowGraphIndexOfBlock.js.map
}),
];

//# sourceMappingURL=a9bf9_%40babylonjs_core_FlowGraph_Blocks_Data_Utils_flowGraphIndexOfBlock_1ffa20b4.js.map