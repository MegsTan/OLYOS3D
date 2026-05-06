import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { ArcRotateCameraPointersInput } from "@babylonjs/core/Cameras/Inputs/arcRotateCameraPointersInput";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";

import { IScript, visibleAsEntity, visibleAsNumber } from "babylonjs-editor-tools";

export default class ControlManager implements IScript {
	@visibleAsEntity("node", "Camera Root")
	private _cameraTarget: TransformNode | null = null;
	@visibleAsNumber("Camera Pan Speed")
	private _cameraPanSpeed: number = 0.01;
	@visibleAsNumber("Camera Yaw Minimum Clamp")
	private _cameraYawMinimumClamp: number = -60.0;
	@visibleAsNumber("Camera Yaw Maximum Clamp")
	private _cameraYawMaximumClamp: number = 60.0;

	private _camera: ArcRotateCamera | null = null;

	private _scene: Scene;

	public constructor(object: Scene | TransformNode) {
		this._scene = object instanceof Scene ? object : object.getScene();
	}

	public onStart(): void {}

	public createTurntableCamera(canvas: HTMLCanvasElement, target: Vector3 = Vector3.Zero()): ArcRotateCamera {
		const cameraTarget = this._cameraTarget?.getAbsolutePosition() ?? target;
		const currentCamera = this._scene.activeCamera;
		const radius = currentCamera ? currentCamera.position.subtract(cameraTarget).length() : 2500;
		const alpha = currentCamera ? Math.atan2(currentCamera.position.z - cameraTarget.z, currentCamera.position.x - cameraTarget.x) : -Math.PI / 4;
		const beta = currentCamera && radius > 0
			? Math.acos(Math.min(Math.max((currentCamera.position.y - cameraTarget.y) / radius, -1), 1))
			: Math.PI / 3;

		const camera = new ArcRotateCamera("TurntableCamera", alpha, beta, radius, cameraTarget, this._scene);
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

		const pointersInput = camera.inputs.attached.pointers as ArcRotateCameraPointersInput;
		pointersInput.buttons = [0, 1];
		pointersInput.multiTouchPanning = true;
		pointersInput.multiTouchPanAndZoom = true;

		this._scene.activeCamera = camera;
		this._camera = camera;

		return camera;
	}

	private _getPanningSensibility(): number {
		return this._cameraPanSpeed > 0 ? 1 / this._cameraPanSpeed : 0;
	}

	private _degreesToRadians(degrees: number): number {
		return degrees * Math.PI / 180;
	}

	public onStop(): void {
		this.dispose();
	}

	public dispose(): void {
		this._camera?.detachControl();
		this._camera?.dispose();
		this._camera = null;
	}
}
