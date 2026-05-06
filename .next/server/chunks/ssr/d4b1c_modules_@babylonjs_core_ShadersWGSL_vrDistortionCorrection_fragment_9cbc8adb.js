module.exports=[18198,a=>{"use strict";var b=a.i(25562);let c="vrDistortionCorrectionPixelShader",d=`#define DISABLE_UNIFORMITY_ANALYSIS
varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;uniform LensCenter: vec2f;uniform Scale: vec2f;uniform ScaleIn: vec2f;uniform HmdWarpParam: vec4f;fn HmdWarp(in01: vec2f)->vec2f {var theta: vec2f=(in01-uniforms.LensCenter)*uniforms.ScaleIn; 
var rSq: f32=theta.x*theta.x+theta.y*theta.y;var rvector: vec2f=theta*(uniforms.HmdWarpParam.x+uniforms.HmdWarpParam.y*rSq+uniforms.HmdWarpParam.z*rSq*rSq+uniforms.HmdWarpParam.w*rSq*rSq*rSq);return uniforms.LensCenter+uniforms.Scale*rvector;}
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {var tc: vec2f=HmdWarp(input.vUV);if (tc.x <0.0 || tc.x>1.0 || tc.y<0.0 || tc.y>1.0) {fragmentOutputs.color=vec4f(0.0,0.0,0.0,0.0);}
else{fragmentOutputs.color=textureSample(textureSampler,textureSamplerSampler,tc);}}`;b.ShaderStore.ShadersStoreWGSL[c]||(b.ShaderStore.ShadersStoreWGSL[c]=d),a.s(["vrDistortionCorrectionPixelShaderWGSL",0,{name:c,shader:d}])}];

//# sourceMappingURL=d4b1c_modules_%40babylonjs_core_ShadersWGSL_vrDistortionCorrection_fragment_9cbc8adb.js.map