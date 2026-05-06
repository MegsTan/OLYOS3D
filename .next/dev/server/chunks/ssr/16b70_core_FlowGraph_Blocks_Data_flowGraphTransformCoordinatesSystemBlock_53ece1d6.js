module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Data/flowGraphTransformCoordinatesSystemBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphTransformCoordinatesSystemBlock",
    ()=>FlowGraphTransformCoordinatesSystemBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphBlock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Maths/math.vector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
;
;
;
;
class FlowGraphTransformCoordinatesSystemBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphBlock"] {
    /**
     * Creates a new FlowGraphCoordinateTransformBlock
     * @param config optional configuration for this block
     */ constructor(config){
        super(config);
        this.sourceSystem = this.registerDataInput("sourceSystem", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.destinationSystem = this.registerDataInput("destinationSystem", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.inputCoordinates = this.registerDataInput("inputCoordinates", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeVector3"]);
        this.outputCoordinates = this.registerDataOutput("outputCoordinates", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeVector3"]);
    }
    _updateOutputs(_context) {
        const sourceSystemValue = this.sourceSystem.getValue(_context);
        const destinationSystemValue = this.destinationSystem.getValue(_context);
        const inputCoordinatesValue = this.inputCoordinates.getValue(_context);
        // takes coordinates from source space to world space
        const sourceWorld = sourceSystemValue.getWorldMatrix();
        // takes coordinates from destination space to world space
        const destinationWorld = destinationSystemValue.getWorldMatrix();
        const destinationWorldInverse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TmpVectors"].Matrix[0].copyFrom(destinationWorld);
        // takes coordinates from world space to destination space
        destinationWorldInverse.invert();
        const sourceToDestination = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TmpVectors"].Matrix[1];
        // takes coordinates from source space to world space to destination space
        destinationWorldInverse.multiplyToRef(sourceWorld, sourceToDestination);
        const outputCoordinatesValue = this.outputCoordinates.getValue(_context);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"].TransformCoordinatesToRef(inputCoordinatesValue, sourceToDestination, outputCoordinatesValue);
    }
    /**
     * Gets the class name of this block
     * @returns the class name
     */ getClassName() {
        return "FlowGraphTransformCoordinatesSystemBlock" /* FlowGraphBlockNames.TransformCoordinatesSystem */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphTransformCoordinatesSystemBlock" /* FlowGraphBlockNames.TransformCoordinatesSystem */ , FlowGraphTransformCoordinatesSystemBlock); //# sourceMappingURL=flowGraphTransformCoordinatesSystemBlock.js.map
}),
];

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Data_flowGraphTransformCoordinatesSystemBlock_53ece1d6.js.map