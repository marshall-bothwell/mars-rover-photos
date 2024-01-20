import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

import * as actions from '@/actions';

interface RoverPhotoListProps {
    rover: string;
    date: string;
}

export default async function RoverPhotoList({ rover, date }: RoverPhotoListProps) {
    const roverData = await actions.searchRoverPhotos(date, rover);

    const renderedRoverPhotos = roverData.photos?.map( (photo) => {
        return (
            <Dialog key={photo.id}>
                <Card className="sm:w-2/3 lg:w-1/4  m-4 shadow">
                <CardHeader>
                    <CardTitle>{photo.rover.name}</CardTitle>
                    <CardDescription>
                    <span>{photo.camera.full_name}</span><br />
                    <span>{photo.earth_date}</span><br />
                    <span>Sol {photo.sol}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DialogTrigger className="relative">
                        <img src={photo.img_src} loading="lazy" alt="A photo taken by a Mars Rover"/>
                    </DialogTrigger>
                </CardContent>
                </Card>
                <DialogContent className="min-w-fit text-center">
                    <img className="min-w-full mt-4" src={photo.img_src} loading="lazy"/>
                </DialogContent>
            </Dialog>
        )
    })
    

    return (
        <div className="flex flex-wrap justify-center">
            {renderedRoverPhotos}
        </div>
    )
}