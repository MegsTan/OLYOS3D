module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Event/flowGraphSendCustomEventBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphSendCustomEventBlock",
    ()=>FlowGraphSendCustomEventBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphExecutionBlockWithOutSignal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
;
;
class FlowGraphSendCustomEventBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphExecutionBlockWithOutSignal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphExecutionBlockWithOutSignal"] {
    constructor(/**
     * the configuration of the block
     */ config){
        super(config);
        this.config = config;
        for(const key in this.config.eventData){
            this.registerDataInput(key, this.config.eventData[key].type, this.config.eventData[key].value);
        }
    }
    _execute(context) {
        const eventId = this.config.eventId;
        // eventData is a map with the key being the data input's name, and value being the data input's value
        const eventData = {};
        for (const port of this.dataInputs){
            eventData[port.name] = port.getValue(context);
        }
        context.configuration.coordinator.notifyCustomEvent(eventId, eventData);
        this.out._activateSignal(context);
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphReceiveCustomEventBlock" /* FlowGraphBlockNames.ReceiveCustomEvent */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphReceiveCustomEventBlock" /* FlowGraphBlockNames.ReceiveCustomEvent */ , FlowGraphSendCustomEventBlock); //# sourceMappingURL=flowGraphSendCustomEventBlock.js.map
}),
];

//# sourceMappingURL=a9bf9_%40babylonjs_core_FlowGraph_Blocks_Event_flowGraphSendCustomEventBlock_8f58b46b.js.map