(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/ControlFlow/flowGraphForLoopBlock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphForLoopBlock",
    ()=>FlowGraphForLoopBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphExecutionBlockWithOutSignal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/CustomTypes/flowGraphInteger.js [app-client] (ecmascript)");
;
;
;
;
;
class FlowGraphForLoopBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphExecutionBlockWithOutSignal"] {
    constructor(config){
        super(config);
        this.startIndex = this.registerDataInput("startIndex", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeAny"], 0);
        this.endIndex = this.registerDataInput("endIndex", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        this.step = this.registerDataInput("step", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeNumber"], 1);
        this.index = this.registerDataOutput("index", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTypeFlowGraphInteger"], new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphInteger"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNumericValue"])(config?.initialIndex ?? 0)));
        this.executionFlow = this._registerSignalOutput("executionFlow");
        this.completed = this._registerSignalOutput("completed");
        this._unregisterSignalOutput("out");
    }
    /**
     * @internal
     */ _execute(context) {
        const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNumericValue"])(this.startIndex.getValue(context));
        const step = this.step.getValue(context);
        let endIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNumericValue"])(this.endIndex.getValue(context));
        for(let i = index; i < endIndex; i += step){
            this.index.setValue(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphInteger"](i), context);
            this.executionFlow._activateSignal(context);
            endIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNumericValue"])(this.endIndex.getValue(context));
            if (i > FlowGraphForLoopBlock.MaxLoopIterations * step) {
                break;
            }
        }
        if (this.config?.incrementIndexWhenLoopDone) {
            this.index.setValue(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$CustomTypes$2f$flowGraphInteger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowGraphInteger"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNumericValue"])(this.index.getValue(context)) + step), context);
        }
        this.completed._activateSignal(context);
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphForLoopBlock" /* FlowGraphBlockNames.ForLoop */ ;
    }
}
/**
 * The maximum number of iterations allowed for the loop.
 * If the loop exceeds this number, it will stop. This number is configurable to avoid infinite loops.
 */ FlowGraphForLoopBlock.MaxLoopIterations = 1000;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphForLoopBlock" /* FlowGraphBlockNames.ForLoop */ , FlowGraphForLoopBlock); //# sourceMappingURL=flowGraphForLoopBlock.js.map
}),
]);

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Execution_ControlFlow_flowGraphForLoopBlock_c8f7c2e1.js.map