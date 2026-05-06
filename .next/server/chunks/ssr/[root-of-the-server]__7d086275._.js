module.exports=[25562,a=>{"use strict";class b{static GetShadersRepository(a=0){return 0===a?b.ShadersRepository:b.ShadersRepositoryWGSL}static GetShadersStore(a=0){return 0===a?b.ShadersStore:b.ShadersStoreWGSL}static GetIncludesShadersStore(a=0){return 0===a?b.IncludesShadersStore:b.IncludesShadersStoreWGSL}}b.ShadersRepository="src/Shaders/",b.ShadersStore={},b.IncludesShadersStore={},b.ShadersRepositoryWGSL="src/ShadersWGSL/",b.ShadersStoreWGSL={},b.IncludesShadersStoreWGSL={},a.s(["ShaderStore",()=>b])},64653,a=>{"use strict";var b=a.i(25562);let c="helperFunctions",d=`const float PI=3.1415926535897932384626433832795;const float TWO_PI=6.283185307179586;const float HALF_PI=1.5707963267948966;const float RECIPROCAL_PI=0.3183098861837907;const float RECIPROCAL_PI2=0.15915494309189535;const float RECIPROCAL_PI4=0.07957747154594767;const float HALF_MIN=5.96046448e-08; 
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
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},10312,a=>{"use strict";function b(a){if(a.getClassName)return a.getClassName()}function c(a,b){return a===b&&("Vector2"===a||"Vector3"===a||"Vector4"===a||"Quaternion"===a)}function d(a,b){return a===b&&("Matrix"===a||"Matrix2D"===a||"Matrix3D"===a)}function e(a,b){return"FlowGraphInteger"===a&&"FlowGraphInteger"===b}function f(a,b){let c="number"==typeof a||"number"==typeof a?.value;return c&&!b?!isNaN(g(a)):c}function g(a){return"number"==typeof a?a:a.value}a.s(["_AreSameIntegerClass",()=>e,"_AreSameMatrixClass",()=>d,"_AreSameVectorOrQuaternionClass",()=>c,"_GetClassNameOf",()=>b,"_IsDescendantOf",()=>function a(b,c){return!!(b.parent&&(b.parent===c||a(b.parent,c)))},"getNumericValue",()=>g,"isNumeric",()=>f])},42693,a=>{"use strict";var b=a.i(59695);class c extends b.FlowGraphExecutionBlock{constructor(a){super(a),this.out=this._registerSignalOutput("out")}}a.s(["FlowGraphExecutionBlockWithOutSignal",()=>c])},70458,a=>{"use strict";var b=a.i(42693);class c extends b.FlowGraphExecutionBlockWithOutSignal{constructor(a,b){if(super(a),this._eventsSignalOutputs={},this.done=this._registerSignalOutput("done"),b)for(const a of b)this._eventsSignalOutputs[a]=this._registerSignalOutput(a+"Event")}_executeOnTick(a){}_startPendingTasks(a){a._getExecutionVariable(this,"_initialized",!1)&&(this._cancelPendingTasks(a),this._resetAfterCanceled(a)),this._preparePendingTasks(a),a._addPendingBlock(this),this.out._activateSignal(a),a._setExecutionVariable(this,"_initialized",!0)}_resetAfterCanceled(a){a._deleteExecutionVariable(this,"_initialized"),a._removePendingBlock(this)}}a.s(["FlowGraphAsyncExecutionBlock",()=>c])},44611,a=>{"use strict";var b=a.i(70458);class c extends b.FlowGraphAsyncExecutionBlock{constructor(){super(...arguments),this.initPriority=0,this.type="NoTrigger"}_execute(a){a._notifyExecuteNode(this),this.done._activateSignal(a)}}a.s(["FlowGraphEventBlock",()=>c])},22393,a=>{"use strict";var b=a.i(19984);class c{}c.POINTERDOWN=1,c.POINTERUP=2,c.POINTERMOVE=4,c.POINTERWHEEL=8,c.POINTERPICK=16,c.POINTERTAP=32,c.POINTERDOUBLETAP=64;class d{constructor(a,b){this.type=a,this.event=b}}class e extends d{constructor(a,c,d,e){super(a,c),this.ray=null,this.originalPickingInfo=null,this.skipOnPointerObservable=!1,this.localPosition=new b.Vector2(d,e)}}class f extends d{get pickInfo(){return this._pickInfo||this._generatePickInfo(),this._pickInfo}constructor(a,b,c,d=null){super(a,b),this._pickInfo=c,this._inputManager=d}_generatePickInfo(){this._inputManager&&(this._pickInfo=this._inputManager._pickMove(this.event),this._inputManager._setRayOnPointerInfo(this._pickInfo,this.event),this._inputManager=null)}}a.s(["PointerEventTypes",()=>c,"PointerInfo",()=>f,"PointerInfoPre",()=>e])},42602,(a,b,c)=>{"use strict";b.exports=a.r(18622)},87924,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactJsxRuntime},72131,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].React},97202,a=>{"use strict";var b=a.i(25562);let c="packingFunctions",d=`vec4 pack(float depth)
{const vec4 bit_shift=vec4(255.0*255.0*255.0,255.0*255.0,255.0,1.0);const vec4 bit_mask=vec4(0.0,1.0/255.0,1.0/255.0,1.0/255.0);vec4 res=fract(depth*bit_shift);res-=res.xxyz*bit_mask;return res;}
float unpack(vec4 color)
{const vec4 bit_shift=vec4(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);return dot(color,bit_shift);}`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},33642,a=>{"use strict";var b,c;function d(a,b,c,d){switch(b){case"Animation":return d?a.animations.find(a=>a.uniqueId===c)??null:a.animations[c]??null;case"AnimationGroup":return d?a.animationGroups.find(a=>a.uniqueId===c)??null:a.animationGroups[c]??null;case"Mesh":return d?a.meshes.find(a=>a.uniqueId===c)??null:a.meshes[c]??null;case"Material":return d?a.materials.find(a=>a.uniqueId===c)??null:a.materials[c]??null;case"Camera":return d?a.cameras.find(a=>a.uniqueId===c)??null:a.cameras[c]??null;case"Light":return d?a.lights.find(a=>a.uniqueId===c)??null:a.lights[c]??null;default:return null}}(c=b||(b={})).Animation="Animation",c.AnimationGroup="AnimationGroup",c.Mesh="Mesh",c.Material="Material",c.Camera="Camera",c.Light="Light",a.s(["GetFlowGraphAssetWithType",()=>d])},15676,a=>{"use strict";var b=a.i(92305),c=a.i(76986),d=a.i(97197),e=a.i(64731),f=a.i(32186),g=a.i(92511),h=a.i(53857),i=a.i(80627);let j=null;async function k(){let b=f.EngineStore.LastCreatedEngine?.createCanvas(100,100)??new OffscreenCanvas(100,100);b instanceof OffscreenCanvas&&g.Logger.Warn("DumpData: OffscreenCanvas will be used for dumping data. This may result in lossy alpha values.");let{ThinEngine:d}=await a.A(8116);if(!d.IsSupported)throw Error("DumpData: No WebGL context available. Cannot dump data.");let e=new d(b,!1,{preserveDrawingBuffer:!0,depth:!1,stencil:!1,alpha:!0,premultipliedAlpha:!1,antialias:!1,failIfMajorPerformanceCaveat:!1});f.EngineStore.Instances.pop(),f.EngineStore.OnEnginesDisposedObservable.add(a=>{e&&a!==e&&!e.isDisposed&&0===f.EngineStore.Instances.length&&r()}),e.getCaps().parallelShaderCompile=void 0;let h=new c.EffectRenderer(e),{passPixelShader:i}=await a.A(89590),j=new c.EffectWrapper({engine:e,name:i.name,fragmentShader:i.shader,samplerNames:["textureSampler"]});return{canvas:b,dumpEngine:{engine:e,renderer:h,wrapper:j}}}async function l(){return j||(j=k()),await j}class m{static async EncodeImageAsync(a,b,c,e,f,g){let h=await l(),i=h.dumpEngine;i.engine.setSize(b,c,!0);let j=i.engine.createRawTexture(a,b,c,5,!1,!f,1);return i.renderer.setViewport(),i.renderer.applyEffectWrapper(i.wrapper),i.wrapper.effect._bindTexture("textureSampler",j),i.renderer.draw(),j.dispose(),await new Promise((a,b)=>{d.Tools.ToBlob(h.canvas,c=>{c?a(c):b(Error("EncodeImageAsync: Failed to convert canvas to blob."))},e,g)})}}(0,b.__decorate)([i.nativeOverride],m,"EncodeImageAsync",null);let n=m.EncodeImageAsync;async function o(a,b,c,d,e="image/png",f,g){let h=new Uint8Array((await c.readPixels(0,0,a,b)).buffer);q(a,b,h,d,e,f,!0,void 0,g)}async function p(a,b,c,f="image/png",i,j=!1,k=!1,l){if(c instanceof Float32Array){let a=new Uint8Array(c.length),b=c.length;for(;b--;){let d=c[b];a[b]=Math.round(255*(0,e.Clamp)(d))}c=a}let n=await m.EncodeImageAsync(c,a,b,f,j,l);void 0!==i&&d.Tools.DownloadBlob(n,i),n.type!==f&&g.Logger.Warn(`DumpData: The requested mimeType '${f}' is not supported. The result has mimeType '${n.type}' instead.`);let o=await n.arrayBuffer();return k?o:`data:${f};base64,${(0,h.EncodeArrayBufferToBase64)(o)}`}function q(a,b,c,d,e="image/png",f,g=!1,h=!1,i){void 0!==f||d||(f=""),p(a,b,c,e,f,g,h,i).then(a=>{d&&d(a)})}function r(){j&&(j?.then(a=>{a.canvas instanceof HTMLCanvasElement&&a.canvas.remove(),a.dumpEngine&&(a.dumpEngine.engine.dispose(),a.dumpEngine.renderer.dispose(),a.dumpEngine.wrapper.dispose())}),j=null)}d.Tools.DumpData=q,d.Tools.DumpDataAsync=p,d.Tools.DumpFramebuffer=o,a.s(["Dispose",()=>r,"DumpData",()=>q,"DumpDataAsync",()=>p,"DumpFramebuffer",()=>o,"DumpTools",0,{DumpData:q,DumpDataAsync:p,DumpFramebuffer:o,Dispose:r},"EncodeImageAsync",0,n])},23686,a=>{"use strict";var b=a.i(27574);class c{constructor(){this._easingMode=c.EASINGMODE_EASEIN}setEasingMode(a){let b=Math.min(Math.max(a,0),2);this._easingMode=b}getEasingMode(){return this._easingMode}easeInCore(a){throw Error("You must implement this method")}ease(a){switch(this._easingMode){case c.EASINGMODE_EASEIN:return this.easeInCore(a);case c.EASINGMODE_EASEOUT:return 1-this.easeInCore(1-a)}return a>=.5?(1-this.easeInCore((1-a)*2))*.5+.5:.5*this.easeInCore(2*a)}}c.EASINGMODE_EASEIN=0,c.EASINGMODE_EASEOUT=1,c.EASINGMODE_EASEINOUT=2;class d extends c{easeInCore(a){return 1-Math.sqrt(1-(a=Math.max(0,Math.min(1,a)))*a)}}class e extends c{constructor(a=1){super(),this.amplitude=a}easeInCore(a){return Math.pow(a,3)-a*Math.max(0,this.amplitude)*Math.sin(3.141592653589793*a)}}class f extends c{constructor(a=3,b=2){super(),this.bounces=a,this.bounciness=b}easeInCore(a){let b=Math.max(0,this.bounces),c=this.bounciness;c<=1&&(c=1.001);let d=Math.pow(c,b),e=1-c,f=(1-d)/e+.5*d,g=Math.floor(Math.log(-(a*f)*(1-c)+1)/Math.log(c)),h=(1-Math.pow(c,g))/(e*f),i=(h+(1-Math.pow(c,g+1))/(e*f))*.5,j=a-i,k=i-h;return-Math.pow(1/c,b-g)/(k*k)*(j-k)*(j+k)}}class g extends c{easeInCore(a){return a*a*a}}class h extends c{constructor(a=3,b=3){super(),this.oscillations=a,this.springiness=b}easeInCore(a){let b=Math.max(0,this.oscillations),c=Math.max(0,this.springiness);return(0==c?a:(Math.exp(c*a)-1)/(Math.exp(c)-1))*Math.sin((6.283185307179586*b+1.5707963267948966)*a)}}class i extends c{constructor(a=2){super(),this.exponent=a}easeInCore(a){return this.exponent<=0?a:(Math.exp(this.exponent*a)-1)/(Math.exp(this.exponent)-1)}}class j extends c{easeInCore(a){return a*a}}class k extends c{easeInCore(a){return 1-Math.sin(1.5707963267948966*(1-a))}}class l extends c{constructor(a=0,b=0,c=1,d=1){super(),this.x1=a,this.y1=b,this.x2=c,this.y2=d}easeInCore(a){return b.BezierCurve.Interpolate(a,this.x1,this.y1,this.x2,this.y2)}}a.s(["BackEase",()=>e,"BezierCurveEase",()=>l,"BounceEase",()=>f,"CircleEase",()=>d,"CubicEase",()=>g,"EasingFunction",()=>c,"ElasticEase",()=>h,"ExponentialEase",()=>i,"QuadraticEase",()=>j,"SineEase",()=>k])},275,a=>{"use strict";var b,c,d,e,f=a.i(19984);(b=d||(d={}))[b.LOCAL=0]="LOCAL",b[b.WORLD=1]="WORLD",b[b.BONE=2]="BONE";class g{}g.X=new f.Vector3(1,0,0),g.Y=new f.Vector3(0,1,0),g.Z=new f.Vector3(0,0,1),(c=e||(e={}))[c.X=0]="X",c[c.Y=1]="Y",c[c.Z=2]="Z",a.s(["Axis",()=>g])},38774,a=>{"use strict";var b=a.i(19984),c=a.i(64731),d=a.i(43517),e=a.i(23345),f=a.i(37678);class g{constructor(a,b,c,d){this.name=a,this.worldAxisForNormal=b,this.worldAxisForFileX=c,this.worldAxisForFileY=d}}class h{static ConvertCubeMapTextureToSphericalPolynomial(a){let b,c;if(!a.isCube)return null;a.getScene()?.getEngine().flushFramebuffer();let d=a.getSize().width,e=a.readPixels(0,void 0,void 0,!1),f=a.readPixels(1,void 0,void 0,!1);a.isRenderTarget?(b=a.readPixels(3,void 0,void 0,!1),c=a.readPixels(2,void 0,void 0,!1)):(b=a.readPixels(2,void 0,void 0,!1),c=a.readPixels(3,void 0,void 0,!1));let g=a.readPixels(4,void 0,void 0,!1),h=a.readPixels(5,void 0,void 0,!1),i=a.gammaSpace;return new Promise(a=>{Promise.all([f,e,b,c,g,h]).then(([b,c,e,f,g,h])=>{let j={size:d,right:c,left:b,up:e,down:f,front:g,back:h,format:5,type:+(b instanceof Float32Array),gammaSpace:i};a(this.ConvertCubeMapToSphericalPolynomial(j))})})}static _AreaElement(a,b){return Math.atan2(a*b,Math.sqrt(a*a+b*b+1))}static ConvertCubeMapToSphericalPolynomial(a){let b=new d.SphericalHarmonics,g=0,h=2/a.size,i=.5*h,j=i-1;for(let d=0;d<6;d++){let k=this._FileFaces[d],l=a[k.name],m=j,n=5===a.format?4:3;for(let d=0;d<a.size;d++){let o=j;for(let j=0;j<a.size;j++){let p=k.worldAxisForFileX.scale(o).add(k.worldAxisForFileY.scale(m)).add(k.worldAxisForNormal);p.normalize();let q=this._AreaElement(o-i,m-i)-this._AreaElement(o-i,m+i)-this._AreaElement(o+i,m-i)+this._AreaElement(o+i,m+i),r=l[d*a.size*n+j*n+0],s=l[d*a.size*n+j*n+1],t=l[d*a.size*n+j*n+2];isNaN(r)&&(r=0),isNaN(s)&&(s=0),isNaN(t)&&(t=0),0===a.type&&(r/=255,s/=255,t/=255),a.gammaSpace&&(r=Math.pow((0,c.Clamp)(r),e.ToLinearSpace),s=Math.pow((0,c.Clamp)(s),e.ToLinearSpace),t=Math.pow((0,c.Clamp)(t),e.ToLinearSpace));let u=this.MAX_HDRI_VALUE;if(this.PRESERVE_CLAMPED_COLORS){let a=Math.max(r,s,t);if(a>u){let b=u/a;r*=b,s*=b,t*=b}}else r=(0,c.Clamp)(r,0,u),s=(0,c.Clamp)(s,0,u),t=(0,c.Clamp)(t,0,u);let v=new f.Color3(r,s,t);b.addLight(p,v,q),g+=q,o+=h}m+=h}}let k=4*Math.PI*6/6/g;return b.scaleInPlace(k),b.convertIncidentRadianceToIrradiance(),b.convertIrradianceToLambertianRadiance(),d.SphericalPolynomial.FromHarmonics(b)}}h._FileFaces=[new g("right",new b.Vector3(1,0,0),new b.Vector3(0,0,-1),new b.Vector3(0,-1,0)),new g("left",new b.Vector3(-1,0,0),new b.Vector3(0,0,1),new b.Vector3(0,-1,0)),new g("up",new b.Vector3(0,1,0),new b.Vector3(1,0,0),new b.Vector3(0,0,1)),new g("down",new b.Vector3(0,-1,0),new b.Vector3(1,0,0),new b.Vector3(0,0,-1)),new g("front",new b.Vector3(0,0,1),new b.Vector3(1,0,0),new b.Vector3(0,-1,0)),new g("back",new b.Vector3(0,0,-1),new b.Vector3(-1,0,0),new b.Vector3(0,-1,0))],h.MAX_HDRI_VALUE=4096,h.PRESERVE_CLAMPED_COLORS=!1,a.s(["CubeMapToSphericalPolynomialTools",()=>h])},29377,a=>{"use strict";var b=a.i(42675),c=a.i(84267);class d{static ExpandRGBDTexture(c){let d=c._texture;if(!d||!c.isRGBD)return;let e=d.getEngine(),f=e.getCaps(),g=d.isReady,h=!1;f.textureHalfFloatRender&&f.textureHalfFloatLinearFiltering?(h=!0,d.type=2):f.textureFloatRender&&f.textureFloatLinearFiltering&&(h=!0,d.type=1),h&&(d.isReady=!1,d._isRGBD=!1,d.invertY=!1);let i=async()=>{let f=e.isWebGPU;d.isReady=!1,f?await a.A(568):await a.A(68749);let g=new b.PostProcess("rgbdDecode","rgbdDecode",null,null,1,null,3,e,!1,void 0,d.type,void 0,null,!1,void 0,+!!f);g.externalTextureSamplerBinding=!0;let h=e.createRenderTargetTexture(d.width,{generateDepthBuffer:!1,generateMipMaps:!1,generateStencilBuffer:!1,samplingMode:d.samplingMode,type:d.type,format:5});g.onEffectCreatedObservable.addOnce(a=>{a.executeWhenCompiled(()=>{g.onApply=a=>{a._bindTexture("textureSampler",d),a.setFloat2("scale",1,1)},c.getScene().postProcessManager.directRender([g],h,!0),e.restoreDefaultFramebuffer(),e._releaseTexture(d),g&&g.dispose(),h._swapAndDie(d),d.isReady=!0})})};h&&(g?i():c.onLoadObservable.addOnce(i))}static async EncodeTextureToRGBD(b,d,e=0){return d.getEngine().isWebGPU?await a.A(55807):await a.A(79826),await (0,c.ApplyPostProcess)("rgbdEncode",b,d,e,1,5)}}a.s(["RGBDTextureTools",()=>d])},6302,a=>{"use strict";var b=a.i(38774),c=a.i(19402);c.BaseTexture.prototype.forceSphericalPolynomialsRecompute=function(){this._texture&&(this._texture._sphericalPolynomial=null,this._texture._sphericalPolynomialPromise=null,this._texture._sphericalPolynomialComputed=!1)},Object.defineProperty(c.BaseTexture.prototype,"sphericalPolynomial",{get:function(){if(this._texture){if(this._texture._sphericalPolynomial||this._texture._sphericalPolynomialComputed)return this._texture._sphericalPolynomial;this._texture.isReady&&(this._texture._sphericalPolynomialPromise||(this._texture._sphericalPolynomialPromise=b.CubeMapToSphericalPolynomialTools.ConvertCubeMapTextureToSphericalPolynomial(this),null===this._texture._sphericalPolynomialPromise?this._texture._sphericalPolynomialComputed=!0:this._texture._sphericalPolynomialPromise.then(a=>{this._texture._sphericalPolynomial=a,this._texture._sphericalPolynomialComputed=!0})))}return null},set:function(a){this._texture&&(this._texture._sphericalPolynomial=a)},enumerable:!0,configurable:!0}),a.s([])},96370,25022,46705,a=>{"use strict";var b=a.i(25562);let c="bumpFragmentMainFunctions",d=`#if defined(BUMP) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC) || defined(DETAIL)
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
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([],96370),a.i(64780);let e="bumpFragmentFunctions",f=`#if defined(BUMP)
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
`;b.ShaderStore.IncludesShadersStore[e]||(b.ShaderStore.IncludesShadersStore[e]=f),a.s([],25022);let g="bumpFragment",h=`vec2 uvOffset=vec2(0.0,0.0);
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
`;b.ShaderStore.IncludesShadersStore[g]||(b.ShaderStore.IncludesShadersStore[g]=h),a.s([],46705)},60721,45308,a=>{"use strict";var b=a.i(25562);let c="imageProcessingDeclaration",d=`#ifdef EXPOSURE
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
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([],60721);let e="imageProcessingFunctions",f=`#if defined(COLORGRADING) && !defined(COLORGRADING3D)
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
return result;}`;b.ShaderStore.IncludesShadersStore[e]||(b.ShaderStore.IncludesShadersStore[e]=f),a.s([],45308)},30783,a=>{"use strict";var b=a.i(25562);let c="logDepthFragment",d=`#ifdef LOGARITHMICDEPTH
gl_FragDepthEXT=log2(vFragmentDepth)*logarithmicDepthConstant*0.5;
#endif
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},81682,74402,a=>{"use strict";var b=a.i(25562);let c="clipPlaneFragmentDeclaration",d=`#ifdef CLIPPLANE
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
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([],81682);let e="clipPlaneFragment",f=`#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)
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
`;b.ShaderStore.IncludesShadersStore[e]||(b.ShaderStore.IncludesShadersStore[e]=f),a.s([],74402)},72930,84701,a=>{"use strict";var b=a.i(25562);let c="fogFragmentDeclaration",d=`#ifdef FOG
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
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([],72930);let e="fogFragment",f=`#ifdef FOG
float fog=CalcFogFactor();
#ifdef PBR
fog=toLinearSpace(fog);
#endif
color.rgb=mix(vFogColor,color.rgb,fog);
#endif
`;b.ShaderStore.IncludesShadersStore[e]||(b.ShaderStore.IncludesShadersStore[e]=f),a.s([],84701)},64780,a=>{"use strict";var b=a.i(25562);let c="samplerFragmentDeclaration",d=`#ifdef _DEFINENAME_
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
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},2309,a=>{"use strict";var b=a.i(25562);let c="bumpVertex",d=`#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
vec3 tbnNormal=normalize(normalUpdated);vec3 tbnTangent=normalize(tangentUpdated.xyz);vec3 tbnBitangent=cross(tbnNormal,tbnTangent)*tangentUpdated.w;vTBN=mat3(finalWorld)*mat3(tbnTangent,tbnBitangent,tbnNormal);
#endif
#endif
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},96790,3470,a=>{"use strict";var b=a.i(25562);let c="clipPlaneVertexDeclaration",d=`#ifdef CLIPPLANE
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
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([],96790);let e="clipPlaneVertex",f=`#ifdef CLIPPLANE
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
`;b.ShaderStore.IncludesShadersStore[e]||(b.ShaderStore.IncludesShadersStore[e]=f),a.s([],3470)},99154,20125,37668,52115,75163,a=>{"use strict";var b=a.i(25562);let c="bonesDeclaration",d=`#if NUM_BONE_INFLUENCERS>0
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
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([],99154);let e="bakedVertexAnimationDeclaration",f=`#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
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
`;b.ShaderStore.IncludesShadersStore[e]||(b.ShaderStore.IncludesShadersStore[e]=f),a.s([],20125);let g="instancesVertex",h=`#ifdef INSTANCES
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
`;b.ShaderStore.IncludesShadersStore[g]||(b.ShaderStore.IncludesShadersStore[g]=h),a.s([],37668);let i="bonesVertex",j=`#ifndef BAKED_VERTEX_ANIMATION_TEXTURE
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
`;b.ShaderStore.IncludesShadersStore[i]||(b.ShaderStore.IncludesShadersStore[i]=j),a.s([],52115);let k="bakedVertexAnimation",l=`#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
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
`;b.ShaderStore.IncludesShadersStore[k]||(b.ShaderStore.IncludesShadersStore[k]=l),a.s([],75163)},6169,a=>{"use strict";var b=a.i(25562);let c="instancesDeclaration",d=`#ifdef INSTANCES
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
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},37034,43926,54265,31041,a=>{"use strict";var b=a.i(25562);let c="morphTargetsVertexGlobalDeclaration",d=`#ifdef MORPHTARGETS
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
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([],37034);let e="morphTargetsVertexDeclaration",f=`#ifdef MORPHTARGETS
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
`;b.ShaderStore.IncludesShadersStore[e]||(b.ShaderStore.IncludesShadersStore[e]=f),a.s([],43926);let g="morphTargetsVertexGlobal",h=`#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
float vertexID;
#endif
#endif
`;b.ShaderStore.IncludesShadersStore[g]||(b.ShaderStore.IncludesShadersStore[g]=h),a.s([],54265);let i="morphTargetsVertex",j=`#ifdef MORPHTARGETS
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
`;b.ShaderStore.IncludesShadersStore[i]||(b.ShaderStore.IncludesShadersStore[i]=j),a.s([],31041)},44248,a=>{"use strict";var b=a.i(25562);let c="logDepthDeclaration",d=`#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;varying float vFragmentDepth;
#endif
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},58057,a=>{"use strict";var b=a.i(25562);let c="sceneUboDeclaration",d=`layout(std140,column_major) uniform;uniform Scene {mat4 viewProjection;
#ifdef MULTIVIEW
mat4 viewProjectionR;
#endif 
mat4 view;mat4 projection;vec4 vEyePosition;};
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},5551,a=>{"use strict";var b=a.i(25562);let c="logDepthVertex",d=`#ifdef LOGARITHMICDEPTH
vFragmentDepth=1.0+gl_Position.w;gl_Position.z=log2(max(0.000001,vFragmentDepth))*logarithmicDepthConstant;
#endif
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},6404,a=>{"use strict";var b=a.i(25562);let c="fogVertexDeclaration",d=`#ifdef FOG
varying vec3 vFogDistance;
#endif
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},64403,a=>{"use strict";var b=a.i(25562);let c="fogVertex",d=`#ifdef FOG
vFogDistance=(view*worldPos).xyz;
#endif
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},83918,a=>{a.v("/_next/static/media/HavokPhysics.9647938c.wasm")},7485,a=>{"use strict";var b=a.i(25562);let c="imageProcessingCompatibility",d=`#ifdef IMAGEPROCESSINGPOSTPROCESS
gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));
#endif
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},90266,a=>{"use strict";var b=a.i(3102),c=a.i(79438);class d extends b.FlowGraphBlock{constructor(a){super(a);const b=a.glTF,d=b?.animations?.map(a=>a._babylonAnimationGroup)||[];this.animationGroups=this.registerDataOutput("animationGroups",c.RichTypeAny,d);const e=b?.nodes?.map(a=>a._babylonTransformNode)||[];this.nodes=this.registerDataOutput("nodes",c.RichTypeAny,e)}getClassName(){return"FlowGraphGLTFDataProvider"}}a.s(["FlowGraphGLTFDataProvider",()=>d])},81191,a=>{"use strict";var b=a.i(25562);let c="sharpenPixelShader",d=`varying vec2 vUV;uniform sampler2D textureSampler;uniform vec2 screenSize;uniform vec2 sharpnessAmounts;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{vec2 onePixel=vec2(1.0,1.0)/screenSize;vec4 color=texture2D(textureSampler,vUV);vec4 edgeDetection=texture2D(textureSampler,vUV+onePixel*vec2(0,-1)) +
texture2D(textureSampler,vUV+onePixel*vec2(-1,0)) +
texture2D(textureSampler,vUV+onePixel*vec2(1,0)) +
texture2D(textureSampler,vUV+onePixel*vec2(0,1)) -
color*4.0;gl_FragColor=max(vec4(color.rgb*sharpnessAmounts.y,color.a)-(sharpnessAmounts.x*vec4(edgeDetection.rgb,0)),0.);}`;b.ShaderStore.ShadersStore[c]||(b.ShaderStore.ShadersStore[c]=d),a.s(["sharpenPixelShader",0,{name:c,shader:d}])},91184,a=>{"use strict";var b=a.i(25562);a.i(81682),a.i(97202),a.i(74402);let c="depthPixelShader",d=`#ifdef ALPHATEST
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
}`;b.ShaderStore.ShadersStore[c]||(b.ShaderStore.ShadersStore[c]=d),a.s(["depthPixelShader",0,{name:c,shader:d}])},1917,a=>{"use strict";var b=a.i(25562);let c="minmaxReduxPixelShader",d=`varying vUV: vec2f;var textureSampler: texture_2d<f32>;
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
`;b.ShaderStore.ShadersStoreWGSL[c]||(b.ShaderStore.ShadersStoreWGSL[c]=d),a.s(["minmaxReduxPixelShaderWGSL",0,{name:c,shader:d}])},12505,a=>{"use strict";var b=a.i(25562);let c="minmaxReduxPixelShader",d=`varying vec2 vUV;uniform sampler2D textureSampler;
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
`;b.ShaderStore.ShadersStore[c]||(b.ShaderStore.ShadersStore[c]=d),a.s(["minmaxReduxPixelShader",0,{name:c,shader:d}])},66670,a=>{"use strict";var b=a.i(38959),c=a.i(33619),d=a.i(70165),e=a.i(21553),f=a.i(36394);class g extends b.AbstractSoundSource{constructor(a,b,c,d){super(a,c,d),this._stereo=null,this._webAudioNode=null,this._audioContext=this.engine._audioContext,this._webAudioNode=b,this._subGraph=new g._SubGraph(this)}async _initAsync(a){a.outBus?this.outBus=a.outBus:!1!==a.outBusAutoDefault&&(await this.engine.isReadyPromise,this.outBus=this.engine.defaultMainBus),await this._subGraph.initAsync(a),(0,c._HasSpatialAudioOptions)(a)&&this._initSpatialProperty(),this.engine._addNode(this)}get _inNode(){return this._webAudioNode}get _outNode(){return this._subGraph._outNode}get stereo(){return this._stereo??(this._stereo=new d._StereoAudio(this._subGraph))}dispose(){if(super.dispose(),this._webAudioNode){if(this._webAudioNode instanceof MediaStreamAudioSourceNode)for(let a of this._webAudioNode.mediaStream.getTracks())a.stop();this._webAudioNode.disconnect(),this._webAudioNode=null}this._stereo=null,this._subGraph.dispose(),this.engine._removeNode(this)}getClassName(){return"_WebAudioSoundSource"}_connect(a){return!!super._connect(a)&&(a._inNode&&this._outNode?.connect(a._inNode),!0)}_disconnect(a){return!!super._disconnect(a)&&(a._inNode&&this._outNode?.disconnect(a._inNode),!0)}_createSpatialProperty(a,b){return new f._SpatialWebAudio(this._subGraph,a,b)}}g._SubGraph=class extends e._WebAudioBusAndSoundSubGraph{get _downstreamNodes(){return this._owner._downstreamNodes??null}get _upstreamNodes(){return this._owner._upstreamNodes??null}_onSubNodesChanged(){super._onSubNodesChanged(),this._owner._inNode?.disconnect(),this._owner._subGraph._inNode&&this._owner._inNode?.connect(this._owner._subGraph._inNode)}},a.s(["_WebAudioSoundSource",()=>g])},84154,a=>{"use strict";var b=a.i(43517),c=a.i(62392);class d{constructor(){this.supportCascades=!0}loadCubeData(a,d,e,f){let g,h=d.getEngine(),i=!1,j=1e3;if(Array.isArray(a))for(let b=0;b<a.length;b++){let e=a[b];d.width=(g=c.DDSTools.GetDDSInfo(e)).width,d.height=g.height,i=(g.isRGB||g.isLuminance||g.mipmapCount>1)&&d.generateMipMaps,h._unpackFlipY(g.isCompressed),c.DDSTools.UploadDDSLevels(h,d,e,g,i,6,-1,b),g.isFourCC||1!==g.mipmapCount?j=g.mipmapCount-1:h.generateMipMapsForCubemap(d)}else d.width=(g=c.DDSTools.GetDDSInfo(a)).width,d.height=g.height,e&&(g.sphericalPolynomial=new b.SphericalPolynomial),i=(g.isRGB||g.isLuminance||g.mipmapCount>1)&&d.generateMipMaps,h._unpackFlipY(g.isCompressed),c.DDSTools.UploadDDSLevels(h,d,a,g,i,6),g.isFourCC||1!==g.mipmapCount?j=g.mipmapCount-1:h.generateMipMapsForCubemap(d,!1);h._setCubeMapTextureParams(d,i,j),d.isReady=!0,d.onLoadedObservable.notifyObservers(d),d.onLoadedObservable.clear(),f&&f({isDDS:!0,width:d.width,info:g,data:a,texture:d})}loadData(a,b,d){let e=c.DDSTools.GetDDSInfo(a),f=(e.isRGB||e.isLuminance||e.mipmapCount>1)&&b.generateMipMaps&&Math.max(e.width,e.height)>>e.mipmapCount-1==1;d(e.width,e.height,f,e.isFourCC,()=>{c.DDSTools.UploadDDSLevels(b.getEngine(),b,a,e,f,1)})}}a.s(["_DDSTextureLoader",()=>d])},4330,a=>{"use strict";var b=a.i(25562);let c="pointCloudVertex",d=`#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.s([])},5205,a=>{"use strict";var b=a.i(25562);a.i(99154),a.i(20125),a.i(37034),a.i(43926),a.i(96790),a.i(6169);let c="pointCloudVertexDeclaration",d=`#ifdef POINTSIZE
uniform float pointSize;
#endif
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.i(54265),a.i(31041),a.i(37668),a.i(52115),a.i(75163),a.i(3470),a.i(4330);let e="depthVertexShader",f=`attribute vec3 position;
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
`;b.ShaderStore.ShadersStore[e]||(b.ShaderStore.ShadersStore[e]=f),a.s(["depthVertexShader",0,{name:e,shader:f}],5205)},8449,a=>{"use strict";var b,c,d=a.i(8568);function e(a){let b=0,c=Date.now();a.observableParameters=a.observableParameters??{};let d=a.contextObservable.add(e=>{let f=Date.now();b=f-c;let g={startTime:c,currentTime:f,deltaTime:b,completeRate:b/a.timeout,payload:e};if(a.breakCondition&&a.breakCondition(g)){a.contextObservable.remove(d),a.onAborted&&a.onAborted(g);return}if(b>=a.timeout){a.contextObservable.remove(d),a.onEnded&&a.onEnded(g);return}a.onTick&&a.onTick(g)},a.observableParameters.mask,a.observableParameters.insertFirst,a.observableParameters.scope);return d}(b=c||(c={}))[b.INIT=0]="INIT",b[b.STARTED=1]="STARTED",b[b.ENDED=2]="ENDED";class f{constructor(a){this.onEachCountObservable=new d.Observable,this.onTimerAbortedObservable=new d.Observable,this.onTimerEndedObservable=new d.Observable,this.onStateChangedObservable=new d.Observable,this._observer=null,this._breakOnNextTick=!1,this._tick=a=>{let b=Date.now();this._timer=b-this._startTime;let c={startTime:this._startTime,currentTime:b,deltaTime:this._timer,completeRate:this._timer/this._timeToEnd,payload:a},d=this._breakOnNextTick||this._breakCondition(c);d||this._timer>=this._timeToEnd?this._stop(c,d):this.onEachCountObservable.notifyObservers(c)},this._setState(0),this._contextObservable=a.contextObservable,this._observableParameters=a.observableParameters??{},this._breakCondition=a.breakCondition??(()=>!1),this._timeToEnd=a.timeout,a.onEnded&&this.onTimerEndedObservable.add(a.onEnded),a.onTick&&this.onEachCountObservable.add(a.onTick),a.onAborted&&this.onTimerAbortedObservable.add(a.onAborted)}set breakCondition(a){this._breakCondition=a}clearObservables(){this.onEachCountObservable.clear(),this.onTimerAbortedObservable.clear(),this.onTimerEndedObservable.clear(),this.onStateChangedObservable.clear()}start(a=this._timeToEnd){if(1===this._state)throw Error("Timer already started. Please stop it before starting again");this._timeToEnd=a,this._startTime=Date.now(),this._timer=0,this._observer=this._contextObservable.add(this._tick,this._observableParameters.mask,this._observableParameters.insertFirst,this._observableParameters.scope),this._setState(1)}stop(){1===this._state&&(this._breakOnNextTick=!0)}dispose(){this._observer&&this._contextObservable.remove(this._observer),this.clearObservables()}_setState(a){this._state=a,this.onStateChangedObservable.notifyObservers(this._state)}_stop(a,b=!1){this._contextObservable.remove(this._observer),this._setState(2),b?this.onTimerAbortedObservable.notifyObservers(a):this.onTimerEndedObservable.notifyObservers(a)}}a.s(["AdvancedTimer",()=>f,"setAndStartTimer",()=>e])},64167,a=>{"use strict";var b=a.i(25562);a.i(81682);let c="mrtFragmentDeclaration",d=`#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
layout(location=0) out vec4 glFragData[{X}];
#endif
`;b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]=d),a.i(96370),a.i(25022),a.i(64653),a.i(74402),a.i(46705);let e="geometryPixelShader",f=`#extension GL_EXT_draw_buffers : require
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
`;b.ShaderStore.ShadersStore[e]||(b.ShaderStore.ShadersStore[e]=f),a.s(["geometryPixelShader",0,{name:e,shader:f}],64167)},32988,a=>{"use strict";var b=a.i(25562);a.i(99154),a.i(20125),a.i(37034),a.i(43926),a.i(6169);let c="geometryVertexDeclaration";b.ShaderStore.IncludesShadersStore[c]||(b.ShaderStore.IncludesShadersStore[c]="uniform mat4 viewProjection;uniform mat4 view;"),a.i(58057);let d="geometryUboDeclaration",e=`#include<sceneUboDeclaration>
`;b.ShaderStore.IncludesShadersStore[d]||(b.ShaderStore.IncludesShadersStore[d]=e),a.i(96790),a.i(54265),a.i(31041),a.i(37668),a.i(52115),a.i(75163),a.i(3470),a.i(2309);let f="geometryVertexShader",g=`precision highp float;
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
`;b.ShaderStore.ShadersStore[f]||(b.ShaderStore.ShadersStore[f]=g),a.s(["geometryVertexShader",0,{name:f,shader:g}],32988)},89140,a=>{"use strict";var b=a.i(92511),c=a.i(97197),d=a.i(18369);class e extends d.AbstractSound{constructor(a,b,c){super(a,b,c),this._preloadedInstances=[]}get preloadCount(){return this._options.preloadCount??1}get preloadCompletedCount(){return this._preloadedInstances.length}preloadInstanceAsync(){let a=this._createInstance();return this._addPreloadedInstance(a),a.preloadedPromise}async preloadInstancesAsync(a){for(let b=0;b<a;b++)this.preloadInstanceAsync();await Promise.all(this._preloadedInstances.map(async a=>await a.preloadedPromise))}play(a={}){let b;if(5===this.state)return void this.resume();this.preloadCompletedCount>0?((b=this._preloadedInstances[0]).startOffset=this.startOffset,this._removePreloadedInstance(b)):b=this._createInstance();let c=()=>{3===b.state&&(this._stopExcessInstances(),b.onStateChangedObservable.removeCallback(c))};b.onStateChangedObservable.add(c),a.startOffset??(a.startOffset=this.startOffset),a.loop??(a.loop=this.loop),a.volume??(a.volume=1),this._beforePlay(b),b.play(a),this._afterPlay(b)}stop(){if(this._setState(1),this._instances)for(let a of Array.from(this._instances))a.stop()}_addPreloadedInstance(a){this._preloadedInstances.includes(a)||this._preloadedInstances.push(a)}_removePreloadedInstance(a){let b=this._preloadedInstances.indexOf(a);-1!==b&&this._preloadedInstances.splice(b,1)}}var f=a.i(8568),g=a.i(71978);class h extends g._AbstractSoundInstance{constructor(a){super(a),this.onReadyObservable=new f.Observable,this.preloadedPromise=new Promise((a,b)=>{this._rejectPreloadedPromise=b,this._resolvePreloadedPromise=a}),this.onErrorObservable.add(this._rejectPreloadedPromise),this.onReadyObservable.add(this._resolvePreloadedPromise)}set startOffset(a){this._options.startOffset=a}dispose(){super.dispose(),this.onErrorObservable.clear(),this.onReadyObservable.clear(),this._resolvePreloadedPromise()}}var i=a.i(33619),j=a.i(70165),k=a.i(95796),l=a.i(284),m=a.i(21553),n=a.i(36394);class o extends e{constructor(a,b,c){super(a,b,c),this._stereo=null,this._options={autoplay:c.autoplay??!1,loop:c.loop??!1,maxInstances:c.maxInstances??1/0,preloadCount:c.preloadCount??1,startOffset:c.startOffset??0},this._subGraph=new o._SubGraph(this)}async _initAsync(a,b){let c=this.engine._audioContext;if(!(c instanceof AudioContext))throw Error("Unsupported audio context type.");this._audioContext=c,this._source=a,b.outBus?this.outBus=b.outBus:!1!==b.outBusAutoDefault&&(await this.engine.isReadyPromise,this.outBus=this.engine.defaultMainBus),await this._subGraph.initAsync(b),(0,i._HasSpatialAudioOptions)(b)&&this._initSpatialProperty(),this.preloadCount&&await this.preloadInstancesAsync(this.preloadCount),b.autoplay&&this.play(b),this.engine._addSound(this)}get _inNode(){return this._subGraph._inNode}get _outNode(){return this._subGraph._outNode}get stereo(){return this._stereo??(this._stereo=new j._StereoAudio(this._subGraph))}dispose(){super.dispose(),this._stereo=null,this._subGraph.dispose(),this.engine._removeSound(this)}getClassName(){return"_WebAudioStreamingSound"}_createInstance(){return new p(this,this._options)}_connect(a){return!!super._connect(a)&&(a._inNode&&this._outNode?.connect(a._inNode),!0)}_disconnect(a){return!!super._disconnect(a)&&(a._inNode&&this._outNode?.disconnect(a._inNode),!0)}_createSpatialProperty(a,b){return new n._SpatialWebAudio(this._subGraph,a,b)}_getOptions(){return this._options}}o._SubGraph=class extends m._WebAudioBusAndSoundSubGraph{get _downstreamNodes(){return this._owner._downstreamNodes??null}get _upstreamNodes(){return this._owner._upstreamNodes??null}};class p extends h{constructor(a,b){if(super(a),this._currentTimeChangedWhilePaused=!1,this._enginePlayTime=1/0,this._enginePauseTime=0,this._isReady=!1,this._isReadyPromise=new Promise((a,b)=>{this._resolveIsReadyPromise=a,this._rejectIsReadyPromise=b}),this._onCanPlayThrough=()=>{this._isReady=!0,this._resolveIsReadyPromise(this._mediaElement),this.onReadyObservable.notifyObservers(this)},this._onEnded=()=>{this._setState(1)},this._onError=a=>{this._setState(4),this.onErrorObservable.notifyObservers(a),this._rejectIsReadyPromise(a),this.dispose()},this._onEngineStateChanged=()=>{"running"===this.engine.state&&(this._options.loop&&2===this.state&&this.play(),this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged))},this._onUserGesture=()=>{this.play()},this._options=b,this._volumeNode=new GainNode(a._audioContext),"string"==typeof a._source)this._initFromUrl(a._source);else if(Array.isArray(a._source))this._initFromUrls(a._source);else if(a._source instanceof HTMLMediaElement)this._initFromMediaElement(a._source);else throw Error(`Invalid streaming sound source (${a._source}).`)}get currentTime(){if(1===this._state)return 0;let a=5===this._state?0:this.engine.currentTime-this._enginePlayTime;return this._enginePauseTime+a+this._options.startOffset}set currentTime(a){let b=2===this._state||3===this._state;b&&(this._mediaElement.pause(),this._state=1),this._options.startOffset=a,b?this.play({startOffset:a}):5===this._state&&(this._currentTimeChangedWhilePaused=!0)}get _outNode(){return this._volumeNode}get startTime(){return 1===this._state?0:this._enginePlayTime}dispose(){for(let a of(super.dispose(),this.stop(),this._sourceNode?.disconnect(this._volumeNode),this._sourceNode=null,this._mediaElement.removeEventListener("error",this._onError),this._mediaElement.removeEventListener("ended",this._onEnded),this._mediaElement.removeEventListener("canplaythrough",this._onCanPlayThrough),Array.from(this._mediaElement.children)))this._mediaElement.removeChild(a);this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged),this.engine.userGestureObservable.removeCallback(this._onUserGesture)}play(a={}){if(3===this._state)return;void 0!==a.loop&&(this._options.loop=a.loop),this._mediaElement.loop=this._options.loop;let b=a.startOffset;this._currentTimeChangedWhilePaused?(b=this._options.startOffset,this._currentTimeChangedWhilePaused=!1):5===this._state&&(b=this.currentTime),b&&b>0&&(this._mediaElement.currentTime=b),this._volumeNode.gain.value=a.volume??1,this._play()}pause(){(2===this._state||3===this._state)&&(this._setState(5),this._enginePauseTime+=this.engine.currentTime-this._enginePlayTime,this._mediaElement.pause())}resume(){5===this._state?this.play():this._currentTimeChangedWhilePaused&&this.play()}stop(){1!==this._state&&this._stop()}getClassName(){return"_WebAudioStreamingSoundInstance"}_connect(a){return!!super._connect(a)&&(a instanceof o&&a._inNode&&this._outNode?.connect(a._inNode),!0)}_disconnect(a){return!!super._disconnect(a)&&(a instanceof o&&a._inNode&&this._outNode?.disconnect(a._inNode),!0)}_initFromMediaElement(a){if(c.Tools.SetCorsBehavior(a.currentSrc,a),a.controls=!1,a.loop=this._options.loop,a.preload="auto",a.addEventListener("canplaythrough",this._onCanPlayThrough,{once:!0}),a.addEventListener("ended",this._onEnded,{once:!0}),a.addEventListener("error",this._onError,{once:!0}),a.load(),this._sourceNode=new MediaElementAudioSourceNode(this._sound._audioContext,{mediaElement:a}),this._sourceNode.connect(this._volumeNode),!this._connect(this._sound))throw Error("Connect failed");this._mediaElement=a}_initFromUrl(a){let b=new Audio(l.WebRequest.IsCustomRequestAvailable?(0,k._GetUrlForStreaming)((0,k._CleanUrl)(a)):(0,k._CleanUrl)(a));this._initFromMediaElement(b)}_initFromUrls(a){let b=new Audio;for(let c of a){let a=document.createElement("source");a.src=l.WebRequest.IsCustomRequestAvailable?(0,k._GetUrlForStreaming)((0,k._CleanUrl)(c)):(0,k._CleanUrl)(c),b.appendChild(a)}this._initFromMediaElement(b)}_play(){if(this._setState(2),!this._isReady)return void this._playWhenReady();if(2===this._state)if("running"===this.engine.state){let a=this._mediaElement.play();this._enginePlayTime=this.engine.currentTime,this._setState(3),a.catch(()=>{this._setState(4),this._options.loop&&this.engine.userGestureObservable.addOnce(this._onUserGesture)})}else this._options.loop?this.engine.stateChangedObservable.add(this._onEngineStateChanged):(this.stop(),this._setState(4))}_playWhenReady(){this._isReadyPromise.then(()=>{this._play()}).catch(()=>{b.Logger.Error("Streaming sound instance failed to play"),this._setState(4)})}_stop(){this._mediaElement.pause(),this._onEnded(),this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged)}}a.s(["_WebAudioStreamingSound",()=>o],89140)},2004,a=>{"use strict";var b=a.i(19984);class c{static ConvertPanoramaToCubemap(a,b,c,d,e=!1,f=!0){let g;if(!a)throw"ConvertPanoramaToCubemap: input cannot be null";if(a.length!=b*c*3)if(a.length!=b*c*4)throw"ConvertPanoramaToCubemap: input size is wrong";else g=4;else g=3;return{front:this.CreateCubemapTexture(d,this.FACE_FRONT,a,b,c,e,f,g),back:this.CreateCubemapTexture(d,this.FACE_BACK,a,b,c,e,f,g),left:this.CreateCubemapTexture(d,this.FACE_LEFT,a,b,c,e,f,g),right:this.CreateCubemapTexture(d,this.FACE_RIGHT,a,b,c,e,f,g),up:this.CreateCubemapTexture(d,this.FACE_UP,a,b,c,e,f,g),down:this.CreateCubemapTexture(d,this.FACE_DOWN,a,b,c,e,f,g),size:d,type:1,format:4,gammaSpace:!1}}static CreateCubemapTexture(a,b,c,d,e,f,g,h){let i=new Float32Array(new ArrayBuffer(a*a*12)),j=f?Math.max(1,Math.round(d/4/a)):1,k=1/j,l=k*k,m=b[1].subtract(b[0]).scale(k/a),n=b[3].subtract(b[2]).scale(k/a),o=1/a,p=0;for(let f=0;f<a;f++)for(let q=0;q<j;q++){let q=b[0],r=b[2];for(let b=0;b<a;b++)for(let k=0;k<j;k++){let j=r.subtract(q).scale(p).add(q);j.normalize();let k=this.CalcProjectionSpherical(j,c,d,e,h,g);i[f*a*3+3*b+0]+=k.r*l,i[f*a*3+3*b+1]+=k.g*l,i[f*a*3+3*b+2]+=k.b*l,q=q.add(m),r=r.add(n)}p+=o*k}return i}static CalcProjectionSpherical(a,b,c,d,e,f){let g=Math.atan2(a.z,a.x),h=Math.acos(a.y);for(;g<-Math.PI;)g+=2*Math.PI;for(;g>Math.PI;)g-=2*Math.PI;let i=g/Math.PI,j=h/Math.PI,k=Math.round((i=.5*i+.5)*c);k<0?k=0:k>=c&&(k=c-1);let l=Math.round(j*d);l<0?l=0:l>=d&&(l=d-1);let m=f?d-l-1:l;return{r:b[m*c*e+k*e+0],g:b[m*c*e+k*e+1],b:b[m*c*e+k*e+2]}}}function d(a,b,c,d,e,f){if(e>0){var g;e=(g=e-136)>1023?898846567431158e293*Math.pow(2,g-1023):g<-1074?5e-324*Math.pow(2,g+1074):+Math.pow(2,g),a[f+0]=b*e,a[f+1]=c*e,a[f+2]=d*e}else a[f+0]=0,a[f+1]=0,a[f+2]=0}function e(a,b){let c,d="";for(let e=b;e<a.length-b&&"\n"!=(c=String.fromCharCode(a[e]));e++)d+=c;return d}function f(a){let b=e(a,0);if("#"!=b[0]||"?"!=b[1])throw"Bad HDR Format.";let c=!1,d=!1,f=0;do f+=b.length+1,"FORMAT=32-bit_rle_rgbe"==(b=e(a,f))?d=!0:0==b.length&&(c=!0);while(!c)if(!d)throw"HDR Bad header format, unsupported FORMAT";f+=b.length+1,b=e(a,f);let g=/^-Y (.*) \+X (.*)$/g.exec(b);if(!g||g.length<3)throw"HDR Bad header format, no size";let h=parseInt(g[2]),i=parseInt(g[1]);if(h<8||h>32767)throw"HDR Bad header format, unsupported size";return{height:i,width:h,dataPosition:f+=b.length+1}}function g(a,b,d=!1){let e=new Uint8Array(a),h=f(e),j=i(e,h);return c.ConvertPanoramaToCubemap(j,h.width,h.height,b,d)}function h(a,b){return i(a,b)}function i(a,b){let c,e,f,g,h,i,j,k,l=b.height,m=b.width,n=b.dataPosition,o=new Uint8Array(new ArrayBuffer(4*m)),p=new Float32Array(new ArrayBuffer(b.width*b.height*12));for(;l>0;){if(c=a[n++],e=a[n++],f=a[n++],g=a[n++],2!=c||2!=e||128&f||b.width<8||b.width>32767)return function(a,b){let c,e,f,g=b.height,h=b.width,i=b.dataPosition,j=new Float32Array(new ArrayBuffer(b.width*b.height*12));for(;g>0;){for(f=0;f<b.width;f++)c=a[i++],e=a[i++],d(j,c,e,a[i++],a[i++],(b.height-g)*h*3+3*f);g--}return j}(a,b);if((f<<8|g)!=m)throw"HDR Bad header format, wrong scan line width";for(k=0,i=0;k<4;k++)for(j=(k+1)*m;i<j;)if(c=a[n++],e=a[n++],c>128){if(0==(h=c-128)||h>j-i)throw"HDR Bad Format, bad scanline data (run)";for(;h-- >0;)o[i++]=e}else{if(0==(h=c)||h>j-i)throw"HDR Bad Format, bad scanline data (non-run)";if(o[i++]=e,--h>0)for(let b=0;b<h;b++)o[i++]=a[n++]}for(k=0;k<m;k++)c=o[k],e=o[k+m],d(p,c,e,f=o[k+2*m],g=o[k+3*m],(b.height-l)*m*3+3*k);l--}return p}c.FACE_LEFT=[new b.Vector3(-1,-1,-1),new b.Vector3(1,-1,-1),new b.Vector3(-1,1,-1),new b.Vector3(1,1,-1)],c.FACE_RIGHT=[new b.Vector3(1,-1,1),new b.Vector3(-1,-1,1),new b.Vector3(1,1,1),new b.Vector3(-1,1,1)],c.FACE_FRONT=[new b.Vector3(1,-1,-1),new b.Vector3(1,-1,1),new b.Vector3(1,1,-1),new b.Vector3(1,1,1)],c.FACE_BACK=[new b.Vector3(-1,-1,1),new b.Vector3(-1,-1,-1),new b.Vector3(-1,1,1),new b.Vector3(-1,1,-1)],c.FACE_DOWN=[new b.Vector3(1,1,-1),new b.Vector3(1,1,1),new b.Vector3(-1,1,-1),new b.Vector3(-1,1,1)],c.FACE_UP=[new b.Vector3(-1,-1,-1),new b.Vector3(-1,-1,1),new b.Vector3(1,-1,-1),new b.Vector3(1,-1,1)],a.s(["GetCubeMapTextureData",()=>g,"RGBE_ReadHeader",()=>f,"RGBE_ReadPixels",()=>h],2004)},38959,a=>{"use strict";var b=a.i(16350);class c extends b.AbstractAudioOutNode{constructor(a,b,c,d=2){super(a,b,d),this._spatialAutoUpdate=!0,this._spatialMinUpdateTime=0,this._outBus=null,this._spatial=null,this._onOutBusDisposed=null,"boolean"==typeof c.spatialAutoUpdate&&(this._spatialAutoUpdate=c.spatialAutoUpdate),"number"==typeof c.spatialMinUpdateTime&&(this._spatialMinUpdateTime=c.spatialMinUpdateTime)}get outBus(){return this._outBus}set outBus(a){if(this._outBus!==a){if(this._outBus&&(this._onOutBusDisposed&&(this._outBus.onDisposeObservable.removeCallback(this._onOutBusDisposed),this._onOutBusDisposed=null),!this._disconnect(this._outBus)))throw Error("Disconnect failed");if(this._outBus=a,this._outBus&&(this._onOutBusDisposed=()=>{this._outBus=null},this._outBus.onDisposeObservable.add(this._onOutBusDisposed),!this._connect(this._outBus)))throw Error("Connect failed")}}get spatial(){return this._spatial?this._spatial:this._initSpatialProperty()}dispose(){super.dispose(),this._spatial?.dispose(),this._spatial=null,this._outBus&&this._onOutBusDisposed&&(this._outBus.onDisposeObservable.removeCallback(this._onOutBusDisposed),this._onOutBusDisposed=null),this._outBus=null}_initSpatialProperty(){return this._spatial=this._createSpatialProperty(this._spatialAutoUpdate,this._spatialMinUpdateTime)}get _isSpatial(){return null!==this._spatial}set _isSpatial(a){a&&!this._spatial?this._initSpatialProperty():!a&&this._spatial&&(this._spatial.dispose(),this._spatial=null)}}a.s(["AbstractSoundSource",()=>c])},18369,71978,a=>{"use strict";var b=a.i(8568),c=a.i(38959);class d extends c.AbstractSoundSource{constructor(a,c,d){super(a,c,d,3),this._newestInstance=null,this._privateInstances=new Set,this._state=1,this._instances=this._privateInstances,this.onEndedObservable=new b.Observable,this._onInstanceEnded=a=>{this._newestInstance===a&&(this._newestInstance=null),this._privateInstances.delete(a),0===this._instances.size&&(this._state=1,this.onEndedObservable.notifyObservers(this)),a.dispose()}}get activeInstancesCount(){return this._instances.size}get autoplay(){return this._options.autoplay}get currentTime(){let a=this._getNewestInstance();return a?a.currentTime:0}set currentTime(a){this.startOffset=a;let b=this._getNewestInstance();b&&(b.currentTime=a)}get loop(){return this._options.loop}set loop(a){this._options.loop=a}get maxInstances(){return this._options.maxInstances}set maxInstances(a){this._options.maxInstances=a}get startOffset(){return this._options.startOffset}set startOffset(a){this._options.startOffset=a}get state(){return this._state}dispose(){super.dispose(),this.stop(),this._newestInstance=null,this._privateInstances.clear(),this.onEndedObservable.clear()}pause(){let a=this._instances.values();for(let b=a.next();!b.done;b=a.next())b.value.pause();this._state=5}resume(){if(5!==this._state)return;let a=this._instances.values();for(let b=a.next();!b.done;b=a.next())b.value.resume();this._state=3}_beforePlay(a){5===this.state&&this._instances.size>0?this.resume():(a.onEndedObservable.addOnce(this._onInstanceEnded),this._privateInstances.add(a),this._newestInstance=a)}_afterPlay(a){this._state=a.state}_getNewestInstance(){if(0===this._instances.size)return null;if(!this._newestInstance){let a=this._instances.values();for(let b=a.next();!b.done;b=a.next())this._newestInstance=b.value}return this._newestInstance}_setState(a){this._state=a}_stopExcessInstances(){if(this.maxInstances<1/0){let a=Array.from(this._instances).filter(a=>3===a.state),b=a.length-this.maxInstances;for(let c=0;c<b;c++)a[c].stop()}}}a.s(["AbstractSound",()=>d],18369);var e=a.i(2269);class f extends e.AbstractAudioNode{constructor(a){super(a.engine,2),this._state=1,this.onEndedObservable=new b.Observable,this.onErrorObservable=new b.Observable,this.onStateChangedObservable=new b.Observable,this._sound=a}get state(){return this._state}dispose(){super.dispose(),this.stop(),this.onEndedObservable.clear(),this.onStateChangedObservable.clear()}_setState(a){this._state!==a&&(this._state=a,this.onStateChangedObservable.notifyObservers(this),1===this._state&&this.onEndedObservable.notifyObservers(this))}}a.s(["_AbstractSoundInstance",()=>f],71978)},84046,a=>{"use strict";var b=a.i(18369);class c extends b.AbstractSound{constructor(a,b,c){super(a,b,c)}get duration(){return this._options.duration}set duration(a){this._options.duration=a}get loopStart(){return this._options.loopStart}set loopStart(a){this._options.loopStart=a}get loopEnd(){return this._options.loopEnd}set loopEnd(a){this._options.loopEnd=a}get pitch(){return this._options.pitch}set pitch(a){this._options.pitch=a;let b=this._instances.values();for(let c=b.next();!c.done;c=b.next())c.value.pitch=a}get playbackRate(){return this._options.playbackRate}set playbackRate(a){this._options.playbackRate=a;let b=this._instances.values();for(let c=b.next();!c.done;c=b.next())c.value.playbackRate=a}play(a={}){if(5===this.state)return void this.resume();a.duration??(a.duration=this.duration),a.loop??(a.loop=this.loop),a.loopStart??(a.loopStart=this.loopStart),a.loopEnd??(a.loopEnd=this.loopEnd),a.startOffset??(a.startOffset=this.startOffset),a.volume??(a.volume=1),a.waitTime??(a.waitTime=0);let b=this._createInstance();this._beforePlay(b),b.play(a),this._afterPlay(b),this._stopExcessInstances()}stop(a={}){if(a.waitTime&&0<a.waitTime?this._setState(0):this._setState(1),this._instances)for(let b of Array.from(this._instances))b.stop(a)}}let d=1;class e{constructor(a){this.name=`StaticSoundBuffer #${d++}`,this.engine=a}}var f=a.i(71978);class g extends f._AbstractSoundInstance{}var h=a.i(33619),i=a.i(70165),j=a.i(95796),k=a.i(39003),l=a.i(21553),m=a.i(36394);class n extends c{constructor(a,b,c){super(a,b,c),this._stereo=null,this._options={autoplay:c.autoplay??!1,duration:c.duration??0,loop:c.loop??!1,loopEnd:c.loopEnd??0,loopStart:c.loopStart??0,maxInstances:c.maxInstances??1/0,pitch:c.pitch??0,playbackRate:c.playbackRate??1,startOffset:c.startOffset??0},this._subGraph=new n._SubGraph(this)}async _initAsync(a,b){this._audioContext=this.engine._audioContext,a instanceof o?this._buffer=a:("string"==typeof a||Array.isArray(a)||a instanceof ArrayBuffer||a instanceof AudioBuffer)&&(this._buffer=await this.engine.createSoundBufferAsync(a,b)),b.outBus?this.outBus=b.outBus:!1!==b.outBusAutoDefault&&(await this.engine.isReadyPromise,this.outBus=this.engine.defaultMainBus),await this._subGraph.initAsync(b),(0,h._HasSpatialAudioOptions)(b)&&this._initSpatialProperty(),b.autoplay&&this.play(),this.engine._addSound(this)}get buffer(){return this._buffer}get _inNode(){return this._subGraph._inNode}get _outNode(){return this._subGraph._outNode}get stereo(){return this._stereo??(this._stereo=new i._StereoAudio(this._subGraph))}async cloneAsync(a=null){let b=await this.engine.createSoundAsync(this.name,a?.cloneBuffer?this.buffer.clone():this.buffer,this._options);return b.outBus=a?.outBus?a.outBus:this.outBus,b}dispose(){super.dispose(),this._stereo=null,this._subGraph.dispose(),this.engine._removeSound(this)}getClassName(){return"_WebAudioStaticSound"}_createInstance(){return new p(this,this._options)}_connect(a){return!!super._connect(a)&&(a._inNode&&this._outNode?.connect(a._inNode),!0)}_disconnect(a){return!!super._disconnect(a)&&(a._inNode&&this._outNode?.disconnect(a._inNode),!0)}_createSpatialProperty(a,b){return new m._SpatialWebAudio(this._subGraph,a,b)}_getOptions(){return this._options}}n._SubGraph=class extends l._WebAudioBusAndSoundSubGraph{get _downstreamNodes(){return this._owner._downstreamNodes??null}get _upstreamNodes(){return this._owner._upstreamNodes??null}};class o extends e{constructor(a){super(a)}async _initAsync(a,b){a instanceof AudioBuffer?this._audioBuffer=a:"string"==typeof a?await this._initFromUrlAsync(a):Array.isArray(a)?await this._initFromUrlsAsync(a,b.skipCodecCheck??!1):a instanceof ArrayBuffer&&await this._initFromArrayBufferAsync(a)}get channelCount(){return this._audioBuffer.numberOfChannels}get duration(){return this._audioBuffer.duration}get length(){return this._audioBuffer.length}get sampleRate(){return this._audioBuffer.sampleRate}clone(a=null){let b=new AudioBuffer({length:this._audioBuffer.length,numberOfChannels:this._audioBuffer.numberOfChannels,sampleRate:this._audioBuffer.sampleRate});for(let a=0;a<this._audioBuffer.numberOfChannels;a++)b.copyToChannel(this._audioBuffer.getChannelData(a),a);let c=new o(this.engine);return c._audioBuffer=b,c.name=a?.name?a.name:this.name,c}async _initFromArrayBufferAsync(a){this._audioBuffer=await this.engine._audioContext.decodeAudioData(a)}async _initFromUrlAsync(a){a=(0,j._CleanUrl)(a);let{data:b}=await (0,j._LoadArrayBufferFromUrlAsync)(a);await this._initFromArrayBufferAsync(b)}async _initFromUrlsAsync(a,b){for(let c of a){if(b)await this._initFromUrlAsync(c);else{let a=c.match(j._FileExtensionRegex),b=a?.at(1);if(b&&this.engine.isFormatValid(b))try{await this._initFromUrlAsync(c)}catch{b&&0<b.length&&this.engine.flagInvalidFormat(b)}}if(this._audioBuffer)break}}}class p extends g{constructor(a,b){super(a),this._enginePlayTime=0,this._enginePauseTime=0,this._isConnected=!1,this._pitch=null,this._playbackRate=null,this._sourceNode=null,this._onEnded=()=>{this._enginePlayTime=0,5!==this._state&&this.onEndedObservable.notifyObservers(this),this._deinitSourceNode()},this._onEngineStateChanged=()=>{"running"===this.engine.state&&(this._options.loop&&2===this.state&&this.play(),this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged))},this._options=b,this._volumeNode=new GainNode(a._audioContext),this._initSourceNode()}dispose(){super.dispose(),this._pitch?.dispose(),this._playbackRate?.dispose(),this.stop(),this._deinitSourceNode(),this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged)}get currentTime(){if(1===this._state)return 0;let a=5===this._state?0:this.engine.currentTime-this._enginePlayTime;return this._enginePauseTime+a+this._options.startOffset}set currentTime(a){let b=2===this._state||3===this._state;if(b){let a=this._sourceNode;this._deinitSourceNode(),a?.stop(),this._state=1}5===this.state&&(this._enginePauseTime=0),this._options.startOffset=a,b&&this.play()}get _outNode(){return this._volumeNode}set pitch(a){this._pitch?.setTargetValue(a)}set playbackRate(a){this._playbackRate?.setTargetValue(a)}get startTime(){return 1===this._state?0:this._enginePlayTime}getClassName(){return"_WebAudioStaticSoundInstance"}play(a={}){if(3===this._state)return;void 0!==a.duration&&(this._options.duration=a.duration),void 0!==a.loop&&(this._options.loop=a.loop),void 0!==a.loopStart&&(this._options.loopStart=a.loopStart),void 0!==a.loopEnd&&(this._options.loopEnd=a.loopEnd),void 0!==a.startOffset&&(this._options.startOffset=a.startOffset);let b=this._options.startOffset;5===this._state&&(b+=this._enginePauseTime,b%=this._sound.buffer.duration),this._enginePlayTime=this.engine.currentTime+(a.waitTime??0),this._volumeNode.gain.value=a.volume??1,this._initSourceNode(),"running"===this.engine.state?(this._setState(3),this._sourceNode?.start(this._enginePlayTime,b,this._options.duration>0?this._options.duration:void 0)):this._options.loop&&(this._setState(2),this.engine.stateChangedObservable.add(this._onEngineStateChanged))}pause(){if(3!==this._state&&2!==this._state)return;let a=3===this._state;this._setState(5),this._enginePauseTime+=this.engine.currentTime-this._enginePlayTime,a?this._sourceNode?.stop():this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged),this._deinitSourceNode()}resume(){5===this._state&&this.play()}stop(a={}){if(1!==this._state){if(3===this._state){let b=this.engine.currentTime+(a.waitTime??0);this._sourceNode?.stop(b)}(void 0===a.waitTime||a.waitTime<=0)&&(this._setState(1),this.engine.stateChangedObservable.removeCallback(this._onEngineStateChanged))}}_connect(a){return!!super._connect(a)&&(a instanceof n&&a._inNode&&(this._outNode?.connect(a._inNode),this._isConnected=!0),!0)}_disconnect(a){return!!super._disconnect(a)&&(a instanceof n&&a._inNode&&(this._outNode?.disconnect(a._inNode),this._isConnected=!1),!0)}_deinitSourceNode(){if(this._sourceNode){if(this._isConnected&&!this._disconnect(this._sound))throw Error("Disconnect failed");this._sourceNode.disconnect(this._volumeNode),this._sourceNode.removeEventListener("ended",this._onEnded),this._sourceNode=null}}_initSourceNode(){if(!this._sourceNode){if(this._sourceNode=new AudioBufferSourceNode(this._sound._audioContext,{buffer:this._sound.buffer._audioBuffer}),this._sourceNode.addEventListener("ended",this._onEnded,{once:!0}),this._sourceNode.connect(this._volumeNode),!this._connect(this._sound))throw Error("Connect failed");this._pitch=new k._WebAudioParameterComponent(this.engine,this._sourceNode.detune),this._playbackRate=new k._WebAudioParameterComponent(this.engine,this._sourceNode.playbackRate)}let a=this._sourceNode;a.detune.value=this._sound.pitch,a.loop=this._options.loop,a.loopEnd=this._options.loopEnd,a.loopStart=this._options.loopStart,a.playbackRate.value=this._sound.playbackRate}}a.s(["_WebAudioStaticSound",()=>n,"_WebAudioStaticSoundBuffer",()=>o],84046)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__7d086275._.js.map