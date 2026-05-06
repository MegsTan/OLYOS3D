(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@babylonjs/core/ShadersWGSL/ShadersInclude/shadowMapFragmentSoftTransparentShadow.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "shadowMapFragmentSoftTransparentShadowWGSL",
    ()=>shadowMapFragmentSoftTransparentShadowWGSL
]);
// Do not edit.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Engines$2f$shaderStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Engines/shaderStore.js [app-client] (ecmascript)");
;
const name = "shadowMapFragmentSoftTransparentShadow";
const shader = `#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(((fragmentInputs.position.xy)%(8.0)))))/64.0>=uniforms.softTransparentShadowSM.x*alpha) {discard;}
#endif
`;
// Sideeffect
if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Engines$2f$shaderStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderStore"].IncludesShadersStoreWGSL[name]) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Engines$2f$shaderStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderStore"].IncludesShadersStoreWGSL[name] = shader;
}
const shadowMapFragmentSoftTransparentShadowWGSL = {
    name,
    shader
}; //# sourceMappingURL=shadowMapFragmentSoftTransparentShadow.js.map
}),
]);

//# sourceMappingURL=16b70_core_ShadersWGSL_ShadersInclude_shadowMapFragmentSoftTransparentShadow_1505840a.js.map