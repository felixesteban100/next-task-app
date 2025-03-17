"use client"

import { useRive } from '@rive-app/react-canvas';
// import { Button } from './ui/button';
// import { useState } from 'react';

export default function Simple() {
    // const [isPlaying, setIsPlaying] = useState(true);
    // const [animationText, setAnimationText] = useState('');
    const {
        rive,
        RiveComponent: RiveComponentPlayback
    } = useRive({
        src: 'truck.riv',
        stateMachines: ["drive", "bounce"],
        // stateMachines: "Bump",
        artboard: 'Truck',
        autoplay: true,
        // onPause: () => {
        //     setAnimationText('Animation paused!');
        // },
        // onPlay: () => {
        //     setAnimationText('Animation is playing..');
        // }
    });

    const bumpInput = rive?.stateMachineInputs("drive")[0];

    // const togglePlaying = () => {
    //     if (rive == null) return

    //     if (isPlaying) {
    //         rive.pause();
    //         setIsPlaying(false);
    //     } else {
    //         // rive.play();
    //         setIsPlaying(true);
    //     }
    // };

    return <>
        <div className="center" style={{ width: '800px', height: '500px' }}>
            <RiveComponentPlayback onClick={() => bumpInput && bumpInput.fire()} className="h-full w-auto" />
            {/* <p>{animationText}</p> */}
            {/* <Button onClick={togglePlaying}>{isPlaying ? 'Pause' : 'Play'}</Button> */}
        </div>
    </>;
}
