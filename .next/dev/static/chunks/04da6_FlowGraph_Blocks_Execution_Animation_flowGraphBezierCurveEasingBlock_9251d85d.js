(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/Animation/flowGraphBezierCurveEasingBlock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphBezierCurveEasingBlock",
    ()=>FlowGraphBezierCurveEasingBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Animations$2f$easing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Animations/easing.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphBlock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-client] (ecmascript)");
;
;
;
;
class FlowGraphBezierCurveEasingBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphBlock"] {
    constructor(/**
     * the configuration of the block
     */ config){
        super(config);
        this.config = config;
        /**
         * Internal cache of reusable easing functions.
         * key is type-mode-properties
         */ this._easingFunctions = {};
        this.mode = this.registerDataInput("mode", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeNumber"], 0);
        this.controlPoint1 = this.registerDataInput("controlPoint1", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeVector2"]);
        this.controlPoint2 = this.registerDataInput("controlPoint2", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeVector2"]);
        this.easingFunction = this.registerDataOutput("easingFunction", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeAny"]);
    }
    _updateOutputs(context) {
        const mode = this.mode.getValue(context);
        const controlPoint1 = this.controlPoint1.getValue(context);
        const controlPoint2 = this.controlPoint2.getValue(context);
        if (mode === undefined) {
            return;
        }
        const key = `${mode}-${controlPoint1.x}-${controlPoint1.y}-${controlPoint2.x}-${controlPoint2.y}`;
        if (!this._easingFunctions[key]) {
            const easing = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Animations$2f$easing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BezierCurveEase"](controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y);
            easing.setEasingMode(mode);
            this._easingFunctions[key] = easing;
        }
        this.easingFunction.setValue(this._easingFunctions[key], context);
    }
    getClassName() {
        return "FlowGraphBezierCurveEasing" /* FlowGraphBlockNames.BezierCurveEasing */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphBezierCurveEasing" /* FlowGraphBlockNames.BezierCurveEasing */ , FlowGraphBezierCurveEasingBlock); //# sourceMappingURL=flowGraphBezierCurveEasingBlock.js.map
}),
]);

//# sourceMappingURL=04da6_FlowGraph_Blocks_Execution_Animation_flowGraphBezierCurveEasingBlock_9251d85d.js.map