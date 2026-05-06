(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Data/Utils/flowGraphContextBlock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphContextBlock",
    ()=>FlowGraphContextBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphBlock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-client] (ecmascript)");
;
;
;
class FlowGraphContextBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphBlock"] {
    constructor(config){
        super(config);
        this.userVariables = this.registerDataOutput("userVariables", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.executionId = this.registerDataOutput("executionId", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeNumber"]);
    }
    _updateOutputs(context) {
        this.userVariables.setValue(context.userVariables, context);
        this.executionId.setValue(context.executionId, context);
    }
    serialize(serializationObject) {
        super.serialize(serializationObject);
    }
    getClassName() {
        return "FlowGraphContextBlock" /* FlowGraphBlockNames.Context */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphContextBlock" /* FlowGraphBlockNames.Context */ , FlowGraphContextBlock); //# sourceMappingURL=flowGraphContextBlock.js.map
}),
]);

//# sourceMappingURL=a9bf9_%40babylonjs_core_FlowGraph_Blocks_Data_Utils_flowGraphContextBlock_390c9f57.js.map