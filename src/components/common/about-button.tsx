'use client';

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CircleHelp } from 'lucide-react';

export default function AboutButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Guide">
                    <CircleHelp size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className="space-y-3 text-sm">
                    <p><strong>Select a Rover:</strong> Search any of the four Mars Rovers - Perseverance, Curiosity, Opportunity, or Spirit</p>
                    <p><strong>Select a Date:</strong> Dates are automatically filtered. You can only select calendar dates that have photos taken by the rover you have selected.</p>
                    <p><strong>Search Photos:</strong> Click &ldquo;Search&rdquo; to view photos for your rover and date. Search results can be filtered by camera.</p>
                    <p><strong>Create an Account:</strong> The &ldquo;Sign In&rdquo; button in the top-right allows you to create a new account or sign in to an existing account.</p>
                    <p><strong>Save Photos:</strong> Once you&apos;re signed in, you can save any interesting photos you find by clicking the &ldquo;Save Photo&rdquo; button.</p>
                    <p><strong>Share Photos:</strong> While signed in, click on your profile picture and select &ldquo;Saved Photos&rdquo; to view your saved photos page. Share the link to your saved photos page with others - anyone can view it.</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
