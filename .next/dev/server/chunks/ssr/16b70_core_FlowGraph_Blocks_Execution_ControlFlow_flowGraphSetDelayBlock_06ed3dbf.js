module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/ControlFlow/flowGraphSetDelayBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphSetDelayBlock",
    ()=>FlowGraphSetDelayBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphAsyncExecutionBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphAsyncExecutionBlock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$timer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/timer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$logger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/logger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/CustomTypes/flowGraphInteger.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
class FlowGraphSetDelayBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphAsyncExecutionBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphAsyncExecutionBlock"] {
    constructor(config){
        super(config);
        this.cancel = this._registerSignalInput("cancel");
        this.duration = this.registerDataInput("duration", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeNumber"]);
        this.lastDelayIndex = this.registerDataOutput("lastDelayIndex", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeFlowGraphInteger"], new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphInteger"](-1));
    }
    _preparePendingTasks(context) {
        const duration = this.duration.getValue(context);
        if (duration < 0 || isNaN(duration) || !isFinite(duration)) {
            return this._reportError(context, "Invalid duration in SetDelay block");
        }
        // active delays are global to the context
        const activeDelays = context._getGlobalContextVariable("activeDelays", 0);
        if (activeDelays >= FlowGraphSetDelayBlock.MaxParallelDelayCount) {
            return this._reportError(context, "Max parallel delays reached");
        }
        // get the last global delay index
        const lastDelayIndex = context._getGlobalContextVariable("lastDelayIndex", -1);
        // these are block-specific and not global
        const timers = context._getExecutionVariable(this, "pendingDelays", []);
        const scene = context.configuration.scene;
        const timer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$timer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdvancedTimer"]({
            timeout: duration * 1000,
            contextObservable: scene.onBeforeRenderObservable,
            onEnded: ()=>this._onEnded(timer, context)
        });
        timer.start();
        const newIndex = lastDelayIndex + 1;
        this.lastDelayIndex.setValue(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphInteger"](newIndex), context);
        context._setGlobalContextVariable("lastDelayIndex", newIndex);
        timers[newIndex] = timer;
        context._setExecutionVariable(this, "pendingDelays", timers);
        this._updateGlobalTimers(context);
    }
    _cancelPendingTasks(context) {
        const timers = context._getExecutionVariable(this, "pendingDelays", []);
        for (const timer of timers){
            timer?.dispose();
        }
        context._deleteExecutionVariable(this, "pendingDelays");
        this.lastDelayIndex.setValue(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphInteger"](-1), context);
        this._updateGlobalTimers(context);
    }
    _execute(context, callingSignal) {
        if (callingSignal === this.cancel) {
            this._cancelPendingTasks(context);
            return;
        } else {
            this._preparePendingTasks(context);
            this.out._activateSignal(context);
        }
    }
    getClassName() {
        return "FlowGraphSetDelayBlock" /* FlowGraphBlockNames.SetDelay */ ;
    }
    _onEnded(timer, context) {
        const timers = context._getExecutionVariable(this, "pendingDelays", []);
        const index = timers.indexOf(timer);
        if (index !== -1) {
            timers.splice(index, 1);
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$logger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Logger"].Warn("FlowGraphTimerBlock: Timer ended but was not found in the running timers list");
        }
        context._removePendingBlock(this);
        this.done._activateSignal(context);
        this._updateGlobalTimers(context);
    }
    _updateGlobalTimers(context) {
        const timers = context._getExecutionVariable(this, "pendingDelays", []);
        const globalTimers = context._getGlobalContextVariable("pendingDelays", []);
        // there should NEVER be the same index in the global and local timers, unless they are equal
        for(let i = 0; i < timers.length; i++){
            if (!timers[i]) {
                continue;
            }
            const timer = timers[i];
            if (globalTimers[i] && globalTimers[i] !== timer) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$logger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Logger"].Warn("FlowGraphTimerBlock: Timer ended but was not found in the running timers list");
            } else {
                globalTimers[i] = timer;
            }
        }
        context._setGlobalContextVariable("pendingDelays", globalTimers);
    }
}
/**
 * The maximum number of parallel delays that can be set per node.
 */ FlowGraphSetDelayBlock.MaxParallelDelayCount = 100;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphSetDelayBlock" /* FlowGraphBlockNames.SetDelay */ , FlowGraphSetDelayBlock); //# sourceMappingURL=flowGraphSetDelayBlock.js.map
}),
];

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Execution_ControlFlow_flowGraphSetDelayBlock_06ed3dbf.js.map