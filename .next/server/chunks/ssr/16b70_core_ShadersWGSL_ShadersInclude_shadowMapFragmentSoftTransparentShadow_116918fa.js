module.exports=[79292,a=>{"use strict";var b=a.i(25562);let c="shadowMapFragmentSoftTransparentShadow",d=`#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(((fragmentInputs.position.xy)%(8.0)))))/64.0>=uniforms.softTransparentShadowSM.x*alpha) {discard;}
#endif
`;b.ShaderStore.IncludesShadersStoreWGSL[c]||(b.ShaderStore.IncludesShadersStoreWGSL[c]=d),a.s(["shadowMapFragmentSoftTransparentShadowWGSL",0,{name:c,shader:d}])}];

//# sourceMappingURL=16b70_core_ShadersWGSL_ShadersInclude_shadowMapFragmentSoftTransparentShadow_116918fa.js.map