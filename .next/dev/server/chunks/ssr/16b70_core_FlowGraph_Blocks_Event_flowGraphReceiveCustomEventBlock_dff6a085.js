module.exports = [
"[project]/node_modules/@babylonjs/core/FlowGraph/Blocks/Event/flowGraphReceiveCustomEventBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowGraphReceiveCustomEventBlock",
    ()=>FlowGraphReceiveCustomEventBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphEventBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphEventBlock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$tools$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/tools.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/typeStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphCoordinator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/FlowGraph/flowGraphCoordinator.js [app-ssr] (ecmascript)");
;
;
;
;
class FlowGraphReceiveCustomEventBlock extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphEventBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphEventBlock"] {
    constructor(/**
     * the configuration of the block
     */ config){
        super(config);
        this.config = config;
        this.initPriority = 1;
        // use event data to register data outputs
        for(const key in this.config.eventData){
            this.registerDataOutput(key, this.config.eventData[key].type);
        }
    }
    _preparePendingTasks(context) {
        const observable = context.configuration.coordinator.getCustomEventObservable(this.config.eventId);
        // check if we are not exceeding the max number of events
        if (observable && observable.hasObservers() && observable.observers.length > __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphCoordinator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphCoordinator"].MaxEventsPerType) {
            this._reportError(context, `FlowGraphReceiveCustomEventBlock: Too many observers for event ${this.config.eventId}. Max is ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$FlowGraph$2f$flowGraphCoordinator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowGraphCoordinator"].MaxEventsPerType}.`);
            return;
        }
        const eventObserver = observable.add((eventData)=>{
            const keys = Object.keys(eventData);
            for (const key of keys){
                this.getDataOutput(key)?.setValue(eventData[key], context);
            }
            this._execute(context);
        });
        context._setExecutionVariable(this, "_eventObserver", eventObserver);
    }
    _cancelPendingTasks(context) {
        const observable = context.configuration.coordinator.getCustomEventObservable(this.config.eventId);
        if (observable) {
            const eventObserver = context._getExecutionVariable(this, "_eventObserver", null);
            observable.remove(eventObserver);
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$tools$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tools"].Warn(`FlowGraphReceiveCustomEventBlock: Missing observable for event ${this.config.eventId}`);
        }
    }
    _executeEvent(_context, _payload) {
        return true;
    }
    /**
     * @returns class name of the block.
     */ getClassName() {
        return "FlowGraphReceiveCustomEventBlock" /* FlowGraphBlockNames.ReceiveCustomEvent */ ;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$typeStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RegisterClass"])("FlowGraphReceiveCustomEventBlock" /* FlowGraphBlockNames.ReceiveCustomEvent */ , FlowGraphReceiveCustomEventBlock); //# sourceMappingURL=flowGraphReceiveCustomEventBlock.js.map
}),
];

//# sourceMappingURL=16b70_core_FlowGraph_Blocks_Event_flowGraphReceiveCustomEventBlock_dff6a085.js.map