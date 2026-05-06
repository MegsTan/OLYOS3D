module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Event/flowGraphMeshPickEventBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphMeshPickEventBlock",
    ()=>FlowGraphMeshPickEventBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphEventBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphEventBlock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Events$2f$pointerEvents$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Events/pointerEvents.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
;
;
;
;
;
class FlowGraphMeshPickEventBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphEventBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphEventBlock"] {
    constructor(/**
     * the configuration of the block
     */ config){
        super(config);
        this.config = config;
        /**
         * the type of the event this block reacts to
         */ this.type = "MeshPick" /* FlowGraphEventType.MeshPick */ ;
        this.asset = this.registerDataInput("asset", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"], config?.targetMesh);
        this.pickedPoint = this.registerDataOutput("pickedPoint", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeVector3"]);
        this.pickOrigin = this.registerDataOutput("pickOrigin", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeVector3"]);
        this.pointerId = this.registerDataOutput("pointerId", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeNumber"]);
        this.pickedMesh = this.registerDataOutput("pickedMesh", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.pointerType = this.registerDataInput("pointerType", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Events$2f$pointerEvents$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointerEventTypes"].POINTERPICK);
    }
    _getReferencedMesh(context) {
        return this.asset.getValue(context);
    }
    _executeEvent(context, pickedInfo) {
        // get the pointer type
        const pointerType = this.pointerType.getValue(context);
        if (pointerType !== pickedInfo.type) {
            // returning true here to continue the propagation of the pointer event to the rest of the blocks
            return true;
        }
        // check if the mesh is the picked mesh or a descendant
        const mesh = this._getReferencedMesh(context);
        if (mesh && pickedInfo.pickInfo?.pickedMesh && (pickedInfo.pickInfo?.pickedMesh === mesh || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_IsDescendantOf"])(pickedInfo.pickInfo?.pickedMesh, mesh))) {
            this.pointerId.setValue(pickedInfo.event.pointerId, context);
            this.pickOrigin.setValue(pickedInfo.pickInfo.ray?.origin, context);
            this.pickedPoint.setValue(pickedInfo.pickInfo.pickedPoint, context);
            this.pickedMesh.setValue(pickedInfo.pickInfo.pickedMesh, context);
            this._execute(context);
            // stop the propagation if the configuration says so
            return !this.config?.stopPropagation;
        } else {
            // reset the outputs
            this.pointerId.resetToDefaultValue(context);
            this.pickOrigin.resetToDefaultValue(context);
            this.pickedPoint.resetToDefaultValue(context);
            this.pickedMesh.resetToDefaultValue(context);
        }
        return true;
    }
    /**
     * @internal
     */ _preparePendingTasks(_context) {
    // no-op
    }
    /**
     * @internal
     */ _cancelPendingTasks(_context) {
    // no-op
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphMeshPickEventBlock" /* FlowGraphBlockNames.MeshPickEvent */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphMeshPickEventBlock" /* FlowGraphBlockNames.MeshPickEvent */ , FlowGraphMeshPickEventBlock); //# sourceMappingURL=flowGraphMeshPickEventBlock.js.map
}),
];

//# sourceMappingURL=a9bf9_%40babylonjs_core_FlowGraph_Blocks_Event_flowGraphMeshPickEventBlock_4a0100de.js.map