'use client';

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Image from '@/components/common/image';
import FormButton from '@/components/common/form-button';
import { useFormState } from 'react-dom';
import * as actions from '@/actions';

interface RoverPhotoCardProps {
    roverName: string;
    cameraFullName: string;
    earthDate: string;
    sol: number;
    imageSource: string;
    saveable?: boolean;
    deletable?: boolean;
}

export default function RoverPhotoCard({ roverName, cameraFullName, earthDate, sol, imageSource, saveable, deletable}: RoverPhotoCardProps) {
    const [formState, action] = useFormState(actions.saveRoverPhoto, { errors: {} });
    return (
        <Dialog>
            <Card className="sm:w-2/3 lg:w-1/4  m-4 shadow">
                <form action={action}>
                    <CardHeader>
                        <CardTitle>{roverName}</CardTitle>
                        <CardDescription>
                        <span>{cameraFullName}</span><br />
                        <span>{earthDate}</span><br />
                        <span>Sol {sol}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <DialogTrigger className="relative">
                            <Image src={imageSource}/>
                        </DialogTrigger>
                        <div className="flex flex-row">
                            { formState.errors.message ? <div className="text-red-300">{formState.errors.message}</div> : null }
                            { formState.success ? <div className="text-green-300">Photo Saved</div> : null }
                            { saveable ? <FormButton className="w-1/3 ml-auto" variant="ghost">Save Photo</FormButton> : null }
                        </div>
                    </CardContent>
                    <input type="hidden" value={roverName} name="roverName" />
                    <input type="hidden" value={cameraFullName} name="cameraFullName" />
                    <input type="hidden" value={earthDate} name="earthDate" />
                    <input type="hidden" value={sol} name="sol" />
                    <input type="hidden" value={imageSource} name="imageSource" />
                </form>
            </Card>
            <DialogContent className="min-w-fit text-center">
                <img className="min-w-full mt-4" src={imageSource} loading="lazy"/>
            </DialogContent>
        </Dialog>
    )
}