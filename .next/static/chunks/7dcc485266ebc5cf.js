(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,47662,e=>{"use strict";class t{static GetShadersRepository(e=0){return 0===e?t.ShadersRepository:t.ShadersRepositoryWGSL}static GetShadersStore(e=0){return 0===e?t.ShadersStore:t.ShadersStoreWGSL}static GetIncludesShadersStore(e=0){return 0===e?t.IncludesShadersStore:t.IncludesShadersStoreWGSL}}t.ShadersRepository="src/Shaders/",t.ShadersStore={},t.IncludesShadersStore={},t.ShadersRepositoryWGSL="src/ShadersWGSL/",t.ShadersStoreWGSL={},t.IncludesShadersStoreWGSL={},e.s(["ShaderStore",()=>t])},87714,e=>{"use strict";var t=e.i(47662);let i="helperFunctions",r=`const float PI=3.1415926535897932384626433832795;const float TWO_PI=6.283185307179586;const float HALF_PI=1.5707963267948966;const float RECIPROCAL_PI=0.3183098861837907;const float RECIPROCAL_PI2=0.15915494309189535;const float RECIPROCAL_PI4=0.07957747154594767;const float HALF_MIN=5.96046448e-08; 
const float LinearEncodePowerApprox=2.2;const float GammaEncodePowerApprox=1.0/LinearEncodePowerApprox;const vec3 LuminanceEncodeApprox=vec3(0.2126,0.7152,0.0722);const float Epsilon=0.0000001;
#define saturate(x) clamp(x,0.0,1.0)
#define absEps(x) abs(x)+Epsilon
#define maxEps(x) max(x,Epsilon)
#define saturateEps(x) clamp(x,Epsilon,1.0)
mat3 transposeMat3(mat3 inMatrix) {vec3 i0=inMatrix[0];vec3 i1=inMatrix[1];vec3 i2=inMatrix[2];mat3 outMatrix=mat3(
vec3(i0.x,i1.x,i2.x),
vec3(i0.y,i1.y,i2.y),
vec3(i0.z,i1.z,i2.z)
);return outMatrix;}
mat3 inverseMat3(mat3 inMatrix) {float a00=inMatrix[0][0],a01=inMatrix[0][1],a02=inMatrix[0][2];float a10=inMatrix[1][0],a11=inMatrix[1][1],a12=inMatrix[1][2];float a20=inMatrix[2][0],a21=inMatrix[2][1],a22=inMatrix[2][2];float b01=a22*a11-a12*a21;float b11=-a22*a10+a12*a20;float b21=a21*a10-a11*a20;float det=a00*b01+a01*b11+a02*b21;return mat3(b01,(-a22*a01+a02*a21),(a12*a01-a02*a11),
b11,(a22*a00-a02*a20),(-a12*a00+a02*a10),
b21,(-a21*a00+a01*a20),(a11*a00-a01*a10))/det;}
#if USE_EXACT_SRGB_CONVERSIONS
vec3 toLinearSpaceExact(vec3 color)
{vec3 nearZeroSection=0.0773993808*color;vec3 remainingSection=pow(0.947867299*(color+vec3(0.055)),vec3(2.4));
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
return mix(remainingSection,nearZeroSection,lessThanEqual(color,vec3(0.04045)));
#else
return
vec3(
color.r<=0.04045 ? nearZeroSection.r : remainingSection.r,
color.g<=0.04045 ? nearZeroSection.g : remainingSection.g,
color.b<=0.04045 ? nearZeroSection.b : remainingSection.b);
#endif
}
vec3 toGammaSpaceExact(vec3 color)
{vec3 nearZeroSection=12.92*color;vec3 remainingSection=1.055*pow(color,vec3(0.41666))-vec3(0.055);
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
return mix(remainingSection,nearZeroSection,lessThanEqual(color,vec3(0.0031308)));
#else
return
vec3(
color.r<=0.0031308 ? nearZeroSection.r : remainingSection.r,
color.g<=0.0031308 ? nearZeroSection.g : remainingSection.g,
color.b<=0.0031308 ? nearZeroSection.b : remainingSection.b);
#endif
}
#endif
float toLinearSpace(float color)
{
#if USE_EXACT_SRGB_CONVERSIONS
float nearZeroSection=0.0773993808*color;float remainingSection=pow(0.947867299*(color+0.055),2.4);return color<=0.04045 ? nearZeroSection : remainingSection;
#else
return pow(color,LinearEncodePowerApprox);
#endif
}
vec3 toLinearSpace(vec3 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return toLinearSpaceExact(color);
#else
return pow(color,vec3(LinearEncodePowerApprox));
#endif
}
vec4 toLinearSpace(vec4 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4(toLinearSpaceExact(color.rgb),color.a);
#else
return vec4(pow(color.rgb,vec3(LinearEncodePowerApprox)),color.a);
#endif
}
float toGammaSpace(float color)
{
#if USE_EXACT_SRGB_CONVERSIONS
float nearZeroSection=12.92*color;float remainingSection=1.055*pow(color,0.41666)-0.055;return color<=0.0031308 ? nearZeroSection : remainingSection;
#else
return pow(color,GammaEncodePowerApprox);
#endif
}
vec3 toGammaSpace(vec3 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return toGammaSpaceExact(color);
#else
return pow(color,vec3(GammaEncodePowerApprox));
#endif
}
vec4 toGammaSpace(vec4 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4(toGammaSpaceExact(color.rgb),color.a);
#else
return vec4(pow(color.rgb,vec3(GammaEncodePowerApprox)),color.a);
#endif
}
float square(float value)
{return value*value;}
vec3 square(vec3 value)
{return value*value;}
float pow5(float value) {float sq=value*value;return sq*sq*value;}
vec3 double_refract(vec3 I,vec3 N,float eta) {vec3 Tfront=refract(I,N,1.0/eta);vec3 Nback=normalize(reflect(N,Tfront));return refract(Tfront,-Nback,eta);}
float getLuminanceUnclamped(vec3 color)
{return dot(color,LuminanceEncodeApprox);}
float getLuminance(vec3 color)
{return saturate(getLuminanceUnclamped(color));}
float getRand(vec2 seed) {return fract(sin(dot(seed.xy ,vec2(12.9898,78.233)))*43758.5453);}
float dither(vec2 seed,float varianceAmount) {float rand=getRand(seed);float normVariance=varianceAmount/255.0;float dither=mix(-normVariance,normVariance,rand);return dither;}
const float rgbdMaxRange=255.;vec4 toRGBD(vec3 color) {float maxRGB=maxEps(max(color.r,max(color.g,color.b)));float D =max(rgbdMaxRange/maxRGB,1.);D =saturate(floor(D)/255.);vec3 rgb=color.rgb*D;rgb=toGammaSpace(rgb);return vec4(saturate(rgb),D);}
vec3 fromRGBD(vec4 rgbd) {rgbd.rgb=toLinearSpace(rgbd.rgb);return rgbd.rgb/rgbd.a;}
vec3 parallaxCorrectNormal( vec3 vertexPos,vec3 origVec,vec3 cubeSize,vec3 cubePos ) {vec3 invOrigVec=vec3(1.)/origVec;vec3 halfSize=cubeSize*0.5;vec3 intersecAtMaxPlane=(cubePos+halfSize-vertexPos)*invOrigVec;vec3 intersecAtMinPlane=(cubePos-halfSize-vertexPos)*invOrigVec;vec3 largestIntersec=max(intersecAtMaxPlane,intersecAtMinPlane);float distance=min(min(largestIntersec.x,largestIntersec.y),largestIntersec.z);vec3 intersectPositionWS=vertexPos+origVec*distance;return intersectPositionWS-cubePos;}
vec3 equirectangularToCubemapDirection(vec2 uv) {float longitude=uv.x*TWO_PI-PI;float latitude=HALF_PI-uv.y*PI;vec3 direction;direction.x=cos(latitude)*sin(longitude);direction.y=sin(latitude);direction.z=cos(latitude)*cos(longitude);return direction;}
float sqrtClamped(float value) {return sqrt(max(value,0.));}
float avg(vec3 value) {return dot(value,vec3(0.333333333));}
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE) 
uint extractBits(uint value,int offset,int width) {return (value>>offset) & ((1u<<width)-1u);}
int onlyBitPosition(uint value) {return (floatBitsToInt(float(value))>>23)-0x7f;}
vec3 singleScatterToMultiScatterAlbedo(vec3 rho_ss) {vec3 s=sqrt(max(vec3(1.0)-rho_ss,vec3(0.0)));return (vec3(1.0)-s)*(vec3(1.0)-vec3(0.139)*s)/(vec3(1.0)+vec3(1.17)*s);}
float min3(vec3 v) {return min(v.x,min(v.y,v.z));}
float max3(vec3 v) {return max(v.x,max(v.y,v.z));}
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},97513,e=>{"use strict";function t(e){if(e.getClassName)return e.getClassName()}function i(e,t){return e===t&&("Vector2"===e||"Vector3"===e||"Vector4"===e||"Quaternion"===e)}function r(e,t){return e===t&&("Matrix"===e||"Matrix2D"===e||"Matrix3D"===e)}function a(e,t){return"FlowGraphInteger"===e&&"FlowGraphInteger"===t}function s(e,t){let i="number"==typeof e||"number"==typeof e?.value;return i&&!t?!isNaN(n(e)):i}function n(e){return"number"==typeof e?e:e.value}e.s(["_AreSameIntegerClass",()=>a,"_AreSameMatrixClass",()=>r,"_AreSameVectorOrQuaternionClass",()=>i,"_GetClassNameOf",()=>t,"_IsDescendantOf",()=>function e(t,i){return!!(t.parent&&(t.parent===i||e(t.parent,i)))},"getNumericValue",()=>n,"isNumeric",()=>s])},23432,e=>{"use strict";function t(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}e.s(["RandomGUID",()=>t])},28497,99399,92769,e=>{"use strict";var t,i,r=e.i(39018),a=e.i(86752),s=e.i(99619);class n{constructor(e){this.value=this._toInt(e)}_toInt(e){return 0|e}add(e){return new n(this.value+e.value)}subtract(e){return new n(this.value-e.value)}multiply(e){return new n(Math.imul(this.value,e.value))}divide(e){return new n(this.value/e.value)}getClassName(){return n.ClassName}equals(e){return this.value===e.value}static FromValue(e){return new n(e)}toString(){return this.value.toString()}}n.ClassName="FlowGraphInteger",(0,s.RegisterClass)("FlowGraphInteger",n),e.s(["FlowGraphInteger",()=>n],99399);class o{constructor(e=[1,0,0,1]){this._m=e}get m(){return this._m}transformVector(e){return this.transformVectorToRef(e,new r.Vector2)}transformVectorToRef(e,t){return t.x=e.x*this._m[0]+e.y*this._m[1],t.y=e.x*this._m[2]+e.y*this._m[3],t}asArray(){return this.toArray()}toArray(e=[]){for(let t=0;t<4;t++)e[t]=this._m[t];return e}fromArray(e){for(let t=0;t<4;t++)this._m[t]=e[t];return this}multiplyToRef(e,t){let i=e._m,r=this._m,a=t._m;return a[0]=i[0]*r[0]+i[1]*r[2],a[1]=i[0]*r[1]+i[1]*r[3],a[2]=i[2]*r[0]+i[3]*r[2],a[3]=i[2]*r[1]+i[3]*r[3],t}multiply(e){return this.multiplyToRef(e,new o)}divideToRef(e,t){let i=this._m,r=e._m,a=t._m;return a[0]=i[0]/r[0],a[1]=i[1]/r[1],a[2]=i[2]/r[2],a[3]=i[3]/r[3],t}divide(e){return this.divideToRef(e,new o)}addToRef(e,t){let i=this._m,r=e.m,a=t.m;return a[0]=i[0]+r[0],a[1]=i[1]+r[1],a[2]=i[2]+r[2],a[3]=i[3]+r[3],t}add(e){return this.addToRef(e,new o)}subtractToRef(e,t){let i=this._m,r=e.m,a=t.m;return a[0]=i[0]-r[0],a[1]=i[1]-r[1],a[2]=i[2]-r[2],a[3]=i[3]-r[3],t}subtract(e){return this.subtractToRef(e,new o)}transpose(){let e=this._m;return new o([e[0],e[2],e[1],e[3]])}determinant(){let e=this._m;return e[0]*e[3]-e[1]*e[2]}inverse(){let e=this.determinant();if(0===e)throw Error("Matrix is not invertible");let t=this._m,i=1/e;return new o([t[3]*i,-t[1]*i,-t[2]*i,t[0]*i])}equals(e,t=0){let i=this._m,r=e.m;return 0===t?i[0]===r[0]&&i[1]===r[1]&&i[2]===r[2]&&i[3]===r[3]:Math.abs(i[0]-r[0])<t&&Math.abs(i[1]-r[1])<t&&Math.abs(i[2]-r[2])<t&&Math.abs(i[3]-r[3])<t}getClassName(){return"FlowGraphMatrix2D"}toString(){return`FlowGraphMatrix2D(${this._m.join(", ")})`}}class l{constructor(e=[1,0,0,0,1,0,0,0,1]){this._m=e}get m(){return this._m}transformVector(e){return this.transformVectorToRef(e,new r.Vector3)}transformVectorToRef(e,t){let i=this._m;return t.x=e.x*i[0]+e.y*i[1]+e.z*i[2],t.y=e.x*i[3]+e.y*i[4]+e.z*i[5],t.z=e.x*i[6]+e.y*i[7]+e.z*i[8],t}multiplyToRef(e,t){let i=e._m,r=this._m,a=t.m;return a[0]=i[0]*r[0]+i[1]*r[3]+i[2]*r[6],a[1]=i[0]*r[1]+i[1]*r[4]+i[2]*r[7],a[2]=i[0]*r[2]+i[1]*r[5]+i[2]*r[8],a[3]=i[3]*r[0]+i[4]*r[3]+i[5]*r[6],a[4]=i[3]*r[1]+i[4]*r[4]+i[5]*r[7],a[5]=i[3]*r[2]+i[4]*r[5]+i[5]*r[8],a[6]=i[6]*r[0]+i[7]*r[3]+i[8]*r[6],a[7]=i[6]*r[1]+i[7]*r[4]+i[8]*r[7],a[8]=i[6]*r[2]+i[7]*r[5]+i[8]*r[8],t}multiply(e){return this.multiplyToRef(e,new l)}divideToRef(e,t){let i=this._m,r=e.m,a=t.m;return a[0]=i[0]/r[0],a[1]=i[1]/r[1],a[2]=i[2]/r[2],a[3]=i[3]/r[3],a[4]=i[4]/r[4],a[5]=i[5]/r[5],a[6]=i[6]/r[6],a[7]=i[7]/r[7],a[8]=i[8]/r[8],t}divide(e){return this.divideToRef(e,new l)}addToRef(e,t){let i=this._m,r=e.m,a=t.m;return a[0]=i[0]+r[0],a[1]=i[1]+r[1],a[2]=i[2]+r[2],a[3]=i[3]+r[3],a[4]=i[4]+r[4],a[5]=i[5]+r[5],a[6]=i[6]+r[6],a[7]=i[7]+r[7],a[8]=i[8]+r[8],t}add(e){return this.addToRef(e,new l)}subtractToRef(e,t){let i=this._m,r=e.m,a=t.m;return a[0]=i[0]-r[0],a[1]=i[1]-r[1],a[2]=i[2]-r[2],a[3]=i[3]-r[3],a[4]=i[4]-r[4],a[5]=i[5]-r[5],a[6]=i[6]-r[6],a[7]=i[7]-r[7],a[8]=i[8]-r[8],t}subtract(e){return this.subtractToRef(e,new l)}toArray(e=[]){for(let t=0;t<9;t++)e[t]=this._m[t];return e}asArray(){return this.toArray()}fromArray(e){for(let t=0;t<9;t++)this._m[t]=e[t];return this}transpose(){let e=this._m;return new l([e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]])}determinant(){let e=this._m;return e[0]*(e[4]*e[8]-e[5]*e[7])-e[1]*(e[3]*e[8]-e[5]*e[6])+e[2]*(e[3]*e[7]-e[4]*e[6])}inverse(){let e=this.determinant();if(0===e)throw Error("Matrix is not invertible");let t=this._m,i=1/e;return new l([(t[4]*t[8]-t[5]*t[7])*i,(t[2]*t[7]-t[1]*t[8])*i,(t[1]*t[5]-t[2]*t[4])*i,(t[5]*t[6]-t[3]*t[8])*i,(t[0]*t[8]-t[2]*t[6])*i,(t[2]*t[3]-t[0]*t[5])*i,(t[3]*t[7]-t[4]*t[6])*i,(t[1]*t[6]-t[0]*t[7])*i,(t[0]*t[4]-t[1]*t[3])*i])}equals(e,t=0){let i=this._m,r=e.m;return 0===t?i[0]===r[0]&&i[1]===r[1]&&i[2]===r[2]&&i[3]===r[3]&&i[4]===r[4]&&i[5]===r[5]&&i[6]===r[6]&&i[7]===r[7]&&i[8]===r[8]:Math.abs(i[0]-r[0])<t&&Math.abs(i[1]-r[1])<t&&Math.abs(i[2]-r[2])<t&&Math.abs(i[3]-r[3])<t&&Math.abs(i[4]-r[4])<t&&Math.abs(i[5]-r[5])<t&&Math.abs(i[6]-r[6])<t&&Math.abs(i[7]-r[7])<t&&Math.abs(i[8]-r[8])<t}getClassName(){return"FlowGraphMatrix3D"}toString(){return`FlowGraphMatrix3D(${this._m.join(", ")})`}}e.s(["FlowGraphMatrix2D",()=>o,"FlowGraphMatrix3D",()=>l],92769),(t=i||(i={})).Any="any",t.String="string",t.Number="number",t.Boolean="boolean",t.Object="object",t.Integer="FlowGraphInteger",t.Vector2="Vector2",t.Vector3="Vector3",t.Vector4="Vector4",t.Quaternion="Quaternion",t.Matrix="Matrix",t.Matrix2D="Matrix2D",t.Matrix3D="Matrix3D",t.Color3="Color3",t.Color4="Color4";class c{constructor(e,t,i=-1){this.typeName=e,this.defaultValue=t,this.animationType=i}serialize(e){e.typeName=this.typeName,e.defaultValue=this.defaultValue}}let d=new c("any",void 0),u=new c("string",""),f=new c("number",0,0),h=new c("boolean",!1),m=new c("Vector2",r.Vector2.Zero(),5),p=new c("Vector3",r.Vector3.Zero(),1),_=new c("Vector4",r.Vector4.Zero()),v=new c("Matrix",r.Matrix.Identity(),3),g=new c("Matrix2D",new o),S=new c("Matrix3D",new l),T=new c("Color3",a.Color3.Black(),4),b=new c("Color4",new a.Color4(0,0,0,0),7),x=new c("Quaternion",r.Quaternion.Identity(),2);x.typeTransformer=e=>{if(e.getClassName){if("Vector4"===e.getClassName())return r.Quaternion.FromArray(e.asArray());else if("Vector3"===e.getClassName())return r.Quaternion.FromEulerVector(e);else if("Matrix"===e.getClassName())return r.Quaternion.FromRotationMatrix(e)}return e};let C=new c("FlowGraphInteger",new n(0),0);function E(e){switch(typeof e){case"string":return u;case"number":return f;case"boolean":return h;case"object":if(e.getClassName)switch(e.getClassName()){case"Vector2":return m;case"Vector3":return p;case"Vector4":return _;case"Matrix":return v;case"Color3":return T;case"Color4":return b;case"Quaternion":return x;case"FlowGraphInteger":return C;case"Matrix2D":return g;case"Matrix3D":return S}return d;default:return d}}function A(e){switch(e){case"string":return u;case"number":return f;case"boolean":return h;case"Vector2":return m;case"Vector3":return p;case"Vector4":return _;case"Matrix":return v;case"Color3":return T;case"Color4":return b;case"Quaternion":return x;case"FlowGraphInteger":return C;case"Matrix2D":return g;case"Matrix3D":return S;default:return d}}function y(e){switch(e){case"number":default:return 0;case"Vector2":return 5;case"Vector3":return 1;case"Matrix":return 3;case"Color3":return 4;case"Color4":return 7;case"Quaternion":return 2}}function P(e){switch(e){case 0:return f;case 5:return m;case 1:return p;case 3:return v;case 4:return T;case 7:return b;case 2:return x;default:return d}}e.s(["RichTypeAny",0,d,"RichTypeBoolean",0,h,"RichTypeFlowGraphInteger",0,C,"RichTypeMatrix",0,v,"RichTypeMatrix2D",0,g,"RichTypeMatrix3D",0,S,"RichTypeNumber",0,f,"RichTypeQuaternion",0,x,"RichTypeString",0,u,"RichTypeVector2",0,m,"RichTypeVector3",0,p,"RichTypeVector4",0,_,"getAnimationTypeByFlowGraphType",()=>y,"getRichTypeByAnimationType",()=>P,"getRichTypeByFlowGraphType",()=>A,"getRichTypeFromValue",()=>E],28497)},33788,e=>{"use strict";var t=e.i(86752),i=e.i(39018),r=e.i(99399),a=e.i(28497),s=e.i(92769);function n(e){return"Vector2"===e||"Vector3"===e||"Vector4"===e||"Quaternion"===e||"Color3"===e||"Color4"===e}function o(e,t,i){var r;let a=t?.getClassName?.()??"";if(n(a)||"Matrix"===(r=a)||"Matrix2D"===r||"Matrix3D"===r)i[e]={value:t.asArray(),className:a};else if("FlowGraphInteger"===a)i[e]={value:t.value,className:a};else if(a&&(t.id||t.name))i[e]={id:t.id,name:t.name,className:a};else if("object"!=typeof t)i[e]=t;else throw Error(`Could not serialize value ${t}`)}function l(e){return"FlowGraphJsonPointerParserBlock"===e}e.s(["defaultValueParseFunction",()=>function e(o,l,c,d){let u,f=l[o],h=f?.type??f?.className;if("Mesh"===h||"AbstractMesh"===h||"GroundMesh"===h||"InstanceMesh"===h||"LinesMesh"===h||"GoldbergMesh"===h||"GreasedLineMesh"===h||"TrailMesh"===h){let e=d.meshes.filter(e=>f.id?e.id===f.id:e.name===f.name);0===e.length&&(e=d.transformNodes.filter(e=>f.id?e.id===f.id:e.name===f.name)),u=f.uniqueId?e.find(e=>e.uniqueId===f.uniqueId):e[0]}else if(n(h))u=function(e,r,a=!1){if("Vector2"===e)return i.Vector2.FromArray(r);if("Vector3"===e)return a&&(r[2]*=-1),i.Vector3.FromArray(r);if("Vector4"===e)return i.Vector4.FromArray(r);if("Quaternion"===e)return a&&(r[2]*=-1,r[3]*=-1),i.Quaternion.FromArray(r);if("Color3"===e)return new t.Color3(r[0],r[1],r[2]);else if("Color4"===e)return new t.Color4(r[0],r[1],r[2],r[3]);else throw Error(`Unknown vector class name ${e}`)}(h,f.value);else if("AnimationGroup"===h){let e=d.animationGroups.filter(e=>e.name===f.name);u=1===e.length?e[0]:e.find(e=>e.uniqueId===f.uniqueId)}else u="Matrix"===h?i.Matrix.FromArray(f.value):"Matrix2D"===h?new s.FlowGraphMatrix2D(f.value):"Matrix3D"===h?new s.FlowGraphMatrix3D(f.value):"FlowGraphInteger"===h?r.FlowGraphInteger.FromValue(f.value):"number"===h||"string"===h||"boolean"===h?f.value[0]:f&&void 0!==f.value?f.value:Array.isArray(f)?f.reduce((t,i)=>(i.eventData&&(t[i.id]={type:(0,a.getRichTypeByFlowGraphType)(i.type)},void 0!==i.value&&(t[i.id].value=e("value",i,c,d))),t),{}):f;return u},"defaultValueSerializationFunction",()=>o,"needsPathConverter",()=>l])},78002,e=>{"use strict";var t,i,r=e.i(23432);(t=i||(i={}))[t.Input=0]="Input",t[t.Output=1]="Output";class a{constructor(e,t,i){this._ownerBlock=i,this._connectedPoint=[],this.uniqueId=(0,r.RandomGUID)(),this.connectedPointIds=[],this.name=e,this._connectionType=t}get connectionType(){return this._connectionType}_isSingularConnection(){return!0}isConnected(){return this._connectedPoint.length>0}connectTo(e){if(this._connectionType===e._connectionType)throw Error(`Cannot connect two points of type ${this.connectionType}`);if(this._isSingularConnection()&&this._connectedPoint.length>0||e._isSingularConnection()&&e._connectedPoint.length>0)throw Error("Max number of connections for point reached");this._connectedPoint.push(e),e._connectedPoint.push(this)}disconnectFrom(e,t=!0){let i=this._connectedPoint.indexOf(e),r=e._connectedPoint.indexOf(this);-1!==i&&-1!==r&&(t&&this._connectedPoint.splice(i,1),e._connectedPoint.splice(r,1))}disconnectFromAll(){for(let e of this._connectedPoint)this.disconnectFrom(e,!1);this._connectedPoint.length=0}dispose(){for(let e of this._connectedPoint)this.disconnectFrom(e)}serialize(e={}){for(let t of(e.uniqueId=this.uniqueId,e.name=this.name,e._connectionType=this._connectionType,e.connectedPointIds=[],e.className=this.getClassName(),this._connectedPoint))e.connectedPointIds.push(t.uniqueId)}getClassName(){return"FGConnection"}deserialize(e){this.uniqueId=e.uniqueId,this.name=e.name,this._connectionType=e._connectionType,this.connectedPointIds=e.connectedPointIds}}e.s(["FlowGraphConnection",()=>a])},20651,e=>{"use strict";var t=e.i(23432),i=e.i(99619),r=e.i(78002),a=e.i(66452),s=e.i(33788);class n extends r.FlowGraphConnection{constructor(e,t,i,r,s=r.defaultValue,n=!1){super(e,t,i),this.richType=r,this._defaultValue=s,this._optional=n,this._isDisabled=!1,this._lastValue=null,this.dataTransformer=null,this.onValueChangedObservable=new a.Observable}get optional(){return this._optional}get isDisabled(){return this._isDisabled}set isDisabled(e){this._isDisabled!==e&&(this._isDisabled=e,this._isDisabled&&this.disconnectFromAll())}_isSingularConnection(){return 0===this.connectionType}setValue(e,t){t._getConnectionValue(this)!==e&&(t._setConnectionValue(this,e),this.onValueChangedObservable.notifyObservers(e))}resetToDefaultValue(e){e._setConnectionValue(this,this._defaultValue)}connectTo(e){this._isDisabled||super.connectTo(e)}_getValueOrDefault(e){let t=e._getConnectionValue(this)??this._defaultValue;return this.dataTransformer?this.dataTransformer(t):t}getValue(e){if(1===this.connectionType){e._notifyExecuteNode(this._ownerBlock),this._ownerBlock._updateOutputs(e);let t=this._getValueOrDefault(e);return this._lastValue=t,this.richType.typeTransformer?this.richType.typeTransformer(t):t}let t=this.isConnected()?this._connectedPoint[0].getValue(e):this._getValueOrDefault(e);return this._lastValue=t,this.richType.typeTransformer?this.richType.typeTransformer(t):t}_getLastValue(){return this._lastValue}getClassName(){return"FlowGraphDataConnection"}serialize(e={}){super.serialize(e),e.richType={},this.richType.serialize(e.richType),e.optional=this._optional,(0,s.defaultValueSerializationFunction)("defaultValue",this._defaultValue,e)}}(0,i.RegisterClass)("FlowGraphDataConnection",n);class o{constructor(e){this.config=e,this.uniqueId=(0,t.RandomGUID)(),this.name=this.config?.name??this.getClassName(),this.dataInputs=[],this.dataOutputs=[]}_updateOutputs(e){}registerDataInput(e,t,i){let r=new n(e,0,this,t,i);return this.dataInputs.push(r),r}registerDataOutput(e,t,i){let r=new n(e,1,this,t,i);return this.dataOutputs.push(r),r}getDataInput(e){return this.dataInputs.find(t=>t.name===e)}getDataOutput(e){return this.dataOutputs.find(t=>t.name===e)}serialize(e={},t=s.defaultValueSerializationFunction){if(e.uniqueId=this.uniqueId,e.config={},this.config){let i=this.config;for(let r of Object.keys(i))t(r,i[r],e.config)}for(let t of(e.dataInputs=[],e.dataOutputs=[],e.className=this.getClassName(),this.dataInputs)){let i={};t.serialize(i),e.dataInputs.push(i)}for(let t of this.dataOutputs){let i={};t.serialize(i),e.dataOutputs.push(i)}}deserialize(e){}_log(e,t,i){e.logger?.addLogItem({action:t,payload:i,className:this.getClassName(),uniqueId:this.uniqueId})}getClassName(){return"FlowGraphBlock"}}e.s(["FlowGraphBlock",()=>o],20651)},37408,e=>{"use strict";var t=e.i(20651),i=e.i(78002),r=e.i(99619);class a extends i.FlowGraphConnection{constructor(){super(...arguments),this.priority=0}_isSingularConnection(){return!1}connectTo(e){super.connectTo(e),this._connectedPoint.sort((e,t)=>t.priority-e.priority)}_activateSignal(e){if(e.logger?.addLogItem({action:"ActivateSignal",className:this._ownerBlock.getClassName(),uniqueId:this._ownerBlock.uniqueId,payload:{connectionType:this.connectionType,name:this.name}}),0===this.connectionType)e._notifyExecuteNode(this._ownerBlock),this._ownerBlock._execute(e,this),e._increaseExecutionId();else for(let t of this._connectedPoint)t._activateSignal(e)}}(0,r.RegisterClass)("FlowGraphSignalConnection",a);class s extends t.FlowGraphBlock{constructor(e){super(e),this.priority=0,this.signalInputs=[],this.signalOutputs=[],this.in=this._registerSignalInput("in"),this.error=this._registerSignalOutput("error")}_registerSignalInput(e){let t=new a(e,0,this);return this.signalInputs.push(t),t}_registerSignalOutput(e){let t=new a(e,1,this);return this.signalOutputs.push(t),t}_unregisterSignalInput(e){let t=this.signalInputs.findIndex(t=>t.name===e);-1!==t&&(this.signalInputs[t].dispose(),this.signalInputs.splice(t,1))}_unregisterSignalOutput(e){let t=this.signalOutputs.findIndex(t=>t.name===e);-1!==t&&(this.signalOutputs[t].dispose(),this.signalOutputs.splice(t,1))}_reportError(e,t){this.error.payload="string"==typeof t?Error(t):t,this.error._activateSignal(e)}getSignalInput(e){return this.signalInputs.find(t=>t.name===e)}getSignalOutput(e){return this.signalOutputs.find(t=>t.name===e)}serialize(e={}){for(let t of(super.serialize(e),e.signalInputs=[],e.signalOutputs=[],this.signalInputs)){let i={};t.serialize(i),e.signalInputs.push(i)}for(let t of this.signalOutputs){let i={};t.serialize(i),e.signalOutputs.push(i)}}deserialize(e){for(let t=0;t<e.signalInputs.length;t++){let i=this.getSignalInput(e.signalInputs[t].name);if(i)i.deserialize(e.signalInputs[t]);else throw Error("Could not find signal input with name "+e.signalInputs[t].name+" in block "+e.className)}for(let t=0;t<e.signalOutputs.length;t++){let i=this.getSignalOutput(e.signalOutputs[t].name);if(i)i.deserialize(e.signalOutputs[t]);else throw Error("Could not find signal output with name "+e.signalOutputs[t].name+" in block "+e.className)}}getClassName(){return"FlowGraphExecutionBlock"}}e.s(["FlowGraphExecutionBlock",()=>s],37408)},51387,e=>{"use strict";var t=e.i(37408);class i extends t.FlowGraphExecutionBlock{constructor(e){super(e),this.out=this._registerSignalOutput("out")}}e.s(["FlowGraphExecutionBlockWithOutSignal",()=>i])},73,e=>{"use strict";var t=e.i(51387);class i extends t.FlowGraphExecutionBlockWithOutSignal{constructor(e,t){if(super(e),this._eventsSignalOutputs={},this.done=this._registerSignalOutput("done"),t)for(const e of t)this._eventsSignalOutputs[e]=this._registerSignalOutput(e+"Event")}_executeOnTick(e){}_startPendingTasks(e){e._getExecutionVariable(this,"_initialized",!1)&&(this._cancelPendingTasks(e),this._resetAfterCanceled(e)),this._preparePendingTasks(e),e._addPendingBlock(this),this.out._activateSignal(e),e._setExecutionVariable(this,"_initialized",!0)}_resetAfterCanceled(e){e._deleteExecutionVariable(this,"_initialized"),e._removePendingBlock(this)}}e.s(["FlowGraphAsyncExecutionBlock",()=>i])},92189,e=>{"use strict";var t=e.i(73);class i extends t.FlowGraphAsyncExecutionBlock{constructor(){super(...arguments),this.initPriority=0,this.type="NoTrigger"}_execute(e){e._notifyExecuteNode(this),this.done._activateSignal(e)}}e.s(["FlowGraphEventBlock",()=>i])},80315,e=>{"use strict";var t=e.i(47662);let i="packingFunctions",r=`vec4 pack(float depth)
{const vec4 bit_shift=vec4(255.0*255.0*255.0,255.0*255.0,255.0,1.0);const vec4 bit_mask=vec4(0.0,1.0/255.0,1.0/255.0,1.0/255.0);vec4 res=fract(depth*bit_shift);res-=res.xxyz*bit_mask;return res;}
float unpack(vec4 color)
{const vec4 bit_shift=vec4(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);return dot(color,bit_shift);}`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},86439,e=>{"use strict";var t=e.i(7194);class i{constructor(){this._easingMode=i.EASINGMODE_EASEIN}setEasingMode(e){let t=Math.min(Math.max(e,0),2);this._easingMode=t}getEasingMode(){return this._easingMode}easeInCore(e){throw Error("You must implement this method")}ease(e){switch(this._easingMode){case i.EASINGMODE_EASEIN:return this.easeInCore(e);case i.EASINGMODE_EASEOUT:return 1-this.easeInCore(1-e)}return e>=.5?(1-this.easeInCore((1-e)*2))*.5+.5:.5*this.easeInCore(2*e)}}i.EASINGMODE_EASEIN=0,i.EASINGMODE_EASEOUT=1,i.EASINGMODE_EASEINOUT=2;class r extends i{easeInCore(e){return 1-Math.sqrt(1-(e=Math.max(0,Math.min(1,e)))*e)}}class a extends i{constructor(e=1){super(),this.amplitude=e}easeInCore(e){return Math.pow(e,3)-e*Math.max(0,this.amplitude)*Math.sin(3.141592653589793*e)}}class s extends i{constructor(e=3,t=2){super(),this.bounces=e,this.bounciness=t}easeInCore(e){let t=Math.max(0,this.bounces),i=this.bounciness;i<=1&&(i=1.001);let r=Math.pow(i,t),a=1-i,s=(1-r)/a+.5*r,n=Math.floor(Math.log(-(e*s)*(1-i)+1)/Math.log(i)),o=(1-Math.pow(i,n))/(a*s),l=(o+(1-Math.pow(i,n+1))/(a*s))*.5,c=e-l,d=l-o;return-Math.pow(1/i,t-n)/(d*d)*(c-d)*(c+d)}}class n extends i{easeInCore(e){return e*e*e}}class o extends i{constructor(e=3,t=3){super(),this.oscillations=e,this.springiness=t}easeInCore(e){let t=Math.max(0,this.oscillations),i=Math.max(0,this.springiness);return(0==i?e:(Math.exp(i*e)-1)/(Math.exp(i)-1))*Math.sin((6.283185307179586*t+1.5707963267948966)*e)}}class l extends i{constructor(e=2){super(),this.exponent=e}easeInCore(e){return this.exponent<=0?e:(Math.exp(this.exponent*e)-1)/(Math.exp(this.exponent)-1)}}class c extends i{easeInCore(e){return e*e}}class d extends i{easeInCore(e){return 1-Math.sin(1.5707963267948966*(1-e))}}class u extends i{constructor(e=0,t=0,i=1,r=1){super(),this.x1=e,this.y1=t,this.x2=i,this.y2=r}easeInCore(e){return t.BezierCurve.Interpolate(e,this.x1,this.y1,this.x2,this.y2)}}e.s(["BackEase",()=>a,"BezierCurveEase",()=>u,"BounceEase",()=>s,"CircleEase",()=>r,"CubicEase",()=>n,"EasingFunction",()=>i,"ElasticEase",()=>o,"ExponentialEase",()=>l,"QuadraticEase",()=>c,"SineEase",()=>d])},37187,610,87126,e=>{"use strict";var t=e.i(47662);let i="bumpFragmentMainFunctions",r=`#if defined(BUMP) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC) || defined(DETAIL)
#if defined(TANGENT) && defined(NORMAL) 
varying mat3 vTBN;
#endif
#ifdef OBJECTSPACE_NORMALMAP
uniform mat4 normalMatrix;
#if defined(WEBGL2) || defined(WEBGPU)
mat4 toNormalMatrix(mat4 wMatrix)
{mat4 ret=inverse(wMatrix);ret=transpose(ret);ret[0][3]=0.;ret[1][3]=0.;ret[2][3]=0.;ret[3]=vec4(0.,0.,0.,1.);return ret;}
#else
mat4 toNormalMatrix(mat4 m)
{float
a00=m[0][0],a01=m[0][1],a02=m[0][2],a03=m[0][3],
a10=m[1][0],a11=m[1][1],a12=m[1][2],a13=m[1][3],
a20=m[2][0],a21=m[2][1],a22=m[2][2],a23=m[2][3],
a30=m[3][0],a31=m[3][1],a32=m[3][2],a33=m[3][3],
b00=a00*a11-a01*a10,
b01=a00*a12-a02*a10,
b02=a00*a13-a03*a10,
b03=a01*a12-a02*a11,
b04=a01*a13-a03*a11,
b05=a02*a13-a03*a12,
b06=a20*a31-a21*a30,
b07=a20*a32-a22*a30,
b08=a20*a33-a23*a30,
b09=a21*a32-a22*a31,
b10=a21*a33-a23*a31,
b11=a22*a33-a23*a32,
det=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;mat4 mi=mat4(
a11*b11-a12*b10+a13*b09,
a02*b10-a01*b11-a03*b09,
a31*b05-a32*b04+a33*b03,
a22*b04-a21*b05-a23*b03,
a12*b08-a10*b11-a13*b07,
a00*b11-a02*b08+a03*b07,
a32*b02-a30*b05-a33*b01,
a20*b05-a22*b02+a23*b01,
a10*b10-a11*b08+a13*b06,
a01*b08-a00*b10-a03*b06,
a30*b04-a31*b02+a33*b00,
a21*b02-a20*b04-a23*b00,
a11*b07-a10*b09-a12*b06,
a00*b09-a01*b07+a02*b06,
a31*b01-a30*b03-a32*b00,
a20*b03-a21*b01+a22*b00)/det;return mat4(mi[0][0],mi[1][0],mi[2][0],mi[3][0],
mi[0][1],mi[1][1],mi[2][1],mi[3][1],
mi[0][2],mi[1][2],mi[2][2],mi[3][2],
mi[0][3],mi[1][3],mi[2][3],mi[3][3]);}
#endif
#endif
vec3 perturbNormalBase(mat3 cotangentFrame,vec3 normal,float scale)
{
#ifdef NORMALXYSCALE
normal=normalize(normal*vec3(scale,scale,1.0));
#endif
return normalize(cotangentFrame*normal);}
vec3 perturbNormal(mat3 cotangentFrame,vec3 textureSample,float scale)
{return perturbNormalBase(cotangentFrame,textureSample*2.0-1.0,scale);}
mat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv,vec2 tangentSpaceParams)
{vec3 dp1=dFdx(p);vec3 dp2=dFdy(p);vec2 duv1=dFdx(uv);vec2 duv2=dFdy(uv);vec3 dp2perp=cross(dp2,normal);vec3 dp1perp=cross(normal,dp1);vec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;vec3 bitangent=dp2perp*duv1.y+dp1perp*duv2.y;tangent*=tangentSpaceParams.x;bitangent*=tangentSpaceParams.y;float det=max(dot(tangent,tangent),dot(bitangent,bitangent));float invmax=det==0.0 ? 0.0 : inversesqrt(det);return mat3(tangent*invmax,bitangent*invmax,normal);}
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([],37187),e.i(30550);let a="bumpFragmentFunctions",s=`#if defined(BUMP)
#include<samplerFragmentDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_SAMPLERNAME_,bump)
#endif
#if defined(DETAIL)
#include<samplerFragmentDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_SAMPLERNAME_,detail)
#endif
#if defined(BUMP) && defined(PARALLAX)
const float minSamples=4.;const float maxSamples=15.;const int iMaxSamples=15;vec2 parallaxOcclusion(vec3 vViewDirCoT,vec3 vNormalCoT,vec2 texCoord,float parallaxScale) {float parallaxLimit=length(vViewDirCoT.xy)/vViewDirCoT.z;parallaxLimit*=parallaxScale;vec2 vOffsetDir=normalize(vViewDirCoT.xy);vec2 vMaxOffset=vOffsetDir*parallaxLimit;float numSamples=maxSamples+(dot(vViewDirCoT,vNormalCoT)*(minSamples-maxSamples));float stepSize=1.0/numSamples;float currRayHeight=1.0;vec2 vCurrOffset=vec2(0,0);vec2 vLastOffset=vec2(0,0);float lastSampledHeight=1.0;float currSampledHeight=1.0;bool keepWorking=true;for (int i=0; i<iMaxSamples; i++)
{currSampledHeight=texture2D(bumpSampler,texCoord+vCurrOffset).w;if (!keepWorking)
{}
else if (currSampledHeight>currRayHeight)
{float delta1=currSampledHeight-currRayHeight;float delta2=(currRayHeight+stepSize)-lastSampledHeight;float ratio=delta1/(delta1+delta2);vCurrOffset=(ratio)* vLastOffset+(1.0-ratio)*vCurrOffset;keepWorking=false;}
else
{currRayHeight-=stepSize;vLastOffset=vCurrOffset;
#ifdef PARALLAX_RHS
vCurrOffset-=stepSize*vMaxOffset;
#else
vCurrOffset+=stepSize*vMaxOffset;
#endif
lastSampledHeight=currSampledHeight;}}
return vCurrOffset;}
vec2 parallaxOffset(vec3 viewDir,float heightScale)
{float height=texture2D(bumpSampler,vBumpUV).w;vec2 texCoordOffset=heightScale*viewDir.xy*height;
#ifdef PARALLAX_RHS
return texCoordOffset;
#else
return -texCoordOffset;
#endif
}
#endif
`;t.ShaderStore.IncludesShadersStore[a]||(t.ShaderStore.IncludesShadersStore[a]=s),e.s([],610);let n="bumpFragment",o=`vec2 uvOffset=vec2(0.0,0.0);
#if defined(BUMP) || defined(PARALLAX) || defined(DETAIL)
#ifdef NORMALXYSCALE
float normalScale=1.0;
#elif defined(BUMP)
float normalScale=vBumpInfos.y;
#else
float normalScale=1.0;
#endif
#if defined(TANGENT) && defined(NORMAL)
mat3 TBN=vTBN;
#elif defined(BUMP)
vec2 TBNUV=gl_FrontFacing ? vBumpUV : -vBumpUV;mat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vTangentSpaceParams);
#else
vec2 TBNUV=gl_FrontFacing ? vDetailUV : -vDetailUV;mat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vec2(1.,1.));
#endif
#elif defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
mat3 TBN=vTBN;
#else
vec2 TBNUV=gl_FrontFacing ? vMainUV1 : -vMainUV1;mat3 TBN=cotangent_frame(normalW,vPositionW,TBNUV,vec2(1.,1.));
#endif
#endif
#ifdef PARALLAX
mat3 invTBN=transposeMat3(TBN);
#ifdef PARALLAXOCCLUSION
uvOffset=parallaxOcclusion(invTBN*-viewDirectionW,invTBN*normalW,vBumpUV,vBumpInfos.z);
#else
uvOffset=parallaxOffset(invTBN*viewDirectionW,vBumpInfos.z);
#endif
#endif
#ifdef DETAIL
vec4 detailColor=texture2D(detailSampler,vDetailUV+uvOffset);vec2 detailNormalRG=detailColor.wy*2.0-1.0;float detailNormalB=sqrt(1.-saturate(dot(detailNormalRG,detailNormalRG)));vec3 detailNormal=vec3(detailNormalRG,detailNormalB);
#endif
#ifdef BUMP
#ifdef OBJECTSPACE_NORMALMAP
#define CUSTOM_FRAGMENT_BUMP_FRAGMENT
normalW=normalize(texture2D(bumpSampler,vBumpUV).xyz *2.0-1.0);normalW=normalize(mat3(normalMatrix)*normalW);
#elif !defined(DETAIL)
normalW=perturbNormal(TBN,texture2D(bumpSampler,vBumpUV+uvOffset).xyz,vBumpInfos.y);
#else
vec3 bumpNormal=texture2D(bumpSampler,vBumpUV+uvOffset).xyz*2.0-1.0;
#if DETAIL_NORMALBLENDMETHOD==0 
detailNormal.xy*=vDetailInfos.z;vec3 blendedNormal=normalize(vec3(bumpNormal.xy+detailNormal.xy,bumpNormal.z*detailNormal.z));
#elif DETAIL_NORMALBLENDMETHOD==1 
detailNormal.xy*=vDetailInfos.z;bumpNormal+=vec3(0.0,0.0,1.0);detailNormal*=vec3(-1.0,-1.0,1.0);vec3 blendedNormal=bumpNormal*dot(bumpNormal,detailNormal)/bumpNormal.z-detailNormal;
#endif
normalW=perturbNormalBase(TBN,blendedNormal,vBumpInfos.y);
#endif
#elif defined(DETAIL)
detailNormal.xy*=vDetailInfos.z;normalW=perturbNormalBase(TBN,detailNormal,vDetailInfos.z);
#endif
`;t.ShaderStore.IncludesShadersStore[n]||(t.ShaderStore.IncludesShadersStore[n]=o),e.s([],87126)},57325,77772,e=>{"use strict";var t=e.i(47662);let i="imageProcessingDeclaration",r=`#ifdef EXPOSURE
uniform float exposureLinear;
#endif
#ifdef CONTRAST
uniform float contrast;
#endif
#if defined(VIGNETTE) || defined(DITHER)
uniform vec2 vInverseScreenSize;
#endif
#ifdef VIGNETTE
uniform vec4 vignetteSettings1;uniform vec4 vignetteSettings2;
#endif
#ifdef COLORCURVES
uniform vec4 vCameraColorCurveNegative;uniform vec4 vCameraColorCurveNeutral;uniform vec4 vCameraColorCurvePositive;
#endif
#ifdef COLORGRADING
#ifdef COLORGRADING3D
uniform highp sampler3D txColorTransform;
#else
uniform sampler2D txColorTransform;
#endif
uniform vec4 colorTransformSettings;
#endif
#ifdef DITHER
uniform float ditherIntensity;
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([],57325);let a="imageProcessingFunctions",s=`#if defined(COLORGRADING) && !defined(COLORGRADING3D)
/** 
* Polyfill for SAMPLE_TEXTURE_3D,which is unsupported in WebGL.
* sampler3dSetting.x=textureOffset (0.5/textureSize).
* sampler3dSetting.y=textureSize.
*/
#define inline
vec3 sampleTexture3D(sampler2D colorTransform,vec3 color,vec2 sampler3dSetting)
{float sliceSize=2.0*sampler3dSetting.x; 
#ifdef SAMPLER3DGREENDEPTH
float sliceContinuous=(color.g-sampler3dSetting.x)*sampler3dSetting.y;
#else
float sliceContinuous=(color.b-sampler3dSetting.x)*sampler3dSetting.y;
#endif
float sliceInteger=floor(sliceContinuous);float sliceFraction=sliceContinuous-sliceInteger;
#ifdef SAMPLER3DGREENDEPTH
vec2 sliceUV=color.rb;
#else
vec2 sliceUV=color.rg;
#endif
sliceUV.x*=sliceSize;sliceUV.x+=sliceInteger*sliceSize;sliceUV=saturate(sliceUV);vec4 slice0Color=texture2D(colorTransform,sliceUV);sliceUV.x+=sliceSize;sliceUV=saturate(sliceUV);vec4 slice1Color=texture2D(colorTransform,sliceUV);vec3 result=mix(slice0Color.rgb,slice1Color.rgb,sliceFraction);
#ifdef SAMPLER3DBGRMAP
color.rgb=result.rgb;
#else
color.rgb=result.bgr;
#endif
return color;}
#endif
#if TONEMAPPING==3
const float PBRNeutralStartCompression=0.8-0.04;const float PBRNeutralDesaturation=0.15;vec3 PBRNeutralToneMapping( vec3 color ) {float x=min(color.r,min(color.g,color.b));float offset=x<0.08 ? x-6.25*x*x : 0.04;color-=offset;float peak=max(color.r,max(color.g,color.b));if (peak<PBRNeutralStartCompression) return color;float d=1.-PBRNeutralStartCompression;float newPeak=1.-d*d/(peak+d-PBRNeutralStartCompression);color*=newPeak/peak;float g=1.-1./(PBRNeutralDesaturation*(peak-newPeak)+1.);return mix(color,newPeak*vec3(1,1,1),g);}
#endif
#if TONEMAPPING==2
const mat3 ACESInputMat=mat3(
vec3(0.59719,0.07600,0.02840),
vec3(0.35458,0.90834,0.13383),
vec3(0.04823,0.01566,0.83777)
);const mat3 ACESOutputMat=mat3(
vec3( 1.60475,-0.10208,-0.00327),
vec3(-0.53108, 1.10813,-0.07276),
vec3(-0.07367,-0.00605, 1.07602)
);vec3 RRTAndODTFit(vec3 v)
{vec3 a=v*(v+0.0245786)-0.000090537;vec3 b=v*(0.983729*v+0.4329510)+0.238081;return a/b;}
vec3 ACESFitted(vec3 color)
{color=ACESInputMat*color;color=RRTAndODTFit(color);color=ACESOutputMat*color;color=saturate(color);return color;}
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_DEFINITIONS
vec4 applyImageProcessing(vec4 result) {
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATSTART
#ifdef EXPOSURE
result.rgb*=exposureLinear;
#endif
#ifdef VIGNETTE
vec2 viewportXY=gl_FragCoord.xy*vInverseScreenSize;viewportXY=viewportXY*2.0-1.0;vec3 vignetteXY1=vec3(viewportXY*vignetteSettings1.xy+vignetteSettings1.zw,1.0);float vignetteTerm=dot(vignetteXY1,vignetteXY1);float vignette=pow(vignetteTerm,vignetteSettings2.w);vec3 vignetteColor=vignetteSettings2.rgb;
#ifdef VIGNETTEBLENDMODEMULTIPLY
vec3 vignetteColorMultiplier=mix(vignetteColor,vec3(1,1,1),vignette);result.rgb*=vignetteColorMultiplier;
#endif
#ifdef VIGNETTEBLENDMODEOPAQUE
result.rgb=mix(vignetteColor,result.rgb,vignette);
#endif
#endif
#if TONEMAPPING==3
result.rgb=PBRNeutralToneMapping(result.rgb);
#elif TONEMAPPING==2
result.rgb=ACESFitted(result.rgb);
#elif TONEMAPPING==1
const float tonemappingCalibration=1.590579;result.rgb=1.0-exp2(-tonemappingCalibration*result.rgb);
#endif
result.rgb=toGammaSpace(result.rgb);result.rgb=saturate(result.rgb);
#ifdef CONTRAST
vec3 resultHighContrast=result.rgb*result.rgb*(3.0-2.0*result.rgb);if (contrast<1.0) {result.rgb=mix(vec3(0.5,0.5,0.5),result.rgb,contrast);} else {result.rgb=mix(result.rgb,resultHighContrast,contrast-1.0);}
result.rgb=max(result.rgb,0.);
#endif
#ifdef COLORGRADING
vec3 colorTransformInput=result.rgb*colorTransformSettings.xxx+colorTransformSettings.yyy;
#ifdef COLORGRADING3D
vec3 colorTransformOutput=texture(txColorTransform,colorTransformInput).rgb;
#else
vec3 colorTransformOutput=sampleTexture3D(txColorTransform,colorTransformInput,colorTransformSettings.yz).rgb;
#endif
result.rgb=mix(result.rgb,colorTransformOutput,colorTransformSettings.www);
#endif
#ifdef COLORCURVES
float luma=getLuminance(result.rgb);vec2 curveMix=clamp(vec2(luma*3.0-1.5,luma*-3.0+1.5),vec2(0.0),vec2(1.0));vec4 colorCurve=vCameraColorCurveNeutral+curveMix.x*vCameraColorCurvePositive-curveMix.y*vCameraColorCurveNegative;result.rgb*=colorCurve.rgb;result.rgb=mix(vec3(luma),result.rgb,colorCurve.a);
#endif
#ifdef DITHER
float rand=getRand(gl_FragCoord.xy*vInverseScreenSize);float dither=mix(-ditherIntensity,ditherIntensity,rand);result.rgb=saturate(result.rgb+vec3(dither));
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATEND
return result;}`;t.ShaderStore.IncludesShadersStore[a]||(t.ShaderStore.IncludesShadersStore[a]=s),e.s([],77772)},49426,e=>{"use strict";var t=e.i(47662);let i="logDepthFragment",r=`#ifdef LOGARITHMICDEPTH
gl_FragDepthEXT=log2(vFragmentDepth)*logarithmicDepthConstant*0.5;
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},81239,79939,e=>{"use strict";var t=e.i(47662);let i="clipPlaneFragmentDeclaration",r=`#ifdef CLIPPLANE
varying float fClipDistance;
#endif
#ifdef CLIPPLANE2
varying float fClipDistance2;
#endif
#ifdef CLIPPLANE3
varying float fClipDistance3;
#endif
#ifdef CLIPPLANE4
varying float fClipDistance4;
#endif
#ifdef CLIPPLANE5
varying float fClipDistance5;
#endif
#ifdef CLIPPLANE6
varying float fClipDistance6;
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([],81239);let a="clipPlaneFragment",s=`#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)
if (false) {}
#endif
#ifdef CLIPPLANE
else if (fClipDistance>0.0)
{discard;}
#endif
#ifdef CLIPPLANE2
else if (fClipDistance2>0.0)
{discard;}
#endif
#ifdef CLIPPLANE3
else if (fClipDistance3>0.0)
{discard;}
#endif
#ifdef CLIPPLANE4
else if (fClipDistance4>0.0)
{discard;}
#endif
#ifdef CLIPPLANE5
else if (fClipDistance5>0.0)
{discard;}
#endif
#ifdef CLIPPLANE6
else if (fClipDistance6>0.0)
{discard;}
#endif
`;t.ShaderStore.IncludesShadersStore[a]||(t.ShaderStore.IncludesShadersStore[a]=s),e.s([],79939)},71154,72079,e=>{"use strict";var t=e.i(47662);let i="fogFragmentDeclaration",r=`#ifdef FOG
#define FOGMODE_NONE 0.
#define FOGMODE_EXP 1.
#define FOGMODE_EXP2 2.
#define FOGMODE_LINEAR 3.
#define E 2.71828
uniform vec4 vFogInfos;uniform vec3 vFogColor;varying vec3 vFogDistance;float CalcFogFactor()
{float fogCoeff=1.0;float fogStart=vFogInfos.y;float fogEnd=vFogInfos.z;float fogDensity=vFogInfos.w;float fogDistance=length(vFogDistance);if (FOGMODE_LINEAR==vFogInfos.x)
{fogCoeff=(fogEnd-fogDistance)/(fogEnd-fogStart);}
else if (FOGMODE_EXP==vFogInfos.x)
{fogCoeff=1.0/pow(E,fogDistance*fogDensity);}
else if (FOGMODE_EXP2==vFogInfos.x)
{fogCoeff=1.0/pow(E,fogDistance*fogDistance*fogDensity*fogDensity);}
return clamp(fogCoeff,0.0,1.0);}
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([],71154);let a="fogFragment",s=`#ifdef FOG
float fog=CalcFogFactor();
#ifdef PBR
fog=toLinearSpace(fog);
#endif
color.rgb=mix(vFogColor,color.rgb,fog);
#endif
`;t.ShaderStore.IncludesShadersStore[a]||(t.ShaderStore.IncludesShadersStore[a]=s),e.s([],72079)},30550,e=>{"use strict";var t=e.i(47662);let i="samplerFragmentDeclaration",r=`#ifdef _DEFINENAME_
#if _DEFINENAME_DIRECTUV==1
#define v_VARYINGNAME_UV vMainUV1
#elif _DEFINENAME_DIRECTUV==2
#define v_VARYINGNAME_UV vMainUV2
#elif _DEFINENAME_DIRECTUV==3
#define v_VARYINGNAME_UV vMainUV3
#elif _DEFINENAME_DIRECTUV==4
#define v_VARYINGNAME_UV vMainUV4
#elif _DEFINENAME_DIRECTUV==5
#define v_VARYINGNAME_UV vMainUV5
#elif _DEFINENAME_DIRECTUV==6
#define v_VARYINGNAME_UV vMainUV6
#else
varying vec2 v_VARYINGNAME_UV;
#endif
uniform sampler2D _SAMPLERNAME_Sampler;
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},76154,e=>{"use strict";var t=e.i(47662);let i="bumpVertex",r=`#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
vec3 tbnNormal=normalize(normalUpdated);vec3 tbnTangent=normalize(tangentUpdated.xyz);vec3 tbnBitangent=cross(tbnNormal,tbnTangent)*tangentUpdated.w;vTBN=mat3(finalWorld)*mat3(tbnTangent,tbnBitangent,tbnNormal);
#endif
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},59092,34760,e=>{"use strict";var t=e.i(47662);let i="clipPlaneVertexDeclaration",r=`#ifdef CLIPPLANE
uniform vec4 vClipPlane;varying float fClipDistance;
#endif
#ifdef CLIPPLANE2
uniform vec4 vClipPlane2;varying float fClipDistance2;
#endif
#ifdef CLIPPLANE3
uniform vec4 vClipPlane3;varying float fClipDistance3;
#endif
#ifdef CLIPPLANE4
uniform vec4 vClipPlane4;varying float fClipDistance4;
#endif
#ifdef CLIPPLANE5
uniform vec4 vClipPlane5;varying float fClipDistance5;
#endif
#ifdef CLIPPLANE6
uniform vec4 vClipPlane6;varying float fClipDistance6;
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([],59092);let a="clipPlaneVertex",s=`#ifdef CLIPPLANE
fClipDistance=dot(worldPos,vClipPlane);
#endif
#ifdef CLIPPLANE2
fClipDistance2=dot(worldPos,vClipPlane2);
#endif
#ifdef CLIPPLANE3
fClipDistance3=dot(worldPos,vClipPlane3);
#endif
#ifdef CLIPPLANE4
fClipDistance4=dot(worldPos,vClipPlane4);
#endif
#ifdef CLIPPLANE5
fClipDistance5=dot(worldPos,vClipPlane5);
#endif
#ifdef CLIPPLANE6
fClipDistance6=dot(worldPos,vClipPlane6);
#endif
`;t.ShaderStore.IncludesShadersStore[a]||(t.ShaderStore.IncludesShadersStore[a]=s),e.s([],34760)},68489,58483,32817,59862,2947,e=>{"use strict";var t=e.i(47662);let i="bonesDeclaration",r=`#if NUM_BONE_INFLUENCERS>0
attribute vec4 matricesIndices;attribute vec4 matricesWeights;
#if NUM_BONE_INFLUENCERS>4
attribute vec4 matricesIndicesExtra;attribute vec4 matricesWeightsExtra;
#endif
#ifndef BAKED_VERTEX_ANIMATION_TEXTURE
#ifdef BONETEXTURE
uniform highp sampler2D boneSampler;
#if !defined(WEBGL2) && !defined(WEBGPU)
uniform float boneTextureWidth;
#endif
#else
uniform mat4 mBones[BonesPerMesh];
#endif
#ifdef BONES_VELOCITY_ENABLED
uniform mat4 mPreviousBones[BonesPerMesh];
#endif
#ifdef BONETEXTURE
#define inline
mat4 readMatrixFromRawSampler(sampler2D smp,float index)
{
#if defined(WEBGL2) || defined(WEBGPU)
int offset=int(index) *4; 
vec4 m0=texelFetch(smp,ivec2(offset+0,0),0);vec4 m1=texelFetch(smp,ivec2(offset+1,0),0);vec4 m2=texelFetch(smp,ivec2(offset+2,0),0);vec4 m3=texelFetch(smp,ivec2(offset+3,0),0);return mat4(m0,m1,m2,m3);
#else
float offset=index *4.0;float dx=1.0/boneTextureWidth;vec4 m0=texture2D(smp,vec2(dx*(offset+0.5),0.));vec4 m1=texture2D(smp,vec2(dx*(offset+1.5),0.));vec4 m2=texture2D(smp,vec2(dx*(offset+2.5),0.));vec4 m3=texture2D(smp,vec2(dx*(offset+3.5),0.));return mat4(m0,m1,m2,m3);
#endif
}
#endif
#endif
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([],68489);let a="bakedVertexAnimationDeclaration",s=`#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
uniform float bakedVertexAnimationTime;
#if !defined(WEBGL2) && !defined(WEBGPU)
uniform vec2 bakedVertexAnimationTextureSizeInverted;
#endif
uniform vec4 bakedVertexAnimationSettings;uniform sampler2D bakedVertexAnimationTexture;
#ifdef INSTANCES
attribute vec4 bakedVertexAnimationSettingsInstanced;
#endif
#define inline
mat4 readMatrixFromRawSamplerVAT(sampler2D smp,float index,float frame)
{
#if defined(WEBGL2) || defined(WEBGPU)
int offset=int(index)*4;int frameUV=int(frame);vec4 m0=texelFetch(smp,ivec2(offset+0,frameUV),0);vec4 m1=texelFetch(smp,ivec2(offset+1,frameUV),0);vec4 m2=texelFetch(smp,ivec2(offset+2,frameUV),0);vec4 m3=texelFetch(smp,ivec2(offset+3,frameUV),0);return mat4(m0,m1,m2,m3);
#else
float offset=index*4.0;float frameUV=(frame+0.5)*bakedVertexAnimationTextureSizeInverted.y;float dx=bakedVertexAnimationTextureSizeInverted.x;vec4 m0=texture2D(smp,vec2(dx*(offset+0.5),frameUV));vec4 m1=texture2D(smp,vec2(dx*(offset+1.5),frameUV));vec4 m2=texture2D(smp,vec2(dx*(offset+2.5),frameUV));vec4 m3=texture2D(smp,vec2(dx*(offset+3.5),frameUV));return mat4(m0,m1,m2,m3);
#endif
}
#endif
`;t.ShaderStore.IncludesShadersStore[a]||(t.ShaderStore.IncludesShadersStore[a]=s),e.s([],58483);let n="instancesVertex",o=`#ifdef INSTANCES
mat4 finalWorld=mat4(world0,world1,world2,world3);
#if defined(PREPASS_VELOCITY) || defined(VELOCITY) || defined(PREPASS_VELOCITY_LINEAR) || defined(VELOCITY_LINEAR)
mat4 finalPreviousWorld=mat4(previousWorld0,previousWorld1,
previousWorld2,previousWorld3);
#endif
#ifdef THIN_INSTANCES
finalWorld=world*finalWorld;
#if defined(PREPASS_VELOCITY) || defined(VELOCITY) || defined(PREPASS_VELOCITY_LINEAR) || defined(VELOCITY_LINEAR)
finalPreviousWorld=previousWorld*finalPreviousWorld;
#endif
#endif
#else
mat4 finalWorld=world;
#if defined(PREPASS_VELOCITY) || defined(VELOCITY) || defined(PREPASS_VELOCITY_LINEAR) || defined(VELOCITY_LINEAR)
mat4 finalPreviousWorld=previousWorld;
#endif
#endif
`;t.ShaderStore.IncludesShadersStore[n]||(t.ShaderStore.IncludesShadersStore[n]=o),e.s([],32817);let l="bonesVertex",c=`#ifndef BAKED_VERTEX_ANIMATION_TEXTURE
#if NUM_BONE_INFLUENCERS>0
mat4 influence;
#ifdef BONETEXTURE
influence=readMatrixFromRawSampler(boneSampler,matricesIndices[0])*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[1])*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[2])*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[3])*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[0])*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[1])*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[2])*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[3])*matricesWeightsExtra[3];
#endif
#else
influence=mBones[int(matricesIndices[0])]*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
influence+=mBones[int(matricesIndices[1])]*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
influence+=mBones[int(matricesIndices[2])]*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
influence+=mBones[int(matricesIndices[3])]*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
influence+=mBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
influence+=mBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
influence+=mBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
influence+=mBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];
#endif
#endif
finalWorld=finalWorld*influence;
#endif
#endif
`;t.ShaderStore.IncludesShadersStore[l]||(t.ShaderStore.IncludesShadersStore[l]=c),e.s([],59862);let d="bakedVertexAnimation",u=`#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
{
#ifdef INSTANCES
#define BVASNAME bakedVertexAnimationSettingsInstanced
#else
#define BVASNAME bakedVertexAnimationSettings
#endif
float VATStartFrame=BVASNAME.x;float VATEndFrame=BVASNAME.y;float VATOffsetFrame=BVASNAME.z;float VATSpeed=BVASNAME.w;float totalFrames=VATEndFrame-VATStartFrame+1.0;float time=bakedVertexAnimationTime*VATSpeed/totalFrames;float frameCorrection=time<1.0 ? 0.0 : 1.0;float numOfFrames=totalFrames-frameCorrection;float VATFrameNum=fract(time)*numOfFrames;VATFrameNum=mod(VATFrameNum+VATOffsetFrame,numOfFrames);VATFrameNum=floor(VATFrameNum);VATFrameNum+=VATStartFrame+frameCorrection;mat4 VATInfluence;VATInfluence=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[0],VATFrameNum)*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[1],VATFrameNum)*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[2],VATFrameNum)*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[3],VATFrameNum)*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[0],VATFrameNum)*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[1],VATFrameNum)*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[2],VATFrameNum)*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[3],VATFrameNum)*matricesWeightsExtra[3];
#endif
finalWorld=finalWorld*VATInfluence;}
#endif
`;t.ShaderStore.IncludesShadersStore[d]||(t.ShaderStore.IncludesShadersStore[d]=u),e.s([],2947)},8559,e=>{"use strict";var t=e.i(47662);let i="instancesDeclaration",r=`#ifdef INSTANCES
attribute vec4 world0;attribute vec4 world1;attribute vec4 world2;attribute vec4 world3;
#ifdef INSTANCESCOLOR
attribute vec4 instanceColor;
#endif
#if defined(THIN_INSTANCES) && !defined(WORLD_UBO)
uniform mat4 world;
#endif
#if defined(VELOCITY) || defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR) || defined(VELOCITY_LINEAR)
attribute vec4 previousWorld0;attribute vec4 previousWorld1;attribute vec4 previousWorld2;attribute vec4 previousWorld3;
#ifdef THIN_INSTANCES
uniform mat4 previousWorld;
#endif
#endif
#else
#if !defined(WORLD_UBO)
uniform mat4 world;
#endif
#if defined(VELOCITY) || defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR) || defined(VELOCITY_LINEAR)
uniform mat4 previousWorld;
#endif
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},52690,10370,88335,16389,e=>{"use strict";var t=e.i(47662);let i="morphTargetsVertexGlobalDeclaration",r=`#ifdef MORPHTARGETS
uniform float morphTargetInfluences[NUM_MORPH_INFLUENCERS];
#ifdef MORPHTARGETS_TEXTURE 
uniform float morphTargetTextureIndices[NUM_MORPH_INFLUENCERS];uniform vec3 morphTargetTextureInfo;uniform highp sampler2DArray morphTargets;vec3 readVector3FromRawSampler(int targetIndex,float vertexIndex)
{ 
#if defined(WEBGL2) || defined(WEBGPU)
int textureWidth=int(morphTargetTextureInfo.y);int y=int(vertexIndex)/textureWidth;int x=int(vertexIndex) % textureWidth;return texelFetch(morphTargets,ivec3(x,y,int(morphTargetTextureIndices[targetIndex])),0).xyz;
#else
float y=floor(vertexIndex/morphTargetTextureInfo.y);float x=vertexIndex-y*morphTargetTextureInfo.y;vec3 textureUV=vec3((x+0.5)/morphTargetTextureInfo.y,(y+0.5)/morphTargetTextureInfo.z,morphTargetTextureIndices[targetIndex]);return texture(morphTargets,textureUV).xyz;
#endif
}
vec4 readVector4FromRawSampler(int targetIndex,float vertexIndex)
{ 
#if defined(WEBGL2) || defined(WEBGPU)
int textureWidth=int(morphTargetTextureInfo.y);int y=int(vertexIndex)/textureWidth;int x=int(vertexIndex) % textureWidth;return texelFetch(morphTargets,ivec3(x,y,int(morphTargetTextureIndices[targetIndex])),0);
#else
float y=floor(vertexIndex/morphTargetTextureInfo.y);float x=vertexIndex-y*morphTargetTextureInfo.y;vec3 textureUV=vec3((x+0.5)/morphTargetTextureInfo.y,(y+0.5)/morphTargetTextureInfo.z,morphTargetTextureIndices[targetIndex]);return texture(morphTargets,textureUV);
#endif
}
#endif
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([],52690);let a="morphTargetsVertexDeclaration",s=`#ifdef MORPHTARGETS
#ifndef MORPHTARGETS_TEXTURE
#ifdef MORPHTARGETS_POSITION
attribute vec3 position{X};
#endif
#ifdef MORPHTARGETS_NORMAL
attribute vec3 normal{X};
#endif
#ifdef MORPHTARGETS_TANGENT
attribute vec3 tangent{X};
#endif
#ifdef MORPHTARGETS_UV
attribute vec2 uv_{X};
#endif
#ifdef MORPHTARGETS_UV2
attribute vec2 uv2_{X};
#endif
#ifdef MORPHTARGETS_COLOR
attribute vec4 color{X};
#endif
#elif {X}==0
uniform float morphTargetCount;
#endif
#endif
`;t.ShaderStore.IncludesShadersStore[a]||(t.ShaderStore.IncludesShadersStore[a]=s),e.s([],10370);let n="morphTargetsVertexGlobal",o=`#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
float vertexID;
#endif
#endif
`;t.ShaderStore.IncludesShadersStore[n]||(t.ShaderStore.IncludesShadersStore[n]=o),e.s([],88335);let l="morphTargetsVertex",c=`#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
#if {X}==0
for (int i=0; i<NUM_MORPH_INFLUENCERS; i++) {if (float(i)>=morphTargetCount) break;vertexID=float(gl_VertexID)*morphTargetTextureInfo.x;
#ifdef MORPHTARGETS_POSITION
positionUpdated+=(readVector3FromRawSampler(i,vertexID)-position)*morphTargetInfluences[i];
#endif
#ifdef MORPHTARGETTEXTURE_HASPOSITIONS
vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(readVector3FromRawSampler(i,vertexID) -normal)*morphTargetInfluences[i];
#endif
#ifdef MORPHTARGETTEXTURE_HASNORMALS
vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(readVector3FromRawSampler(i,vertexID).xy-uv)*morphTargetInfluences[i];
#endif
#ifdef MORPHTARGETTEXTURE_HASUVS
vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(readVector3FromRawSampler(i,vertexID) -tangent.xyz)*morphTargetInfluences[i];
#endif
#ifdef MORPHTARGETTEXTURE_HASTANGENTS
vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_UV2
uv2Updated+=(readVector3FromRawSampler(i,vertexID).xy-uv2)*morphTargetInfluences[i];
#endif
#ifdef MORPHTARGETTEXTURE_HASUV2S
vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_COLOR
colorUpdated+=(readVector4FromRawSampler(i,vertexID)-color)*morphTargetInfluences[i];
#endif
}
#endif
#else
#ifdef MORPHTARGETS_POSITION
positionUpdated+=(position{X}-position)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(normal{X}-normal)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(tangent{X}-tangent.xyz)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(uv_{X}-uv)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_UV2
uv2Updated+=(uv2_{X}-uv2)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_COLOR
colorUpdated+=(color{X}-color)*morphTargetInfluences[{X}];
#endif
#endif
#endif
`;t.ShaderStore.IncludesShadersStore[l]||(t.ShaderStore.IncludesShadersStore[l]=c),e.s([],16389)},45224,e=>{"use strict";var t=e.i(47662);let i="logDepthDeclaration",r=`#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;varying float vFragmentDepth;
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},84972,e=>{"use strict";var t=e.i(47662);let i="sceneUboDeclaration",r=`layout(std140,column_major) uniform;uniform Scene {mat4 viewProjection;
#ifdef MULTIVIEW
mat4 viewProjectionR;
#endif 
mat4 view;mat4 projection;vec4 vEyePosition;};
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},41746,e=>{"use strict";var t=e.i(47662);let i="logDepthVertex",r=`#ifdef LOGARITHMICDEPTH
vFragmentDepth=1.0+gl_Position.w;gl_Position.z=log2(max(0.000001,vFragmentDepth))*logarithmicDepthConstant;
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},91999,e=>{"use strict";var t=e.i(47662);let i="fogVertexDeclaration",r=`#ifdef FOG
varying vec3 vFogDistance;
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},3011,e=>{"use strict";var t=e.i(47662);let i="fogVertex",r=`#ifdef FOG
vFogDistance=(view*worldPos).xyz;
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},83918,e=>{e.v("/_next/static/media/HavokPhysics.9647938c.wasm")},69559,e=>{"use strict";var t=e.i(47662);let i="imageProcessingCompatibility",r=`#ifdef IMAGEPROCESSINGPOSTPROCESS
gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},81923,e=>{"use strict";var t=e.i(47662);e.i(81239),e.i(80315),e.i(79939);let i="depthPixelShader",r=`#ifdef ALPHATEST
varying vec2 vUV;uniform sampler2D diffuseSampler;
#endif
#include<clipPlaneFragmentDeclaration>
varying float vDepthMetric;
#ifdef PACKED
#include<packingFunctions>
#endif
#ifdef STORE_CAMERASPACE_Z
varying vec4 vViewPos;
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{
#include<clipPlaneFragment>
#ifdef ALPHATEST
if (texture2D(diffuseSampler,vUV).a<0.4)
discard;
#endif
#ifdef STORE_CAMERASPACE_Z
#ifdef PACKED
gl_FragColor=pack(vViewPos.z);
#else
gl_FragColor=vec4(vViewPos.z,0.0,0.0,1.0);
#endif
#else
#ifdef NONLINEARDEPTH
#ifdef PACKED
gl_FragColor=pack(gl_FragCoord.z);
#else
gl_FragColor=vec4(gl_FragCoord.z,0.0,0.0,0.0);
#endif
#else
#ifdef PACKED
gl_FragColor=pack(vDepthMetric);
#else
gl_FragColor=vec4(vDepthMetric,0.0,0.0,1.0);
#endif
#endif
#endif
}`;t.ShaderStore.ShadersStore[i]||(t.ShaderStore.ShadersStore[i]=r),e.s(["depthPixelShader",0,{name:i,shader:r}])},28748,e=>{"use strict";var t=e.i(47662);let i="sharpenPixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;uniform vec2 screenSize;uniform vec2 sharpnessAmounts;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{vec2 onePixel=vec2(1.0,1.0)/screenSize;vec4 color=texture2D(textureSampler,vUV);vec4 edgeDetection=texture2D(textureSampler,vUV+onePixel*vec2(0,-1)) +
texture2D(textureSampler,vUV+onePixel*vec2(-1,0)) +
texture2D(textureSampler,vUV+onePixel*vec2(1,0)) +
texture2D(textureSampler,vUV+onePixel*vec2(0,1)) -
color*4.0;gl_FragColor=max(vec4(color.rgb*sharpnessAmounts.y,color.a)-(sharpnessAmounts.x*vec4(edgeDetection.rgb,0)),0.);}`;t.ShaderStore.ShadersStore[i]||(t.ShaderStore.ShadersStore[i]=r),e.s(["sharpenPixelShader",0,{name:i,shader:r}])},45815,e=>{"use strict";var t=e.i(20651),i=e.i(28497);class r extends t.FlowGraphBlock{constructor(e){super(e);const t=e.glTF,r=t?.animations?.map(e=>e._babylonAnimationGroup)||[];this.animationGroups=this.registerDataOutput("animationGroups",i.RichTypeAny,r);const a=t?.nodes?.map(e=>e._babylonTransformNode)||[];this.nodes=this.registerDataOutput("nodes",i.RichTypeAny,a)}getClassName(){return"FlowGraphGLTFDataProvider"}}e.s(["FlowGraphGLTFDataProvider",()=>r])},51419,e=>{"use strict";var t=e.i(47662);let i="minmaxReduxPixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#if defined(INITIAL)
uniform vec2 texSize;void main(void)
{ivec2 coord=ivec2(vUV*(texSize-1.0));float f1=texelFetch(textureSampler,coord,0).r;float f2=texelFetch(textureSampler,coord+ivec2(1,0),0).r;float f3=texelFetch(textureSampler,coord+ivec2(1,1),0).r;float f4=texelFetch(textureSampler,coord+ivec2(0,1),0).r;
#ifdef DEPTH_REDUX
#ifdef VIEW_DEPTH
float minz=3.4e38;if (f1 != 0.0) { minz=f1; }
if (f2 != 0.0) { minz=min(minz,f2); }
if (f3 != 0.0) { minz=min(minz,f3); }
if (f4 != 0.0) { minz=min(minz,f4); }
float maxz=max(max(max(f1,f2),f3),f4);
#else
float minz=min(min(min(f1,f2),f3),f4);float maxz=max(max(max(sign(1.0-f1)*f1,sign(1.0-f2)*f2),sign(1.0-f3)*f3),sign(1.0-f4)*f4);
#endif
#else
float minz=min(min(min(f1,f2),f3),f4);float maxz=max(max(max(f1,f2),f3),f4);
#endif
glFragColor=vec4(minz,maxz,0.,0.);}
#elif defined(MAIN)
uniform vec2 texSize;void main(void)
{ivec2 coord=ivec2(vUV*(texSize-1.0));vec2 f1=texelFetch(textureSampler,coord,0).rg;vec2 f2=texelFetch(textureSampler,coord+ivec2(1,0),0).rg;vec2 f3=texelFetch(textureSampler,coord+ivec2(1,1),0).rg;vec2 f4=texelFetch(textureSampler,coord+ivec2(0,1),0).rg;float minz=min(min(min(f1.x,f2.x),f3.x),f4.x);float maxz=max(max(max(f1.y,f2.y),f3.y),f4.y);glFragColor=vec4(minz,maxz,0.,0.);}
#elif defined(ONEBEFORELAST)
uniform ivec2 texSize;void main(void)
{ivec2 coord=ivec2(vUV*vec2(texSize-1));vec2 f1=texelFetch(textureSampler,coord % texSize,0).rg;vec2 f2=texelFetch(textureSampler,(coord+ivec2(1,0)) % texSize,0).rg;vec2 f3=texelFetch(textureSampler,(coord+ivec2(1,1)) % texSize,0).rg;vec2 f4=texelFetch(textureSampler,(coord+ivec2(0,1)) % texSize,0).rg;float minz=min(min(min(f1.x,f2.x),f3.x),f4.x);float maxz=max(max(max(f1.y,f2.y),f3.y),f4.y);glFragColor=vec4(minz,maxz,0.,0.);}
#elif defined(LAST)
void main(void)
{glFragColor=vec4(0.);if (true) { 
discard;}}
#endif
`;t.ShaderStore.ShadersStore[i]||(t.ShaderStore.ShadersStore[i]=r),e.s(["minmaxReduxPixelShader",0,{name:i,shader:r}])},64029,e=>{"use strict";var t=e.i(47662);let i="minmaxReduxPixelShader",r=`varying vUV: vec2f;var textureSampler: texture_2d<f32>;
#if defined(INITIAL)
uniform texSize: vec2f;@fragment
fn main(input: FragmentInputs)->FragmentOutputs {let coord=vec2i(fragmentInputs.vUV*(uniforms.texSize-1.0));let f1=textureLoad(textureSampler,coord,0).r;let f2=textureLoad(textureSampler,coord+vec2i(1,0),0).r;let f3=textureLoad(textureSampler,coord+vec2i(1,1),0).r;let f4=textureLoad(textureSampler,coord+vec2i(0,1),0).r;
#ifdef DEPTH_REDUX
#ifdef VIEW_DEPTH
var minz=3.4e38;if (f1 != 0.0) { minz=f1; }
if (f2 != 0.0) { minz=min(minz,f2); }
if (f3 != 0.0) { minz=min(minz,f3); }
if (f4 != 0.0) { minz=min(minz,f4); }
let maxz=max(max(max(f1,f2),f3),f4);
#else
let minz=min(min(min(f1,f2),f3),f4);let maxz=max(max(max(sign(1.0-f1)*f1,sign(1.0-f2)*f2),sign(1.0-f3)*f3),sign(1.0-f4)*f4);
#endif
#else
let minz=min(min(min(f1,f2),f3),f4);let maxz=max(max(max(f1,f2),f3),f4);
#endif
fragmentOutputs.color=vec4f(minz,maxz,0.,0.);}
#elif defined(MAIN)
uniform texSize: vec2f;@fragment
fn main(input: FragmentInputs)->FragmentOutputs {let coord=vec2i(fragmentInputs.vUV*(uniforms.texSize-1.0));let f1=textureLoad(textureSampler,coord,0).rg;let f2=textureLoad(textureSampler,coord+vec2i(1,0),0).rg;let f3=textureLoad(textureSampler,coord+vec2i(1,1),0).rg;let f4=textureLoad(textureSampler,coord+vec2i(0,1),0).rg;let minz=min(min(min(f1.x,f2.x),f3.x),f4.x);let maxz=max(max(max(f1.y,f2.y),f3.y),f4.y);fragmentOutputs.color=vec4(minz,maxz,0.,0.);}
#elif defined(ONEBEFORELAST)
uniform texSize: vec2i;@fragment
fn main(input: FragmentInputs)->FragmentOutputs {let coord=vec2i(fragmentInputs.vUV*vec2f(uniforms.texSize-1));let f1=textureLoad(textureSampler,coord % uniforms.texSize,0).rg;let f2=textureLoad(textureSampler,(coord+vec2i(1,0)) % uniforms.texSize,0).rg;let f3=textureLoad(textureSampler,(coord+vec2i(1,1)) % uniforms.texSize,0).rg;let f4=textureLoad(textureSampler,(coord+vec2i(0,1)) % uniforms.texSize,0).rg;let minz=min(min(min(f1.x,f2.x),f3.x),f4.x);let maxz=max(max(max(f1.y,f2.y),f3.y),f4.y);fragmentOutputs.color=vec4(minz,maxz,0.,0.);}
#elif defined(LAST)
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=vec4f(0.);if (true) { 
discard;}}
#endif
`;t.ShaderStore.ShadersStoreWGSL[i]||(t.ShaderStore.ShadersStoreWGSL[i]=r),e.s(["minmaxReduxPixelShaderWGSL",0,{name:i,shader:r}])},99807,e=>{"use strict";var t=e.i(19221),i=e.i(62068),r=e.i(9840),a=e.i(3804),s=e.i(9783);class n extends t.AbstractSoundSource{constructor(e,t,i,r){super(e,i,r),this._stereo=null,this._webAudioNode=null,this._audioContext=this.engine._audioContext,this._webAudioNode=t,this._subGraph=new n._SubGraph(this)}async _initAsync(e){e.outBus?this.outBus=e.outBus:!1!==e.outBusAutoDefault&&(await this.engine.isReadyPromise,this.outBus=this.engine.defaultMainBus),await this._subGraph.initAsync(e),(0,i._HasSpatialAudioOptions)(e)&&this._initSpatialProperty(),this.engine._addNode(this)}get _inNode(){return this._webAudioNode}get _outNode(){return this._subGraph._outNode}get stereo(){return this._stereo??(this._stereo=new r._StereoAudio(this._subGraph))}dispose(){if(super.dispose(),this._webAudioNode){if(this._webAudioNode instanceof MediaStreamAudioSourceNode)for(let e of this._webAudioNode.mediaStream.getTracks())e.stop();this._webAudioNode.disconnect(),this._webAudioNode=null}this._stereo=null,this._subGraph.dispose(),this.engine._removeNode(this)}getClassName(){return"_WebAudioSoundSource"}_connect(e){return!!super._connect(e)&&(e._inNode&&this._outNode?.connect(e._inNode),!0)}_disconnect(e){return!!super._disconnect(e)&&(e._inNode&&this._outNode?.disconnect(e._inNode),!0)}_createSpatialProperty(e,t){return new s._SpatialWebAudio(this._subGraph,e,t)}}n._SubGraph=class extends a._WebAudioBusAndSoundSubGraph{get _downstreamNodes(){return this._owner._downstreamNodes??null}get _upstreamNodes(){return this._owner._upstreamNodes??null}_onSubNodesChanged(){super._onSubNodesChanged(),this._owner._inNode?.disconnect(),this._owner._subGraph._inNode&&this._owner._inNode?.connect(this._owner._subGraph._inNode)}},e.s(["_WebAudioSoundSource",()=>n])},90142,e=>{"use strict";var t=e.i(47662);let i="pointCloudVertex",r=`#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.s([])},97913,e=>{"use strict";var t=e.i(47662);e.i(68489),e.i(58483),e.i(52690),e.i(10370),e.i(59092),e.i(8559);let i="pointCloudVertexDeclaration",r=`#ifdef POINTSIZE
uniform float pointSize;
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.i(88335),e.i(16389),e.i(32817),e.i(59862),e.i(2947),e.i(34760),e.i(90142);let a="depthVertexShader",s=`attribute vec3 position;
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#include<clipPlaneVertexDeclaration>
#include<instancesDeclaration>
uniform mat4 viewProjection;uniform vec2 depthValues;
#if defined(ALPHATEST) || defined(NEED_UV)
varying vec2 vUV;uniform mat4 diffuseMatrix;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#endif
#ifdef STORE_CAMERASPACE_Z
uniform mat4 view;varying vec4 vViewPos;
#endif
#include<pointCloudVertexDeclaration>
varying float vDepthMetric;
#define CUSTOM_VERTEX_DEFINITIONS
void main(void)
{vec3 positionUpdated=position;
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#ifdef UV2
vec2 uv2Updated=uv2;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);
#include<clipPlaneVertex>
gl_Position=viewProjection*worldPos;
#ifdef STORE_CAMERASPACE_Z
vViewPos=view*worldPos;
#else
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetric=((-gl_Position.z+depthValues.x)/(depthValues.y));
#else
vDepthMetric=((gl_Position.z+depthValues.x)/(depthValues.y));
#endif
#endif
#if defined(ALPHATEST) || defined(BASIC_RENDER)
#ifdef UV1
vUV=vec2(diffuseMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef UV2
vUV=vec2(diffuseMatrix*vec4(uv2Updated,1.0,0.0));
#endif
#endif
#include<pointCloudVertex>
}
`;t.ShaderStore.ShadersStore[a]||(t.ShaderStore.ShadersStore[a]=s),e.s(["depthVertexShader",0,{name:a,shader:s}],97913)},27249,e=>{"use strict";var t,i,r=e.i(66452);function a(e){let t=0,i=Date.now();e.observableParameters=e.observableParameters??{};let r=e.contextObservable.add(a=>{let s=Date.now();t=s-i;let n={startTime:i,currentTime:s,deltaTime:t,completeRate:t/e.timeout,payload:a};if(e.breakCondition&&e.breakCondition(n)){e.contextObservable.remove(r),e.onAborted&&e.onAborted(n);return}if(t>=e.timeout){e.contextObservable.remove(r),e.onEnded&&e.onEnded(n);return}e.onTick&&e.onTick(n)},e.observableParameters.mask,e.observableParameters.insertFirst,e.observableParameters.scope);return r}(t=i||(i={}))[t.INIT=0]="INIT",t[t.STARTED=1]="STARTED",t[t.ENDED=2]="ENDED";class s{constructor(e){this.onEachCountObservable=new r.Observable,this.onTimerAbortedObservable=new r.Observable,this.onTimerEndedObservable=new r.Observable,this.onStateChangedObservable=new r.Observable,this._observer=null,this._breakOnNextTick=!1,this._tick=e=>{let t=Date.now();this._timer=t-this._startTime;let i={startTime:this._startTime,currentTime:t,deltaTime:this._timer,completeRate:this._timer/this._timeToEnd,payload:e},r=this._breakOnNextTick||this._breakCondition(i);r||this._timer>=this._timeToEnd?this._stop(i,r):this.onEachCountObservable.notifyObservers(i)},this._setState(0),this._contextObservable=e.contextObservable,this._observableParameters=e.observableParameters??{},this._breakCondition=e.breakCondition??(()=>!1),this._timeToEnd=e.timeout,e.onEnded&&this.onTimerEndedObservable.add(e.onEnded),e.onTick&&this.onEachCountObservable.add(e.onTick),e.onAborted&&this.onTimerAbortedObservable.add(e.onAborted)}set breakCondition(e){this._breakCondition=e}clearObservables(){this.onEachCountObservable.clear(),this.onTimerAbortedObservable.clear(),this.onTimerEndedObservable.clear(),this.onStateChangedObservable.clear()}start(e=this._timeToEnd){if(1===this._state)throw Error("Timer already started. Please stop it before starting again");this._timeToEnd=e,this._startTime=Date.now(),this._timer=0,this._observer=this._contextObservable.add(this._tick,this._observableParameters.mask,this._observableParameters.insertFirst,this._observableParameters.scope),this._setState(1)}stop(){1===this._state&&(this._breakOnNextTick=!0)}dispose(){this._observer&&this._contextObservable.remove(this._observer),this.clearObservables()}_setState(e){this._state=e,this.onStateChangedObservable.notifyObservers(this._state)}_stop(e,t=!1){this._contextObservable.remove(this._observer),this._setState(2),t?this.onTimerAbortedObservable.notifyObservers(e):this.onTimerEndedObservable.notifyObservers(e)}}e.s(["AdvancedTimer",()=>s,"setAndStartTimer",()=>a])},89108,e=>{"use strict";var t=e.i(47662);e.i(81239);let i="mrtFragmentDeclaration",r=`#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
layout(location=0) out vec4 glFragData[{X}];
#endif
`;t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]=r),e.i(37187),e.i(610),e.i(87714),e.i(79939),e.i(87126);let a="geometryPixelShader",s=`#extension GL_EXT_draw_buffers : require
#if defined(BUMP) || !defined(NORMAL)
#extension GL_OES_standard_derivatives : enable
#endif
precision highp float;
#ifdef BUMP
varying mat4 vWorldView;varying vec3 vNormalW;
#else
varying vec3 vNormalV;
#endif
varying vec4 vViewPos;
#if defined(POSITION) || defined(BUMP)
varying vec3 vPositionW;
#endif
#if defined(VELOCITY) || defined(VELOCITY_LINEAR)
varying vec4 vCurrentPosition;varying vec4 vPreviousPosition;
#endif
#ifdef NEED_UV
varying vec2 vUV;
#endif
#ifdef BUMP
uniform vec3 vBumpInfos;uniform vec2 vTangentSpaceParams;
#endif
#if defined(REFLECTIVITY)
#if defined(ORMTEXTURE) || defined(SPECULARGLOSSINESSTEXTURE) || defined(REFLECTIVITYTEXTURE)
uniform sampler2D reflectivitySampler;varying vec2 vReflectivityUV;
#else
#ifdef METALLIC_TEXTURE
uniform sampler2D metallicSampler;varying vec2 vMetallicUV;
#endif
#ifdef ROUGHNESS_TEXTURE
uniform sampler2D roughnessSampler;varying vec2 vRoughnessUV;
#endif
#endif
#ifdef ALBEDOTEXTURE
varying vec2 vAlbedoUV;uniform sampler2D albedoSampler;
#endif
#ifdef REFLECTIVITYCOLOR
uniform vec3 reflectivityColor;
#endif
#ifdef ALBEDOCOLOR
uniform vec3 albedoColor;
#endif
#ifdef METALLIC
uniform float metallic;
#endif
#if defined(ROUGHNESS) || defined(GLOSSINESS)
uniform float glossiness;
#endif
#endif
#if defined(ALPHATEST) && defined(NEED_UV)
uniform sampler2D diffuseSampler;
#endif
#include<clipPlaneFragmentDeclaration>
#include<mrtFragmentDeclaration>[SCENE_MRT_COUNT]
#include<bumpFragmentMainFunctions>
#include<bumpFragmentFunctions>
#include<helperFunctions>
void main() {
#include<clipPlaneFragment>
#ifdef ALPHATEST
if (texture2D(diffuseSampler,vUV).a<0.4)
discard;
#endif
vec3 normalOutput;
#ifdef BUMP
vec3 normalW=normalize(vNormalW);
#include<bumpFragment>
#ifdef NORMAL_WORLDSPACE
normalOutput=normalW;
#else
normalOutput=normalize(vec3(vWorldView*vec4(normalW,0.0)));
#endif
#elif defined(HAS_NORMAL_ATTRIBUTE)
normalOutput=normalize(vNormalV);
#elif defined(POSITION)
normalOutput=normalize(-cross(dFdx(vPositionW),dFdy(vPositionW)));
#endif
#ifdef ENCODE_NORMAL
normalOutput=normalOutput*0.5+0.5;
#endif
#ifdef DEPTH
gl_FragData[DEPTH_INDEX]=vec4(vViewPos.z/vViewPos.w,0.0,0.0,1.0);
#endif
#ifdef NORMAL
gl_FragData[NORMAL_INDEX]=vec4(normalOutput,1.0);
#endif
#ifdef SCREENSPACE_DEPTH
gl_FragData[SCREENSPACE_DEPTH_INDEX]=vec4(gl_FragCoord.z,0.0,0.0,1.0);
#endif
#ifdef POSITION
gl_FragData[POSITION_INDEX]=vec4(vPositionW,1.0);
#endif
#ifdef VELOCITY
vec2 a=(vCurrentPosition.xy/vCurrentPosition.w)*0.5+0.5;vec2 b=(vPreviousPosition.xy/vPreviousPosition.w)*0.5+0.5;vec2 velocity=abs(a-b);velocity=vec2(pow(velocity.x,1.0/3.0),pow(velocity.y,1.0/3.0))*sign(a-b)*0.5+0.5;gl_FragData[VELOCITY_INDEX]=vec4(velocity,0.0,1.0);
#endif
#ifdef VELOCITY_LINEAR
vec2 velocity=vec2(0.5)*((vPreviousPosition.xy/vPreviousPosition.w) -
(vCurrentPosition.xy/vCurrentPosition.w));gl_FragData[VELOCITY_LINEAR_INDEX]=vec4(velocity,0.0,1.0);
#endif
#ifdef REFLECTIVITY
vec4 reflectivity=vec4(0.0,0.0,0.0,1.0);
#ifdef METALLICWORKFLOW
float metal=1.0;float roughness=1.0;
#ifdef ORMTEXTURE
metal*=texture2D(reflectivitySampler,vReflectivityUV).b;roughness*=texture2D(reflectivitySampler,vReflectivityUV).g;
#else
#ifdef METALLIC_TEXTURE
metal*=texture2D(metallicSampler,vMetallicUV).r;
#endif
#ifdef ROUGHNESS_TEXTURE
roughness*=texture2D(roughnessSampler,vRoughnessUV).r;
#endif
#endif
#ifdef METALLIC
metal*=metallic;
#endif
#ifdef ROUGHNESS
roughness*=(1.0-glossiness); 
#endif
reflectivity.a-=roughness;vec3 color=vec3(1.0);
#ifdef ALBEDOTEXTURE
color=texture2D(albedoSampler,vAlbedoUV).rgb;
#ifdef GAMMAALBEDO
color=toLinearSpace(color);
#endif
#endif
#ifdef ALBEDOCOLOR
color*=albedoColor.xyz;
#endif
reflectivity.rgb=mix(vec3(0.04),color,metal);
#else
#if defined(SPECULARGLOSSINESSTEXTURE) || defined(REFLECTIVITYTEXTURE)
reflectivity=texture2D(reflectivitySampler,vReflectivityUV);
#ifdef GAMMAREFLECTIVITYTEXTURE
reflectivity.rgb=toLinearSpace(reflectivity.rgb);
#endif
#else 
#ifdef REFLECTIVITYCOLOR
reflectivity.rgb=toLinearSpace(reflectivityColor.xyz);reflectivity.a=1.0;
#endif
#endif
#ifdef GLOSSINESSS
reflectivity.a*=glossiness; 
#endif
#endif
gl_FragData[REFLECTIVITY_INDEX]=reflectivity;
#endif
}
`;t.ShaderStore.ShadersStore[a]||(t.ShaderStore.ShadersStore[a]=s),e.s(["geometryPixelShader",0,{name:a,shader:s}],89108)},7751,e=>{"use strict";var t=e.i(47662);e.i(68489),e.i(58483),e.i(52690),e.i(10370),e.i(8559);let i="geometryVertexDeclaration";t.ShaderStore.IncludesShadersStore[i]||(t.ShaderStore.IncludesShadersStore[i]="uniform mat4 viewProjection;uniform mat4 view;"),e.i(84972);let r="geometryUboDeclaration",a=`#include<sceneUboDeclaration>
`;t.ShaderStore.IncludesShadersStore[r]||(t.ShaderStore.IncludesShadersStore[r]=a),e.i(59092),e.i(88335),e.i(16389),e.i(32817),e.i(59862),e.i(2947),e.i(34760),e.i(76154);let s="geometryVertexShader",n=`precision highp float;
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#include<instancesDeclaration>
#include<__decl__geometryVertex>
#include<clipPlaneVertexDeclaration>
attribute vec3 position;
#ifdef HAS_NORMAL_ATTRIBUTE
attribute vec3 normal;
#endif
#ifdef NEED_UV
varying vec2 vUV;
#ifdef ALPHATEST
uniform mat4 diffuseMatrix;
#endif
#ifdef BUMP
uniform mat4 bumpMatrix;varying vec2 vBumpUV;
#endif
#ifdef REFLECTIVITY
uniform mat4 reflectivityMatrix;uniform mat4 albedoMatrix;varying vec2 vReflectivityUV;varying vec2 vAlbedoUV;
#endif
#ifdef METALLIC_TEXTURE
varying vec2 vMetallicUV;uniform mat4 metallicMatrix;
#endif
#ifdef ROUGHNESS_TEXTURE
varying vec2 vRoughnessUV;uniform mat4 roughnessMatrix;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#endif
#ifdef BUMP
varying mat4 vWorldView;
#endif
#ifdef BUMP
varying vec3 vNormalW;
#else
varying vec3 vNormalV;
#endif
varying vec4 vViewPos;
#if defined(POSITION) || defined(BUMP)
varying vec3 vPositionW;
#endif
#if defined(VELOCITY) || defined(VELOCITY_LINEAR)
uniform mat4 previousViewProjection;varying vec4 vCurrentPosition;varying vec4 vPreviousPosition;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
void main(void)
{vec3 positionUpdated=position;
#ifdef HAS_NORMAL_ATTRIBUTE
vec3 normalUpdated=normal;
#else
vec3 normalUpdated=vec3(0.0,0.0,0.0);
#endif
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#ifdef UV2
vec2 uv2Updated=uv2;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#if (defined(VELOCITY) || defined(VELOCITY_LINEAR)) && !defined(BONES_VELOCITY_ENABLED)
vCurrentPosition=viewProjection*finalWorld*vec4(positionUpdated,1.0);vPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);
#endif
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=vec4(finalWorld*vec4(positionUpdated,1.0));
#ifdef BUMP
vWorldView=view*finalWorld;mat3 normalWorld=mat3(finalWorld);vNormalW=normalize(normalWorld*normalUpdated);
#else
#ifdef NORMAL_WORLDSPACE
vNormalV=normalize(vec3(finalWorld*vec4(normalUpdated,0.0)));
#else
vNormalV=normalize(vec3((view*finalWorld)*vec4(normalUpdated,0.0)));
#endif
#endif
vViewPos=view*worldPos;
#if (defined(VELOCITY) || defined(VELOCITY_LINEAR)) && defined(BONES_VELOCITY_ENABLED)
vCurrentPosition=viewProjection*finalWorld*vec4(positionUpdated,1.0);
#if NUM_BONE_INFLUENCERS>0
mat4 previousInfluence;previousInfluence=mPreviousBones[int(matricesIndices[0])]*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
previousInfluence+=mPreviousBones[int(matricesIndices[1])]*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
previousInfluence+=mPreviousBones[int(matricesIndices[2])]*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
previousInfluence+=mPreviousBones[int(matricesIndices[3])]*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];
#endif
vPreviousPosition=previousViewProjection*finalPreviousWorld*previousInfluence*vec4(positionUpdated,1.0);
#else
vPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);
#endif
#endif
#if defined(POSITION) || defined(BUMP)
vPositionW=worldPos.xyz/worldPos.w;
#endif
gl_Position=viewProjection*finalWorld*vec4(positionUpdated,1.0);
#include<clipPlaneVertex>
#ifdef NEED_UV
#ifdef UV1
#if defined(ALPHATEST) && defined(ALPHATEST_UV1)
vUV=vec2(diffuseMatrix*vec4(uvUpdated,1.0,0.0));
#else
vUV=uvUpdated;
#endif
#ifdef BUMP_UV1
vBumpUV=vec2(bumpMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef REFLECTIVITY_UV1
vReflectivityUV=vec2(reflectivityMatrix*vec4(uvUpdated,1.0,0.0));
#else
#ifdef METALLIC_UV1
vMetallicUV=vec2(metallicMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef ROUGHNESS_UV1
vRoughnessUV=vec2(roughnessMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#endif
#ifdef ALBEDO_UV1
vAlbedoUV=vec2(albedoMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#endif
#ifdef UV2
#if defined(ALPHATEST) && defined(ALPHATEST_UV2)
vUV=vec2(diffuseMatrix*vec4(uv2Updated,1.0,0.0));
#else
vUV=uv2Updated;
#endif
#ifdef BUMP_UV2
vBumpUV=vec2(bumpMatrix*vec4(uv2Updated,1.0,0.0));
#endif
#ifdef REFLECTIVITY_UV2
vReflectivityUV=vec2(reflectivityMatrix*vec4(uv2Updated,1.0,0.0));
#else
#ifdef METALLIC_UV2
vMetallicUV=vec2(metallicMatrix*vec4(uv2Updated,1.0,0.0));
#endif
#ifdef ROUGHNESS_UV2
vRoughnessUV=vec2(roughnessMatrix*vec4(uv2Updated,1.0,0.0));
#endif
#endif
#ifdef ALBEDO_UV2
vAlbedoUV=vec2(albedoMatrix*vec4(uv2Updated,1.0,0.0));
#endif
#endif
#endif
#include<bumpVertex>
}
`;t.ShaderStore.ShadersStore[s]||(t.ShaderStore.ShadersStore[s]=n),e.s(["geometryVertexShader",0,{name:s,shader:n}],7751)},86502,e=>{"use strict";var t=e.i(74022);class i extends t.AbstractSound{constructor(e,t,i){super(e,t,i)}get duration(){return this._options.duration}set duration(e){this._options.duration=e}get loopStart(){return this._options.loopStart}set loopStart(e){this._options.loopStart=e}get loopEnd(){return this._options.loopEnd}set loopEnd(e){this._options.loopEnd=e}get pitch(){return this._options.pitch}set pitch(e){this._options.pitch=e;let t=this._instances.values();for(let i=t.next();!i.done;i=t.next())i.value.pitch=e}get playbackRate(){return this._options.playbackRate}set playbackRate(e){this._options.playbackRate=e;let t=this._instances.values();for(let i=t.next();!i.done;i=t.next())i.value.playbackRate=e}play(e={}){if(5===this.state)return void this.resume();e.duration??(e.duration=this.duration),e.loop??(e.loop=this.loop),e.loopStart??(e.loopStart=this.loopStart),e.loopEnd??(e.loopEnd=this.loopEnd),e.startOffset??(e.startOffset=this.startOffset),e.volume??(e.volume=1),e.waitTime??(e.waitTime=0);let t=this._createInstance();this._beforePlay(t),t.play(e),this._afterPlay(t),this._stopExcessInstances()}stop(e={}){if(e.waitTime&&0<e.waitTime?this._setState(0):this._setState(1),this._instances)for(let t of Array.from(this._instances))t.stop(e)}}let r=1;class a{constructor(e){this.name=`StaticSoundBuffer #${r++}`,this.engine=e}}var s=e.i(13908);class n extends s._AbstractSoundInstance{}var o=e.i(62068),l=e.i(9840),c=e.i(36842),d=e.i(39457),u=e.i(3804),f=e.i(9783);class h extends i{constructor(e,t,i){super(e,t,i),this._stereo=null,this._options={autoplay:i.autoplay??!1,duration:i.duration??0,loop:i.loop??!1,loopEnd:i.loopEnd??0,loopStart:i.loopStart??0,maxInstances:i.maxInstances??1/0,pitch:i.pitch??0,playbackRate:i.playbackRate??1,startOffset:i.startOffset??0},this._subGraph=new h._SubGraph(this)}async _initAsync(e,t){this._audioContext=this.engine._audioContext,e instanceof m?this._buffer=e:("string"==typeof e||Array.isArray(e)||e instanceof ArrayBuffer||e instanceof AudioBuffer)&&(this._buffer=await this.engine.createSoundBufferAsync(e,t)),t.outBus?this.outBus=t.outBus:!1!==t.outBusAutoDefault&&(await this.engine.isReadyPromise,this.outBus=this.engine.defaultMainBus),await this._subGraph.initAsync(t),(0,o._HasSpatialAudioOptions)(t)&&this._initSpatialProperty(),t.autoplay&&this.play(),this.engine._addSound(this)}get buffer(){return this._buffer}get _inNode(){return this._subGraph._inNode}get _outNode(){return this._subGraph._outNode}get stereo(){return this._stereo??(this._stereo=new l._StereoAudio(this._subGraph))}async cloneAsync(e=null){let t=await this.engine.createSoundAsync(this.name,e?.cloneBuffer?this.buffer.clone():this.buffer,this._options);return t.outBus=e?.outBus?e.outBus:this.outBus,t}dispose(){super.dispose(),this._stereo=null,this._subGraph.dispose(),this.engine._removeSound(this)}getClassName(){return"_WebAudioStaticSound"}_createInstance(){return new p(this,this._options)}_connect(e){return!!super._connect(e)&&(e._inNode&&this._outNode?.connect(e._inNode),!0)}_disconnect(e){return!!super._disconnect(e)&&(e._inNode&&this._outNode?.disconnect(e._inNode),!0)}_createSpatialProperty(e,t){return new f._SpatialWebAudio(this._subGraph,e,t)}_getOptions(){return this._options}}h._SubGraph=class extends u._WebAudioBusAndSoundSubGraph{get _downstreamNodes(){return this._owner._downstreamNodes??null}get _upstreamNodes(){return this._owner._upstreamNodes??null}};class m extends a{constructor(e){super(e)}async _initAsync(e,t){e instanceof AudioBuffer?this._audioBuffer=e:"string"==typeof e?await this._initFromUrlAsync(e):Array.isArray(e)?await this._initFromUrlsAsync(e,t.skipCodecCheck??!1):e instanceof ArrayBuffer&&await this._initFromArrayBufferAsync(e)}get channelCount(){return this._audioBuffer.numberOfChannels}get duration(){return this._audioBuffer.duration}get length(){return this._audioBuffer.length}get sampleRate(){return this._audioBuffer.sampleRate}clone(e=null){let t=new AudioBuffer({length:this._audioBuffer.length,numberOfChannels:this._audioBuffer.numberOfChannels,sampleRate:this._audioBuffer.sampleRate});for(let e=0;e<this._audioBuffer.numberOfChannels;e++)t.copyToChannel(this._audioBuffer.getChannelData(e),e);let i=new m(this.engine);return i._audioBuffer=t,i.name=e?.name?e.name:this.name,i}async _initFromArrayBufferAsync(e){this._audioBuffer=await this.engine._audioContext.decodeAudioData(e)}async _initFromUrlAsync(e){e=(0,c._CleanUrl)(e);let{data:t}=await (0,c._LoadArrayBufferFromUrlAsync)(e);await this._initFromArrayBufferAsync(t)}async _initFromUrlsAsync(e,t){for(let i of e){if(t)await this._initFromUrlAsync(i);else{let e=i.match(c._FileExtensionRegex),t=e?.at(1);if(t&&this.engine.isFormatValid(t))try{await this._initFromUrlAsync(i)}catch{t&&0<t.length&&this.engine.flagInvalidFormat(t)}}if(this._audioBuffer)break}}}class p extends n{constructor(e,t){super(e),this._enginePlayTime=0,this._enginePauseTime=0,this._isConnected=!1,this._pitch=null,this._playbackRate=null,this._sourceNode=null,this._onEnded=()=>{this._enginePlayTime=0,5!==this._state&&this.onEndedObservable.notifyObservers(this),this._deinitSourceNode()},this._onEngineStateChanged=()=>{"running"===this.engine.state&&(this._options.loop&&2===this.state&&this.play(),this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged))},this._options=t,this._volumeNode=new GainNode(e._audioContext),this._initSourceNode()}dispose(){super.dispose(),this._pitch?.dispose(),this._playbackRate?.dispose(),this.stop(),this._deinitSourceNode(),this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged)}get currentTime(){if(1===this._state)return 0;let e=5===this._state?0:this.engine.currentTime-this._enginePlayTime;return this._enginePauseTime+e+this._options.startOffset}set currentTime(e){let t=2===this._state||3===this._state;if(t){let e=this._sourceNode;this._deinitSourceNode(),e?.stop(),this._state=1}5===this.state&&(this._enginePauseTime=0),this._options.startOffset=e,t&&this.play()}get _outNode(){return this._volumeNode}set pitch(e){this._pitch?.setTargetValue(e)}set playbackRate(e){this._playbackRate?.setTargetValue(e)}get startTime(){return 1===this._state?0:this._enginePlayTime}getClassName(){return"_WebAudioStaticSoundInstance"}play(e={}){if(3===this._state)return;void 0!==e.duration&&(this._options.duration=e.duration),void 0!==e.loop&&(this._options.loop=e.loop),void 0!==e.loopStart&&(this._options.loopStart=e.loopStart),void 0!==e.loopEnd&&(this._options.loopEnd=e.loopEnd),void 0!==e.startOffset&&(this._options.startOffset=e.startOffset);let t=this._options.startOffset;5===this._state&&(t+=this._enginePauseTime,t%=this._sound.buffer.duration),this._enginePlayTime=this.engine.currentTime+(e.waitTime??0),this._volumeNode.gain.value=e.volume??1,this._initSourceNode(),"running"===this.engine.state?(this._setState(3),this._sourceNode?.start(this._enginePlayTime,t,this._options.duration>0?this._options.duration:void 0)):this._options.loop&&(this._setState(2),this.engine.stateChangedObservable.add(this._onEngineStateChanged))}pause(){if(3!==this._state&&2!==this._state)return;let e=3===this._state;this._setState(5),this._enginePauseTime+=this.engine.currentTime-this._enginePlayTime,e?this._sourceNode?.stop():this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged),this._deinitSourceNode()}resume(){5===this._state&&this.play()}stop(e={}){if(1!==this._state){if(3===this._state){let t=this.engine.currentTime+(e.waitTime??0);this._sourceNode?.stop(t)}(void 0===e.waitTime||e.waitTime<=0)&&(this._setState(1),this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged))}}_connect(e){return!!super._connect(e)&&(e instanceof h&&e._inNode&&(this._outNode?.connect(e._inNode),this._isConnected=!0),!0)}_disconnect(e){return!!super._disconnect(e)&&(e instanceof h&&e._inNode&&(this._outNode?.disconnect(e._inNode),this._isConnected=!1),!0)}_deinitSourceNode(){if(this._sourceNode){if(this._isConnected&&!this._disconnect(this._sound))throw Error("Disconnect failed");this._sourceNode.disconnect(this._volumeNode),this._sourceNode.removeEventListener("ended",this._onEnded),this._sourceNode=null}}_initSourceNode(){if(!this._sourceNode){if(this._sourceNode=new AudioBufferSourceNode(this._sound._audioContext,{buffer:this._sound.buffer._audioBuffer}),this._sourceNode.addEventListener("ended",this._onEnded,{once:!0}),this._sourceNode.connect(this._volumeNode),!this._connect(this._sound))throw Error("Connect failed");this._pitch=new d._WebAudioParameterComponent(this.engine,this._sourceNode.detune),this._playbackRate=new d._WebAudioParameterComponent(this.engine,this._sourceNode.playbackRate)}let e=this._sourceNode;e.detune.value=this._sound.pitch,e.loop=this._options.loop,e.loopEnd=this._options.loopEnd,e.loopStart=this._options.loopStart,e.playbackRate.value=this._sound.playbackRate}}e.s(["_WebAudioStaticSound",()=>h,"_WebAudioStaticSoundBuffer",()=>m],86502)},92921,e=>{"use strict";var t=e.i(39018);class i{static ConvertPanoramaToCubemap(e,t,i,r,a=!1,s=!0){let n;if(!e)throw"ConvertPanoramaToCubemap: input cannot be null";if(e.length!=t*i*3)if(e.length!=t*i*4)throw"ConvertPanoramaToCubemap: input size is wrong";else n=4;else n=3;return{front:this.CreateCubemapTexture(r,this.FACE_FRONT,e,t,i,a,s,n),back:this.CreateCubemapTexture(r,this.FACE_BACK,e,t,i,a,s,n),left:this.CreateCubemapTexture(r,this.FACE_LEFT,e,t,i,a,s,n),right:this.CreateCubemapTexture(r,this.FACE_RIGHT,e,t,i,a,s,n),up:this.CreateCubemapTexture(r,this.FACE_UP,e,t,i,a,s,n),down:this.CreateCubemapTexture(r,this.FACE_DOWN,e,t,i,a,s,n),size:r,type:1,format:4,gammaSpace:!1}}static CreateCubemapTexture(e,t,i,r,a,s,n,o){let l=new Float32Array(new ArrayBuffer(e*e*12)),c=s?Math.max(1,Math.round(r/4/e)):1,d=1/c,u=d*d,f=t[1].subtract(t[0]).scale(d/e),h=t[3].subtract(t[2]).scale(d/e),m=1/e,p=0;for(let s=0;s<e;s++)for(let _=0;_<c;_++){let _=t[0],v=t[2];for(let t=0;t<e;t++)for(let d=0;d<c;d++){let c=v.subtract(_).scale(p).add(_);c.normalize();let d=this.CalcProjectionSpherical(c,i,r,a,o,n);l[s*e*3+3*t+0]+=d.r*u,l[s*e*3+3*t+1]+=d.g*u,l[s*e*3+3*t+2]+=d.b*u,_=_.add(f),v=v.add(h)}p+=m*d}return l}static CalcProjectionSpherical(e,t,i,r,a,s){let n=Math.atan2(e.z,e.x),o=Math.acos(e.y);for(;n<-Math.PI;)n+=2*Math.PI;for(;n>Math.PI;)n-=2*Math.PI;let l=n/Math.PI,c=o/Math.PI,d=Math.round((l=.5*l+.5)*i);d<0?d=0:d>=i&&(d=i-1);let u=Math.round(c*r);u<0?u=0:u>=r&&(u=r-1);let f=s?r-u-1:u;return{r:t[f*i*a+d*a+0],g:t[f*i*a+d*a+1],b:t[f*i*a+d*a+2]}}}function r(e,t,i,r,a,s){if(a>0){var n;a=(n=a-136)>1023?898846567431158e293*Math.pow(2,n-1023):n<-1074?5e-324*Math.pow(2,n+1074):+Math.pow(2,n),e[s+0]=t*a,e[s+1]=i*a,e[s+2]=r*a}else e[s+0]=0,e[s+1]=0,e[s+2]=0}function a(e,t){let i,r="";for(let a=t;a<e.length-t&&"\n"!=(i=String.fromCharCode(e[a]));a++)r+=i;return r}function s(e){let t=a(e,0);if("#"!=t[0]||"?"!=t[1])throw"Bad HDR Format.";let i=!1,r=!1,s=0;do s+=t.length+1,"FORMAT=32-bit_rle_rgbe"==(t=a(e,s))?r=!0:0==t.length&&(i=!0);while(!i)if(!r)throw"HDR Bad header format, unsupported FORMAT";s+=t.length+1,t=a(e,s);let n=/^-Y (.*) \+X (.*)$/g.exec(t);if(!n||n.length<3)throw"HDR Bad header format, no size";let o=parseInt(n[2]),l=parseInt(n[1]);if(o<8||o>32767)throw"HDR Bad header format, unsupported size";return{height:l,width:o,dataPosition:s+=t.length+1}}function n(e,t,r=!1){let a=new Uint8Array(e),o=s(a),c=l(a,o);return i.ConvertPanoramaToCubemap(c,o.width,o.height,t,r)}function o(e,t){return l(e,t)}function l(e,t){let i,a,s,n,o,l,c,d,u=t.height,f=t.width,h=t.dataPosition,m=new Uint8Array(new ArrayBuffer(4*f)),p=new Float32Array(new ArrayBuffer(t.width*t.height*12));for(;u>0;){if(i=e[h++],a=e[h++],s=e[h++],n=e[h++],2!=i||2!=a||128&s||t.width<8||t.width>32767)return function(e,t){let i,a,s,n=t.height,o=t.width,l=t.dataPosition,c=new Float32Array(new ArrayBuffer(t.width*t.height*12));for(;n>0;){for(s=0;s<t.width;s++)i=e[l++],a=e[l++],r(c,i,a,e[l++],e[l++],(t.height-n)*o*3+3*s);n--}return c}(e,t);if((s<<8|n)!=f)throw"HDR Bad header format, wrong scan line width";for(d=0,l=0;d<4;d++)for(c=(d+1)*f;l<c;)if(i=e[h++],a=e[h++],i>128){if(0==(o=i-128)||o>c-l)throw"HDR Bad Format, bad scanline data (run)";for(;o-- >0;)m[l++]=a}else{if(0==(o=i)||o>c-l)throw"HDR Bad Format, bad scanline data (non-run)";if(m[l++]=a,--o>0)for(let t=0;t<o;t++)m[l++]=e[h++]}for(d=0;d<f;d++)i=m[d],a=m[d+f],r(p,i,a,s=m[d+2*f],n=m[d+3*f],(t.height-u)*f*3+3*d);u--}return p}i.FACE_LEFT=[new t.Vector3(-1,-1,-1),new t.Vector3(1,-1,-1),new t.Vector3(-1,1,-1),new t.Vector3(1,1,-1)],i.FACE_RIGHT=[new t.Vector3(1,-1,1),new t.Vector3(-1,-1,1),new t.Vector3(1,1,1),new t.Vector3(-1,1,1)],i.FACE_FRONT=[new t.Vector3(1,-1,-1),new t.Vector3(1,-1,1),new t.Vector3(1,1,-1),new t.Vector3(1,1,1)],i.FACE_BACK=[new t.Vector3(-1,-1,1),new t.Vector3(-1,-1,-1),new t.Vector3(-1,1,1),new t.Vector3(-1,1,-1)],i.FACE_DOWN=[new t.Vector3(1,1,-1),new t.Vector3(1,1,1),new t.Vector3(-1,1,-1),new t.Vector3(-1,1,1)],i.FACE_UP=[new t.Vector3(-1,-1,-1),new t.Vector3(-1,-1,1),new t.Vector3(1,-1,-1),new t.Vector3(1,-1,1)],e.s(["GetCubeMapTextureData",()=>n,"RGBE_ReadHeader",()=>s,"RGBE_ReadPixels",()=>o],92921)},76733,e=>{"use strict";var t=e.i(4527),i=e.i(1622),r=e.i(74022);class a extends r.AbstractSound{constructor(e,t,i){super(e,t,i),this._preloadedInstances=[]}get preloadCount(){return this._options.preloadCount??1}get preloadCompletedCount(){return this._preloadedInstances.length}preloadInstanceAsync(){let e=this._createInstance();return this._addPreloadedInstance(e),e.preloadedPromise}async preloadInstancesAsync(e){for(let t=0;t<e;t++)this.preloadInstanceAsync();await Promise.all(this._preloadedInstances.map(async e=>await e.preloadedPromise))}play(e={}){let t;if(5===this.state)return void this.resume();this.preloadCompletedCount>0?((t=this._preloadedInstances[0]).startOffset=this.startOffset,this._removePreloadedInstance(t)):t=this._createInstance();let i=()=>{3===t.state&&(this._stopExcessInstances(),t.onStateChangedObservable.removeCallback(i))};t.onStateChangedObservable.add(i),e.startOffset??(e.startOffset=this.startOffset),e.loop??(e.loop=this.loop),e.volume??(e.volume=1),this._beforePlay(t),t.play(e),this._afterPlay(t)}stop(){if(this._setState(1),this._instances)for(let e of Array.from(this._instances))e.stop()}_addPreloadedInstance(e){this._preloadedInstances.includes(e)||this._preloadedInstances.push(e)}_removePreloadedInstance(e){let t=this._preloadedInstances.indexOf(e);-1!==t&&this._preloadedInstances.splice(t,1)}}var s=e.i(66452),n=e.i(13908);class o extends n._AbstractSoundInstance{constructor(e){super(e),this.onReadyObservable=new s.Observable,this.preloadedPromise=new Promise((e,t)=>{this._rejectPreloadedPromise=t,this._resolvePreloadedPromise=e}),this.onErrorObservable.add(this._rejectPreloadedPromise),this.onReadyObservable.add(this._resolvePreloadedPromise)}set startOffset(e){this._options.startOffset=e}dispose(){super.dispose(),this.onErrorObservable.clear(),this.onReadyObservable.clear(),this._resolvePreloadedPromise()}}var l=e.i(62068),c=e.i(9840),d=e.i(36842),u=e.i(91626),f=e.i(3804),h=e.i(9783);class m extends a{constructor(e,t,i){super(e,t,i),this._stereo=null,this._options={autoplay:i.autoplay??!1,loop:i.loop??!1,maxInstances:i.maxInstances??1/0,preloadCount:i.preloadCount??1,startOffset:i.startOffset??0},this._subGraph=new m._SubGraph(this)}async _initAsync(e,t){let i=this.engine._audioContext;if(!(i instanceof AudioContext))throw Error("Unsupported audio context type.");this._audioContext=i,this._source=e,t.outBus?this.outBus=t.outBus:!1!==t.outBusAutoDefault&&(await this.engine.isReadyPromise,this.outBus=this.engine.defaultMainBus),await this._subGraph.initAsync(t),(0,l._HasSpatialAudioOptions)(t)&&this._initSpatialProperty(),this.preloadCount&&await this.preloadInstancesAsync(this.preloadCount),t.autoplay&&this.play(t),this.engine._addSound(this)}get _inNode(){return this._subGraph._inNode}get _outNode(){return this._subGraph._outNode}get stereo(){return this._stereo??(this._stereo=new c._StereoAudio(this._subGraph))}dispose(){super.dispose(),this._stereo=null,this._subGraph.dispose(),this.engine._removeSound(this)}getClassName(){return"_WebAudioStreamingSound"}_createInstance(){return new p(this,this._options)}_connect(e){return!!super._connect(e)&&(e._inNode&&this._outNode?.connect(e._inNode),!0)}_disconnect(e){return!!super._disconnect(e)&&(e._inNode&&this._outNode?.disconnect(e._inNode),!0)}_createSpatialProperty(e,t){return new h._SpatialWebAudio(this._subGraph,e,t)}_getOptions(){return this._options}}m._SubGraph=class extends f._WebAudioBusAndSoundSubGraph{get _downstreamNodes(){return this._owner._downstreamNodes??null}get _upstreamNodes(){return this._owner._upstreamNodes??null}};class p extends o{constructor(e,t){if(super(e),this._currentTimeChangedWhilePaused=!1,this._enginePlayTime=1/0,this._enginePauseTime=0,this._isReady=!1,this._isReadyPromise=new Promise((e,t)=>{this._resolveIsReadyPromise=e,this._rejectIsReadyPromise=t}),this._onCanPlayThrough=()=>{this._isReady=!0,this._resolveIsReadyPromise(this._mediaElement),this.onReadyObservable.notifyObservers(this)},this._onEnded=()=>{this._setState(1)},this._onError=e=>{this._setState(4),this.onErrorObservable.notifyObservers(e),this._rejectIsReadyPromise(e),this.dispose()},this._onEngineStateChanged=()=>{"running"===this.engine.state&&(this._options.loop&&2===this.state&&this.play(),this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged))},this._onUserGesture=()=>{this.play()},this._options=t,this._volumeNode=new GainNode(e._audioContext),"string"==typeof e._source)this._initFromUrl(e._source);else if(Array.isArray(e._source))this._initFromUrls(e._source);else if(e._source instanceof HTMLMediaElement)this._initFromMediaElement(e._source);else throw Error(`Invalid streaming sound source (${e._source}).`)}get currentTime(){if(1===this._state)return 0;let e=5===this._state?0:this.engine.currentTime-this._enginePlayTime;return this._enginePauseTime+e+this._options.startOffset}set currentTime(e){let t=2===this._state||3===this._state;t&&(this._mediaElement.pause(),this._state=1),this._options.startOffset=e,t?this.play({startOffset:e}):5===this._state&&(this._currentTimeChangedWhilePaused=!0)}get _outNode(){return this._volumeNode}get startTime(){return 1===this._state?0:this._enginePlayTime}dispose(){for(let e of(super.dispose(),this.stop(),this._sourceNode?.disconnect(this._volumeNode),this._sourceNode=null,this._mediaElement.removeEventListener("error",this._onError),this._mediaElement.removeEventListener("ended",this._onEnded),this._mediaElement.removeEventListener("canplaythrough",this._onCanPlayThrough),Array.from(this._mediaElement.children)))this._mediaElement.removeChild(e);this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged),this.engine.userGestureObservable.removeCallback(this._onUserGesture)}play(e={}){if(3===this._state)return;void 0!==e.loop&&(this._options.loop=e.loop),this._mediaElement.loop=this._options.loop;let t=e.startOffset;this._currentTimeChangedWhilePaused?(t=this._options.startOffset,this._currentTimeChangedWhilePaused=!1):5===this._state&&(t=this.currentTime),t&&t>0&&(this._mediaElement.currentTime=t),this._volumeNode.gain.value=e.volume??1,this._play()}pause(){(2===this._state||3===this._state)&&(this._setState(5),this._enginePauseTime+=this.engine.currentTime-this._enginePlayTime,this._mediaElement.pause())}resume(){5===this._state?this.play():this._currentTimeChangedWhilePaused&&this.play()}stop(){1!==this._state&&this._stop()}getClassName(){return"_WebAudioStreamingSoundInstance"}_connect(e){return!!super._connect(e)&&(e instanceof m&&e._inNode&&this._outNode?.connect(e._inNode),!0)}_disconnect(e){return!!super._disconnect(e)&&(e instanceof m&&e._inNode&&this._outNode?.disconnect(e._inNode),!0)}_initFromMediaElement(e){if(i.Tools.SetCorsBehavior(e.currentSrc,e),e.controls=!1,e.loop=this._options.loop,e.preload="auto",e.addEventListener("canplaythrough",this._onCanPlayThrough,{once:!0}),e.addEventListener("ended",this._onEnded,{once:!0}),e.addEventListener("error",this._onError,{once:!0}),e.load(),this._sourceNode=new MediaElementAudioSourceNode(this._sound._audioContext,{mediaElement:e}),this._sourceNode.connect(this._volumeNode),!this._connect(this._sound))throw Error("Connect failed");this._mediaElement=e}_initFromUrl(e){let t=new Audio(u.WebRequest.IsCustomRequestAvailable?(0,d._GetUrlForStreaming)((0,d._CleanUrl)(e)):(0,d._CleanUrl)(e));this._initFromMediaElement(t)}_initFromUrls(e){let t=new Audio;for(let i of e){let e=document.createElement("source");e.src=u.WebRequest.IsCustomRequestAvailable?(0,d._GetUrlForStreaming)((0,d._CleanUrl)(i)):(0,d._CleanUrl)(i),t.appendChild(e)}this._initFromMediaElement(t)}_play(){if(this._setState(2),!this._isReady)return void this._playWhenReady();if(2===this._state)if("running"===this.engine.state){let e=this._mediaElement.play();this._enginePlayTime=this.engine.currentTime,this._setState(3),e.catch(()=>{this._setState(4),this._options.loop&&this.engine.userGestureObservable.addOnce(this._onUserGesture)})}else this._options.loop?this.engine.stateChangedObservable.add(this._onEngineStateChanged):(this.stop(),this._setState(4))}_playWhenReady(){this._isReadyPromise.then(()=>{this._play()}).catch(()=>{t.Logger.Error("Streaming sound instance failed to play"),this._setState(4)})}_stop(){this._mediaElement.pause(),this._onEnded(),this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged)}}e.s(["_WebAudioStreamingSound",()=>m],76733)},15661,e=>{"use strict";var t,i;function r(e,t,i,r){switch(t){case"Animation":return r?e.animations.find(e=>e.uniqueId===i)??null:e.animations[i]??null;case"AnimationGroup":return r?e.animationGroups.find(e=>e.uniqueId===i)??null:e.animationGroups[i]??null;case"Mesh":return r?e.meshes.find(e=>e.uniqueId===i)??null:e.meshes[i]??null;case"Material":return r?e.materials.find(e=>e.uniqueId===i)??null:e.materials[i]??null;case"Camera":return r?e.cameras.find(e=>e.uniqueId===i)??null:e.cameras[i]??null;case"Light":return r?e.lights.find(e=>e.uniqueId===i)??null:e.lights[i]??null;default:return null}}(i=t||(t={})).Animation="Animation",i.AnimationGroup="AnimationGroup",i.Mesh="Mesh",i.Material="Material",i.Camera="Camera",i.Light="Light",e.s(["GetFlowGraphAssetWithType",()=>r])},85365,e=>{"use strict";var t,i,r,a,s=e.i(66452),n=e.i(76504),o=e.i(98583),l=e.i(23432),c=e.i(33788),d=e.i(15661),u=e.i(4527);(t=r||(r={})).ExecuteBlock="ExecuteBlock",t.ExecuteEvent="ExecuteEvent",t.TriggerConnection="TriggerConnection",t.ContextVariableSet="ContextVariableSet",t.GlobalVariableSet="GlobalVariableSet",t.GlobalVariableDelete="GlobalVariableDelete",t.GlobalVariableGet="GlobalVariableGet",t.AddConnection="AddConnection",t.GetConnectionValue="GetConnectionValue",t.SetConnectionValue="SetConnectionValue",t.ActivateSignal="ActivateSignal",t.ContextVariableGet="ContextVariableGet";class f{constructor(){this.logToConsole=!1,this.log=[]}addLogItem(e){if(e.time||(e.time=Date.now()),this.log.push(e),this.logToConsole){let t=e.payload?.value;"object"==typeof t&&t.getClassName?u.Logger.Log(`[FGLog] ${e.className}:${e.uniqueId.split("-")[0]} ${e.action} - ${JSON.stringify(t.getClassName())}: ${t.toString()}`):u.Logger.Log(`[FGLog] ${e.className}:${e.uniqueId.split("-")[0]} ${e.action} - ${JSON.stringify(e.payload)}`)}}getItemsOfType(e){return this.log.filter(t=>t.action===e)}}class h{get enableLogging(){return this._enableLogging}set enableLogging(e){this._enableLogging!==e&&(this._enableLogging=e,this._enableLogging?(this.logger=new f,this.logger.logToConsole=!0):this.logger=null)}constructor(e){this.uniqueId=(0,l.RandomGUID)(),this._userVariables={},this._executionVariables={},this._globalContextVariables={},this._connectionValues={},this._pendingBlocks=[],this._executionId=0,this.onNodeExecutedObservable=new s.Observable,this.treatDataAsRightHanded=!1,this._enableLogging=!1,this._configuration=e,this.assetsContext=e.assetsContext??e.scene}hasVariable(e){return e in this._userVariables}setVariable(e,t){this._userVariables[e]=t,this.logger?.addLogItem({time:Date.now(),className:this.getClassName(),uniqueId:this.uniqueId,action:"ContextVariableSet",payload:{name:e,value:t}})}getAsset(e,t){return(0,d.GetFlowGraphAssetWithType)(this.assetsContext,e,t)}getVariable(e){return this.logger?.addLogItem({time:Date.now(),className:this.getClassName(),uniqueId:this.uniqueId,action:"ContextVariableGet",payload:{name:e,value:this._userVariables[e]}}),this._userVariables[e]}get userVariables(){return this._userVariables}getScene(){return this._configuration.scene}_getUniqueIdPrefixedName(e,t){return`${e.uniqueId}_${t}`}_getGlobalContextVariable(e,t){return(this.logger?.addLogItem({time:Date.now(),className:this.getClassName(),uniqueId:this.uniqueId,action:"GlobalVariableGet",payload:{name:e,defaultValue:t,possibleValue:this._globalContextVariables[e]}}),this._hasGlobalContextVariable(e))?this._globalContextVariables[e]:t}_setGlobalContextVariable(e,t){this.logger?.addLogItem({time:Date.now(),className:this.getClassName(),uniqueId:this.uniqueId,action:"GlobalVariableSet",payload:{name:e,value:t}}),this._globalContextVariables[e]=t}_deleteGlobalContextVariable(e){this.logger?.addLogItem({time:Date.now(),className:this.getClassName(),uniqueId:this.uniqueId,action:"GlobalVariableDelete",payload:{name:e}}),delete this._globalContextVariables[e]}_hasGlobalContextVariable(e){return e in this._globalContextVariables}_setExecutionVariable(e,t,i){this._executionVariables[this._getUniqueIdPrefixedName(e,t)]=i}_getExecutionVariable(e,t,i){return this._hasExecutionVariable(e,t)?this._executionVariables[this._getUniqueIdPrefixedName(e,t)]:i}_deleteExecutionVariable(e,t){delete this._executionVariables[this._getUniqueIdPrefixedName(e,t)]}_hasExecutionVariable(e,t){return this._getUniqueIdPrefixedName(e,t)in this._executionVariables}_hasConnectionValue(e){return e.uniqueId in this._connectionValues}_setConnectionValue(e,t){this._connectionValues[e.uniqueId]=t,this.logger?.addLogItem({time:Date.now(),className:this.getClassName(),uniqueId:this.uniqueId,action:"SetConnectionValue",payload:{connectionPointId:e.uniqueId,value:t}})}_setConnectionValueByKey(e,t){this._connectionValues[e]=t}_getConnectionValue(e){return this.logger?.addLogItem({time:Date.now(),className:this.getClassName(),uniqueId:this.uniqueId,action:"GetConnectionValue",payload:{connectionPointId:e.uniqueId,value:this._connectionValues[e.uniqueId]}}),this._connectionValues[e.uniqueId]}get configuration(){return this._configuration}get hasPendingBlocks(){return this._pendingBlocks.length>0}_addPendingBlock(e){this._pendingBlocks.includes(e)||(this._pendingBlocks.push(e),this._pendingBlocks.sort((e,t)=>e.priority-t.priority))}_removePendingBlock(e){let t=this._pendingBlocks.indexOf(e);-1!==t&&this._pendingBlocks.splice(t,1)}_clearPendingBlocks(){for(let e of this._pendingBlocks)e._cancelPendingTasks(this);this._pendingBlocks.length=0}_notifyExecuteNode(e){this.onNodeExecutedObservable.notifyObservers(e),this.logger?.addLogItem({time:Date.now(),className:e.getClassName(),uniqueId:e.uniqueId,action:"ExecuteBlock"})}_notifyOnTick(e){for(let t of(this._setGlobalContextVariable("timeSinceStart",e.timeSinceStart),this._setGlobalContextVariable("deltaTime",e.deltaTime),this._pendingBlocks))t._executeOnTick?.(this)}_increaseExecutionId(){this._executionId++}get executionId(){return this._executionId}serialize(e={},t=c.defaultValueSerializationFunction){for(let i in e.uniqueId=this.uniqueId,e._userVariables={},this._userVariables)t(i,this._userVariables[i],e._userVariables);for(let i in e._connectionValues={},this._connectionValues)t(i,this._connectionValues[i],e._connectionValues);this.assetsContext!==this.getScene()&&(e._assetsContext={meshes:this.assetsContext.meshes.map(e=>e.id),materials:this.assetsContext.materials.map(e=>e.id),textures:this.assetsContext.textures.map(e=>e.name),animations:this.assetsContext.animations.map(e=>e.name),lights:this.assetsContext.lights.map(e=>e.id),cameras:this.assetsContext.cameras.map(e=>e.id),sounds:this.assetsContext.sounds?.map(e=>e.name),skeletons:this.assetsContext.skeletons.map(e=>e.id),particleSystems:this.assetsContext.particleSystems.map(e=>e.name),geometries:this.assetsContext.geometries.map(e=>e.id),multiMaterials:this.assetsContext.multiMaterials.map(e=>e.id),transformNodes:this.assetsContext.transformNodes.map(e=>e.id)})}getClassName(){return"FlowGraphContext"}}(0,n.__decorate)([(0,o.serialize)()],h.prototype,"uniqueId",void 0);var m=e.i(37408),p=e.i(26089);class _{constructor(e){this.onEventTriggeredObservable=new s.Observable,this.sceneReadyTriggered=!1,this._pointerUnderMeshState={},this._startingTime=0,this._scene=e,this._initialize()}_initialize(){this._sceneReadyObserver=this._scene.onReadyObservable.add(()=>{this.sceneReadyTriggered||(this.onEventTriggeredObservable.notifyObservers({type:"SceneReady"}),this.sceneReadyTriggered=!0)}),this._sceneDisposeObserver=this._scene.onDisposeObservable.add(()=>{this.onEventTriggeredObservable.notifyObservers({type:"SceneDispose"})}),this._sceneOnBeforeRenderObserver=this._scene.onBeforeRenderObservable.add(()=>{let e=this._scene.getEngine().getDeltaTime()/1e3;this.onEventTriggeredObservable.notifyObservers({type:"SceneBeforeRender",payload:{timeSinceStart:this._startingTime,deltaTime:e}}),this._startingTime+=e}),this._meshPickedObserver=this._scene.onPointerObservable.add(e=>{this.onEventTriggeredObservable.notifyObservers({type:"MeshPick",payload:e})},p.PointerEventTypes.POINTERPICK),this._meshUnderPointerObserver=this._scene.onMeshUnderPointerUpdatedObservable.add(e=>{let t=e.pointerId,i=e.mesh,r=this._pointerUnderMeshState[t];!r&&i?this.onEventTriggeredObservable.notifyObservers({type:"PointerOver",payload:{pointerId:t,mesh:i}}):r&&!i?this.onEventTriggeredObservable.notifyObservers({type:"PointerOut",payload:{pointerId:t,mesh:r}}):r&&i&&r!==i&&(this.onEventTriggeredObservable.notifyObservers({type:"PointerOut",payload:{pointerId:t,mesh:r,over:i}}),this.onEventTriggeredObservable.notifyObservers({type:"PointerOver",payload:{pointerId:t,mesh:i,out:r}})),this._pointerUnderMeshState[t]=i},p.PointerEventTypes.POINTERMOVE)}dispose(){this._sceneDisposeObserver?.remove(),this._sceneReadyObserver?.remove(),this._sceneOnBeforeRenderObserver?.remove(),this._meshPickedObserver?.remove(),this._meshUnderPointerObserver?.remove(),this.onEventTriggeredObservable.clear()}}var v=e.i(97513);(i=a||(a={}))[i.Stopped=0]="Stopped",i[i.Started=1]="Started";class g{get state(){return this._state}set state(e){this._state=e,this.onStateChangedObservable.notifyObservers(e)}constructor(e){this.onStateChangedObservable=new s.Observable,this._eventBlocks={SceneReady:[],SceneDispose:[],SceneBeforeRender:[],MeshPick:[],PointerDown:[],PointerUp:[],PointerMove:[],PointerOver:[],PointerOut:[],SceneAfterRender:[],NoTrigger:[]},this._executionContexts=[],this._state=0,this._scene=e.scene,this._sceneEventCoordinator=new _(this._scene),this._coordinator=e.coordinator,this._eventObserver=this._sceneEventCoordinator.onEventTriggeredObservable.add(e=>{for(let t of this._executionContexts)for(let i of this._getContextualOrder(e.type,t))if(!i._executeEvent(t,e.payload))break;switch(e.type){case"SceneReady":this._sceneEventCoordinator.sceneReadyTriggered=!0;break;case"SceneBeforeRender":for(let t of this._executionContexts)t._notifyOnTick(e.payload);break;case"SceneDispose":this.dispose()}})}createContext(){let e=new h({scene:this._scene,coordinator:this._coordinator});return this._executionContexts.push(e),e}getContext(e){return this._executionContexts[e]}addEventBlock(e){if(("PointerOver"===e.type||"PointerOut"===e.type)&&(this._scene.constantlyUpdateMeshUnderPointer=!0),"NoTrigger"!==e.type&&this._eventBlocks[e.type].push(e),1===this.state)for(let t of this._executionContexts)e._startPendingTasks(t);else this.onStateChangedObservable.addOnce(t=>{if(1===t)for(let t of this._executionContexts)e._startPendingTasks(t)})}start(){1!==this.state&&(0===this._executionContexts.length&&this.createContext(),this.onStateChangedObservable.add(e=>{1===e&&(this._startPendingEvents(),this._scene.isReady(!0)&&this._sceneEventCoordinator.onEventTriggeredObservable.notifyObservers({type:"SceneReady"}))}),this.state=1)}_startPendingEvents(){for(let e of this._executionContexts)for(let t in this._eventBlocks)for(let i of this._getContextualOrder(t,e))i._startPendingTasks(e)}_getContextualOrder(e,t){let i=this._eventBlocks[e].sort((e,t)=>t.initPriority-e.initPriority);if("MeshPick"===e){let e=[];for(let r of i){let a=r.asset.getValue(t),s=0;for(;s<i.length;s++){let e=i[s].asset.getValue(t);if(a&&e&&(0,v._IsDescendantOf)(a,e))break}e.splice(s,0,r)}return e}return i}dispose(){if(0!==this.state){for(let e of(this.state=0,this._executionContexts))e._clearPendingBlocks();for(let e in this._executionContexts.length=0,this._eventBlocks)this._eventBlocks[e].length=0;this._eventObserver?.remove(),this._sceneEventCoordinator.dispose()}}visitAllBlocks(e){let t=[],i=new Set;for(let e in this._eventBlocks)for(let r of this._eventBlocks[e])t.push(r),i.add(r.uniqueId);for(;t.length>0;){let r=t.pop();for(let a of(e(r),r.dataInputs))for(let e of a._connectedPoint)i.has(e._ownerBlock.uniqueId)||(t.push(e._ownerBlock),i.add(e._ownerBlock.uniqueId));if(r instanceof m.FlowGraphExecutionBlock)for(let e of r.signalOutputs)for(let r of e._connectedPoint)i.has(r._ownerBlock.uniqueId)||(t.push(r._ownerBlock),i.add(r._ownerBlock.uniqueId))}}serialize(e={},t){for(let i of(e.allBlocks=[],this.visitAllBlocks(t=>{let i={};t.serialize(i),e.allBlocks.push(i)}),e.executionContexts=[],this._executionContexts)){let r={};i.serialize(r,t),e.executionContexts.push(r)}}}class S{constructor(e){this.config=e,this.dispatchEventsSynchronously=!0,this._flowGraphs=[],this._customEventsMap=new Map,this._eventExecutionCounter=new Map,this._executeOnNextFrame=[],this._eventUniqueId=0,this._disposeObserver=this.config.scene.onDisposeObservable.add(()=>{this.dispose()}),this._onBeforeRenderObserver=this.config.scene.onBeforeRenderObservable.add(()=>{this._eventExecutionCounter.clear();let e=this._executeOnNextFrame.slice(0);if(e.length)for(let t of e){this.notifyCustomEvent(t.id,t.data,!1);let e=this._executeOnNextFrame.findIndex(e=>e.uniqueId===t.uniqueId);-1!==e&&this._executeOnNextFrame.splice(e,1)}});let t=S.SceneCoordinators.get(this.config.scene);t||(t=[],S.SceneCoordinators.set(this.config.scene,t)),t.push(this)}createGraph(){let e=new g({scene:this.config.scene,coordinator:this});return this._flowGraphs.push(e),e}removeGraph(e){let t=this._flowGraphs.indexOf(e);-1!==t&&(e.dispose(),this._flowGraphs.splice(t,1))}start(){for(let e of this._flowGraphs)e.start()}dispose(){for(let e of this._flowGraphs)e.dispose();this._flowGraphs.length=0,this._disposeObserver?.remove(),this._onBeforeRenderObserver?.remove();let e=S.SceneCoordinators.get(this.config.scene)??[],t=e.indexOf(this);-1!==t&&e.splice(t,1)}serialize(e,t){for(let i of(e._flowGraphs=[],this._flowGraphs)){let r={};i.serialize(r,t),e._flowGraphs.push(r)}e.dispatchEventsSynchronously=this.dispatchEventsSynchronously}get flowGraphs(){return this._flowGraphs}getCustomEventObservable(e){let t=this._customEventsMap.get(e);return t||(t=new s.Observable,this._customEventsMap.set(e,t)),t}notifyCustomEvent(e,t,i=!this.dispatchEventsSynchronously){if(i)return void this._executeOnNextFrame.push({id:e,data:t,uniqueId:this._eventUniqueId++});if(this._eventExecutionCounter.has(e)){let t=this._eventExecutionCounter.get(e);if(this._eventExecutionCounter.set(e,t+1),t>=S.MaxEventTypeExecutionPerFrame){t===S.MaxEventTypeExecutionPerFrame&&u.Logger.Warn(`FlowGraphCoordinator: Too many executions of event "${e}".`);return}}else this._eventExecutionCounter.set(e,1);let r=this._customEventsMap.get(e);r&&r.notifyObservers(t)}}S.MaxEventsPerType=30,S.MaxEventTypeExecutionPerFrame=30,S.SceneCoordinators=new Map,e.s(["FlowGraphCoordinator",()=>S],85365)},21981,54434,e=>{"use strict";var t=e.i(86956),i=e.i(4527),r=e.i(95374),a=e.i(42938),s=e.i(71733),n=e.i(90815),o=e.i(23432),l=e.i(16073),c=e.i(3312);function d(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}l.AbstractEngine.prototype._partialLoadFile=function(e,t,i,r,a=null){this._loadFile(e,e=>{i[t]=e,i._internalCount++,6===i._internalCount&&r(i)},void 0,void 0,!0,(e,t)=>{a&&e&&a(e.status+" "+e.statusText,t)})},l.AbstractEngine.prototype._cascadeLoadFiles=function(e,t,i,r=null){let a=[];a._internalCount=0;for(let e=0;e<6;e++)this._partialLoadFile(i[e],e,a,t,r)},l.AbstractEngine.prototype._cascadeLoadImgs=function(e,t,i,r,a=null,s){let n=[];n._internalCount=0;for(let o=0;o<6;o++)this._partialLoadImg(r[o],o,n,e,t,i,a,s)},l.AbstractEngine.prototype._partialLoadImg=function(e,t,i,r,a,s,l=null,c){let d=(0,o.RandomGUID)();(0,n.LoadImage)(e,e=>{i[t]=e,i._internalCount++,r&&r.removePendingData(d),6===i._internalCount&&s&&s(a,i)},(e,t)=>{r&&r.removePendingData(d),l&&l(e,t)},r?r.offlineProvider:null,c),r&&r.addPendingData(d)},l.AbstractEngine.prototype.createCubeTextureBase=function(e,t,r,a,n=null,o=null,l,d=null,u=!1,f=0,h=0,m=null,p=null,_=null,v=!1,g=null){let S,T,b=m||new s.InternalTexture(this,7);b.isCube=!0,b.url=e,b.generateMipMaps=!a,b._lodGenerationScale=f,b._lodGenerationOffset=h,b._useSRGBBuffer=!!v&&this._caps.supportSRGBBuffers&&(this.version>1||this.isWebGPU||!!a),b!==m&&(b.label=e.substring(0,60)),this._doNotHandleContextLost||(b._extension=d,b._files=r,b._buffer=g);let x=e;this._transformTextureUrl&&!m&&(e=this._transformTextureUrl(e));let C=d??((T=(S=e.split("?")[0]).lastIndexOf("."))>-1?S.substring(T).toLowerCase():""),E=(0,c._GetCompatibleTextureLoader)(C),A=(e,t)=>{b.dispose(),o?o(e,t):e&&i.Logger.Warn(e)},y=(s,o)=>{e===x?s&&A(s.status+" "+s.statusText,o):(i.Logger.Warn(`Failed to load ${e}, falling back to the ${x}`),this.createCubeTextureBase(x,t,r,!!a,n,A,l,d,u,f,h,b,p,_,v,g))};if(E)E.then(i=>{let a=e=>{p&&p(b,e),i.loadCubeData(e,b,u,n,(e,t)=>{A(e,t)})};g?a(g):r&&6===r.length?i.supportCascades?this._cascadeLoadFiles(t,e=>a(e.map(e=>new Uint8Array(e))),r,A):A("Textures type does not support cascades."):this._loadFile(e,e=>a(new Uint8Array(e)),void 0,t?t.offlineProvider||null:void 0,!0,y)});else{if(!r||0===r.length)throw Error("Cannot load cubemap because files were not defined, or the correct loader was not found.");this._cascadeLoadImgs(t,b,(e,t)=>{_&&_(e,t)},r,A)}return this._internalTexturesCache.push(b),b},e.s([],54434);let u=d("DXT1"),f=d("DXT3"),h=d("DXT5"),m=d("DX10");class p{static GetDDSInfo(e){let t=new Int32Array(e.buffer,e.byteOffset,31),i=new Int32Array(e.buffer,e.byteOffset,35),r=1;131072&t[2]&&(r=Math.max(1,t[7]));let a=t[21],s=a===m?i[32]:0,n=0;switch(a){case 113:n=2;break;case 116:n=1;break;case m:if(10===s){n=2;break}2===s&&(n=1)}return{width:t[4],height:t[3],mipmapCount:r,isFourCC:(4&t[20])==4,isRGB:(64&t[20])==64,isLuminance:(131072&t[20])==131072,isCube:(512&t[28])==512,isCompressed:a===u||a===f||a===h,dxgiFormat:s,textureType:n}}static _GetHalfFloatAsFloatRGBAArrayBuffer(e,t,i,r,s,n){let o=new Float32Array(r),l=new Uint16Array(s,i),c=0;for(let i=0;i<t;i++)for(let t=0;t<e;t++){let r=(t+i*e)*4;o[c]=(0,a.FromHalfFloat)(l[r]),o[c+1]=(0,a.FromHalfFloat)(l[r+1]),o[c+2]=(0,a.FromHalfFloat)(l[r+2]),p.StoreLODInAlphaChannel?o[c+3]=n:o[c+3]=(0,a.FromHalfFloat)(l[r+3]),c+=4}return o}static _GetHalfFloatRGBAArrayBuffer(e,t,i,r,s,n){if(p.StoreLODInAlphaChannel){let o=new Uint16Array(r),l=new Uint16Array(s,i),c=0;for(let i=0;i<t;i++)for(let t=0;t<e;t++){let r=(t+i*e)*4;o[c]=l[r],o[c+1]=l[r+1],o[c+2]=l[r+2],o[c+3]=(0,a.ToHalfFloat)(n),c+=4}return o}return new Uint16Array(s,i,r)}static _GetFloatRGBAArrayBuffer(e,t,i,r,a,s){if(p.StoreLODInAlphaChannel){let n=new Float32Array(r),o=new Float32Array(a,i),l=0;for(let i=0;i<t;i++)for(let t=0;t<e;t++){let r=(t+i*e)*4;n[l]=o[r],n[l+1]=o[r+1],n[l+2]=o[r+2],n[l+3]=s,l+=4}return n}return new Float32Array(a,i,r)}static _GetFloatAsHalfFloatRGBAArrayBuffer(e,t,i,r,s,n){let o=new Uint16Array(r),l=new Float32Array(s,i),c=0;for(let i=0;i<t;i++)for(let t=0;t<e;t++)o[c]=(0,a.ToHalfFloat)(l[c]),o[c+1]=(0,a.ToHalfFloat)(l[c+1]),o[c+2]=(0,a.ToHalfFloat)(l[c+2]),p.StoreLODInAlphaChannel?o[c+3]=(0,a.ToHalfFloat)(n):o[c+3]=(0,a.ToHalfFloat)(l[c+3]),c+=4;return o}static _GetFloatAsUIntRGBAArrayBuffer(e,i,r,a,s,n){let o=new Uint8Array(a),l=new Float32Array(s,r),c=0;for(let r=0;r<i;r++)for(let i=0;i<e;i++){let a=(i+r*e)*4;o[c]=255*(0,t.Clamp)(l[a]),o[c+1]=255*(0,t.Clamp)(l[a+1]),o[c+2]=255*(0,t.Clamp)(l[a+2]),p.StoreLODInAlphaChannel?o[c+3]=n:o[c+3]=255*(0,t.Clamp)(l[a+3]),c+=4}return o}static _GetHalfFloatAsUIntRGBAArrayBuffer(e,i,r,s,n,o){let l=new Uint8Array(s),c=new Uint16Array(n,r),d=0;for(let r=0;r<i;r++)for(let i=0;i<e;i++){let s=(i+r*e)*4;l[d]=255*(0,t.Clamp)((0,a.FromHalfFloat)(c[s])),l[d+1]=255*(0,t.Clamp)((0,a.FromHalfFloat)(c[s+1])),l[d+2]=255*(0,t.Clamp)((0,a.FromHalfFloat)(c[s+2])),p.StoreLODInAlphaChannel?l[d+3]=o:l[d+3]=255*(0,t.Clamp)((0,a.FromHalfFloat)(c[s+3])),d+=4}return l}static _GetRGBAArrayBuffer(e,t,i,r,a,s,n,o,l){let c=new Uint8Array(r),d=new Uint8Array(a,i),u=0;for(let i=0;i<t;i++)for(let t=0;t<e;t++){let r=(t+i*e)*4;c[u]=d[r+s],c[u+1]=d[r+n],c[u+2]=d[r+o],c[u+3]=d[r+l],u+=4}return c}static _ExtractLongWordOrder(e){return 0===e||255===e||-0x1000000===e?0:1+p._ExtractLongWordOrder(e>>8)}static _GetRGBArrayBuffer(e,t,i,r,a,s,n,o){let l=new Uint8Array(r),c=new Uint8Array(a,i),d=0;for(let i=0;i<t;i++)for(let t=0;t<e;t++){let r=(t+i*e)*3;l[d]=c[r+s],l[d+1]=c[r+n],l[d+2]=c[r+o],d+=3}return l}static _GetLuminanceArrayBuffer(e,t,i,r,a){let s=new Uint8Array(r),n=new Uint8Array(a,i),o=0;for(let i=0;i<t;i++)for(let t=0;t<e;t++){let r=t+i*e;s[o]=n[r],o++}return s}static UploadDDSLevels(e,t,a,s,n,o,l=-1,c,d=!0){let _,v,g,S=null;s.sphericalPolynomial&&(S=[]);let T=!!e.getCaps().s3tc;t.generateMipMaps=n;let b=new Int32Array(a.buffer,a.byteOffset,31),x,C,E,A=0,y,P=0,R=1;if(0x20534444!==b[0])return void i.Logger.Error("Invalid magic number in DDS header");if(!s.isFourCC&&!s.isRGB&&!s.isLuminance)return void i.Logger.Error("Unsupported format, must contain a FourCC, RGB or LUMINANCE code");if(s.isCompressed&&!T)return void i.Logger.Error("Compressed textures are not supported on this platform.");let I=b[22];y=b[1]+4;let N=!1;if(s.isFourCC)switch(x=b[21]){case u:R=8,P=33777;break;case f:R=16,P=33778;break;case h:R=16,P=33779;break;case 113:N=!0,I=64;break;case 116:N=!0,I=128;break;case m:{y+=20;let e=!1;switch(s.dxgiFormat){case 10:N=!0,I=64,e=!0;break;case 2:N=!0,I=128,e=!0;break;case 88:s.isRGB=!0,s.isFourCC=!1,I=32,e=!0}if(e)break}default:i.Logger.Error(["Unsupported FourCC code:",String.fromCharCode(255&x,x>>8&255,x>>16&255,x>>24&255)]);return}let O=p._ExtractLongWordOrder(b[23]),w=p._ExtractLongWordOrder(b[24]),M=p._ExtractLongWordOrder(b[25]),D=p._ExtractLongWordOrder(b[26]);N&&(P=e._getRGBABufferInternalSizedFormat(s.textureType)),v=1,131072&b[2]&&!1!==n&&(v=Math.max(1,b[7]));let U=c||0,B=e.getCaps();for(let i=U;i<o;i++){for(g=0,C=b[4],E=b[3];g<v;++g){if(-1===l||l===g){let r=-1===l?g:0;if(!s.isCompressed&&s.isFourCC){t.format=5,A=C*E*4;let s=null;if(e._badOS||e._badDesktopOS||!B.textureHalfFloat&&!B.textureFloat)128===I?(s=p._GetFloatAsUIntRGBAArrayBuffer(C,E,a.byteOffset+y,A,a.buffer,r),S&&0==r&&S.push(p._GetFloatRGBAArrayBuffer(C,E,a.byteOffset+y,A,a.buffer,r))):64===I&&(s=p._GetHalfFloatAsUIntRGBAArrayBuffer(C,E,a.byteOffset+y,A,a.buffer,r),S&&0==r&&S.push(p._GetHalfFloatAsFloatRGBAArrayBuffer(C,E,a.byteOffset+y,A,a.buffer,r))),t.type=0;else{let e,i=B.textureFloat&&(d&&B.textureFloatLinearFiltering||!d),n=B.textureHalfFloat&&(d&&B.textureHalfFloatLinearFiltering||!d),o=(128===I||64===I&&!n)&&i?1:(64===I||128===I&&!i)&&n?2:0,l=null;if(128===I)switch(o){case 1:e=p._GetFloatRGBAArrayBuffer,l=null;break;case 2:e=p._GetFloatAsHalfFloatRGBAArrayBuffer,l=p._GetFloatRGBAArrayBuffer;break;case 0:e=p._GetFloatAsUIntRGBAArrayBuffer,l=p._GetFloatRGBAArrayBuffer}else switch(o){case 1:e=p._GetHalfFloatAsFloatRGBAArrayBuffer,l=null;break;case 2:e=p._GetHalfFloatRGBAArrayBuffer,l=p._GetHalfFloatAsFloatRGBAArrayBuffer;break;case 0:e=p._GetHalfFloatAsUIntRGBAArrayBuffer,l=p._GetHalfFloatAsFloatRGBAArrayBuffer}t.type=o,s=e(C,E,a.byteOffset+y,A,a.buffer,r),S&&0==r&&S.push(l?l(C,E,a.byteOffset+y,A,a.buffer,r):s)}s&&e._uploadDataToTextureDirectly(t,s,i,r)}else if(s.isRGB)t.type=0,24===I?(t.format=4,A=C*E*3,_=p._GetRGBArrayBuffer(C,E,a.byteOffset+y,A,a.buffer,O,w,M)):(t.format=5,A=C*E*4,_=p._GetRGBAArrayBuffer(C,E,a.byteOffset+y,A,a.buffer,O,w,M,D)),e._uploadDataToTextureDirectly(t,_,i,r);else if(s.isLuminance){let s=e._getUnpackAlignement(),n=C;A=Math.floor((C+s-1)/s)*s*(E-1)+n,_=p._GetLuminanceArrayBuffer(C,E,a.byteOffset+y,A,a.buffer),t.format=1,t.type=0,e._uploadDataToTextureDirectly(t,_,i,r)}else A=Math.max(4,C)/4*Math.max(4,E)/4*R,_=new Uint8Array(a.buffer,a.byteOffset+y,A),t.type=0,e._uploadCompressedDataToTextureDirectly(t,P,C,E,_,i,r)}y+=I?C*E*(I/8):A,C*=.5,E*=.5,C=Math.max(1,C),E=Math.max(1,E)}if(void 0!==c)break}S&&S.length>0?s.sphericalPolynomial=r.CubeMapToSphericalPolynomialTools.ConvertCubeMapToSphericalPolynomial({size:b[4],right:S[0],left:S[1],up:S[2],down:S[3],front:S[4],back:S[5],format:5,type:1,gammaSpace:!1}):s.sphericalPolynomial=void 0}}p.StoreLODInAlphaChannel=!1,e.s(["DDSTools",()=>p],21981)},66382,e=>{"use strict";var t=e.i(22840),i=e.i(21981);class r{constructor(){this.supportCascades=!0}loadCubeData(e,r,a,s){let n,o=r.getEngine(),l=!1,c=1e3;if(Array.isArray(e))for(let t=0;t<e.length;t++){let a=e[t];r.width=(n=i.DDSTools.GetDDSInfo(a)).width,r.height=n.height,l=(n.isRGB||n.isLuminance||n.mipmapCount>1)&&r.generateMipMaps,o._unpackFlipY(n.isCompressed),i.DDSTools.UploadDDSLevels(o,r,a,n,l,6,-1,t),n.isFourCC||1!==n.mipmapCount?c=n.mipmapCount-1:o.generateMipMapsForCubemap(r)}else r.width=(n=i.DDSTools.GetDDSInfo(e)).width,r.height=n.height,a&&(n.sphericalPolynomial=new t.SphericalPolynomial),l=(n.isRGB||n.isLuminance||n.mipmapCount>1)&&r.generateMipMaps,o._unpackFlipY(n.isCompressed),i.DDSTools.UploadDDSLevels(o,r,e,n,l,6),n.isFourCC||1!==n.mipmapCount?c=n.mipmapCount-1:o.generateMipMapsForCubemap(r,!1);o._setCubeMapTextureParams(r,l,c),r.isReady=!0,r.onLoadedObservable.notifyObservers(r),r.onLoadedObservable.clear(),s&&s({isDDS:!0,width:r.width,info:n,data:e,texture:r})}loadData(e,t,r){let a=i.DDSTools.GetDDSInfo(e),s=(a.isRGB||a.isLuminance||a.mipmapCount>1)&&t.generateMipMaps&&Math.max(a.width,a.height)>>a.mipmapCount-1==1;r(a.width,a.height,s,a.isFourCC,()=>{i.DDSTools.UploadDDSLevels(t.getEngine(),t,e,a,s,1)})}}e.s(["_DDSTextureLoader",()=>r])},70117,e=>{"use strict";var t=e.i(86752);class i{constructor(e){this._diffuseTransmissionTint=t.Color3.White(),this._diffuseTransmissionTintTexture=null,this._material=e}get material(){return this._material}get isUnlit(){return this._material.unlit}set isUnlit(e){this._material.unlit=e}set backFaceCulling(e){this._material.backFaceCulling=e}get backFaceCulling(){return this._material.backFaceCulling}set twoSidedLighting(e){this._material.twoSidedLighting=e}get twoSidedLighting(){return this._material.twoSidedLighting}set alphaCutOff(e){}get alphaCutOff(){return .5}set useAlphaFromBaseColorTexture(e){this._material._useAlphaFromBaseColorTexture=e}get useAlphaFromBaseColorTexture(){return!1}get transparencyAsAlphaCoverage(){return!1}set transparencyAsAlphaCoverage(e){}set baseColor(e){this._material.baseColor=e}get baseColor(){return this._material.baseColor}set baseColorTexture(e){this._material.baseColorTexture=e}get baseColorTexture(){return this._material.baseColorTexture}set baseDiffuseRoughness(e){this._material.baseDiffuseRoughness=e}get baseDiffuseRoughness(){return this._material.baseDiffuseRoughness}set baseDiffuseRoughnessTexture(e){this._material.baseDiffuseRoughnessTexture=e}get baseDiffuseRoughnessTexture(){return this._material.baseDiffuseRoughnessTexture}set baseMetalness(e){this._material.baseMetalness=e}get baseMetalness(){return this._material.baseMetalness}set baseMetalnessTexture(e){this._material.baseMetalnessTexture=e}get baseMetalnessTexture(){return this._material.baseMetalnessTexture}set useRoughnessFromMetallicTextureGreen(e){this._material._useRoughnessFromMetallicTextureGreen=e}set useMetallicFromMetallicTextureBlue(e){this._material._useMetallicFromMetallicTextureBlue=e}enableSpecularEdgeColor(e=!1){}set specularWeight(e){this._material.specularWeight=e}get specularWeight(){return this._material.specularWeight}set specularWeightTexture(e){this._material.specularColorTexture===e?(this._material.specularWeightTexture=null,this._material._useSpecularWeightFromSpecularColorTexture=!0,this._material._useSpecularWeightFromAlpha=!0):this._material.specularWeightTexture=e}get specularWeightTexture(){return this._material.specularWeightTexture}set specularColor(e){this._material.specularColor=e}get specularColor(){return this._material.specularColor}set specularColorTexture(e){this._material.specularColorTexture=e,this._material.specularWeightTexture===this._material.specularColorTexture&&(this._material.specularWeightTexture=null,this._material._useSpecularWeightFromSpecularColorTexture=!0,this._material._useSpecularWeightFromAlpha=!0)}get specularColorTexture(){return this._material.specularColorTexture}set specularRoughness(e){this._material.specularRoughness=e}get specularRoughness(){return this._material.specularRoughness}set specularRoughnessTexture(e){this._material.specularRoughnessTexture=e}get specularRoughnessTexture(){return this._material.specularRoughnessTexture}set specularIor(e){this._material.specularIor=e}get specularIor(){return this._material.specularIor}set emissionColor(e){this._material.emissionColor=e}get emissionColor(){return this._material.emissionColor}set emissionLuminance(e){this._material.emissionLuminance=e}get emissionLuminance(){return this._material.emissionLuminance}set emissionColorTexture(e){this._material.emissionColorTexture=e}get emissionColorTexture(){return this._material.emissionColorTexture}set ambientOcclusionTexture(e){this._material.ambientOcclusionTexture=e}get ambientOcclusionTexture(){return this._material.ambientOcclusionTexture}set ambientOcclusionTextureStrength(e){let t=this._material.ambientOcclusionTexture;t&&(t.level=e)}get ambientOcclusionTextureStrength(){let e=this._material.ambientOcclusionTexture;return e?.level??1}configureCoat(){}set coatWeight(e){this._material.coatWeight=e}get coatWeight(){return this._material.coatWeight}set coatWeightTexture(e){this._material.coatWeightTexture=e}get coatWeightTexture(){return this._material.coatWeightTexture}set coatColor(e){this._material.coatColor=e}set coatColorTexture(e){this._material.coatColorTexture=e}set coatRoughness(e){this._material.coatRoughness=e}get coatRoughness(){return this._material.coatRoughness}set coatRoughnessTexture(e){this._material.coatRoughnessTexture=e,e&&(this._material._useCoatRoughnessFromGreenChannel=!0)}get coatRoughnessTexture(){return this._material.coatRoughnessTexture}set coatIor(e){this._material.coatIor=e}set coatDarkening(e){this._material.coatDarkening=e}set coatDarkeningTexture(e){this._material.coatDarkeningTexture=e}set coatRoughnessAnisotropy(e){this._material.coatRoughnessAnisotropy=e}get coatRoughnessAnisotropy(){return this._material.coatRoughnessAnisotropy}set geometryCoatTangentAngle(e){this._material.geometryCoatTangentAngle=e}set geometryCoatTangentTexture(e){this._material.geometryCoatTangentTexture=e,e&&(this._material._useCoatRoughnessAnisotropyFromTangentTexture=!0)}get geometryCoatTangentTexture(){return this._material.geometryCoatTangentTexture}configureTransmission(){this._material.geometryThinWalled=1,this._material.transmissionDepth=0}set transmissionWeight(e){this._material.transmissionWeight=e}set transmissionWeightTexture(e){this._material.transmissionWeightTexture=e}get transmissionWeight(){return this._material.transmissionWeight}set transmissionScatter(e){this._material.transmissionScatter=e}get transmissionScatter(){return this._material.transmissionScatter}set transmissionScatterTexture(e){this._material.transmissionScatterTexture=e}get transmissionScatterTexture(){return this._material.transmissionScatterTexture}set transmissionScatterAnisotropy(e){this._material.transmissionScatterAnisotropy=e}set transmissionDispersionAbbeNumber(e){this._material.transmissionDispersionAbbeNumber=e}set transmissionDispersionScale(e){this._material.transmissionDispersionScale=e}set transmissionDepth(e){e!==Number.MAX_VALUE||0!==this._material.transmissionDepth?this._material.transmissionDepth=e:this._material.transmissionDepth=0}get transmissionDepth(){return this._material.transmissionDepth}set transmissionColor(e){e.equals(t.Color3.White())||(this._material.transmissionColor=e)}get transmissionColor(){return this._material.transmissionColor}get refractionBackgroundTexture(){return this._material.backgroundRefractionTexture}set refractionBackgroundTexture(e){this._material.backgroundRefractionTexture=e}configureVolume(){this._material.geometryThinWalled=0}set geometryThinWalled(e){this._material.geometryThinWalled=+!!e}get geometryThinWalled(){return!!this._material.geometryThinWalled}set volumeThicknessTexture(e){this._material.geometryThicknessTexture=e,this._material._useGeometryThicknessFromGreenChannel=!0}set volumeThickness(e){this._material.geometryThickness=e}configureSubsurface(){this._material.geometryThinWalled=1,this._material.subsurfaceScatterAnisotropy=1}set subsurfaceWeight(e){this._material.subsurfaceWeight=e}get subsurfaceWeight(){return this._material.subsurfaceWeight}set subsurfaceWeightTexture(e){this._material.subsurfaceWeightTexture=e}set subsurfaceColor(e){this._material.subsurfaceColor=e}set subsurfaceColorTexture(e){this._material.subsurfaceColorTexture=e}set diffuseTransmissionTint(e){this._diffuseTransmissionTint=e}get diffuseTransmissionTint(){return this._diffuseTransmissionTint}set diffuseTransmissionTintTexture(e){this._diffuseTransmissionTintTexture=e}get subsurfaceRadius(){return this._material.subsurfaceRadius}set subsurfaceRadius(e){this._material.subsurfaceRadius=e}get subsurfaceRadiusScale(){return this._material.subsurfaceRadiusScale}set subsurfaceRadiusScale(e){this._material.subsurfaceRadiusScale=e}set subsurfaceScatterAnisotropy(e){this._material.subsurfaceScatterAnisotropy=e}isTranslucent(){return this.transmissionWeight>0||this.subsurfaceWeight>0}configureFuzz(){}set fuzzWeight(e){this._material.fuzzWeight=e}set fuzzWeightTexture(e){this._material.fuzzWeightTexture=e}set fuzzColor(e){this._material.fuzzColor=e}set fuzzColorTexture(e){this._material.fuzzColorTexture=e}set fuzzRoughness(e){this._material.fuzzRoughness=e}set fuzzRoughnessTexture(e){this._material.fuzzRoughnessTexture=e,this._material._useFuzzRoughnessFromTextureAlpha=!0}set specularRoughnessAnisotropy(e){this._material.specularRoughnessAnisotropy=e}get specularRoughnessAnisotropy(){return this._material.specularRoughnessAnisotropy}set geometryTangentAngle(e){this._material.geometryTangentAngle=e}set geometryTangentTexture(e){this._material.geometryTangentTexture=e,this._material._useSpecularRoughnessAnisotropyFromTangentTexture=!0}get geometryTangentTexture(){return this._material.geometryTangentTexture}configureGltfStyleAnisotropy(e=!0){this._material._useGltfStyleAnisotropy=e}set thinFilmWeight(e){this._material.thinFilmWeight=e}set thinFilmIor(e){this._material.thinFilmIor=e}set thinFilmThicknessMinimum(e){this._material.thinFilmThicknessMin=e/1e3}set thinFilmThicknessMaximum(e){this._material.thinFilmThickness=e/1e3}set thinFilmWeightTexture(e){this._material.thinFilmWeightTexture=e}set thinFilmThicknessTexture(e){this._material.thinFilmThicknessTexture=e,this._material._useThinFilmThicknessFromTextureGreen=!0}set unlit(e){this._material.unlit=e}set geometryOpacity(e){this._material.geometryOpacity=e}get geometryOpacity(){return this._material.geometryOpacity}set geometryNormalTexture(e){this._material.geometryNormalTexture=e}get geometryNormalTexture(){return this._material.geometryNormalTexture}setNormalMapInversions(e,t){}set geometryCoatNormalTexture(e){this._material.geometryCoatNormalTexture=e}get geometryCoatNormalTexture(){return this._material.geometryCoatNormalTexture}set geometryCoatNormalTextureScale(e){this._material.geometryCoatNormalTexture&&(this._material.geometryCoatNormalTexture.level=e)}finalize(){(this._diffuseTransmissionTint&&!this._diffuseTransmissionTint.equals(t.Color3.White())||this._diffuseTransmissionTintTexture)&&(this._material.geometryThinWalled?(this.subsurfaceColor=this._diffuseTransmissionTint,this.subsurfaceColorTexture=this._diffuseTransmissionTintTexture):0==this._material.coatWeight&&(!this.baseColor.equals(t.Color3.White())||this.baseColorTexture)&&(this._material.coatWeight=this.subsurfaceWeight,this._material.coatWeightTexture=this.subsurfaceWeightTexture,this._material.coatColor=this._diffuseTransmissionTint,this._material.coatColorTexture=this._diffuseTransmissionTintTexture,this._material.coatIor=this._material.specularIor,this._material.coatDarkening=0,this._material.coatRoughness=this._material.specularRoughness,this._material.coatRoughnessTexture=this._material.specularRoughnessTexture)),this.transmissionWeight>0&&(this._material.geometryThinWalled||0===this._material.transmissionDepth?(this._material.transmissionColor=this._material.baseColor,this._material.transmissionColorTexture=this._material.baseColorTexture):0!=this._material.coatWeight||this.baseColor.equals(t.Color3.White())&&null===this.baseColorTexture||(this._material.coatWeight=this.transmissionWeight,this._material.coatWeightTexture=this.transmissionWeightTexture,this._material.coatColor=this.baseColor,this._material.coatColorTexture=this.baseColorTexture,this._material.coatIor=this._material.specularIor,this._material.coatDarkening=0,this._material.coatRoughness=this._material.specularRoughness,this._material.coatRoughnessTexture=this._material.specularRoughnessTexture))}}e.s(["OpenPBRMaterialLoadingAdapter",()=>i])},97374,71172,e=>{"use strict";var t,i,r,a,s,n,o=e.i(4527);class l{constructor(e,t){if(this.data=e,this.isInvalid=!1,!l.IsValid(e)){this.isInvalid=!0,o.Logger.Error("texture missing KTX identifier");return}const i=Uint32Array.BYTES_PER_ELEMENT,r=new DataView(this.data.buffer,this.data.byteOffset+12,13*i),a=0x4030201===r.getUint32(0,!0);if(this.glType=r.getUint32(+i,a),this.glTypeSize=r.getUint32(2*i,a),this.glFormat=r.getUint32(3*i,a),this.glInternalFormat=r.getUint32(4*i,a),this.glBaseInternalFormat=r.getUint32(5*i,a),this.pixelWidth=r.getUint32(6*i,a),this.pixelHeight=r.getUint32(7*i,a),this.pixelDepth=r.getUint32(8*i,a),this.numberOfArrayElements=r.getUint32(9*i,a),this.numberOfFaces=r.getUint32(10*i,a),this.numberOfMipmapLevels=r.getUint32(11*i,a),this.bytesOfKeyValueData=r.getUint32(12*i,a),0!==this.glType){o.Logger.Error("only compressed formats currently supported"),this.isInvalid=!0;return}if(this.numberOfMipmapLevels=Math.max(1,this.numberOfMipmapLevels),0===this.pixelHeight||0!==this.pixelDepth){o.Logger.Error("only 2D textures currently supported"),this.isInvalid=!0;return}if(0!==this.numberOfArrayElements){o.Logger.Error("texture arrays not currently supported"),this.isInvalid=!0;return}if(this.numberOfFaces!==t){o.Logger.Error("number of faces expected"+t+", but found "+this.numberOfFaces),this.isInvalid=!0;return}this.loadType=l.COMPRESSED_2D}uploadLevels(e,t){switch(this.loadType){case l.COMPRESSED_2D:this._upload2DCompressedLevels(e,t);case l.TEX_2D:case l.COMPRESSED_3D:case l.TEX_3D:}}_upload2DCompressedLevels(e,t){let i=l.HEADER_LEN+this.bytesOfKeyValueData,r=this.pixelWidth,a=this.pixelHeight,s=t?this.numberOfMipmapLevels:1;for(let t=0;t<s;t++){let s=new Int32Array(this.data.buffer,this.data.byteOffset+i,1)[0];i+=4;for(let n=0;n<this.numberOfFaces;n++){let o=new Uint8Array(this.data.buffer,this.data.byteOffset+i,s);e.getEngine()._uploadCompressedDataToTextureDirectly(e,e.format,r,a,o,n,t),i+=s,i+=3-(s+3)%4}r=Math.max(1,.5*r),a=Math.max(1,.5*a)}}static IsValid(e){if(e.byteLength>=12){let t=new Uint8Array(e.buffer,e.byteOffset,12);if(171===t[0]&&75===t[1]&&84===t[2]&&88===t[3]&&32===t[4]&&49===t[5]&&49===t[6]&&187===t[7]&&13===t[8]&&10===t[9]&&26===t[10]&&10===t[11])return!0}return!1}}l.HEADER_LEN=64,l.COMPRESSED_2D=0,l.COMPRESSED_3D=1,l.TEX_2D=2,l.TEX_3D=3;class c{constructor(e){this._pendingActions=[],this._workerInfos=e.map(e=>({workerPromise:Promise.resolve(e),idle:!0}))}dispose(){for(let e of this._workerInfos)e.workerPromise.then(e=>{e.terminate()});this._workerInfos.length=0,this._pendingActions.length=0}push(e){this._executeOnIdleWorker(e)||this._pendingActions.push(e)}_executeOnIdleWorker(e){for(let t of this._workerInfos)if(t.idle)return this._execute(t,e),!0;return!1}_execute(e,t){e.idle=!1,e.workerPromise.then(i=>{t(i,()=>{let t=this._pendingActions.shift();t?this._execute(e,t):e.idle=!0})})}}class d extends c{constructor(e,t,i=d.DefaultOptions){super([]),this._maxWorkers=e,this._createWorkerAsync=t,this._options=i}push(e){if(!this._executeOnIdleWorker(e))if(this._workerInfos.length<this._maxWorkers){let t={workerPromise:this._createWorkerAsync(),idle:!1};this._workerInfos.push(t),this._execute(t,e)}else this._pendingActions.push(e)}_execute(e,t){e.timeoutId&&(clearTimeout(e.timeoutId),delete e.timeoutId),super._execute(e,(i,r)=>{t(i,()=>{r(),e.idle&&(e.timeoutId=setTimeout(()=>{e.workerPromise.then(e=>{e.terminate()});let t=this._workerInfos.indexOf(e);-1!==t&&this._workerInfos.splice(t,1)},this._options.idleTimeElapsedBeforeRelease))})})}}d.DefaultOptions={idleTimeElapsedBeforeRelease:1e3},e.s(["AutoReleaseWorkerPool",()=>d],71172);var u=e.i(1622);function f(e,t){let i=t?.jsDecoderModule||KTX2DECODER;e&&(e.wasmBaseUrl&&(i.Transcoder.WasmBaseUrl=e.wasmBaseUrl),e.wasmUASTCToASTC&&(i.LiteTranscoder_UASTC_ASTC.WasmModuleURL=e.wasmUASTCToASTC),e.wasmUASTCToBC7&&(i.LiteTranscoder_UASTC_BC7.WasmModuleURL=e.wasmUASTCToBC7),e.wasmUASTCToRGBA_UNORM&&(i.LiteTranscoder_UASTC_RGBA_UNORM.WasmModuleURL=e.wasmUASTCToRGBA_UNORM),e.wasmUASTCToRGBA_SRGB&&(i.LiteTranscoder_UASTC_RGBA_SRGB.WasmModuleURL=e.wasmUASTCToRGBA_SRGB),e.wasmUASTCToR8_UNORM&&(i.LiteTranscoder_UASTC_R8_UNORM.WasmModuleURL=e.wasmUASTCToR8_UNORM),e.wasmUASTCToRG8_UNORM&&(i.LiteTranscoder_UASTC_RG8_UNORM.WasmModuleURL=e.wasmUASTCToRG8_UNORM),e.jsMSCTranscoder&&(i.MSCTranscoder.JSModuleURL=e.jsMSCTranscoder),e.wasmMSCTranscoder&&(i.MSCTranscoder.WasmModuleURL=e.wasmMSCTranscoder),e.wasmZSTDDecoder&&(i.ZSTDDecoder.WasmModuleURL=e.wasmZSTDDecoder)),t&&(t.wasmUASTCToASTC&&(i.LiteTranscoder_UASTC_ASTC.WasmBinary=t.wasmUASTCToASTC),t.wasmUASTCToBC7&&(i.LiteTranscoder_UASTC_BC7.WasmBinary=t.wasmUASTCToBC7),t.wasmUASTCToRGBA_UNORM&&(i.LiteTranscoder_UASTC_RGBA_UNORM.WasmBinary=t.wasmUASTCToRGBA_UNORM),t.wasmUASTCToRGBA_SRGB&&(i.LiteTranscoder_UASTC_RGBA_SRGB.WasmBinary=t.wasmUASTCToRGBA_SRGB),t.wasmUASTCToR8_UNORM&&(i.LiteTranscoder_UASTC_R8_UNORM.WasmBinary=t.wasmUASTCToR8_UNORM),t.wasmUASTCToRG8_UNORM&&(i.LiteTranscoder_UASTC_RG8_UNORM.WasmBinary=t.wasmUASTCToRG8_UNORM),t.jsMSCTranscoder&&(i.MSCTranscoder.JSModule=t.jsMSCTranscoder),t.wasmMSCTranscoder&&(i.MSCTranscoder.WasmBinary=t.wasmMSCTranscoder),t.wasmZSTDDecoder&&(i.ZSTDDecoder.WasmBinary=t.wasmZSTDDecoder))}function h(e){let t;void 0===e&&"u">typeof KTX2DECODER&&(e=KTX2DECODER),onmessage=i=>{if(i.data)switch(i.data.action){case"init":{let r=i.data.urls;r&&(r.jsDecoderModule&&void 0===e&&(importScripts(r.jsDecoderModule),e=KTX2DECODER),f(r)),i.data.wasmBinaries&&f(void 0,{...i.data.wasmBinaries,jsDecoderModule:e}),t=new e.KTX2Decoder,postMessage({action:"init"});break}case"setDefaultDecoderOptions":e.KTX2Decoder.DefaultDecoderOptions=i.data.options;break;case"decode":t.decode(i.data.data,i.data.caps,i.data.options).then(e=>{let t=[];for(let i=0;i<e.mipmaps.length;++i){let r=e.mipmaps[i];r&&r.data&&t.push(r.data.buffer)}postMessage({action:"decoded",success:!0,decodedData:e},t)}).catch(e=>{postMessage({action:"decoded",success:!1,msg:e})})}}}async function m(e,t,i){return await new Promise((r,a)=>{let s=t=>{e.removeEventListener("error",s),e.removeEventListener("message",n),a(t)},n=t=>{"init"===t.data.action&&(e.removeEventListener("error",s),e.removeEventListener("message",n),r(e))};e.addEventListener("error",s),e.addEventListener("message",n),e.postMessage({action:"init",urls:i,wasmBinaries:t})})}(t=a||(a={}))[t.ETC1S=0]="ETC1S",t[t.UASTC4x4=1]="UASTC4x4",(i=s||(s={}))[i.ASTC_4X4_RGBA=0]="ASTC_4X4_RGBA",i[i.ASTC_4x4_RGBA=0]="ASTC_4x4_RGBA",i[i.BC7_RGBA=1]="BC7_RGBA",i[i.BC3_RGBA=2]="BC3_RGBA",i[i.BC1_RGB=3]="BC1_RGB",i[i.PVRTC1_4_RGBA=4]="PVRTC1_4_RGBA",i[i.PVRTC1_4_RGB=5]="PVRTC1_4_RGB",i[i.ETC2_RGBA=6]="ETC2_RGBA",i[i.ETC1_RGB=7]="ETC1_RGB",i[i.RGBA32=8]="RGBA32",i[i.R8=9]="R8",i[i.RG8=10]="RG8",(r=n||(n={}))[r.COMPRESSED_RGBA_BPTC_UNORM_EXT=36492]="COMPRESSED_RGBA_BPTC_UNORM_EXT",r[r.COMPRESSED_RGBA_ASTC_4X4_KHR=37808]="COMPRESSED_RGBA_ASTC_4X4_KHR",r[r.COMPRESSED_RGB_S3TC_DXT1_EXT=33776]="COMPRESSED_RGB_S3TC_DXT1_EXT",r[r.COMPRESSED_RGBA_S3TC_DXT5_EXT=33779]="COMPRESSED_RGBA_S3TC_DXT5_EXT",r[r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG=35842]="COMPRESSED_RGBA_PVRTC_4BPPV1_IMG",r[r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG=35840]="COMPRESSED_RGB_PVRTC_4BPPV1_IMG",r[r.COMPRESSED_RGBA8_ETC2_EAC=37496]="COMPRESSED_RGBA8_ETC2_EAC",r[r.COMPRESSED_RGB8_ETC2=37492]="COMPRESSED_RGB8_ETC2",r[r.COMPRESSED_RGB_ETC1_WEBGL=36196]="COMPRESSED_RGB_ETC1_WEBGL",r[r.RGBA8Format=32856]="RGBA8Format",r[r.R8Format=33321]="R8Format",r[r.RG8Format=33323]="RG8Format";class p{static GetDefaultNumWorkers(){return"object"==typeof navigator&&navigator.hardwareConcurrency?Math.min(Math.floor(.5*navigator.hardwareConcurrency),4):1}static _Initialize(e){if(p._WorkerPoolPromise||p._DecoderModulePromise)return;let t={wasmBaseUrl:u.Tools.ScriptBaseUrl,jsDecoderModule:u.Tools.GetBabylonScriptURL(this.URLConfig.jsDecoderModule,!0),wasmUASTCToASTC:u.Tools.GetBabylonScriptURL(this.URLConfig.wasmUASTCToASTC,!0),wasmUASTCToBC7:u.Tools.GetBabylonScriptURL(this.URLConfig.wasmUASTCToBC7,!0),wasmUASTCToRGBA_UNORM:u.Tools.GetBabylonScriptURL(this.URLConfig.wasmUASTCToRGBA_UNORM,!0),wasmUASTCToRGBA_SRGB:u.Tools.GetBabylonScriptURL(this.URLConfig.wasmUASTCToRGBA_SRGB,!0),wasmUASTCToR8_UNORM:u.Tools.GetBabylonScriptURL(this.URLConfig.wasmUASTCToR8_UNORM,!0),wasmUASTCToRG8_UNORM:u.Tools.GetBabylonScriptURL(this.URLConfig.wasmUASTCToRG8_UNORM,!0),jsMSCTranscoder:u.Tools.GetBabylonScriptURL(this.URLConfig.jsMSCTranscoder,!0),wasmMSCTranscoder:u.Tools.GetBabylonScriptURL(this.URLConfig.wasmMSCTranscoder,!0),wasmZSTDDecoder:u.Tools.GetBabylonScriptURL(this.URLConfig.wasmZSTDDecoder,!0)};e&&"function"==typeof Worker&&"u">typeof URL?p._WorkerPoolPromise=new Promise(i=>{let r=`${f}(${h})()`,a=URL.createObjectURL(new Blob([r],{type:"application/javascript"}));i(new d(e,async()=>await m(new Worker(a),void 0,t)))}):void 0===p._KTX2DecoderModule?p._DecoderModulePromise=u.Tools.LoadBabylonScriptAsync(t.jsDecoderModule).then(()=>(p._KTX2DecoderModule=KTX2DECODER,p._KTX2DecoderModule.MSCTranscoder.UseFromWorkerThread=!1,p._KTX2DecoderModule.WASMMemoryManager.LoadBinariesFromCurrentThread=!0,f(t,p._KTX2DecoderModule),new p._KTX2DecoderModule.KTX2Decoder)):(p._KTX2DecoderModule.MSCTranscoder.UseFromWorkerThread=!1,p._KTX2DecoderModule.WASMMemoryManager.LoadBinariesFromCurrentThread=!0,p._DecoderModulePromise=Promise.resolve(new p._KTX2DecoderModule.KTX2Decoder))}constructor(e,t=p.DefaultNumWorkers){this._engine=e;const i="object"==typeof t&&t.workerPool||p.WorkerPool;if(i)p._WorkerPoolPromise=Promise.resolve(i);else{"object"==typeof t?p._KTX2DecoderModule=t?.binariesAndModulesContainer?.jsDecoderModule:"u">typeof KTX2DECODER&&(p._KTX2DecoderModule=KTX2DECODER);const e="number"==typeof t?t:t.numWorkers??p.DefaultNumWorkers;p._Initialize(e)}}async _uploadAsync(e,t,i){let r=this._engine.getCaps(),a={astc:!!r.astc,bptc:!!r.bptc,s3tc:!!r.s3tc,pvrtc:!!r.pvrtc,etc2:!!r.etc2,etc1:!!r.etc1};if(p._WorkerPoolPromise){let r=await p._WorkerPoolPromise;return await new Promise((s,n)=>{r.push((r,o)=>{let l=e=>{r.removeEventListener("error",l),r.removeEventListener("message",c),n(e),o()},c=e=>{if("decoded"===e.data.action){if(r.removeEventListener("error",l),r.removeEventListener("message",c),e.data.success)try{this._createTexture(e.data.decodedData,t,i),s()}catch(e){n({message:e})}else n({message:e.data.msg});o()}};r.addEventListener("error",l),r.addEventListener("message",c),r.postMessage({action:"setDefaultDecoderOptions",options:p.DefaultDecoderOptions._getKTX2DecoderOptions()});let d=new Uint8Array(e.byteLength);d.set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),r.postMessage({action:"decode",data:d,caps:a,options:i},[d.buffer])})})}if(p._DecoderModulePromise){let i=await p._DecoderModulePromise;return p.DefaultDecoderOptions.isDirty&&(p._KTX2DecoderModule.KTX2Decoder.DefaultDecoderOptions=p.DefaultDecoderOptions._getKTX2DecoderOptions()),await new Promise((a,s)=>{i.decode(e,r).then(e=>{this._createTexture(e,t),a()}).catch(e=>{s({message:e})})})}throw Error("KTX2 decoder module is not available")}_createTexture(e,t,i){this._engine._bindTextureDirectly(3553,t),i&&(i.transcodedFormat=e.transcodedFormat,i.isInGammaSpace=e.isInGammaSpace,i.hasAlpha=e.hasAlpha,i.transcoderName=e.transcoderName);let r=!0;switch(e.transcodedFormat){case 32856:t.type=0,t.format=5;break;case 33321:t.type=0,t.format=6;break;case 33323:t.type=0,t.format=7;break;default:t.format=e.transcodedFormat,r=!1}if(t._gammaSpace=e.isInGammaSpace,t.generateMipMaps=e.mipmaps.length>1,t.width=e.mipmaps[0].width,t.height=e.mipmaps[0].height,e.errors)throw Error("KTX2 container - could not transcode the data. "+e.errors);for(let i=0;i<e.mipmaps.length;++i){let a=e.mipmaps[i];if(!a||!a.data)throw Error("KTX2 container - could not transcode one of the image");r?(t.width=a.width,t.height=a.height,this._engine._uploadDataToTextureDirectly(t,a.data,0,i,void 0,!0)):this._engine._uploadCompressedDataToTextureDirectly(t,e.transcodedFormat,a.width,a.height,a.data,0,i)}t._extension=".ktx2",t.isReady=!0,this._engine._bindTextureDirectly(3553,null)}static IsValid(e){if(e.byteLength>=12){let t=new Uint8Array(e.buffer,e.byteOffset,12);if(171===t[0]&&75===t[1]&&84===t[2]&&88===t[3]&&32===t[4]&&50===t[5]&&48===t[6]&&187===t[7]&&13===t[8]&&10===t[9]&&26===t[10]&&10===t[11])return!0}return!1}}p.URLConfig={jsDecoderModule:"https://cdn.babylonjs.com/babylon.ktx2Decoder.js",wasmUASTCToASTC:null,wasmUASTCToBC7:null,wasmUASTCToRGBA_UNORM:null,wasmUASTCToRGBA_SRGB:null,wasmUASTCToR8_UNORM:null,wasmUASTCToRG8_UNORM:null,jsMSCTranscoder:null,wasmMSCTranscoder:null,wasmZSTDDecoder:null},p.DefaultNumWorkers=p.GetDefaultNumWorkers(),p.DefaultDecoderOptions=new class{constructor(){this._isDirty=!0,this._useRGBAIfOnlyBC1BC3AvailableWhenUASTC=!0,this._ktx2DecoderOptions={}}get isDirty(){return this._isDirty}get useRGBAIfASTCBC7NotAvailableWhenUASTC(){return this._useRGBAIfASTCBC7NotAvailableWhenUASTC}set useRGBAIfASTCBC7NotAvailableWhenUASTC(e){this._useRGBAIfASTCBC7NotAvailableWhenUASTC!==e&&(this._useRGBAIfASTCBC7NotAvailableWhenUASTC=e,this._isDirty=!0)}get useRGBAIfOnlyBC1BC3AvailableWhenUASTC(){return this._useRGBAIfOnlyBC1BC3AvailableWhenUASTC}set useRGBAIfOnlyBC1BC3AvailableWhenUASTC(e){this._useRGBAIfOnlyBC1BC3AvailableWhenUASTC!==e&&(this._useRGBAIfOnlyBC1BC3AvailableWhenUASTC=e,this._isDirty=!0)}get forceRGBA(){return this._forceRGBA}set forceRGBA(e){this._forceRGBA!==e&&(this._forceRGBA=e,this._isDirty=!0)}get forceR8(){return this._forceR8}set forceR8(e){this._forceR8!==e&&(this._forceR8=e,this._isDirty=!0)}get forceRG8(){return this._forceRG8}set forceRG8(e){this._forceRG8!==e&&(this._forceRG8=e,this._isDirty=!0)}get bypassTranscoders(){return this._bypassTranscoders}set bypassTranscoders(e){this._bypassTranscoders!==e&&(this._bypassTranscoders=e,this._isDirty=!0)}_getKTX2DecoderOptions(){if(!this._isDirty)return this._ktx2DecoderOptions;this._isDirty=!1;let e={};return void 0!==this._useRGBAIfASTCBC7NotAvailableWhenUASTC&&(e.useRGBAIfASTCBC7NotAvailableWhenUASTC=this._useRGBAIfASTCBC7NotAvailableWhenUASTC),void 0!==this._forceRGBA&&(e.forceRGBA=this._forceRGBA),void 0!==this._forceR8&&(e.forceR8=this._forceR8),void 0!==this._forceRG8&&(e.forceRG8=this._forceRG8),void 0!==this._bypassTranscoders&&(e.bypassTranscoders=this._bypassTranscoders),this.useRGBAIfOnlyBC1BC3AvailableWhenUASTC&&(e.transcodeFormatDecisionTree={UASTC:{transcodeFormat:[s.BC1_RGB,s.BC3_RGBA],yes:{transcodeFormat:s.RGBA32,engineFormat:32856,roundToMultiple4:!1}}}),this._ktx2DecoderOptions=e,e}};class _{constructor(){this.supportCascades=!1}loadCubeData(e,t,i,r){if(Array.isArray(e))return;t._invertVScale=!t.invertY;let a=t.getEngine(),s=new l(e,6),n=s.numberOfMipmapLevels>1&&t.generateMipMaps;a._unpackFlipY(!0),s.uploadLevels(t,t.generateMipMaps),t.width=s.pixelWidth,t.height=s.pixelHeight,a._setCubeMapTextureParams(t,n,s.numberOfMipmapLevels-1),t.isReady=!0,t.onLoadedObservable.notifyObservers(t),t.onLoadedObservable.clear(),r&&r()}loadData(e,t,i,r){if(l.IsValid(e)){t._invertVScale=!t.invertY;let r=new l(e,1),a=function(e){switch(e){case 35916:return 33776;case 35918:return 33778;case 35919:return 33779;case 37493:return 37492;case 37497:return 37496;case 37495:return 37494;case 37840:return 37808;case 36493:return 36492}return null}(r.glInternalFormat);a?(t.format=a,t._useSRGBBuffer=t.getEngine()._getUseSRGBBuffer(!0,t.generateMipMaps),t._gammaSpace=!0):t.format=r.glInternalFormat,i(r.pixelWidth,r.pixelHeight,t.generateMipMaps,!0,()=>{r.uploadLevels(t,t.generateMipMaps)},r.isInvalid)}else p.IsValid(e)?new p(t.getEngine())._uploadAsync(e,t,r).then(()=>{i(t.width,t.height,t.generateMipMaps,!0,()=>{},!1)},e=>{o.Logger.Warn(`Failed to load KTX2 texture data: ${e.message}`),i(0,0,!1,!1,()=>{},!0)}):(o.Logger.Error("texture missing KTX identifier"),i(0,0,!1,!1,()=>{},!0))}}e.s(["_KTXTextureLoader",()=>_],97374)},95374,e=>{"use strict";var t=e.i(39018),i=e.i(86956),r=e.i(22840),a=e.i(31051),s=e.i(86752);class n{constructor(e,t,i,r){this.name=e,this.worldAxisForNormal=t,this.worldAxisForFileX=i,this.worldAxisForFileY=r}}class o{static ConvertCubeMapTextureToSphericalPolynomial(e){let t,i;if(!e.isCube)return null;e.getScene()?.getEngine().flushFramebuffer();let r=e.getSize().width,a=e.readPixels(0,void 0,void 0,!1),s=e.readPixels(1,void 0,void 0,!1);e.isRenderTarget?(t=e.readPixels(3,void 0,void 0,!1),i=e.readPixels(2,void 0,void 0,!1)):(t=e.readPixels(2,void 0,void 0,!1),i=e.readPixels(3,void 0,void 0,!1));let n=e.readPixels(4,void 0,void 0,!1),o=e.readPixels(5,void 0,void 0,!1),l=e.gammaSpace;return new Promise(e=>{Promise.all([s,a,t,i,n,o]).then(([t,i,a,s,n,o])=>{let c={size:r,right:i,left:t,up:a,down:s,front:n,back:o,format:5,type:+(t instanceof Float32Array),gammaSpace:l};e(this.ConvertCubeMapToSphericalPolynomial(c))})})}static _AreaElement(e,t){return Math.atan2(e*t,Math.sqrt(e*e+t*t+1))}static ConvertCubeMapToSphericalPolynomial(e){let t=new r.SphericalHarmonics,n=0,o=2/e.size,l=.5*o,c=l-1;for(let r=0;r<6;r++){let d=this._FileFaces[r],u=e[d.name],f=c,h=5===e.format?4:3;for(let r=0;r<e.size;r++){let m=c;for(let c=0;c<e.size;c++){let p=d.worldAxisForFileX.scale(m).add(d.worldAxisForFileY.scale(f)).add(d.worldAxisForNormal);p.normalize();let _=this._AreaElement(m-l,f-l)-this._AreaElement(m-l,f+l)-this._AreaElement(m+l,f-l)+this._AreaElement(m+l,f+l),v=u[r*e.size*h+c*h+0],g=u[r*e.size*h+c*h+1],S=u[r*e.size*h+c*h+2];isNaN(v)&&(v=0),isNaN(g)&&(g=0),isNaN(S)&&(S=0),0===e.type&&(v/=255,g/=255,S/=255),e.gammaSpace&&(v=Math.pow((0,i.Clamp)(v),a.ToLinearSpace),g=Math.pow((0,i.Clamp)(g),a.ToLinearSpace),S=Math.pow((0,i.Clamp)(S),a.ToLinearSpace));let T=this.MAX_HDRI_VALUE;if(this.PRESERVE_CLAMPED_COLORS){let e=Math.max(v,g,S);if(e>T){let t=T/e;v*=t,g*=t,S*=t}}else v=(0,i.Clamp)(v,0,T),g=(0,i.Clamp)(g,0,T),S=(0,i.Clamp)(S,0,T);let b=new s.Color3(v,g,S);t.addLight(p,b,_),n+=_,m+=o}f+=o}}let d=4*Math.PI*6/6/n;return t.scaleInPlace(d),t.convertIncidentRadianceToIrradiance(),t.convertIrradianceToLambertianRadiance(),r.SphericalPolynomial.FromHarmonics(t)}}o._FileFaces=[new n("right",new t.Vector3(1,0,0),new t.Vector3(0,0,-1),new t.Vector3(0,-1,0)),new n("left",new t.Vector3(-1,0,0),new t.Vector3(0,0,1),new t.Vector3(0,-1,0)),new n("up",new t.Vector3(0,1,0),new t.Vector3(1,0,0),new t.Vector3(0,0,1)),new n("down",new t.Vector3(0,-1,0),new t.Vector3(1,0,0),new t.Vector3(0,0,-1)),new n("front",new t.Vector3(0,0,1),new t.Vector3(1,0,0),new t.Vector3(0,-1,0)),new n("back",new t.Vector3(0,0,-1),new t.Vector3(-1,0,0),new t.Vector3(0,-1,0))],o.MAX_HDRI_VALUE=4096,o.PRESERVE_CLAMPED_COLORS=!1,e.s(["CubeMapToSphericalPolynomialTools",()=>o])},55653,e=>{"use strict";var t=e.i(48835),i=e.i(42938);class r{static ExpandRGBDTexture(i){let r=i._texture;if(!r||!i.isRGBD)return;let a=r.getEngine(),s=a.getCaps(),n=r.isReady,o=!1;s.textureHalfFloatRender&&s.textureHalfFloatLinearFiltering?(o=!0,r.type=2):s.textureFloatRender&&s.textureFloatLinearFiltering&&(o=!0,r.type=1),o&&(r.isReady=!1,r._isRGBD=!1,r.invertY=!1);let l=async()=>{let s=a.isWebGPU;r.isReady=!1,s?await e.A(94164):await e.A(74724);let n=new t.PostProcess("rgbdDecode","rgbdDecode",null,null,1,null,3,a,!1,void 0,r.type,void 0,null,!1,void 0,+!!s);n.externalTextureSamplerBinding=!0;let o=a.createRenderTargetTexture(r.width,{generateDepthBuffer:!1,generateMipMaps:!1,generateStencilBuffer:!1,samplingMode:r.samplingMode,type:r.type,format:5});n.onEffectCreatedObservable.addOnce(e=>{e.executeWhenCompiled(()=>{n.onApply=e=>{e._bindTexture("textureSampler",r),e.setFloat2("scale",1,1)},i.getScene().postProcessManager.directRender([n],o,!0),a.restoreDefaultFramebuffer(),a._releaseTexture(r),n&&n.dispose(),o._swapAndDie(r),r.isReady=!0})})};o&&(n?l():i.onLoadObservable.addOnce(l))}static async EncodeTextureToRGBD(t,r,a=0){return r.getEngine().isWebGPU?await e.A(39545):await e.A(28216),await (0,i.ApplyPostProcess)("rgbdEncode",t,r,a,1,5)}}e.s(["RGBDTextureTools",()=>r])},75881,e=>{"use strict";var t=e.i(95374),i=e.i(14761);i.BaseTexture.prototype.forceSphericalPolynomialsRecompute=function(){this._texture&&(this._texture._sphericalPolynomial=null,this._texture._sphericalPolynomialPromise=null,this._texture._sphericalPolynomialComputed=!1)},Object.defineProperty(i.BaseTexture.prototype,"sphericalPolynomial",{get:function(){if(this._texture){if(this._texture._sphericalPolynomial||this._texture._sphericalPolynomialComputed)return this._texture._sphericalPolynomial;this._texture.isReady&&(this._texture._sphericalPolynomialPromise||(this._texture._sphericalPolynomialPromise=t.CubeMapToSphericalPolynomialTools.ConvertCubeMapTextureToSphericalPolynomial(this),null===this._texture._sphericalPolynomialPromise?this._texture._sphericalPolynomialComputed=!0:this._texture._sphericalPolynomialPromise.then(e=>{this._texture._sphericalPolynomial=e,this._texture._sphericalPolynomialComputed=!0})))}return null},set:function(e){this._texture&&(this._texture._sphericalPolynomial=e)},enumerable:!0,configurable:!0}),e.s([])},99385,e=>{"use strict";var t=e.i(76504),i=e.i(16139),r=e.i(1622),a=e.i(86956),s=e.i(10421),n=e.i(4527),o=e.i(60421),l=e.i(98583);let c=null;async function d(){let t=s.EngineStore.LastCreatedEngine?.createCanvas(100,100)??new OffscreenCanvas(100,100);t instanceof OffscreenCanvas&&n.Logger.Warn("DumpData: OffscreenCanvas will be used for dumping data. This may result in lossy alpha values.");let{ThinEngine:r}=await e.A(18612);if(!r.IsSupported)throw Error("DumpData: No WebGL context available. Cannot dump data.");let a=new r(t,!1,{preserveDrawingBuffer:!0,depth:!1,stencil:!1,alpha:!0,premultipliedAlpha:!1,antialias:!1,failIfMajorPerformanceCaveat:!1});s.EngineStore.Instances.pop(),s.EngineStore.OnEnginesDisposedObservable.add(e=>{a&&e!==a&&!a.isDisposed&&0===s.EngineStore.Instances.length&&v()}),a.getCaps().parallelShaderCompile=void 0;let o=new i.EffectRenderer(a),{passPixelShader:l}=await e.A(20798),c=new i.EffectWrapper({engine:a,name:l.name,fragmentShader:l.shader,samplerNames:["textureSampler"]});return{canvas:t,dumpEngine:{engine:a,renderer:o,wrapper:c}}}async function u(){return c||(c=d()),await c}class f{static async EncodeImageAsync(e,t,i,a,s,n){let o=await u(),l=o.dumpEngine;l.engine.setSize(t,i,!0);let c=l.engine.createRawTexture(e,t,i,5,!1,!s,1);return l.renderer.setViewport(),l.renderer.applyEffectWrapper(l.wrapper),l.wrapper.effect._bindTexture("textureSampler",c),l.renderer.draw(),c.dispose(),await new Promise((e,t)=>{r.Tools.ToBlob(o.canvas,i=>{i?e(i):t(Error("EncodeImageAsync: Failed to convert canvas to blob."))},a,n)})}}(0,t.__decorate)([l.nativeOverride],f,"EncodeImageAsync",null);let h=f.EncodeImageAsync;async function m(e,t,i,r,a="image/png",s,n){let o=new Uint8Array((await i.readPixels(0,0,e,t)).buffer);_(e,t,o,r,a,s,!0,void 0,n)}async function p(e,t,i,s="image/png",l,c=!1,d=!1,u){if(i instanceof Float32Array){let e=new Uint8Array(i.length),t=i.length;for(;t--;){let r=i[t];e[t]=Math.round(255*(0,a.Clamp)(r))}i=e}let h=await f.EncodeImageAsync(i,e,t,s,c,u);void 0!==l&&r.Tools.DownloadBlob(h,l),h.type!==s&&n.Logger.Warn(`DumpData: The requested mimeType '${s}' is not supported. The result has mimeType '${h.type}' instead.`);let m=await h.arrayBuffer();return d?m:`data:${s};base64,${(0,o.EncodeArrayBufferToBase64)(m)}`}function _(e,t,i,r,a="image/png",s,n=!1,o=!1,l){void 0!==s||r||(s=""),p(e,t,i,a,s,n,o,l).then(e=>{r&&r(e)})}function v(){c&&(c?.then(e=>{e.canvas instanceof HTMLCanvasElement&&e.canvas.remove(),e.dumpEngine&&(e.dumpEngine.engine.dispose(),e.dumpEngine.renderer.dispose(),e.dumpEngine.wrapper.dispose())}),c=null)}r.Tools.DumpData=_,r.Tools.DumpDataAsync=p,r.Tools.DumpFramebuffer=m,e.s(["Dispose",()=>v,"DumpData",()=>_,"DumpDataAsync",()=>p,"DumpFramebuffer",()=>m,"DumpTools",0,{DumpData:_,DumpDataAsync:p,DumpFramebuffer:m,Dispose:v},"EncodeImageAsync",0,h])},33621,21515,e=>{"use strict";var t=e.i(1622),i=e.i(39018),r=e.i(86956),a=e.i(22840),s=e.i(71733),n=e.i(14761),o=(e.i(93683),e.i(48835)),l=e.i(4527),c=e.i(55653),d=e.i(99385);e.i(75881);var u=e.i(96890);let f="image/png",h=[134,22,135,150,246,214,150,54];function m(e){let t,i=new DataView(e.buffer,e.byteOffset,e.byteLength),r=0;for(let e=0;e<h.length;e++)if(i.getUint8(r++)!==h[e])return l.Logger.Error("Not a babylon environment map"),null;let a="";for(;t=i.getUint8(r++);)a+=String.fromCharCode(t);let s=JSON.parse(a);return(s=p(s)).binaryDataPosition=r,s.specular&&(s.specular.lodGenerationScale=s.specular.lodGenerationScale||.8),s}function p(e){if(e.version>2)throw Error(`Unsupported babylon environment map version "${e.version}". Latest supported version is "2".`);return 2===e.version?e:e={...e,version:2,imageType:f}}function _(e,t,r){let a=(r=p(r)).specular;if(!a)return Promise.resolve([]);e._lodGenerationScale=a.lodGenerationScale;let s=[],n=function(e,t){let i=(t=p(t)).specular,r=Math.log2(t.width);if(r=Math.round(r)+1,i.mipmaps.length!==6*r)throw Error(`Unsupported specular mipmaps number "${i.mipmaps.length}"`);let a=Array(r);for(let s=0;s<r;s++){a[s]=Array(6);for(let r=0;r<6;r++){let n=i.mipmaps[6*s+r];a[s][r]=new Uint8Array(e.buffer,e.byteOffset+t.binaryDataPosition+n.position,n.length)}}return a}(t,r);s.push(g(e,n,r.imageType));let o=r.irradiance?.irradianceTexture;if(o){let a=function(e,t){t=p(t);let i=Array(6),r=t.irradiance?.irradianceTexture;if(r){if(6!==r.faces.length)throw Error(`Incorrect irradiance texture faces number "${r.faces.length}"`);for(let a=0;a<6;a++){let s=r.faces[a];i[a]=new Uint8Array(e.buffer,e.byteOffset+t.binaryDataPosition+s.position,s.length)}}return i}(t,r),n=null;r.irradiance?.irradianceTexture?.dominantDirection&&(n=i.Vector3.FromArray(r.irradiance.irradianceTexture.dominantDirection)),s.push(S(e,a,o.size,r.imageType,n))}return Promise.all(s)}async function v(e,t,i,r,a,s,n,o,l,c,d){return await new Promise((u,f)=>{if(i){let i=t.createTexture(null,!0,!0,null,1,null,e=>{f(e)},e);r?.onEffectCreatedObservable.addOnce(o=>{o.executeWhenCompiled(()=>{r.externalTextureSamplerBinding=!0,r.onApply=r=>{r._bindTexture("textureSampler",i),r.setFloat2("scale",1,t._features.needsInvertingBitmap&&e instanceof ImageBitmap?-1:1)},t.scenes.length&&(t.scenes[0].postProcessManager.directRender([r],c,!0,s,n),t.restoreDefaultFramebuffer(),i.dispose(),URL.revokeObjectURL(a),u())})})}else{if(t._uploadImageToTexture(d,e,s,n),o){let i=l[n];i&&t._uploadImageToTexture(i._texture,e,s,0)}u()}})}async function g(e,t,i=f){let r=e.getEngine();e.format=5,e.type=0,e.generateMipMaps=!0,e._cachedAnisotropicFilteringLevel=null,r.updateTextureSamplingMode(3,e),await T(e,t,!0,i),e.isReady=!0}async function S(e,t,i,r=f,a=null){let o=e.getEngine(),l=new s.InternalTexture(o,5),c=new n.BaseTexture(o,l);e._irradianceTexture=c,c._dominantDirection=a,l.isCube=!0,l.format=5,l.type=0,l.generateMipMaps=!0,l._cachedAnisotropicFilteringLevel=null,l.generateMipMaps=!0,l.width=i,l.height=i,o.updateTextureSamplingMode(3,l),await T(l,[t],!1,r),o.generateMipMapsForCubemap(l),l.isReady=!0}async function T(i,a,l,c=f){if(!t.Tools.IsExponentOfTwo(i.width))throw Error("Texture size must be a power of two");let d=(0,r.ILog2)(i.width)+1,h=i.getEngine(),m=!1,p=!1,_=null,g=null,S=null,b=h.getCaps();b.textureLOD?h._features.supportRenderAndCopyToLodForFloatTextures?b.textureHalfFloatRender&&b.textureHalfFloatLinearFiltering?(m=!0,i.type=2):b.textureFloatRender&&b.textureFloatLinearFiltering&&(m=!0,i.type=1):m=!1:(m=!1,p=l);let x=0;if(m)h.isWebGPU?(x=1,await e.A(94164)):await e.A(74724),_=new o.PostProcess("rgbdDecode","rgbdDecode",null,null,1,null,3,h,!1,void 0,i.type,void 0,null,!1,void 0,x),i._isRGBD=!1,i.invertY=!1,g=h.createRenderTargetCubeTexture(i.width,{generateDepthBuffer:!1,generateMipMaps:!0,generateStencilBuffer:!1,samplingMode:3,type:i.type,format:5});else if(i._isRGBD=!0,i.invertY=!0,p){S={};let e=i._lodGenerationScale,t=i._lodGenerationOffset;for(let r=0;r<3;r++){let a=(d-1)*e+t,o=Math.round(Math.min(Math.max(t+(a-t)*(1-r/2),0),a)),l=new s.InternalTexture(h,2);l.isCube=!0,l.invertY=!0,l.generateMipMaps=!1,h.updateTextureSamplingMode(2,l);let c=new n.BaseTexture(null);switch(c._isCube=!0,c._texture=l,S[o]=c,r){case 0:i._lodTextureLow=c;break;case 1:i._lodTextureMid=c;break;case 2:i._lodTextureHigh=c}}}let C=[];for(let e=0;e<a.length;e++)for(let t=0;t<6;t++){let r,s=a[e][t],n=new Blob([(0,u.GetBlobBufferSource)(s)],{type:c}),o=URL.createObjectURL(n);if(h._features.forceBitmapOverHTMLImageElement)r=h.createImageBitmap(n,{premultiplyAlpha:"none",colorSpaceConversion:"none"}).then(async r=>await v(r,h,m,_,o,t,e,p,S,g,i));else{let a=new Image;a.src=o,r=new Promise((r,s)=>{a.onload=()=>{v(a,h,m,_,o,t,e,p,S,g,i).then(()=>r()).catch(e=>{s(e)})},a.onerror=e=>{s(e)}})}C.push(r)}if(await Promise.all(C),a.length<d){let e,t=Math.pow(2,d-1-a.length),r=t*t*4;switch(i.type){case 0:e=new Uint8Array(r);break;case 2:e=new Uint16Array(r);break;case 1:e=new Float32Array(r)}for(let t=a.length;t<d;t++)for(let r=0;r<6;r++)h._uploadArrayBufferViewToTexture(g?.texture||i,e,r,t)}if(g){let e=i._irradianceTexture;i._irradianceTexture=null,h._releaseTexture(i),g._swapAndDie(i),i._irradianceTexture=e}_&&_.dispose(),p&&(i._lodTextureHigh&&i._lodTextureHigh._texture&&(i._lodTextureHigh._texture.isReady=!0),i._lodTextureMid&&i._lodTextureMid._texture&&(i._lodTextureMid._texture.isReady=!0),i._lodTextureLow&&i._lodTextureLow._texture&&(i._lodTextureLow._texture.isReady=!0))}function b(e,t){let r=(t=p(t)).irradiance;if(!r)return;let s=new a.SphericalPolynomial;i.Vector3.FromArrayToRef(r.x,0,s.x),i.Vector3.FromArrayToRef(r.y,0,s.y),i.Vector3.FromArrayToRef(r.z,0,s.z),i.Vector3.FromArrayToRef(r.xx,0,s.xx),i.Vector3.FromArrayToRef(r.yy,0,s.yy),i.Vector3.FromArrayToRef(r.zz,0,s.zz),i.Vector3.FromArrayToRef(r.yz,0,s.yz),i.Vector3.FromArrayToRef(r.zx,0,s.zx),i.Vector3.FromArrayToRef(r.xy,0,s.xy),e._sphericalPolynomial=s}function x(e,t,i,r,a){let s=g(e.getEngine().createRawCubeTexture(null,e.width,e.format,e.type,e.generateMipMaps,e.invertY,e.samplingMode,e._compression),t).then(()=>e);return e.onRebuildCallback=e=>({proxy:s,isReady:!0,isAsync:!0}),e._source=13,e._bufferViewArrayArray=t,e._lodGenerationScale=r,e._lodGenerationOffset=a,e._sphericalPolynomial=i,g(e,t).then(()=>(e.isReady=!0,e))}e.s(["GetEnvInfo",()=>m,"UploadEnvLevelsAsync",()=>_,"UploadEnvSpherical",()=>b,"_UpdateRGBDAsync",()=>x],21515);class C{constructor(){this.supportCascades=!1}loadCubeData(e,t,i,r,a){if(Array.isArray(e))return;let s=m(e);if(s){t.width=s.width,t.height=s.width;try{b(t,s),_(t,e,s).then(()=>{t.isReady=!0,t.onLoadedObservable.notifyObservers(t),t.onLoadedObservable.clear(),r&&r()},e=>{a?.("Can not upload environment levels",e)})}catch(e){a?.("Can not upload environment file",e)}}else a&&a("Can not parse the environment file",null)}loadData(){throw".env not supported in 2d."}}e.s(["_ENVTextureLoader",()=>C],33621)},39520,e=>{e.v(e=>Promise.resolve().then(()=>e(21981)))},14343,e=>{e.v(t=>Promise.all(["static/chunks/a555efe8a08a9069.js"].map(t=>e.l(t))).then(()=>t(36549)))},21727,e=>{e.v(e=>Promise.resolve().then(()=>e(66382)))},5081,e=>{e.v(t=>Promise.all(["static/chunks/d579d384817bc032.js"].map(t=>e.l(t))).then(()=>t(55316)))},17088,e=>{e.v(e=>Promise.resolve().then(()=>e(33621)))},84687,e=>{e.v(t=>Promise.all(["static/chunks/d3f423e899d34121.js"].map(t=>e.l(t))).then(()=>t(72193)))},5014,e=>{e.v(e=>Promise.resolve().then(()=>e(97374)))},91294,e=>{e.v(t=>Promise.all(["static/chunks/e6377e998294dd42.js"].map(t=>e.l(t))).then(()=>t(61694)))},60150,e=>{e.v(t=>Promise.all(["static/chunks/6df62aef75f940c1.js"].map(t=>e.l(t))).then(()=>t(73753)))},75356,e=>{e.v(t=>Promise.all(["static/chunks/6f5eebed0438cbf5.js"].map(t=>e.l(t))).then(()=>t(77070)))},97532,e=>{e.v(t=>Promise.all(["static/chunks/90cec312109de1d3.js"].map(t=>e.l(t))).then(()=>t(21813)))},54381,e=>{e.v(t=>Promise.all(["static/chunks/1c5791e334519d6a.js"].map(t=>e.l(t))).then(()=>t(7948)))},29785,e=>{e.v(t=>Promise.all(["static/chunks/a370dc878b658538.js"].map(t=>e.l(t))).then(()=>t(87361)))},56277,e=>{e.v(t=>Promise.all(["static/chunks/14d0e1dbd1beef14.js"].map(t=>e.l(t))).then(()=>t(8689)))},38426,e=>{e.v(e=>Promise.resolve().then(()=>e(99385)))},4427,e=>{e.v(t=>Promise.all(["static/chunks/bdad2d1420866707.js"].map(t=>e.l(t))).then(()=>t(90396)))},47921,e=>{e.v(t=>Promise.all(["static/chunks/ae96967834ffa19a.js"].map(t=>e.l(t))).then(()=>t(31329)))},47848,e=>{e.v(e=>Promise.resolve().then(()=>e(40958)))},4688,e=>{e.v(e=>Promise.resolve().then(()=>e(13236)))},80370,e=>{e.v(t=>Promise.all(["static/chunks/381bc23b16b04c35.js"].map(t=>e.l(t))).then(()=>t(85741)))},14423,e=>{e.v(t=>Promise.all(["static/chunks/0ee4a7b0bbcca07b.js"].map(t=>e.l(t))).then(()=>t(75691)))},60468,e=>{e.v(t=>Promise.all(["static/chunks/74c7ddfb91ba62ab.js"].map(t=>e.l(t))).then(()=>t(62176)))},70847,e=>{e.v(t=>Promise.all(["static/chunks/595553e0fb041afc.js"].map(t=>e.l(t))).then(()=>t(51964)))},20953,e=>{e.v(t=>Promise.all(["static/chunks/36c104cc0b8078d6.js"].map(t=>e.l(t))).then(()=>t(52118)))},41025,e=>{e.v(t=>Promise.all(["static/chunks/7e995caaaf324c17.js"].map(t=>e.l(t))).then(()=>t(90512)))},17047,e=>{e.v(t=>Promise.all(["static/chunks/b17f6e52024aff57.js"].map(t=>e.l(t))).then(()=>t(41101)))},72148,e=>{e.v(t=>Promise.all(["static/chunks/1d19093865e2787c.js"].map(t=>e.l(t))).then(()=>t(90480)))},36372,e=>{e.v(t=>Promise.all(["static/chunks/2a1932aee94d490c.js"].map(t=>e.l(t))).then(()=>t(44067)))},83758,e=>{e.v(t=>Promise.all(["static/chunks/fb2c962030bb68b0.js"].map(t=>e.l(t))).then(()=>t(50820)))},7720,e=>{e.v(t=>Promise.all(["static/chunks/4827b76da54fc193.js"].map(t=>e.l(t))).then(()=>t(54737)))},83296,e=>{e.v(t=>Promise.all(["static/chunks/cee20a7fc3268dbf.js"].map(t=>e.l(t))).then(()=>t(55870)))},92078,e=>{e.v(t=>Promise.all(["static/chunks/69d75800f07c2e9a.js"].map(t=>e.l(t))).then(()=>t(98234)))},91153,e=>{e.v(t=>Promise.all(["static/chunks/b708aa3836af8dd6.js"].map(t=>e.l(t))).then(()=>t(49306)))},96660,e=>{e.v(t=>Promise.all(["static/chunks/aa002316ac93df2a.js"].map(t=>e.l(t))).then(()=>t(46182)))},66362,e=>{e.v(t=>Promise.all(["static/chunks/3acd6bdcc87f8090.js"].map(t=>e.l(t))).then(()=>t(88915)))},20798,e=>{e.v(t=>Promise.all(["static/chunks/51b48657cf466095.js"].map(t=>e.l(t))).then(()=>t(42646)))},79832,e=>{e.v(t=>Promise.all(["static/chunks/3e100fec55aaa705.js"].map(t=>e.l(t))).then(()=>t(81499)))},50773,e=>{e.v(t=>Promise.all(["static/chunks/44c9505584773a3c.js"].map(t=>e.l(t))).then(()=>t(34508)))},58375,e=>{e.v(t=>Promise.all(["static/chunks/67d549743be82917.js"].map(t=>e.l(t))).then(()=>t(64284)))},52260,e=>{e.v(t=>Promise.all(["static/chunks/360b7501df7b2974.js"].map(t=>e.l(t))).then(()=>t(18377)))},9625,e=>{e.v(t=>Promise.all(["static/chunks/1e541f17ef849279.js"].map(t=>e.l(t))).then(()=>t(17416)))},81340,e=>{e.v(t=>Promise.all(["static/chunks/7a3439586256d81c.js"].map(t=>e.l(t))).then(()=>t(88587)))},86737,e=>{e.v(t=>Promise.all(["static/chunks/e3c865bf1c78bcc2.js"].map(t=>e.l(t))).then(()=>t(33615)))},23862,e=>{e.v(t=>Promise.all(["static/chunks/691241776c839196.js"].map(t=>e.l(t))).then(()=>t(40167)))},33275,e=>{e.v(t=>Promise.all(["static/chunks/30ea27cb69e4741a.js"].map(t=>e.l(t))).then(()=>t(81174)))},81648,e=>{e.v(t=>Promise.all(["static/chunks/3da012e896bb41ab.js"].map(t=>e.l(t))).then(()=>t(39363)))},93908,e=>{e.v(t=>Promise.all(["static/chunks/559d8a13dcca3eea.js"].map(t=>e.l(t))).then(()=>t(8885)))},69777,e=>{e.v(t=>Promise.all(["static/chunks/b18073f6ab46c1bd.js"].map(t=>e.l(t))).then(()=>t(70181)))},49308,e=>{e.v(t=>Promise.all(["static/chunks/b1efcae71587c732.js"].map(t=>e.l(t))).then(()=>t(12998)))},80,e=>{e.v(t=>Promise.all(["static/chunks/5e02a23de12392c6.js"].map(t=>e.l(t))).then(()=>t(12931)))},54788,e=>{e.v(t=>Promise.all(["static/chunks/80f097279e74ba72.js"].map(t=>e.l(t))).then(()=>t(13743)))},34046,e=>{e.v(t=>Promise.all(["static/chunks/4d6ffd833758d474.js"].map(t=>e.l(t))).then(()=>t(88983)))},94637,e=>{e.v(t=>Promise.all(["static/chunks/653afdda993c3614.js","static/chunks/6632a87410f26222.js"].map(t=>e.l(t))).then(()=>t(4733)))},63409,e=>{e.v(t=>Promise.all(["static/chunks/49437a866c343681.js"].map(t=>e.l(t))).then(()=>t(87873)))},96551,e=>{e.v(t=>Promise.all(["static/chunks/2229211e6da5c5fc.js","static/chunks/b10d3d7cc1f0e1bc.js"].map(t=>e.l(t))).then(()=>t(54229)))},74724,e=>{e.v(t=>Promise.all(["static/chunks/092ca228f246cfd1.js"].map(t=>e.l(t))).then(()=>t(24588)))},94164,e=>{e.v(t=>Promise.all(["static/chunks/5301a4dd58196bfe.js"].map(t=>e.l(t))).then(()=>t(90919)))},39545,e=>{e.v(t=>Promise.all(["static/chunks/1f07106708a82771.js"].map(t=>e.l(t))).then(()=>t(43291)))},28216,e=>{e.v(t=>Promise.all(["static/chunks/a6805f9ba5cb8dc6.js"].map(t=>e.l(t))).then(()=>t(88395)))},9150,e=>{e.v(t=>Promise.all(["static/chunks/902965f4706226ba.js"].map(t=>e.l(t))).then(()=>t(91473)))},90286,e=>{e.v(t=>Promise.all(["static/chunks/f2ac6a5c8428ec54.js","static/chunks/cc570a492cbc68f5.js","static/chunks/571c4c10de97bd6f.js"].map(t=>e.l(t))).then(()=>t(48721)))},94244,e=>{e.v(t=>Promise.all(["static/chunks/9f321dc8762e1698.js"].map(t=>e.l(t))).then(()=>t(68446)))},54172,e=>{e.v(t=>Promise.all(["static/chunks/ce358cc570fbc2e5.js","static/chunks/3879e238682dcdc4.js","static/chunks/574aad81981ea8c6.js"].map(t=>e.l(t))).then(()=>t(5285)))},35832,e=>{e.v(t=>Promise.all(["static/chunks/fdd21f2c94d39c3f.js"].map(t=>e.l(t))).then(()=>t(36442)))},5246,e=>{e.v(t=>Promise.all(["static/chunks/05b36b574e44572e.js"].map(t=>e.l(t))).then(()=>t(33150)))},44583,e=>{e.v(t=>Promise.all(["static/chunks/85609c4a84676e1d.js"].map(t=>e.l(t))).then(()=>t(59633)))},36018,e=>{e.v(t=>Promise.all(["static/chunks/16ac84c3ddb76219.js"].map(t=>e.l(t))).then(()=>t(98137)))},26574,e=>{e.v(t=>Promise.all(["static/chunks/018f1ff2755b9041.js"].map(t=>e.l(t))).then(()=>t(75036)))},86001,e=>{e.v(t=>Promise.all(["static/chunks/85cfcc9dfbcd18dd.js","static/chunks/f0bfb9d4366f1898.js"].map(t=>e.l(t))).then(()=>t(35142)))},56595,e=>{e.v(t=>Promise.all(["static/chunks/0c43ff8d004935c5.js"].map(t=>e.l(t))).then(()=>t(30444)))},73039,e=>{e.v(t=>Promise.all(["static/chunks/a09696209d9da825.js","static/chunks/4e12fbe3e5059c19.js"].map(t=>e.l(t))).then(()=>t(11238)))},3762,e=>{e.v(t=>Promise.all(["static/chunks/bcbc609a84844352.js"].map(t=>e.l(t))).then(()=>t(45841)))},78693,e=>{e.v(t=>Promise.all(["static/chunks/7556e27966dd87b5.js"].map(t=>e.l(t))).then(()=>t(92242)))},18612,e=>{e.v(e=>Promise.resolve().then(()=>e(47902)))},72769,e=>{e.v(t=>Promise.all(["static/chunks/1185ae551d37574f.js"].map(t=>e.l(t))).then(()=>t(98846)))},16752,e=>{e.v(t=>Promise.all(["static/chunks/6931755d6818cc90.js"].map(t=>e.l(t))).then(()=>t(12730)))},9454,e=>{e.v(t=>Promise.all(["static/chunks/201fa04a8e49a2c2.js"].map(t=>e.l(t))).then(()=>t(62610)))},25636,e=>{e.v(t=>Promise.all(["static/chunks/0941438b19c1ba64.js"].map(t=>e.l(t))).then(()=>t(93199)))},64258,e=>{e.v(t=>Promise.all(["static/chunks/9aa669d38a96725a.js"].map(t=>e.l(t))).then(()=>t(96960)))},18250,e=>{e.v(t=>Promise.all(["static/chunks/09cfbe6bba64b34e.js"].map(t=>e.l(t))).then(()=>t(48066)))},20494,e=>{e.v(t=>Promise.all(["static/chunks/7d7d413810cf44e6.js"].map(t=>e.l(t))).then(()=>t(75002)))},80264,e=>{e.v(t=>Promise.all(["static/chunks/4abb411355c5f5de.js"].map(t=>e.l(t))).then(()=>t(88314)))},65145,e=>{e.v(e=>Promise.resolve().then(()=>e(97913)))},87365,e=>{e.v(e=>Promise.resolve().then(()=>e(81923)))},34123,e=>{e.v(t=>Promise.all(["static/chunks/bc08b243725d27dc.js"].map(t=>e.l(t))).then(()=>t(56224)))},10227,e=>{e.v(t=>Promise.all(["static/chunks/adeb5b22e7425c6f.js"].map(t=>e.l(t))).then(()=>t(73761)))},7087,e=>{e.v(e=>Promise.resolve().then(()=>e(51419)))},65473,e=>{e.v(e=>Promise.resolve().then(()=>e(64029)))},93443,e=>{e.v(t=>Promise.all(["static/chunks/a5502b8b9feec041.js"].map(t=>e.l(t))).then(()=>t(83645)))},58910,e=>{e.v(t=>Promise.all(["static/chunks/a992b92e7712beb4.js"].map(t=>e.l(t))).then(()=>t(62222)))},3868,e=>{e.v(e=>Promise.resolve().then(()=>e(7751)))},11418,e=>{e.v(e=>Promise.resolve().then(()=>e(89108)))},72440,e=>{e.v(t=>Promise.all(["static/chunks/bab91122295504ac.js"].map(t=>e.l(t))).then(()=>t(38141)))},41600,e=>{e.v(t=>Promise.all(["static/chunks/0895ed969712ed26.js"].map(t=>e.l(t))).then(()=>t(87268)))},98369,e=>{e.v(t=>Promise.all(["static/chunks/1359ed8be09e8477.js"].map(t=>e.l(t))).then(()=>t(26542)))},29008,e=>{e.v(t=>Promise.all(["static/chunks/2b81bded9d345abe.js"].map(t=>e.l(t))).then(()=>t(7495)))},24662,e=>{e.v(t=>Promise.all(["static/chunks/2defd1e5a3496410.js"].map(t=>e.l(t))).then(()=>t(13387)))},56597,e=>{e.v(t=>Promise.all(["static/chunks/93e838f05a8f9e98.js"].map(t=>e.l(t))).then(()=>t(78714)))},63783,e=>{e.v(t=>Promise.all(["static/chunks/ae02bcd0366c8b71.js"].map(t=>e.l(t))).then(()=>t(2661)))},79325,e=>{e.v(t=>Promise.all(["static/chunks/3e3955d808ac0c44.js"].map(t=>e.l(t))).then(()=>t(33952)))},78779,e=>{e.v(t=>Promise.all(["static/chunks/6d86f3f80332055f.js"].map(t=>e.l(t))).then(()=>t(35779)))},59643,e=>{e.v(t=>Promise.all(["static/chunks/480cec464536ddc4.js"].map(t=>e.l(t))).then(()=>t(63800)))},98615,e=>{e.v(t=>Promise.all(["static/chunks/f5d36a5225bd50e2.js"].map(t=>e.l(t))).then(()=>t(55334)))},53009,e=>{e.v(t=>Promise.all(["static/chunks/987e9fdd90b7d578.js"].map(t=>e.l(t))).then(()=>t(74324)))},88372,e=>{e.v(t=>Promise.all(["static/chunks/f1b94ff79a89a33d.js"].map(t=>e.l(t))).then(()=>t(2430)))},79860,e=>{e.v(t=>Promise.all(["static/chunks/af89b91dfde97deb.js"].map(t=>e.l(t))).then(()=>t(82850)))},44350,e=>{e.v(t=>Promise.all(["static/chunks/e9b95f6e49a6459a.js"].map(t=>e.l(t))).then(()=>t(85671)))},3829,e=>{e.v(t=>Promise.all(["static/chunks/3231edeb1aab179a.js"].map(t=>e.l(t))).then(()=>t(69853)))},2763,e=>{e.v(t=>Promise.all(["static/chunks/e00ce8aec780ab5a.js"].map(t=>e.l(t))).then(()=>t(28277)))},44550,e=>{e.v(t=>Promise.all(["static/chunks/aaf6cfd7f3cc4f0e.js"].map(t=>e.l(t))).then(()=>t(25251)))},4001,e=>{e.v(t=>Promise.all(["static/chunks/c4bd2d7c67b245ed.js"].map(t=>e.l(t))).then(()=>t(10952)))},63324,e=>{e.v(t=>Promise.all(["static/chunks/420af0dc2a21e785.js"].map(t=>e.l(t))).then(()=>t(37827)))},16530,e=>{e.v(t=>Promise.all(["static/chunks/2d6f758b0de3ef6e.js"].map(t=>e.l(t))).then(()=>t(62725)))},3145,e=>{e.v(t=>Promise.all(["static/chunks/877dbad3c033d26e.js"].map(t=>e.l(t))).then(()=>t(7822)))},89269,e=>{e.v(t=>Promise.all(["static/chunks/20d67e87ad0b1414.js"].map(t=>e.l(t))).then(()=>t(26515)))},33217,e=>{e.v(t=>Promise.all(["static/chunks/b49311d398126507.js"].map(t=>e.l(t))).then(()=>t(42767)))},32970,e=>{e.v(t=>Promise.all(["static/chunks/ed6e749d2d0816a8.js"].map(t=>e.l(t))).then(()=>t(41766)))},89331,e=>{e.v(t=>Promise.all(["static/chunks/53fc4e71a98eaca8.js"].map(t=>e.l(t))).then(()=>t(73504)))},96358,e=>{e.v(e=>Promise.resolve().then(()=>e(28748)))},69197,e=>{e.v(t=>Promise.all(["static/chunks/de2d6d22177adaf7.js"].map(t=>e.l(t))).then(()=>t(77464)))},60128,e=>{e.v(t=>Promise.all(["static/chunks/08fa8b2e5b41a7ae.js"].map(t=>e.l(t))).then(()=>t(71057)))},83755,e=>{e.v(t=>Promise.all(["static/chunks/1288b11f101dd2be.js"].map(t=>e.l(t))).then(()=>t(59592)))},4852,e=>{e.v(t=>Promise.all(["static/chunks/1883e3bb801d2725.js"].map(t=>e.l(t))).then(()=>t(51032)))},79558,e=>{e.v(t=>Promise.all(["static/chunks/ec81f9d2e859c915.js"].map(t=>e.l(t))).then(()=>t(24048)))},99812,e=>{e.v(t=>Promise.all(["static/chunks/29275921f3e15f6b.js"].map(t=>e.l(t))).then(()=>t(30409)))},56303,e=>{e.v(t=>Promise.all(["static/chunks/855e2a20e6f7a159.js"].map(t=>e.l(t))).then(()=>t(98551)))},14594,e=>{e.v(t=>Promise.all(["static/chunks/8f101a93612318a2.js"].map(t=>e.l(t))).then(()=>t(93359)))},80914,e=>{e.v(t=>Promise.all(["static/chunks/95c2ceb6507e74bc.js"].map(t=>e.l(t))).then(()=>t(46270)))},23790,e=>{e.v(t=>Promise.all(["static/chunks/b64c136329f7b3ed.js"].map(t=>e.l(t))).then(()=>t(32712)))},71073,e=>{e.v(t=>Promise.all(["static/chunks/e98d3fe881269043.js"].map(t=>e.l(t))).then(()=>t(32992)))},26134,e=>{e.v(t=>Promise.all(["static/chunks/045ca3ab8d6e085d.js"].map(t=>e.l(t))).then(()=>t(74381)))},80509,e=>{e.v(t=>Promise.all(["static/chunks/ed9aa9fb587559ff.js"].map(t=>e.l(t))).then(()=>t(24335)))},48038,e=>{e.v(t=>Promise.all(["static/chunks/fa0f184ae9f26bbe.js"].map(t=>e.l(t))).then(()=>t(88955)))},64878,e=>{e.v(t=>Promise.all(["static/chunks/d618d48e3db1f95a.js"].map(t=>e.l(t))).then(()=>t(44383)))},24842,e=>{e.v(t=>Promise.all(["static/chunks/4b81ce936aedbacb.js"].map(t=>e.l(t))).then(()=>t(16121)))},67178,e=>{e.v(t=>Promise.all(["static/chunks/4be15e815362dc63.js"].map(t=>e.l(t))).then(()=>t(30967)))},55788,e=>{e.v(t=>Promise.all(["static/chunks/1d318a0ee593007e.js"].map(t=>e.l(t))).then(()=>t(84383)))},78703,e=>{e.v(t=>Promise.all(["static/chunks/5e1f3c5484741867.js"].map(t=>e.l(t))).then(()=>t(2541)))},68865,e=>{e.v(t=>Promise.all(["static/chunks/763244e04fdc180d.js"].map(t=>e.l(t))).then(()=>t(30885)))},83347,e=>{e.v(t=>Promise.all(["static/chunks/bcf598ec42b6caa3.js"].map(t=>e.l(t))).then(()=>t(60723)))},56044,e=>{e.v(t=>Promise.all(["static/chunks/30366eb0a3abaf97.js"].map(t=>e.l(t))).then(()=>t(45761)))},14009,e=>{e.v(t=>Promise.all(["static/chunks/1e9466ea3639e5ea.js"].map(t=>e.l(t))).then(()=>t(23300)))},886,e=>{e.v(t=>Promise.all(["static/chunks/85427ea57d60330b.js"].map(t=>e.l(t))).then(()=>t(34228)))},5121,e=>{e.v(t=>Promise.all(["static/chunks/51bb9a4e6ab15d8e.js"].map(t=>e.l(t))).then(()=>t(56216)))},84702,e=>{e.v(e=>Promise.resolve().then(()=>e(45469)))},10223,e=>{e.v(e=>Promise.resolve().then(()=>e(46396)))},44654,e=>{e.v(t=>Promise.all(["static/chunks/2dc4ab06ea3b9dfd.js","static/chunks/9365984d06fd1e7f.js"].map(t=>e.l(t))).then(()=>t(63838)))},29072,e=>{e.v(e=>Promise.resolve().then(()=>e(70117)))},90407,e=>{e.v(e=>Promise.resolve().then(()=>e(97849)))},29071,e=>{e.v(e=>Promise.resolve().then(()=>e(81620)))},73500,e=>{e.v(t=>Promise.all(["static/chunks/d00292324bef17a2.js"].map(t=>e.l(t))).then(()=>t(50448)))},95464,e=>{e.v(t=>Promise.all(["static/chunks/52743b1ddec56e85.js"].map(t=>e.l(t))).then(()=>t(48700)))},64697,e=>{e.v(e=>Promise.resolve().then(()=>e(86502)))},85583,e=>{e.v(e=>Promise.resolve().then(()=>e(99807)))},24289,e=>{e.v(e=>Promise.resolve().then(()=>e(76733)))},96954,e=>{e.v(t=>Promise.all(["static/chunks/316c89183eafb112.js"].map(t=>e.l(t))).then(()=>t(85945)))},8115,e=>{e.v(t=>Promise.all(["static/chunks/eedce78295e51b5a.js"].map(t=>e.l(t))).then(()=>t(22199)))},98401,e=>{e.v(t=>Promise.all(["static/chunks/247d9147eff0b93d.js"].map(t=>e.l(t))).then(()=>t(79426)))},25059,e=>{e.v(t=>Promise.all(["static/chunks/0586d92c28564d4c.js"].map(t=>e.l(t))).then(()=>t(91844)))},52004,e=>{e.v(t=>Promise.all(["static/chunks/c88da46f375e1a67.js"].map(t=>e.l(t))).then(()=>t(35450)))},54357,e=>{e.v(t=>Promise.all(["static/chunks/8607566e243b6b8b.js"].map(t=>e.l(t))).then(()=>t(25858)))},34507,e=>{e.v(t=>Promise.all(["static/chunks/f6c402920c318cbe.js"].map(t=>e.l(t))).then(()=>t(3825)))},90953,e=>{e.v(t=>Promise.all(["static/chunks/30c791990d4e3e54.js"].map(t=>e.l(t))).then(()=>t(74125)))},86236,e=>{e.v(t=>Promise.all(["static/chunks/fca43deceb1e36ef.js"].map(t=>e.l(t))).then(()=>t(7422)))},53194,e=>{e.v(t=>Promise.all(["static/chunks/e8084e8cb8547063.js"].map(t=>e.l(t))).then(()=>t(23114)))},95040,e=>{e.v(t=>Promise.all(["static/chunks/a3892ccc7b59c512.js"].map(t=>e.l(t))).then(()=>t(33060)))},69725,e=>{e.v(t=>Promise.all(["static/chunks/6c06b6de0318ab55.js"].map(t=>e.l(t))).then(()=>t(36216)))},87181,e=>{e.v(t=>Promise.all(["static/chunks/2b6d55b864fa60b5.js"].map(t=>e.l(t))).then(()=>t(1518)))},58579,e=>{e.v(t=>Promise.all(["static/chunks/447c6d08171ef7b3.js"].map(t=>e.l(t))).then(()=>t(16786)))},73502,e=>{e.v(t=>Promise.all(["static/chunks/b4f26713993433bd.js"].map(t=>e.l(t))).then(()=>t(12752)))},16358,e=>{e.v(t=>Promise.all(["static/chunks/455269c6721bcbde.js"].map(t=>e.l(t))).then(()=>t(82870)))},76663,e=>{e.v(t=>Promise.all(["static/chunks/d488a9f9277cdb47.js"].map(t=>e.l(t))).then(()=>t(98854)))},2214,e=>{e.v(t=>Promise.all(["static/chunks/2eee515c46bf9090.js"].map(t=>e.l(t))).then(()=>t(70498)))},23310,e=>{e.v(t=>Promise.all(["static/chunks/bff6fa706e1c3895.js"].map(t=>e.l(t))).then(()=>t(47581)))},72557,e=>{e.v(t=>Promise.all(["static/chunks/1283d9c6dfec7e5d.js"].map(t=>e.l(t))).then(()=>t(71763)))},76034,e=>{e.v(t=>Promise.all(["static/chunks/72052cc888bcc297.js"].map(t=>e.l(t))).then(()=>t(77257)))},26867,e=>{e.v(t=>Promise.all(["static/chunks/4c334874e19fd48d.js"].map(t=>e.l(t))).then(()=>t(25090)))},3077,e=>{e.v(t=>Promise.all(["static/chunks/30693a32abc96555.js"].map(t=>e.l(t))).then(()=>t(38685)))},81310,e=>{e.v(t=>Promise.all(["static/chunks/d3f3dcc329d876d1.js"].map(t=>e.l(t))).then(()=>t(60496)))},91328,e=>{e.v(t=>Promise.all(["static/chunks/e6c3eddb219d6f8f.js"].map(t=>e.l(t))).then(()=>t(13074)))},34870,e=>{e.v(t=>Promise.all(["static/chunks/67e2e8139099c1f5.js"].map(t=>e.l(t))).then(()=>t(81115)))},14094,e=>{e.v(t=>Promise.all(["static/chunks/064a5d8618c8d2a6.js"].map(t=>e.l(t))).then(()=>t(82608)))},21736,e=>{e.v(t=>Promise.all(["static/chunks/b028b40a98e6ff57.js"].map(t=>e.l(t))).then(()=>t(93104)))},15832,e=>{e.v(t=>Promise.all(["static/chunks/33e95f4b78846e83.js"].map(t=>e.l(t))).then(()=>t(32684)))},70413,e=>{e.v(t=>Promise.all(["static/chunks/f47f7d12904ea083.js"].map(t=>e.l(t))).then(()=>t(33426)))},66662,e=>{e.v(t=>Promise.all(["static/chunks/aba6076ef9901ece.js"].map(t=>e.l(t))).then(()=>t(29579)))},64230,e=>{e.v(t=>Promise.all(["static/chunks/9377602eafde038f.js"].map(t=>e.l(t))).then(()=>t(19623)))},53673,e=>{e.v(t=>Promise.all(["static/chunks/75383d0ef8a6e5fe.js"].map(t=>e.l(t))).then(()=>t(66410)))},44302,e=>{e.v(t=>Promise.all(["static/chunks/3f1b3625de9f2d86.js"].map(t=>e.l(t))).then(()=>t(34405)))},91471,e=>{e.v(t=>Promise.all(["static/chunks/555cfb053a2baec6.js"].map(t=>e.l(t))).then(()=>t(30772)))},90695,e=>{e.v(t=>Promise.all(["static/chunks/8441baf94410e0fd.js"].map(t=>e.l(t))).then(()=>t(93360)))},35616,e=>{e.v(t=>Promise.all(["static/chunks/e4b71c8087effd86.js"].map(t=>e.l(t))).then(()=>t(93834)))},31779,e=>{e.v(t=>Promise.all(["static/chunks/23ef01c40cb2ef2c.js"].map(t=>e.l(t))).then(()=>t(38754)))},38038,e=>{e.v(t=>Promise.all(["static/chunks/e43e26bd2053b006.js"].map(t=>e.l(t))).then(()=>t(25015)))},62314,e=>{e.v(t=>Promise.all(["static/chunks/69d6fe767e06559f.js"].map(t=>e.l(t))).then(()=>t(4786)))},49723,e=>{e.v(t=>Promise.all(["static/chunks/6f46733f3d93246e.js"].map(t=>e.l(t))).then(()=>t(83696)))},78325,e=>{e.v(t=>Promise.all(["static/chunks/d25b044bf1f8758b.js"].map(t=>e.l(t))).then(()=>t(62756)))},87912,e=>{e.v(t=>Promise.all(["static/chunks/541fbf5828eb5f79.js"].map(t=>e.l(t))).then(()=>t(81203)))},64362,e=>{e.v(t=>Promise.all(["static/chunks/b775591ebd04fb11.js"].map(t=>e.l(t))).then(()=>t(21648)))},81139,e=>{e.v(t=>Promise.all(["static/chunks/5a419c76ccc4cfca.js"].map(t=>e.l(t))).then(()=>t(26262)))},65903,e=>{e.v(t=>Promise.all(["static/chunks/6ac537f2986733c5.js"].map(t=>e.l(t))).then(()=>t(13414)))},30784,e=>{e.v(t=>Promise.all(["static/chunks/bc57496b79ccf468.js"].map(t=>e.l(t))).then(()=>t(86532)))},18461,e=>{e.v(t=>Promise.all(["static/chunks/52a37e9b3e4e6ae6.js"].map(t=>e.l(t))).then(()=>t(29041)))},18421,e=>{e.v(e=>Promise.resolve().then(()=>e(45815)))}]);