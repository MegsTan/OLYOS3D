module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Execution/ControlFlow/flowGraphSwitchBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphSwitchBlock",
    ()=>FlowGraphSwitchBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphExecutionBlock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphRichTypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/utils.js [app-ssr] (ecmascript)");
;
;
;
;
class FlowGraphSwitchBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphExecutionBlock"] {
    constructor(/**
     * the configuration of the block
     */ config){
        super(config);
        this.config = config;
        /**
         * The default case to execute if no other case is found.
         */ this.default = this._registerSignalOutput("default");
        this._caseToOutputFlow = new Map();
        this.case = this.registerDataInput("case", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphRichTypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTypeAny"]);
        // iterate the set not using for of
        const array = this.config.cases || [];
        for (const caseValue of array){
            this._caseToOutputFlow.set(caseValue, this._registerSignalOutput(`out_${caseValue}`));
        }
    }
    _execute(context, _callingSignal) {
        const selectionValue = this.case.getValue(context);
        let outputFlow;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNumeric"])(selectionValue)) {
            outputFlow = this._getOutputFlowForCase((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNumericValue"])(selectionValue));
        } else {
            outputFlow = this._getOutputFlowForCase(selectionValue);
        }
        if (outputFlow) {
            outputFlow._activateSignal(context);
        } else {
            this.default._activateSignal(context);
        }
    }
    /**
     * Adds a new case to the switch block.
     * @param newCase the new case to add.
     */ addCase(newCase) {
        if (this.config.cases.includes(newCase)) {
            return;
        }
        this.config.cases.push(newCase);
        this._caseToOutputFlow.set(newCase, this._registerSignalOutput(`out_${newCase}`));
    }
    /**
     * Removes a case from the switch block.
     * @param caseToRemove the case to remove.
     */ removeCase(caseToRemove) {
        if (!this.config.cases.includes(caseToRemove)) {
            return;
        }
        const index = this.config.cases.indexOf(caseToRemove);
        this.config.cases.splice(index, 1);
        this._caseToOutputFlow.delete(caseToRemove);
    }
    /**
     * @internal
     */ _getOutputFlowForCase(caseValue) {
        return this._caseToOutputFlow.get(caseValue);
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphSwitchBlock" /* FlowGraphBlockNames.Switch */ ;
    }
    /**
     * Serialize the block to a JSON representation.
     * @param serializationObject the object to serialize to.
     */ serialize(serializationObject) {
        super.serialize(serializationObject);
        serializationObject.cases = this.config.cases;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphSwitchBlock" /* FlowGraphBlockNames.Switch */ , FlowGraphSwitchBlock); //# sourceMappingURL=flowGraphSwitchBlock.js.map
}),
];

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Execution_ControlFlow_flowGraphSwitchBlock_87491c0b.js.map