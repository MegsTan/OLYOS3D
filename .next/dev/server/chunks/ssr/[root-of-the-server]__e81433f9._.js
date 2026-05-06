module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/scripts/box.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SceneComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-ssr] (ecmascript) <export __decorate as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Maths/math.vector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/decorators/inspector.js [app-ssr] (ecmascript)");
;
;
;
class SceneComponent {
    mesh;
    _speed;
    constructor(mesh){
        this.mesh = mesh;
        this._speed = 0.04;
    }
    onStart() {}
    onUpdate() {
        this.mesh.rotate(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"].UpReadOnly, this._speed * this.mesh.getScene().getAnimationRatio());
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__["_"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visibleAsNumber"])("Speed", {
        min: 0,
        max: 0.1
    })
], SceneComponent.prototype, "_speed", void 0);
}),
"[project]/src/scripts/BackendManager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BackendManager
]);
class BackendManager {
}
}),
"[project]/src/scripts/TurntableManager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ControlManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-ssr] (ecmascript) <export __decorate as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Cameras$2f$arcRotateCamera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Cameras/arcRotateCamera.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$scene$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/scene.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Maths/math.vector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/decorators/inspector.js [app-ssr] (ecmascript)");
;
;
;
;
;
class ControlManager {
    _cameraTarget = null;
    _cameraPanSpeed = 0.01;
    _cameraYawMinimumClamp = -60.0;
    _cameraYawMaximumClamp = 60.0;
    _camera = null;
    _scene;
    constructor(object){
        this._scene = object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$scene$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"] ? object : object.getScene();
    }
    onStart() {}
    createTurntableCamera(canvas, target = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"].Zero()) {
        const cameraTarget = this._cameraTarget?.getAbsolutePosition() ?? target;
        const currentCamera = this._scene.activeCamera;
        const radius = currentCamera ? currentCamera.position.subtract(cameraTarget).length() : 2500;
        const alpha = currentCamera ? Math.atan2(currentCamera.position.z - cameraTarget.z, currentCamera.position.x - cameraTarget.x) : -Math.PI / 4;
        const beta = currentCamera && radius > 0 ? Math.acos(Math.min(Math.max((currentCamera.position.y - cameraTarget.y) / radius, -1), 1)) : Math.PI / 3;
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Cameras$2f$arcRotateCamera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArcRotateCamera"]("TurntableCamera", alpha, beta, radius, cameraTarget, this._scene);
        // camera.lowerAlphaLimit = this._degreesToRadians(this._cameraYawMinimumClamp);
        // camera.upperAlphaLimit = this._degreesToRadians(this._cameraYawMaximumClamp);
        // camera.lowerBetaLimit = 0.1;
        // camera.upperBetaLimit = Math.PI - 0.1;
        camera.lowerBetaLimit = this._degreesToRadians(this._cameraYawMinimumClamp);
        camera.upperBetaLimit = this._degreesToRadians(this._cameraYawMaximumClamp);
        camera.lowerRadiusLimit = 10;
        camera.upperRadiusLimit = 100000;
        camera.panningSensibility = this._getPanningSensibility();
        camera.wheelDeltaPercentage = 0.01;
        camera.attachControl(canvas, true, true);
        camera._panningMouseButton = 1;
        const pointersInput = camera.inputs.attached.pointers;
        pointersInput.buttons = [
            0,
            1
        ];
        pointersInput.multiTouchPanning = true;
        pointersInput.multiTouchPanAndZoom = true;
        this._scene.activeCamera = camera;
        this._camera = camera;
        return camera;
    }
    _getPanningSensibility() {
        return this._cameraPanSpeed > 0 ? 1 / this._cameraPanSpeed : 0;
    }
    _degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
    onStop() {
        this.dispose();
    }
    dispose() {
        this._camera?.detachControl();
        this._camera?.dispose();
        this._camera = null;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__["_"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visibleAsEntity"])("node", "Camera Root")
], ControlManager.prototype, "_cameraTarget", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__["_"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visibleAsNumber"])("Camera Pan Speed")
], ControlManager.prototype, "_cameraPanSpeed", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__["_"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visibleAsNumber"])("Camera Yaw Minimum Clamp")
], ControlManager.prototype, "_cameraYawMinimumClamp", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__["_"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visibleAsNumber"])("Camera Yaw Maximum Clamp")
], ControlManager.prototype, "_cameraYawMaximumClamp", void 0);
}),
"[project]/src/scripts/DownloadManager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DownloadManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-ssr] (ecmascript) <export __decorate as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Loading$2f$sceneLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Loading/sceneLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Maths/math.vector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Meshes$2f$transformNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Meshes/transformNode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$loaders$2f$glTF$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/loaders/glTF/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/decorators/inspector.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
class DownloadManager {
    mesh;
    _hostUrl;
    _glbFile;
    _loadOnStart;
    _useServerProxy;
    _downloadedGlbScale;
    _downloadedGlbRoot;
    _loadPromise;
    constructor(mesh){
        this.mesh = mesh;
        this._hostUrl = "https://p.olyofiles.site/c82ded27-f411-4c14-bc10-3221c616d015/2026/02/03/";
        this._glbFile = "63304068-71ce-4941-ae02-3d7ae8daf0b1.glb";
        this._loadOnStart = true;
        this._useServerProxy = true;
        this._downloadedGlbScale = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1);
        this._downloadedGlbRoot = null;
        this._loadPromise = null;
        this._handleProgress = (event)=>{
            if (!event.lengthComputable || event.total === 0) {
                console.log(`DownloadManager: loaded ${event.loaded} bytes`);
                return;
            }
            const progress = Math.round(event.loaded / event.total * 100);
            console.log(`DownloadManager: ${progress}% loaded`);
        };
    }
    onStart() {
        if (this._loadOnStart) {
            void this.loadGlbFromHost();
        }
    }
    async loadGlbFromHost() {
        if (this._loadPromise) {
            await this._loadPromise;
            return;
        }
        const hostUrl = this._normalizeHostUrl(this._hostUrl);
        const fileName = this._glbFile.trim();
        const sourceUrl = `${hostUrl}${fileName}`;
        const importUrl = this._useServerProxy ? this._getProxyUrl(sourceUrl) : sourceUrl;
        if (!hostUrl || !fileName) {
            console.warn("DownloadManager: Host URL and GLB File are required.");
            return;
        }
        this._loadPromise = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Loading$2f$sceneLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SceneLoader"].ImportMeshAsync("", "", importUrl, this.mesh.getScene(), this._handleProgress, ".glb", fileName).then((result)=>{
            console.log(`DownloadManager: loaded ${sourceUrl}`);
            const downloadedGlbRoot = this._downloadedGlbRoot ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Meshes$2f$transformNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransformNode"](`${fileName}-root`, this.mesh.getScene());
            downloadedGlbRoot.scaling.copyFrom(this._downloadedGlbScale);
            this._downloadedGlbRoot = downloadedGlbRoot;
            result.transformNodes.forEach((loadedTransformNode)=>{
                if (!loadedTransformNode.parent) {
                    loadedTransformNode.parent = downloadedGlbRoot;
                }
            });
            result.meshes.forEach((loadedMesh)=>{
                if (loadedMesh !== this.mesh) {
                    if (!loadedMesh.parent) {
                        loadedMesh.parent = downloadedGlbRoot;
                    }
                    loadedMesh.setEnabled(true);
                }
            });
        }).catch((error)=>{
            this._loadPromise = null;
            console.error(`DownloadManager: failed to load ${sourceUrl}`, error);
        });
        await this._loadPromise;
    }
    _handleProgress;
    _normalizeHostUrl(hostUrl) {
        const trimmed = hostUrl.trim();
        if (!trimmed) {
            return "";
        }
        return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
    }
    _getProxyUrl(sourceUrl) {
        return `/api/glb-proxy?url=${encodeURIComponent(sourceUrl)}`;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__["_"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visibleAsString"])("Host URL")
], DownloadManager.prototype, "_hostUrl", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__["_"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visibleAsString"])("GLB File")
], DownloadManager.prototype, "_glbFile", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__["_"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visibleAsBoolean"])("Load On Start")
], DownloadManager.prototype, "_loadOnStart", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__["_"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visibleAsBoolean"])("Use Server Proxy")
], DownloadManager.prototype, "_useServerProxy", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__["_"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visibleAsVector3"])("Downloaded GLB Scale")
], DownloadManager.prototype, "_downloadedGlbScale", void 0);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$_decorate__as__$5f3e$__["_"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$decorators$2f$inspector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visibleAsEntity"])("node", "Downloaded GLB Root")
], DownloadManager.prototype, "_downloadedGlbRoot", void 0);
}),
"[project]/src/scripts.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scriptsMap",
    ()=>scriptsMap
]);
/**
 * Generated by Babylon.js Editor
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$loading$2f$loader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/loading/loader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$loading$2f$script$2f$apply$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/loading/script/apply.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$loading$2f$script$2f$preload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/loading/script/preload.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$box$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/scripts/box.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$BackendManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/scripts/BackendManager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$TurntableManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/scripts/TurntableManager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$DownloadManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/scripts/DownloadManager.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const scriptsMap = {
    "scripts/box.ts": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$box$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "scripts/BackendManager.ts": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$BackendManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "scripts/TurntableManager.ts": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$TurntableManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    "scripts/DownloadManager.ts": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$DownloadManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
};
;
}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$scene$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/scene.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Engines$2f$engine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Engines/engine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Maths/math.vector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Materials$2f$Textures$2f$cubeTexture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Materials/Textures/cubeTexture.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Loading$2f$sceneLoaderFlags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Loading/sceneLoaderFlags.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Physics$2f$v2$2f$Plugins$2f$havokPlugin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Physics/v2/Plugins/havokPlugin.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$havok$2f$lib$2f$esm$2f$HavokPhysics_es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/havok/lib/esm/HavokPhysics_es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Loading$2f$loadingScreen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Loading/loadingScreen.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Loading$2f$Plugins$2f$babylonFileLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Loading/Plugins/babylonFileLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Cameras$2f$universalCamera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Cameras/universalCamera.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Meshes$2f$groundMesh$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Meshes/groundMesh.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Lights$2f$directionalLight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Lights/directionalLight.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Lights$2f$Shadows$2f$shadowGeneratorSceneComponent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Materials$2f$PBR$2f$pbrMaterial$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Materials/PBR/pbrMaterial.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Materials$2f$standardMaterial$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Materials/standardMaterial.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$XR$2f$features$2f$WebXRDepthSensing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/XR/features/WebXRDepthSensing.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Rendering$2f$depthRendererSceneComponent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Rendering/depthRendererSceneComponent.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Rendering$2f$prePassRendererSceneComponent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Rendering/prePassRendererSceneComponent.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Materials$2f$Textures$2f$Loaders$2f$envTextureLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Materials/Textures/Loaders/envTextureLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Helpers$2f$sceneHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Helpers/sceneHelpers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Physics$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/core/Physics/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$materials$2f$sky$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@babylonjs/materials/sky/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$loading$2f$script$2f$apply$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/loading/script/apply.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$loading$2f$loader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/babylonjs-editor-tools/build/src/loading/loader.js [app-ssr] (ecmascript)");
/**
 * We import the map of all scripts attached to objects in the editor.
 * This will allow the loader from `babylonjs-editor-tools` to attach the scripts to the
 * loaded objects (scene, meshes, transform nodes, lights, cameras, etc.).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/scripts.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$TurntableManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/scripts/TurntableManager.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!canvasRef.current) {
            return;
        }
        const engine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Engines$2f$engine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Engine"](canvasRef.current, true, {
            stencil: true,
            antialias: true,
            audioEngine: true,
            adaptToDeviceRatio: true,
            disableWebGL2Support: false,
            useHighPrecisionFloats: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false
        });
        engine.loadingScreen = {
            displayLoadingUI: ()=>undefined,
            hideLoadingUI: ()=>undefined,
            loadingUIBackgroundColor: "transparent",
            loadingUIText: ""
        };
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$scene$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"](engine);
        handleLoad(engine, scene, canvasRef.current);
        let listener;
        window.addEventListener("resize", listener = ()=>{
            engine.resize();
        });
        return ()=>{
            scene.dispose();
            engine.dispose();
            window.removeEventListener("resize", listener);
        };
    }, [
        canvasRef
    ]);
    async function handleLoad(engine, scene, canvas) {
        const havok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$havok$2f$lib$2f$esm$2f$HavokPhysics_es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
        scene.enablePhysics(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Maths$2f$math$2e$vector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, -981, 0), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Physics$2f$v2$2f$Plugins$2f$havokPlugin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HavokPlugin"](true, havok));
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Loading$2f$sceneLoaderFlags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SceneLoaderFlags"].ForceFullSceneLoadingForIncremental = true;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$loading$2f$loader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadScene"])("/scene/", "DownloadExample.babylon", scene, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["scriptsMap"], {
            quality: "high"
        });
        const environmentTexture = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$babylonjs$2f$core$2f$Materials$2f$Textures$2f$cubeTexture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CubeTexture"].CreateFromPrefilteredData("/scene/assets/panoramic_background-exr_00000.env", scene);
        scene.environmentTexture = environmentTexture;
        scene.createDefaultSkybox(environmentTexture, true, 10000, 0.9);
        const controlManagerNode = scene.getTransformNodeByName("ControlManager");
        const controlManager = controlManagerNode ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$babylonjs$2d$editor$2d$tools$2f$build$2f$src$2f$loading$2f$script$2f$apply$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getScriptByClassForObject"])(controlManagerNode, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$TurntableManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]) ?? new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$TurntableManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](scene) : new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scripts$2f$TurntableManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](scene);
        controlManager.createTurntableCamera(canvas);
        engine.runRenderLoop(()=>{
            scene.render();
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex w-screen h-screen flex-col items-center justify-between",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            className: "w-full h-full outline-none select-none touch-none",
            onContextMenu: (event)=>event.preventDefault()
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 119,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 118,
        columnNumber: 3
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e81433f9._.js.map