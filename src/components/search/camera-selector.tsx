import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Manifest } from '@/lib/types';

interface CameraSelectorProps {
    rover: string;
    date: string;
    manifest: Manifest;
    handleCameraChange: (camera: string) => void;
}

export default async function CameraSelector({ rover, date, manifest, handleCameraChange }: CameraSelectorProps) {

    const manifestOfSearchedDate = manifest.photos.find((manifest) => manifest.earth_date === date)

    const cameras = manifestOfSearchedDate?.cameras.map((camera) => {
        return (
            <div className="flex items-center space-x-2" key={camera}>
                <RadioGroupItem value={camera} id={camera} />
                <Label htmlFor={camera}>{camera.toLowerCase()}</Label>
            </div>
        )
    })

    cameras?.unshift(
        <div className="flex items-center space-x-2" key="all">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All Cameras</Label>
        </div>
    )

    return (
        <div>
            <RadioGroup className="flex flex-row flex-wrap mx-8 mt-4" defaultValue="all" onValueChange={handleCameraChange}>
                {cameras}
            </RadioGroup>
        </div>
    )
}