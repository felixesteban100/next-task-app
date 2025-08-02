"use client"

import { useRive } from '@rive-app/react-canvas';

export default function Simple() {
    // const {
    //     rive,
    //     RiveComponent: RiveComponentPlayback
    // } = useRive({
    //     src: 'truck.riv',
    //     stateMachines: ["drive", "bounce"],
    //     artboard: 'Truck',
    //     autoplay: true,
    // });
    // const bumpInput = rive?.stateMachineInputs("drive")[0];

    const {
        // rive,
        RiveComponent: RiveComponentPlayback
    } = useRive({
        src: 'vault_boy.riv',
        stateMachines: ["State Machine 1"],
        artboard: 'Vault Boy',
        autoplay: true,
    });
    // const thumbsUp = rive?.stateMachineInputs("Is pressed")[0]


    /* https://rive.app/marketplace/10275-35738-test-responsive-guy/ */

    return <>
        <div className="center" style={{ width: '800px', height: '500px' }}>
            {/* <RiveComponentPlayback onClick={() => bumpInput && bumpInput.fire()} className="h-full w-auto" /> */}
            <RiveComponentPlayback className="h-full w-auto" />
        </div>
    </>;
}
