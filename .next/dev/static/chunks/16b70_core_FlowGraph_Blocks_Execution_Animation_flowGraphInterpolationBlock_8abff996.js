(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/Animation/flowGraphInterpolationBlock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphInterpolationBlock",
    ()=>FlowGraphInterpolationBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphBlock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Animations$2f$animation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Animations/animation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-client] (ecmascript)");
;
;
;
;
class FlowGraphInterpolationBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphBlock"] {
    constructor(config = {}){
        super(config);
        /**
         * The keyframes to interpolate between.
         * Each keyframe has a duration input and a value input.
         */ this.keyFrames = [];
        const type = typeof config?.animationType === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRichTypeByFlowGraphType"])(config.animationType) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRichTypeByAnimationType"])(config?.animationType ?? 0);
        const numberOfKeyFrames = config?.keyFramesCount ?? 1;
        const duration = this.registerDataInput(`duration_0`, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeNumber"], 0);
        const value = this.registerDataInput(`value_0`, type);
        this.keyFrames.push({
            duration,
            value
        });
        for(let i = 1; i < numberOfKeyFrames + 1; i++){
            const duration = this.registerDataInput(`duration_${i}`, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeNumber"], i === numberOfKeyFrames ? config.duration : undefined);
            const value = this.registerDataInput(`value_${i}`, type);
            this.keyFrames.push({
                duration,
                value
            });
        }
        this.initialValue = this.keyFrames[0].value;
        this.endValue = this.keyFrames[numberOfKeyFrames].value;
        this.easingFunction = this.registerDataInput("easingFunction", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.animation = this.registerDataOutput("animation", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.propertyName = this.registerDataInput("propertyName", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeAny"], config?.propertyName);
        this.customBuildAnimation = this.registerDataInput("customBuildAnimation", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeAny"]);
    }
    _updateOutputs(context) {
        const interpolationAnimations = context._getGlobalContextVariable("interpolationAnimations", []);
        const propertyName = this.propertyName.getValue(context);
        const easingFunction = this.easingFunction.getValue(context);
        const animation = this._createAnimation(context, propertyName, easingFunction);
        // If an old animation exists, it will be ignored here.
        // This is because if the animation is running and they both have the same target, the old will be stopped.
        // This doesn't happen here, it happens in the play animation block.
        this.animation.setValue(animation, context);
        // to make sure no 2 interpolations are running on the same target, we will mark the animation in the context
        if (Array.isArray(animation)) {
            for (const anim of animation){
                interpolationAnimations.push(anim.uniqueId);
            }
        } else {
            interpolationAnimations.push(animation.uniqueId);
        }
        context._setGlobalContextVariable("interpolationAnimations", interpolationAnimations);
    }
    _createAnimation(context, propertyName, easingFunction) {
        const type = this.initialValue.richType;
        const keys = [];
        // add initial value
        const currentValue = this.initialValue.getValue(context) || type.defaultValue;
        keys.push({
            frame: 0,
            value: currentValue
        });
        const numberOfKeyFrames = this.config?.numberOfKeyFrames ?? 1;
        for(let i = 1; i < numberOfKeyFrames + 1; i++){
            const duration = this.keyFrames[i].duration?.getValue(context);
            let value = this.keyFrames[i].value?.getValue(context);
            if (i === numberOfKeyFrames - 1) {
                value = value || type.defaultValue;
            }
            if (duration !== undefined && value) {
                // convert duration to frames, based on 60 fps
                keys.push({
                    frame: duration * 60,
                    value
                });
            }
        }
        const customBuildAnimation = this.customBuildAnimation.getValue(context);
        if (customBuildAnimation) {
            return customBuildAnimation(null, null, context)(keys, 60, type.animationType, easingFunction);
        }
        if (typeof propertyName === "string") {
            const animation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Animations$2f$animation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animation"].CreateAnimation(propertyName, type.animationType, 60, easingFunction);
            animation.setKeys(keys);
            return [
                animation
            ];
        } else {
            const animations = propertyName.map((name)=>{
                const animation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Animations$2f$animation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animation"].CreateAnimation(name, type.animationType, 60, easingFunction);
                animation.setKeys(keys);
                return animation;
            });
            return animations;
        }
    }
    getClassName() {
        return "FlowGraphInterpolationBlock" /* FlowGraphBlockNames.ValueInterpolation */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphInterpolationBlock" /* FlowGraphBlockNames.ValueInterpolation */ , FlowGraphInterpolationBlock); // #L54P2C
 //# sourceMappingURL=flowGraphInterpolationBlock.js.map
}),
]);

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Execution_Animation_flowGraphInterpolationBlock_8abff996.js.map