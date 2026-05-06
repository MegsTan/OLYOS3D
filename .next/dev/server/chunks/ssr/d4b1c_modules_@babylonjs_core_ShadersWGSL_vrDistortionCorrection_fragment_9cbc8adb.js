module.exports = [
"[project]/node_modules/@babylonjs/core/ShadersWGSL/vrDistortionCorrection.fragment.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "vrDistortionCorrectionPixelShaderWGSL",
    ()=>vrDistortionCorrectionPixelShaderWGSL
]);
// Do not edit.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Engines$2f$shaderStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Engines/shaderStore.js [app-ssr] (ecmascript)");
;
const name = "vrDistortionCorrectionPixelShader";
const shader = `#define DISABLE_UNIFORMITY_ANALYSIS
varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;uniform LensCenter: vec2f;uniform Scale: vec2f;uniform ScaleIn: vec2f;uniform HmdWarpParam: vec4f;fn HmdWarp(in01: vec2f)->vec2f {var theta: vec2f=(in01-uniforms.LensCenter)*uniforms.ScaleIn; 
var rSq: f32=theta.x*theta.x+theta.y*theta.y;var rvector: vec2f=theta*(uniforms.HmdWarpParam.x+uniforms.HmdWarpParam.y*rSq+uniforms.HmdWarpParam.z*rSq*rSq+uniforms.HmdWarpParam.w*rSq*rSq*rSq);return uniforms.LensCenter+uniforms.Scale*rvector;}
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {var tc: vec2f=HmdWarp(input.vUV);if (tc.x <0.0 || tc.x>1.0 || tc.y<0.0 || tc.y>1.0) {fragmentOutputs.color=vec4f(0.0,0.0,0.0,0.0);}
else{fragmentOutputs.color=textureSample(textureSampler,textureSamplerSampler,tc);}}`;
// Sideeffect
if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Engines$2f$shaderStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShaderStore"].ShadersStoreWGSL[name]) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Engines$2f$shaderStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShaderStore"].ShadersStoreWGSL[name] = shader;
}
const vrDistortionCorrectionPixelShaderWGSL = {
    name,
    shader
}; //# sourceMappingURL=vrDistortionCorrection.fragment.js.map
}),
];

//# sourceMappingURL=d4b1c_modules_%40babylonjs_core_ShadersWGSL_vrDistortionCorrection_fragment_9cbc8adb.js.map