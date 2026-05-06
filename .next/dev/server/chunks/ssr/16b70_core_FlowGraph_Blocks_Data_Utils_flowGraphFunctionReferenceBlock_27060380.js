module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Data/Utils/flowGraphFunctionReferenceBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphFunctionReferenceBlock",
    ()=>FlowGraphFunctionReferenceBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphBlock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
;
;
;
class FlowGraphFunctionReferenceBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphBlock"] {
    constructor(/**
     * the configuration of the block
     */ config){
        super(config);
        this.functionName = this.registerDataInput("functionName", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeString"]);
        this.object = this.registerDataInput("object", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.context = this.registerDataInput("context", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"], null);
        this.output = this.registerDataOutput("output", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
    }
    _updateOutputs(context) {
        const functionName = this.functionName.getValue(context);
        const object = this.object.getValue(context);
        const contextValue = this.context.getValue(context);
        if (object && functionName) {
            const func = object[functionName];
            if (func && typeof func === "function") {
                this.output.setValue(func.bind(contextValue), context);
            }
        }
    }
    getClassName() {
        return "FlowGraphFunctionReference" /* FlowGraphBlockNames.FunctionReference */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphFunctionReference" /* FlowGraphBlockNames.FunctionReference */ , FlowGraphFunctionReferenceBlock); //# sourceMappingURL=flowGraphFunctionReferenceBlock.js.map
}),
];

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Data_Utils_flowGraphFunctionReferenceBlock_27060380.js.map