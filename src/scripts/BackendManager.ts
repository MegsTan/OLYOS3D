import { Mesh } from "@babylonjs/core/Meshes/mesh";
import Framebus from "framebus";

import { IScript, visibleAsString } from "babylonjs-editor-tools";

export default class BackendManager implements IScript {
    @visibleAsString("Example Post Message")
    private _examplePostMessage: string = "Hello from the backend!";
    
    public constructor(public mesh: Mesh) {
        
    }
    
    public onStart(): void {
        
        /**
         * We create a frame-bus. Then we emit a message with the example post message.
         * 
         * frame-bus example message: 
         *                      bus.emit("message", { message: this._examplePostMessage});
         */
        
        // We create a frame-bus.
        const bus = new Framebus();
        // Then we emit a message with the example post-message.
        bus.emit("message", { "action": this._examplePostMessage, "data": {}});
    }
    
    public onStop(): void {
        this.dispose();
    }
    
    public dispose(): void {
        
    }
}