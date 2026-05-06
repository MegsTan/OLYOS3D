module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/ControlFlow/flowGraphMultiGateBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphMultiGateBlock",
    ()=>FlowGraphMultiGateBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphExecutionBlock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/CustomTypes/flowGraphInteger.js [app-ssr] (ecmascript)");
;
;
;
;
class FlowGraphMultiGateBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphExecutionBlock"] {
    constructor(/**
     * the configuration of the block
     */ config){
        super(config);
        this.config = config;
        /**
         * Output connections: The output signals.
         */ this.outputSignals = [];
        this.reset = this._registerSignalInput("reset");
        this.lastIndex = this.registerDataOutput("lastIndex", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeFlowGraphInteger"], new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphInteger"](-1));
        this.setNumberOfOutputSignals(config?.outputSignalCount);
    }
    _getNextIndex(indexesUsed) {
        // find the next index available from the indexes used array
        // if all outputs were used, reset the indexes used array if we are in a loop multi gate
        if (!indexesUsed.includes(false)) {
            if (this.config.isLoop) {
                indexesUsed.fill(false);
            }
        }
        if (!this.config.isRandom) {
            return indexesUsed.indexOf(false);
        } else {
            const unusedIndexes = indexesUsed.map((used, index)=>used ? -1 : index).filter((index)=>index !== -1);
            return unusedIndexes.length ? unusedIndexes[Math.floor(Math.random() * unusedIndexes.length)] : -1;
        }
    }
    /**
     * Sets the block's output signals. Would usually be passed from the constructor but can be changed afterwards.
     * @param numberOutputSignals the number of output flows
     */ setNumberOfOutputSignals(numberOutputSignals = 1) {
        // check the size of the outFlow Array, see if it is not larger than needed
        while(this.outputSignals.length > numberOutputSignals){
            const flow = this.outputSignals.pop();
            if (flow) {
                flow.disconnectFromAll();
                this._unregisterSignalOutput(flow.name);
            }
        }
        while(this.outputSignals.length < numberOutputSignals){
            this.outputSignals.push(this._registerSignalOutput(`out_${this.outputSignals.length}`));
        }
    }
    _execute(context, callingSignal) {
        // set the state(s) of the block
        if (!context._hasExecutionVariable(this, "indexesUsed")) {
            context._setExecutionVariable(this, "indexesUsed", this.outputSignals.map(()=>false));
        }
        if (callingSignal === this.reset) {
            context._deleteExecutionVariable(this, "indexesUsed");
            this.lastIndex.setValue(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphInteger"](-1), context);
            return;
        }
        const indexesUsed = context._getExecutionVariable(this, "indexesUsed", []);
        const nextIndex = this._getNextIndex(indexesUsed);
        if (nextIndex > -1) {
            this.lastIndex.setValue(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphInteger"](nextIndex), context);
            indexesUsed[nextIndex] = true;
            context._setExecutionVariable(this, "indexesUsed", indexesUsed);
            this.outputSignals[nextIndex]._activateSignal(context);
        }
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphMultiGateBlock" /* FlowGraphBlockNames.MultiGate */ ;
    }
    /**
     * Serializes the block.
     * @param serializationObject the object to serialize to.
     */ serialize(serializationObject) {
        super.serialize(serializationObject);
        serializationObject.config.outputSignalCount = this.config.outputSignalCount;
        serializationObject.config.isRandom = this.config.isRandom;
        serializationObject.config.loop = this.config.isLoop;
        serializationObject.config.startIndex = this.config.startIndex;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphMultiGateBlock" /* FlowGraphBlockNames.MultiGate */ , FlowGraphMultiGateBlock); //# sourceMappingURL=flowGraphMultiGateBlock.js.map
}),
];

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Execution_ControlFlow_flowGraphMultiGateBlock_797ba388.js.map