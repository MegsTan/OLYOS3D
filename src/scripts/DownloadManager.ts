import { ISceneLoaderProgressEvent, SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";

import "@babylonjs/loaders/glTF";

import { IScript, visibleAsBoolean, visibleAsEntity, visibleAsString, visibleAsVector3 } from "babylonjs-editor-tools";

export default class DownloadManager implements IScript {
	@visibleAsString("Host URL")
	private _hostUrl: string = "https://p.olyofiles.site/c82ded27-f411-4c14-bc10-3221c616d015/2026/02/03/";

	@visibleAsString("GLB File")
	private _glbFile: string = "63304068-71ce-4941-ae02-3d7ae8daf0b1.glb";

	@visibleAsBoolean("Load On Start")
	private _loadOnStart: boolean = true;

	@visibleAsBoolean("Use Server Proxy")
	private _useServerProxy: boolean = true;

	@visibleAsVector3("Downloaded GLB Scale")
	private _downloadedGlbScale: Vector3 = new Vector3(1, 1, 1);

	@visibleAsEntity("node", "Downloaded GLB Root")
	private _downloadedGlbRoot: TransformNode | null = null;

	private _loadPromise: Promise<unknown> | null = null;

	public constructor(public mesh: Mesh) {}

	public onStart(): void {
		if (this._loadOnStart) {
			void this.loadGlbFromHost();
		}
	}

	public async loadGlbFromHost(): Promise<void> {
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

		this._loadPromise = SceneLoader.ImportMeshAsync(
			"",
			"",
			importUrl,
			this.mesh.getScene(),
			this._handleProgress,
			".glb",
			fileName
		)
			.then((result) => {
				console.log(`DownloadManager: loaded ${sourceUrl}`);

				const downloadedGlbRoot = this._downloadedGlbRoot ?? new TransformNode(`${fileName}-root`, this.mesh.getScene());
				downloadedGlbRoot.scaling.copyFrom(this._downloadedGlbScale);
				this._downloadedGlbRoot = downloadedGlbRoot;

				result.transformNodes.forEach((loadedTransformNode) => {
					if (!loadedTransformNode.parent) {
						loadedTransformNode.parent = downloadedGlbRoot;
					}
				});

				result.meshes.forEach((loadedMesh) => {
					if (loadedMesh !== this.mesh) {
						if (!loadedMesh.parent) {
							loadedMesh.parent = downloadedGlbRoot;
						}

						loadedMesh.setEnabled(true);
					}
				});
			})
			.catch((error) => {
				this._loadPromise = null;
				console.error(`DownloadManager: failed to load ${sourceUrl}`, error);
			});

		await this._loadPromise;
	}

	private _handleProgress = (event: ISceneLoaderProgressEvent): void => {
		if (!event.lengthComputable || event.total === 0) {
			console.log(`DownloadManager: loaded ${event.loaded} bytes`);
			return;
		}

		const progress = Math.round((event.loaded / event.total) * 100);
		console.log(`DownloadManager: ${progress}% loaded`);
	};

	private _normalizeHostUrl(hostUrl: string): string {
		const trimmed = hostUrl.trim();

		if (!trimmed) {
			return "";
		}

		return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
	}

	private _getProxyUrl(sourceUrl: string): string {
		return `/api/glb-proxy?url=${encodeURIComponent(sourceUrl)}`;
	}
}
