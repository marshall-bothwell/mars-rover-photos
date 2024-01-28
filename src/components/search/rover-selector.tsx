import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RoverSelectorProps {
    currentRover: string;
    handleRoverChange: (selectedRover: string) => void;
}

export default function RoverSelector({ currentRover, handleRoverChange }: RoverSelectorProps) {

    return (
        <RadioGroup className="flex flex-row flex-wrap items-center" name="rover" defaultValue={currentRover} onValueChange={handleRoverChange} >
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
    )
}