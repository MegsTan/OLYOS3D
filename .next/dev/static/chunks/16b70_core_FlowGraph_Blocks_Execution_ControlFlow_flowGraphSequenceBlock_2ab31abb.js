(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/ControlFlow/flowGraphSequenceBlock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphSequenceBlock",
    ()=>FlowGraphSequenceBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphExecutionBlock.js [app-client] (ecmascript)");
;
;
class FlowGraphSequenceBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphExecutionBlock"] {
    constructor(/**
     * the configuration of the block
     */ config){
        super(config);
        this.config = config;
        /**
         * The output flows.
         */ this.executionSignals = [];
        this.setNumberOfOutputSignals(this.config.outputSignalCount);
    }
    _execute(context) {
        for(let i = 0; i < this.executionSignals.length; i++){
            this.executionSignals[i]._activateSignal(context);
        }
    }
    /**
     * Sets the block's output flows. Would usually be passed from the constructor but can be changed afterwards.
     * @param outputSignalCount the number of output flows
     */ setNumberOfOutputSignals(outputSignalCount = 1) {
        // check the size of the outFlow Array, see if it is not larger than needed
        while(this.executionSignals.length > outputSignalCount){
            const flow = this.executionSignals.pop();
            if (flow) {
                flow.disconnectFromAll();
                this._unregisterSignalOutput(flow.name);
            }
        }
        while(this.executionSignals.length < outputSignalCount){
            this.executionSignals.push(this._registerSignalOutput(`out_${this.executionSignals.length}`));
        }
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphSequenceBlock" /* FlowGraphBlockNames.Sequence */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphSequenceBlock" /* FlowGraphBlockNames.Sequence */ , FlowGraphSequenceBlock); //# sourceMappingURL=flowGraphSequenceBlock.js.map
}),
]);

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Execution_ControlFlow_flowGraphSequenceBlock_2ab31abb.js.map