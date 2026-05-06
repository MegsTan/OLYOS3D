(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Event/flowGraphSceneTickEventBlock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphSceneTickEventBlock",
    ()=>FlowGraphSceneTickEventBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphEventBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphEventBlock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-client] (ecmascript)");
;
;
;
class FlowGraphSceneTickEventBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphEventBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphEventBlock"] {
    constructor(){
        super();
        this.type = "SceneBeforeRender" /* FlowGraphEventType.SceneBeforeRender */ ;
        this.timeSinceStart = this.registerDataOutput("timeSinceStart", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeNumber"]);
        this.deltaTime = this.registerDataOutput("deltaTime", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeNumber"]);
    }
    /**
     * @internal
     */ _preparePendingTasks(_context) {
    // no-op
    }
    /**
     * @internal
     */ _executeEvent(context, payload) {
        this.timeSinceStart.setValue(payload.timeSinceStart, context);
        this.deltaTime.setValue(payload.deltaTime, context);
        this._execute(context);
        return true;
    }
    /**
     * @internal
     */ _cancelPendingTasks(_context) {
    // no-op
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphSceneTickEventBlock" /* FlowGraphBlockNames.SceneTickEvent */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphSceneTickEventBlock" /* FlowGraphBlockNames.SceneTickEvent */ , FlowGraphSceneTickEventBlock); //# sourceMappingURL=flowGraphSceneTickEventBlock.js.map
}),
]);

//# sourceMappingURL=a9bf9_%40babylonjs_core_FlowGraph_Blocks_Event_flowGraphSceneTickEventBlock_afcb0732.js.map