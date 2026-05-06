module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/ControlFlow/flowGraphThrottleBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphThrottleBlock",
    ()=>FlowGraphThrottleBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphExecutionBlockWithOutSignal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
;
;
;
class FlowGraphThrottleBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphExecutionBlockWithOutSignal"] {
    constructor(config){
        super(config);
        this.reset = this._registerSignalInput("reset");
        this.duration = this.registerDataInput("duration", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeNumber"]);
        this.lastRemainingTime = this.registerDataOutput("lastRemainingTime", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeNumber"], NaN);
    }
    _execute(context, callingSignal) {
        if (callingSignal === this.reset) {
            this.lastRemainingTime.setValue(NaN, context);
            context._setExecutionVariable(this, "lastRemainingTime", NaN);
            context._setExecutionVariable(this, "timestamp", 0);
            return;
        }
        // in seconds
        const durationValue = this.duration.getValue(context);
        if (durationValue <= 0 || isNaN(durationValue) || !isFinite(durationValue)) {
            return this._reportError(context, "Invalid duration in Throttle block");
        }
        const lastRemainingTime = context._getExecutionVariable(this, "lastRemainingTime", NaN);
        // Using Date.now() to get ms since epoch. not using performance.now() because its precision is not needed here
        const currentTime = Date.now();
        if (isNaN(lastRemainingTime)) {
            this.lastRemainingTime.setValue(0, context);
            context._setExecutionVariable(this, "lastRemainingTime", 0);
            context._setExecutionVariable(this, "timestamp", currentTime);
            // according to glTF interactivity specs
            return this.out._activateSignal(context);
        } else {
            const elapsedTime = currentTime - context._getExecutionVariable(this, "timestamp", 0);
            // duration is in seconds, so we need to multiply by 1000
            const durationInMs = durationValue * 1000;
            if (durationInMs <= elapsedTime) {
                this.lastRemainingTime.setValue(0, context);
                context._setExecutionVariable(this, "lastRemainingTime", 0);
                context._setExecutionVariable(this, "timestamp", currentTime);
                return this.out._activateSignal(context);
            } else {
                const remainingTime = durationInMs - elapsedTime;
                // output is in seconds
                this.lastRemainingTime.setValue(remainingTime / 1000, context);
                context._setExecutionVariable(this, "lastRemainingTime", remainingTime);
            }
        }
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphThrottleBlock" /* FlowGraphBlockNames.Throttle */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphThrottleBlock" /* FlowGraphBlockNames.Throttle */ , FlowGraphThrottleBlock); //# sourceMappingURL=flowGraphThrottleBlock.js.map
}),
];

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Execution_ControlFlow_flowGraphThrottleBlock_fa603a83.js.map