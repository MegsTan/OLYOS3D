module.exports = [
"[project]/node_modules/@babylonjs/core/Materials/Textures/Loaders/hdrTextureLoader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_HDRTextureLoader",
    ()=>_HDRTextureLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$HighDynamicRange$2f$hdr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Misc/HighDynamicRange/hdr.js [app-ssr] (ecmascript)");
;
class _HDRTextureLoader {
    constructor(){
        /**
         * Defines whether the loader supports cascade loading the different faces.
         */ this.supportCascades = false;
    }
    /**
     * Uploads the cube texture data to the WebGL texture. It has already been bound.
     * Cube texture are not supported by .hdr files
     */ loadCubeData() {
        // eslint-disable-next-line no-throw-literal
        throw ".hdr not supported in Cube.";
    }
    /**
     * Uploads the 2D texture data to the WebGL texture. It has already been bound once in the callback.
     * @param data contains the texture data
     * @param texture defines the BabylonJS internal texture
     * @param callback defines the method to call once ready to upload
     */ loadData(data, texture, callback) {
        const uint8array = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        const hdrInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$HighDynamicRange$2f$hdr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBE_ReadHeader"])(uint8array);
        const pixelsDataRGB32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Misc$2f$HighDynamicRange$2f$hdr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBE_ReadPixels"])(uint8array, hdrInfo);
        const pixels = hdrInfo.width * hdrInfo.height;
        const pixelsDataRGBA32 = new Float32Array(pixels * 4);
        for(let i = 0; i < pixels; i += 1){
            pixelsDataRGBA32[i * 4] = pixelsDataRGB32[i * 3];
            pixelsDataRGBA32[i * 4 + 1] = pixelsDataRGB32[i * 3 + 1];
            pixelsDataRGBA32[i * 4 + 2] = pixelsDataRGB32[i * 3 + 2];
            pixelsDataRGBA32[i * 4 + 3] = 1;
        }
        callback(hdrInfo.width, hdrInfo.height, texture.generateMipMaps, false, ()=>{
            const engine = texture.getEngine();
            texture.type = 1;
            texture.format = 5;
            texture._gammaSpace = false;
            engine._uploadDataToTextureDirectly(texture, pixelsDataRGBA32);
        });
    }
} //# sourceMappingURL=hdrTextureLoader.js.map
}),
];

//# sourceMappingURL=d4b1c_modules_%40babylonjs_core_Materials_Textures_Loaders_hdrTextureLoader_d4f24edc.js.map