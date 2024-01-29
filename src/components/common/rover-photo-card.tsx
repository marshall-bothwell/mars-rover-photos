'use client';

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Check, Trash2 } from 'lucide-react';
import Image from '@/components/common/image';
import FormButton from '@/components/common/form-button';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
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
    const [saveFormState, saveAction] = useFormState(actions.saveRoverPhoto, { errors: {} });
    const [deleteFormState, deleteAction] = useFormState(actions.deleteRoverPhoto, { errors: {} });
    const { toast } = useToast();

    useEffect(() => {
        if (JSON.stringify(saveFormState.errors) !== "{}") {
            toast({
                title: "Error",
                description: saveFormState.errors.message,
                variant: "destructive"
            })
        } else if (saveFormState.success) {
            toast({
                title: "Success!",
                description: "The photo has been saved to your profile."
            })
        }
    }, [saveFormState.errors, saveFormState.success])

    useEffect(() => {
        if (JSON.stringify(deleteFormState.errors) !== "{}") {
            toast({
                title: "Error",
                description: deleteFormState.errors.message,
                variant: "destructive"
            })
        } else if (deleteFormState.success) {
            toast({
                title: "Success!",
                description: "The photo has been deleted. Refresh the page to see your updated list of saved photos."
            })
        }
    }, [deleteFormState.errors, deleteFormState.success])

    const saveButton = (
        <form className="ml-auto">
            <FormButton className="ml-auto" variant="ghost" action={saveAction}>Save Photo</FormButton>
            <input type="hidden" value={roverName} name="roverName" />
            <input type="hidden" value={cameraFullName} name="cameraFullName" />
            <input type="hidden" value={earthDate} name="earthDate" />
            <input type="hidden" value={sol} name="sol" />
            <input type="hidden" value={imageSource} name="imageSource" />
        </form>
    )

    const deleteButton = (
        <form className="ml-auto">
            <FormButton variant="ghost" action={deleteAction}>Delete Photo</FormButton>
            <input type="hidden" value={imageSource} name="imageSource" />
        </form>
    )

    return (
        <Dialog>
            <div className="row-auto col-span-1 m-4 shadow">
                <Card className="bg-transparent border-none"> 
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
                        <div className="flex flex-row items-center">
                            { saveFormState.success ? <Check color="#00ff1e" /> : null }
                            { deleteFormState.success ? <Trash2 className="animate-bounce"/> : null}
                            { saveable ? saveButton : null }
                            { deletable ? deleteButton : null}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <DialogContent className="min-w-fit text-center">
                <img className="min-w-full h-auto mt-4" src={imageSource} loading="lazy"/>
            </DialogContent>
        </Dialog>
    )
}