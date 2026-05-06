(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Event/flowGraphPointerOverEventBlock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphPointerOverEventBlock",
    ()=>FlowGraphPointerOverEventBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphEventBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphEventBlock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/utils.js [app-client] (ecmascript)");
;
;
;
;
class FlowGraphPointerOverEventBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphEventBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphEventBlock"] {
    constructor(config){
        super(config);
        this.type = "PointerOver" /* FlowGraphEventType.PointerOver */ ;
        this.pointerId = this.registerDataOutput("pointerId", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeNumber"]);
        this.targetMesh = this.registerDataInput("targetMesh", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeAny"], config?.targetMesh);
        this.meshUnderPointer = this.registerDataOutput("meshUnderPointer", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeAny"]);
    }
    _executeEvent(context, payload) {
        const mesh = this.targetMesh.getValue(context);
        this.meshUnderPointer.setValue(payload.mesh, context);
        // skip if we moved from a mesh that is under the hierarchy of the target mesh
        const skipEvent = payload.out && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_IsDescendantOf"])(payload.out, mesh);
        this.pointerId.setValue(payload.pointerId, context);
        if (!skipEvent && (payload.mesh === mesh || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_IsDescendantOf"])(payload.mesh, mesh))) {
            this._execute(context);
            return !this.config?.stopPropagation;
        }
        return true;
    }
    _preparePendingTasks(_context) {
    // no-op
    }
    _cancelPendingTasks(_context) {
    // no-op
    }
    getClassName() {
        return "FlowGraphPointerOverEventBlock" /* FlowGraphBlockNames.PointerOverEvent */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphPointerOverEventBlock" /* FlowGraphBlockNames.PointerOverEvent */ , FlowGraphPointerOverEventBlock); //# sourceMappingURL=flowGraphPointerOverEventBlock.js.map
}),
]);

//# sourceMappingURL=a9bf9_%40babylonjs_core_FlowGraph_Blocks_Event_flowGraphPointerOverEventBlock_0120125a.js.map