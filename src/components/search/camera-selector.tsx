'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useQueryState } from 'nuqs';
import { Manifest } from '@/lib/types';

interface CameraSelectorProps {
    manifest: Manifest;
}

export default function CameraSelector({ manifest }: CameraSelectorProps) {
    const [camera, setCamera] = useQueryState('camera');
    const [date] = useQueryState('date');

    const manifestOfSearchedDate = manifest?.photos.find((manifest) => manifest.earth_date === date);

    const cameras = manifestOfSearchedDate?.cameras.map((camera) => {
        return (
            <div className="flex items-center space-x-2" key={camera}>
                <RadioGroupItem value={camera} id={camera} />
                <Label htmlFor={camera}>{camera.toLowerCase()}</Label>
            </div>
        );
    });

    cameras?.unshift(
        <div className="flex items-center space-x-2" key="all">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All Cameras</Label>
        </div>
    );

    return (
        <div className="lg:mx-20">
            <RadioGroup
                className="flex flex-row flex-wrap mx-8 mt-4 items-center"
                value={camera || 'all'}
                onValueChange={(selection) => {
                    setCamera(selection);
                }}
            >
                {cameras}
            </RadioGroup>
        </div>
    );
}
