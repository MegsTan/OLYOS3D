module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/flowGraphSetVariableBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphSetVariableBlock",
    ()=>FlowGraphSetVariableBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphExecutionBlockWithOutSignal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
;
;
;
class FlowGraphSetVariableBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphExecutionBlockWithOutSignal"] {
    constructor(config){
        super(config);
        // check if the variable is defined
        if (!config.variable && !config.variables) {
            throw new Error("FlowGraphSetVariableBlock: variable/variables is not defined");
        }
        // check if the variable is an array
        if (config.variables && config.variable) {
            throw new Error("FlowGraphSetVariableBlock: variable and variables are both defined");
        }
        // check if we have either a variable or variables. If we have variables, set the inputs correctly
        if (config.variables) {
            for (const variable of config.variables){
                this.registerDataInput(variable, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
            }
        } else {
            this.registerDataInput("value", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        }
    }
    _execute(context, _callingSignal) {
        if (this.config?.variables) {
            for (const variable of this.config.variables){
                this._saveVariable(context, variable);
            }
        } else {
            this._saveVariable(context, this.config?.variable, "value");
        }
        this.out._activateSignal(context);
    }
    _saveVariable(context, variableName, inputName) {
        // check if there is an animation(group) running on this variable. If there is, stop the animation - a value was force-set.
        const currentlyRunningAnimationGroups = context._getGlobalContextVariable("currentlyRunningAnimationGroups", []);
        for (const animationUniqueId of currentlyRunningAnimationGroups){
            const animationGroup = context.assetsContext.animationGroups.find((animationGroup)=>animationGroup.uniqueId == animationUniqueId);
            if (animationGroup) {
                // check if there is a target animation that has the target set to be the context
                for (const targetAnimation of animationGroup.targetedAnimations){
                    // check if the target property is the variable we are setting
                    if (targetAnimation.target === context) {
                        // check the variable name
                        if (targetAnimation.animation.targetProperty === variableName) {
                            // stop the animation
                            animationGroup.stop();
                            // remove the animation from the currently running animations
                            const index = currentlyRunningAnimationGroups.indexOf(animationUniqueId);
                            if (index > -1) {
                                currentlyRunningAnimationGroups.splice(index, 1);
                            }
                            context._setGlobalContextVariable("currentlyRunningAnimationGroups", currentlyRunningAnimationGroups);
                            break;
                        }
                    }
                }
            }
        }
        const value = this.getDataInput(inputName || variableName)?.getValue(context);
        context.setVariable(variableName, value);
    }
    getClassName() {
        return "FlowGraphSetVariableBlock" /* FlowGraphBlockNames.SetVariable */ ;
    }
    serialize(serializationObject) {
        super.serialize(serializationObject);
        serializationObject.config.variable = this.config?.variable;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphSetVariableBlock" /* FlowGraphBlockNames.SetVariable */ , FlowGraphSetVariableBlock); //# sourceMappingURL=flowGraphSetVariableBlock.js.map
}),
];

//# sourceMappingURL=a9bf9_%40babylonjs_core_FlowGraph_Blocks_Execution_flowGraphSetVariableBlock_aac22fbb.js.map