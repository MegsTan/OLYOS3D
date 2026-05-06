module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/Animation/flowGraphStopAnimationBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphStopAnimationBlock",
    ()=>FlowGraphStopAnimationBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$logger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/logger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphAsyncExecutionBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphAsyncExecutionBlock.js [app-ssr] (ecmascript)");
;
;
;
;
class FlowGraphStopAnimationBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphAsyncExecutionBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphAsyncExecutionBlock"] {
    constructor(config){
        super(config);
        this.animationGroup = this.registerDataInput("animationGroup", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.stopAtFrame = this.registerDataInput("stopAtFrame", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeNumber"], -1);
    }
    _preparePendingTasks(context) {
        const animationToStopValue = this.animationGroup.getValue(context);
        const stopAtFrame = this.stopAtFrame.getValue(context) ?? -1;
        // get the context variable
        const pendingStopAnimations = context._getGlobalContextVariable("pendingStopAnimations", []);
        // add the animation to the list
        pendingStopAnimations.push({
            uniqueId: animationToStopValue.uniqueId,
            stopAtFrame
        });
        // set the global context variable
        context._setGlobalContextVariable("pendingStopAnimations", pendingStopAnimations);
    }
    _cancelPendingTasks(context) {
        // remove the animation from the list
        const animationToStopValue = this.animationGroup.getValue(context);
        const pendingStopAnimations = context._getGlobalContextVariable("pendingStopAnimations", []);
        for(let i = 0; i < pendingStopAnimations.length; i++){
            if (pendingStopAnimations[i].uniqueId === animationToStopValue.uniqueId) {
                pendingStopAnimations.splice(i, 1);
                // set the global context variable
                context._setGlobalContextVariable("pendingStopAnimations", pendingStopAnimations);
                break;
            }
        }
    }
    _execute(context) {
        const animationToStopValue = this.animationGroup.getValue(context);
        const stopTime = this.stopAtFrame.getValue(context) ?? -1;
        // check the values
        if (!animationToStopValue) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$logger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Logger"].Warn("No animation group provided to stop.");
            return this._reportError(context, "No animation group provided to stop.");
        }
        if (isNaN(stopTime)) {
            return this._reportError(context, "Invalid stop time.");
        }
        if (stopTime > 0) {
            this._startPendingTasks(context);
        } else {
            this._stopAnimation(animationToStopValue, context);
        }
        // note that out will not be triggered in case of an error
        this.out._activateSignal(context);
    }
    _executeOnTick(context) {
        const animationToStopValue = this.animationGroup.getValue(context);
        // check each frame if any animation should be stopped
        const pendingStopAnimations = context._getGlobalContextVariable("pendingStopAnimations", []);
        for(let i = 0; i < pendingStopAnimations.length; i++){
            // compare the uniqueId to the animation to stop
            if (pendingStopAnimations[i].uniqueId === animationToStopValue.uniqueId) {
                // check if the current frame is AFTER the stopAtFrame
                if (animationToStopValue.getCurrentFrame() >= pendingStopAnimations[i].stopAtFrame) {
                    // stop the animation
                    this._stopAnimation(animationToStopValue, context);
                    // remove the animation from the list
                    pendingStopAnimations.splice(i, 1);
                    // set the global context variable
                    context._setGlobalContextVariable("pendingStopAnimations", pendingStopAnimations);
                    this.done._activateSignal(context);
                    context._removePendingBlock(this);
                    break;
                }
            }
        }
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphStopAnimationBlock" /* FlowGraphBlockNames.StopAnimation */ ;
    }
    _stopAnimation(animationGroup, context) {
        const currentlyRunning = context._getGlobalContextVariable("currentlyRunningAnimationGroups", []);
        const index = currentlyRunning.indexOf(animationGroup.uniqueId);
        if (index !== -1) {
            animationGroup.stop();
            currentlyRunning.splice(index, 1);
            // update the global context variable
            context._setGlobalContextVariable("currentlyRunningAnimationGroups", currentlyRunning);
        } else {
        // Logger.Warn("Trying to stop an animation that is not running.");
        // no-op for now. Probably no need to log anything here.
        }
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphStopAnimationBlock" /* FlowGraphBlockNames.StopAnimation */ , FlowGraphStopAnimationBlock); //# sourceMappingURL=flowGraphStopAnimationBlock.js.map
}),
];

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Execution_Animation_flowGraphStopAnimationBlock_dae5bc73.js.map