module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/ControlFlow/flowGraphWaitAllBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphWaitAllBlock",
    ()=>FlowGraphWaitAllBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphExecutionBlockWithOutSignal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/CustomTypes/flowGraphInteger.js [app-ssr] (ecmascript)");
;
;
;
;
class FlowGraphWaitAllBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphExecutionBlockWithOutSignal"] {
    constructor(/**
     * the configuration of the block
     */ config){
        super(config);
        this.config = config;
        /**
         * An array of input signals
         */ this.inFlows = [];
        this._cachedActivationState = [];
        this.reset = this._registerSignalInput("reset");
        this.completed = this._registerSignalOutput("completed");
        this.remainingInputs = this.registerDataOutput("remainingInputs", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeFlowGraphInteger"], new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphInteger"](this.config.inputSignalCount || 0));
        // The first inFlow is the default input signal all execution blocks have
        for(let i = 0; i < this.config.inputSignalCount; i++){
            this.inFlows.push(this._registerSignalInput(`in_${i}`));
        }
        // no need for in
        this._unregisterSignalInput("in");
    }
    _getCurrentActivationState(context) {
        const activationState = this._cachedActivationState;
        activationState.length = 0;
        if (!context._hasExecutionVariable(this, "activationState")) {
            for(let i = 0; i < this.config.inputSignalCount; i++){
                activationState.push(false);
            }
        } else {
            const contextActivationState = context._getExecutionVariable(this, "activationState", []);
            for(let i = 0; i < contextActivationState.length; i++){
                activationState.push(contextActivationState[i]);
            }
        }
        return activationState;
    }
    _execute(context, callingSignal) {
        const activationState = this._getCurrentActivationState(context);
        if (callingSignal === this.reset) {
            for(let i = 0; i < this.config.inputSignalCount; i++){
                activationState[i] = false;
            }
        } else {
            const index = this.inFlows.indexOf(callingSignal);
            if (index >= 0) {
                activationState[index] = true;
            }
        }
        this.remainingInputs.setValue(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphInteger"](activationState.filter((v)=>!v).length), context);
        context._setExecutionVariable(this, "activationState", activationState.slice());
        if (!activationState.includes(false)) {
            this.completed._activateSignal(context);
            for(let i = 0; i < this.config.inputSignalCount; i++){
                activationState[i] = false;
            }
        } else {
            callingSignal !== this.reset && this.out._activateSignal(context);
        }
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphWaitAllBlock" /* FlowGraphBlockNames.WaitAll */ ;
    }
    /**
     * Serializes this block into a object
     * @param serializationObject the object to serialize to
     */ serialize(serializationObject) {
        super.serialize(serializationObject);
        serializationObject.config.inputFlows = this.config.inputSignalCount;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphWaitAllBlock" /* FlowGraphBlockNames.WaitAll */ , FlowGraphWaitAllBlock); //# sourceMappingURL=flowGraphWaitAllBlock.js.map
}),
];

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Execution_ControlFlow_flowGraphWaitAllBlock_3f005dcc.js.map