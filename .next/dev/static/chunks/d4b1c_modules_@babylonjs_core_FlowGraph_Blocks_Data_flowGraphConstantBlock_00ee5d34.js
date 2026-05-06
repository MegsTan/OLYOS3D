(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Data/flowGraphConstantBlock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphConstantBlock",
    ()=>FlowGraphConstantBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphBlock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$serialization$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/serialization.js [app-client] (ecmascript)");
;
;
;
;
class FlowGraphConstantBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphBlock"] {
    constructor(/**
     * the configuration of the block
     */ config){
        super(config);
        this.config = config;
        this.output = this.registerDataOutput("output", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRichTypeFromValue"])(config.value));
    }
    _updateOutputs(context) {
        this.output.setValue(this.config.value, context);
    }
    /**
     * Gets the class name of this block
     * @returns the class name
     */ getClassName() {
        return "FlowGraphConstantBlock" /* FlowGraphBlockNames.Constant */ ;
    }
    /**
     * Serializes this block
     * @param serializationObject the object to serialize to
     * @param valueSerializeFunction the function to use to serialize the value
     */ serialize(serializationObject = {}, valueSerializeFunction = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$serialization$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultValueSerializationFunction"]) {
        super.serialize(serializationObject);
        valueSerializeFunction("value", this.config.value, serializationObject.config);
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphConstantBlock" /* FlowGraphBlockNames.Constant */ , FlowGraphConstantBlock); //# sourceMappingURL=flowGraphConstantBlock.js.map
}),
]);

//# sourceMappingURL=d4b1c_modules_%40babylonjs_core_FlowGraph_Blocks_Data_flowGraphConstantBlock_00ee5d34.js.map