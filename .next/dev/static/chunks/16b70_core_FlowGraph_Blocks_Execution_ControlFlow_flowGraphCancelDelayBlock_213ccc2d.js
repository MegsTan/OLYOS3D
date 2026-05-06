(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/ControlFlow/flowGraphCancelDelayBlock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphCancelDelayBlock",
    ()=>FlowGraphCancelDelayBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphExecutionBlockWithOutSignal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/utils.js [app-client] (ecmascript)");
;
;
;
;
class FlowGraphCancelDelayBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphExecutionBlockWithOutSignal"] {
    constructor(config){
        super(config);
        this.delayIndex = this.registerDataInput("delayIndex", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeFlowGraphInteger"]);
    }
    _execute(context, _callingSignal) {
        const delayIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNumericValue"])(this.delayIndex.getValue(context));
        if (delayIndex <= 0 || isNaN(delayIndex) || !isFinite(delayIndex)) {
            return this._reportError(context, "Invalid delay index");
        }
        const timers = context._getGlobalContextVariable("pendingDelays", []);
        const timer = timers[delayIndex];
        if (timer) {
            timer.dispose();
        // not removing it from the array. Disposing it will clear all of its resources
        }
        // activate the out output flow
        this.out._activateSignal(context);
    }
    getClassName() {
        return "FlowGraphCancelDelayBlock" /* FlowGraphBlockNames.CancelDelay */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphCancelDelayBlock" /* FlowGraphBlockNames.CancelDelay */ , FlowGraphCancelDelayBlock); //# sourceMappingURL=flowGraphCancelDelayBlock.js.map
}),
]);

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Execution_ControlFlow_flowGraphCancelDelayBlock_213ccc2d.js.map