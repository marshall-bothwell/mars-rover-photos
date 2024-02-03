'use client';

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Typewriter from 'typewriter-effect';

export default function AboutButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Guide</Button>
            </DialogTrigger>
            <DialogContent>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString(
                                '<strong>Select a Rover:</strong> Search any of the four Mars Rovers - Perseverance, Curiosity, Opportunity, or Spirit<br /><br />'
                            )
                            .pauseFor(500)
                            .typeString(
                                '<strong>Select a Date:</strong> Dates are automatically filtered. You can only select calendar dates that have photos taken by the rover you have selected.<br /><br />'
                            )
                            .pauseFor(500)
                            .typeString(
                                '<strong>Search Photos:</strong> Click "Search" to view photos for your rover and date. Search results can be filtered by camera.<br /><br />'
                            )
                            .pauseFor(500)
                            .typeString(
                                '<strong>Create an Account:</strong> The "Sign In" button in the top-right allows you to create a new account or sign in to an existing account.<br /><br />'
                            )
                            .pauseFor(500)
                            .typeString(
                                '<strong>Save Photos:</strong> Once you\'re signed in, you can save any interesting photos you find by clicking the "Save Photo" button.<br /><br />'
                            )
                            .pauseFor(500)
                            .typeString(
                                '<strong>Share Photos:</strong> While signed in, click on your profile picture and select "Saved Photos" to view your saved photos page. Share the link to your saved photos page with others - anyone can view it.'
                            )
                            .pauseFor(500)
                            .start();
                    }}
                    options={{
                        cursor: '|',
                        delay: 20,
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
