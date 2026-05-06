module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Data/flowGraphGetVariableBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphGetVariableBlock",
    ()=>FlowGraphGetVariableBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphBlock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
;
;
;
class FlowGraphGetVariableBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphBlock"] {
    /**
     * Construct a FlowGraphGetVariableBlock.
     * @param config construction parameters
     */ constructor(config){
        super(config);
        this.config = config;
        // The output connection has to have the name of the variable.
        this.value = this.registerDataOutput("value", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"], config.initialValue);
    }
    /**
     * @internal
     */ _updateOutputs(context) {
        const variableNameValue = this.config.variable;
        if (context.hasVariable(variableNameValue)) {
            this.value.setValue(context.getVariable(variableNameValue), context);
        }
    }
    /**
     * Serializes this block
     * @param serializationObject the object to serialize to
     */ serialize(serializationObject) {
        super.serialize(serializationObject);
        serializationObject.config.variable = this.config.variable;
    }
    getClassName() {
        return "FlowGraphGetVariableBlock" /* FlowGraphBlockNames.GetVariable */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphGetVariableBlock" /* FlowGraphBlockNames.GetVariable */ , FlowGraphGetVariableBlock); //# sourceMappingURL=flowGraphGetVariableBlock.js.map
}),
];

//# sourceMappingURL=a9bf9_%40babylonjs_core_FlowGraph_Blocks_Data_flowGraphGetVariableBlock_aa2f30be.js.map