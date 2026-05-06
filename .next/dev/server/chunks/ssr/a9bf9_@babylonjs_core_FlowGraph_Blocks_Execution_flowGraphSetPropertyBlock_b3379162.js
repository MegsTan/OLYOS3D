module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/flowGraphSetPropertyBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphSetPropertyBlock",
    ()=>FlowGraphSetPropertyBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphExecutionBlockWithOutSignal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
;
;
;
class FlowGraphSetPropertyBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphExecutionBlockWithOutSignal"] {
    constructor(/**
     * the configuration of the block
     */ config){
        super(config);
        this.config = config;
        this.object = this.registerDataInput("object", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"], config.target);
        this.value = this.registerDataInput("value", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.propertyName = this.registerDataInput("propertyName", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"], config.propertyName);
        this.customSetFunction = this.registerDataInput("customSetFunction", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
    }
    _execute(context, _callingSignal) {
        try {
            const target = this.object.getValue(context);
            const value = this.value.getValue(context);
            const propertyName = this.propertyName.getValue(context);
            this._stopRunningAnimations(context, target, propertyName);
            const setFunction = this.customSetFunction.getValue(context);
            if (setFunction) {
                setFunction(target, propertyName, value, context);
            } else {
                this._setPropertyValue(target, propertyName, value);
            }
        } catch (e) {
            this._reportError(context, e);
        }
        this.out._activateSignal(context);
    }
    _stopRunningAnimations(context, target, propertyName) {
        const currentlyRunningAnimationGroups = context._getGlobalContextVariable("currentlyRunningAnimationGroups", []);
        for (const uniqueId of currentlyRunningAnimationGroups){
            const animationGroup = context.assetsContext.animationGroups.find((animationGroup)=>animationGroup.uniqueId === uniqueId);
            if (animationGroup) {
                for (const targetedAnimations of animationGroup.targetedAnimations){
                    if (targetedAnimations.target === target && targetedAnimations.animation.targetProperty === propertyName) {
                        animationGroup.stop(true);
                        animationGroup.dispose();
                        const index = currentlyRunningAnimationGroups.indexOf(uniqueId);
                        if (index !== -1) {
                            currentlyRunningAnimationGroups.splice(index, 1);
                            context._setGlobalContextVariable("currentlyRunningAnimationGroups", currentlyRunningAnimationGroups);
                        }
                    }
                }
            }
        }
    }
    _setPropertyValue(target, propertyName, value) {
        const path = propertyName.split(".");
        let obj = target;
        for(let i = 0; i < path.length - 1; i++){
            const prop = path[i];
            if (obj[prop] === undefined) {
                obj[prop] = {};
            }
            obj = obj[prop];
        }
        obj[path[path.length - 1]] = value;
    }
    getClassName() {
        return "FlowGraphSetPropertyBlock" /* FlowGraphBlockNames.SetProperty */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphSetPropertyBlock" /* FlowGraphBlockNames.SetProperty */ , FlowGraphSetPropertyBlock); //# sourceMappingURL=flowGraphSetPropertyBlock.js.map
}),
];

//# sourceMappingURL=a9bf9_%40babylonjs_core_FlowGraph_Blocks_Execution_flowGraphSetPropertyBlock_b3379162.js.map