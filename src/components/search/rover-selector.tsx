import { Button } from '@/components/ui/button';
import { Rover } from '@/lib/types';

interface RoverSelectorProps {
    selectedRover: Rover;
    handleRoverChange: (selectedRover: Rover) => void;
}

export default function RoverSelector({ selectedRover, handleRoverChange }: RoverSelectorProps) {
    return (
        <div className="flex flex-row gap-2 justify-center">
            {(['perseverance', 'curiosity'] as Rover[]).map((rover) => (
                <Button
                    key={rover}
                    variant={selectedRover === rover ? 'secondary' : 'outline'}
                    onClick={() => handleRoverChange(rover)}
                    className="capitalize"
                >
                    {rover}
                </Button>
            ))}
        </div>
    );
}
