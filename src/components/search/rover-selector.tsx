import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Rover } from '@/lib/types';

interface RoverSelectorProps {
    defaultRover: string;
    handleRoverChange: (selectedRover: Rover) => void;
}

export default function RoverSelector({ defaultRover, handleRoverChange }: RoverSelectorProps) {
    return (
        <RadioGroup
            className="flex flex-row flex-wrap items-center"
            name="rover"
            defaultValue={defaultRover}
            onValueChange={handleRoverChange}
        >
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="perseverance" id="perseverance" />
                <Label htmlFor="perseverance">Perseverance</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="curiosity" id="curiosity" />
                <Label htmlFor="curiosity">Curiosity</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="opportunity" id="opportunity" />
                <Label htmlFor="opportunity">Opportunity</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="spirit" id="spirit" />
                <Label htmlFor="spirit">Spirit</Label>
            </div>
        </RadioGroup>
    );
}
