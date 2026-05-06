import { IPointerEvent } from "@babylonjs/core/Events/deviceInputEvents";
import { PointerEventTypes, PointerInfo } from "@babylonjs/core/Events/pointerEvents";
import { Observer } from "@babylonjs/core/Misc/observable";
import { Scene } from "@babylonjs/core/scene";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";

import { IScript } from "babylonjs-editor-tools";

export default class InputManager implements IScript {
	private static readonly _clickMoveThreshold = 8;

	private _scene: Scene;
	private _pointerObserver: Observer<PointerInfo> | null = null;
	private _activeTouchPointerIds = new Set<number>();
	private _clickStart:
		| {
			pointerId: number;
			x: number;
			y: number;
			pointerType: string;
			hasMoved: boolean;
		}
		| null = null;

	public constructor(object: Scene | TransformNode) {
		this._scene = object instanceof Scene ? object : object.getScene();
	}

	public onStart(): void {
		this.dispose();

		this._pointerObserver = this._scene.onPointerObservable.add((pointerInfo) => {
			const event = pointerInfo.event as IPointerEvent;

			if (pointerInfo.type === PointerEventTypes.POINTERDOWN && this._isPrimaryPointerDown(event)) {
				this._clickStart = {
					pointerId: event.pointerId,
					x: event.clientX,
					y: event.clientY,
					pointerType: event.pointerType,
					hasMoved: false,
				};
				return;
			}

			if (pointerInfo.type === PointerEventTypes.POINTERMOVE) {
				this._updateClickMovement(event);
				return;
			}

			if (pointerInfo.type === PointerEventTypes.POINTERUP) {
				if (this._isTrackedClickPointer(event) && !this._clickStart?.hasMoved) {
					this._onPrimaryPointerClick(pointerInfo);
				}

				this._activeTouchPointerIds.delete(event.pointerId);
				this._clickStart = null;
				return;
			}

			if (pointerInfo.type === PointerEventTypes.POINTERTAP) {
				this._activeTouchPointerIds.delete(event.pointerId);
			}
		});
	}

	public onStop(): void {
		this.dispose();
	}

	public dispose(): void {
		if (this._pointerObserver) {
			this._scene.onPointerObservable.remove(this._pointerObserver);
			this._pointerObserver = null;
		}

		this._activeTouchPointerIds.clear();
		this._clickStart = null;
	}

	private _isPrimaryPointerDown(event: IPointerEvent): boolean {
		if (event.pointerType === "touch") {
			this._activeTouchPointerIds.add(event.pointerId);
			return this._activeTouchPointerIds.size === 1;
		}

		return event.button === 0;
	}

	private _updateClickMovement(event: IPointerEvent): void {
		if (!this._isTrackedClickPointer(event) || !this._clickStart) {
			return;
		}

		const deltaX = event.clientX - this._clickStart.x;
		const deltaY = event.clientY - this._clickStart.y;
		const movementDistance = Math.hypot(deltaX, deltaY);

		if (movementDistance > InputManager._clickMoveThreshold) {
			this._clickStart.hasMoved = true;
		}
	}

	private _isTrackedClickPointer(event: IPointerEvent): boolean {
		return this._clickStart?.pointerId === event.pointerId &&
			this._clickStart.pointerType === event.pointerType;
	}

	private _onPrimaryPointerClick(pointerInfo: PointerInfo): void {
		const event = pointerInfo.event;
		const clickedName = pointerInfo.pickInfo?.pickedMesh?.name ?? "empty space";

		console.log("InputManager: clicked", {
			x: event.clientX,
			y: event.clientY,
			pickedMesh: clickedName,
		});

		window.alert(`Clicked: ${clickedName}`);
	}
}
