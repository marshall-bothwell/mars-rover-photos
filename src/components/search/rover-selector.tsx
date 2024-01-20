import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RoverSelectorProps {
    currentRover?: string;
}

export default function RoverSelector({ currentRover }: RoverSelectorProps) {
    let defaultValue = "perseverance";
    if (currentRover) {
        defaultValue = currentRover;
    }

    return (
        <div>
            <RadioGroup className="flex flex-row" defaultValue={defaultValue} name="rover">
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
        </div>
    )
}