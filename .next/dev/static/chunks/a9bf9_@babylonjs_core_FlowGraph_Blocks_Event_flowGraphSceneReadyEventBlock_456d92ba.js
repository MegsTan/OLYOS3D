(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Event/flowGraphSceneReadyEventBlock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphSceneReadyEventBlock",
    ()=>FlowGraphSceneReadyEventBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphEventBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphEventBlock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-client] (ecmascript)");
;
;
class FlowGraphSceneReadyEventBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphEventBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphEventBlock"] {
    constructor(){
        super(...arguments);
        this.initPriority = -1;
        this.type = "SceneReady" /* FlowGraphEventType.SceneReady */ ;
    }
    _executeEvent(context, _payload) {
        this._execute(context);
        return true;
    }
    _preparePendingTasks(context) {
    // no-op
    }
    _cancelPendingTasks(context) {
    // no-op
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphSceneReadyEventBlock" /* FlowGraphBlockNames.SceneReadyEvent */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphSceneReadyEventBlock" /* FlowGraphBlockNames.SceneReadyEvent */ , FlowGraphSceneReadyEventBlock); //# sourceMappingURL=flowGraphSceneReadyEventBlock.js.map
}),
]);

//# sourceMappingURL=a9bf9_%40babylonjs_core_FlowGraph_Blocks_Event_flowGraphSceneReadyEventBlock_456d92ba.js.map