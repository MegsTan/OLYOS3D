module.exports=[22084,a=>{"use strict";var b=a.i(25562);let c="shadowMapFragmentSoftTransparentShadow",d=`#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM.x*alpha) discard;
#endif
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s(["shadowMapFragmentSoftTransparentShadow",0,{name:c,shader:d}])}];

//# sourceMappingURL=16b70_core_Shaders_ShadersInclude_shadowMapFragmentSoftTransparentShadow_12044b68.js.map