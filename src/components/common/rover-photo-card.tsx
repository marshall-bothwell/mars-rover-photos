'use client';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogClose,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Check, Trash2, Download, X } from 'lucide-react';
import Image from '@/components/common/image';
import FormButton from '@/components/common/form-button';
import { useActionState, useEffect } from 'react';
import * as actions from '@/actions';

function formatTransitShort(ms: number): string {
    const totalMinutes = Math.floor(ms / 60_000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${String(minutes).padStart(2, '0')}m`;
}

function formatTransitLong(ms: number): string {
    const totalMinutes = Math.floor(ms / 60_000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const h = hours === 1 ? 'hour' : 'hours';
    const m = minutes === 1 ? 'minute' : 'minutes';
    return `${hours} ${h} ${minutes} ${m}`;
}

interface RoverPhotoCardProps {
    dbId: number;
    roverName: string;
    cameraFullName: string;
    earthDate?: string;
    sol: number;
    imageSource: string;
    description?: string;
    transitMs?: number;
    marsTime?: string;
    earthTimeFull?: string;
    site?: string | number;
    drive?: string | number;
    credit?: string;
    saveable?: boolean;
    deletable?: boolean;
}

export default function RoverPhotoCard({
    dbId,
    roverName,
    cameraFullName,
    earthDate,
    sol,
    imageSource,
    description,
    transitMs,
    marsTime,
    earthTimeFull,
    site,
    drive,
    credit,
    saveable,
    deletable,
}: RoverPhotoCardProps) {
    const [saveFormState, saveAction] = useActionState(actions.saveRoverPhoto, { errors: {} });
    const [deleteFormState, deleteAction] = useActionState(actions.deleteRoverPhoto, { errors: {} });
    const { toast } = useToast();

    useEffect(() => {
        if (JSON.stringify(saveFormState.errors) !== '{}') {
            toast({
                title: 'Error',
                description: saveFormState.errors.message,
                variant: 'destructive',
            });
        } else if (saveFormState.success) {
            toast({
                title: 'Success',
                description: 'The photo has been saved to your profile.',
            });
        }
    }, [saveFormState.errors, saveFormState.success]);

    useEffect(() => {
        if (JSON.stringify(deleteFormState.errors) !== '{}') {
            toast({
                title: 'Error',
                description: deleteFormState.errors.message,
                variant: 'destructive',
            });
        }
    }, [deleteFormState.errors]);

    const isSaved = Boolean(saveFormState.success);
    const isDeleted = Boolean(deleteFormState.success);

    return (
        <div className="p-4">
            <Dialog>
                <Card className="flex flex-col overflow-hidden rounded-2xl border-border bg-card shadow-lg transition-shadow hover:shadow-xl">
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="flex flex-1 flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            {/* Hero image — fixed aspect, hard bottom edge */}
                            <img
                                src={imageSource}
                                alt={cameraFullName}
                                loading="lazy"
                                className="aspect-[4/3] w-full object-cover"
                            />

                            {/* Content sits cleanly below the image */}
                            <div className="flex flex-col gap-1.5 px-5 py-4">
                                <div className="flex items-baseline justify-between">
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                                        {roverName}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                        Sol
                                    </span>
                                </div>
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="line-clamp-1 flex-1 text-base font-semibold text-foreground">
                                        {cameraFullName}
                                    </h3>
                                    <span className="text-2xl font-bold leading-none tabular-nums text-accent">
                                        {sol}
                                    </span>
                                </div>
                                {description && (
                                    <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {description}
                                    </p>
                                )}
                            </div>
                        </button>
                    </DialogTrigger>

                    {/* Footer strip */}
                    <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {transitMs != null && (
                                <>
                                    <Download className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                                    <span className="tabular-nums">{formatTransitShort(transitMs)}</span>
                                    <span aria-hidden>·</span>
                                </>
                            )}
                            <span>{earthDate}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {isDeleted && (
                                <Trash2
                                    className="h-4 w-4 animate-bounce text-destructive"
                                    aria-label="Photo deleted"
                                />
                            )}
                            {isSaved ? (
                                <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                                    Saved
                                </span>
                            ) : saveable ? (
                                <form>
                                    <input type="hidden" name="dbId" value={dbId} />
                                    <FormButton
                                        action={saveAction}
                                        variant="ghost"
                                        className="h-auto px-2 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-transparent hover:text-accent"
                                    >
                                        Save
                                    </FormButton>
                                </form>
                            ) : null}

                            {deletable && !isDeleted && (
                                <form>
                                    <input type="hidden" name="dbId" value={dbId} />
                                    <FormButton
                                        action={deleteAction}
                                        variant="ghost"
                                        className="h-auto px-2 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:bg-transparent hover:text-destructive"
                                    >
                                        Delete
                                    </FormButton>
                                </form>
                            )}
                        </div>
                    </div>
                </Card>

                <DialogContent className="flex max-h-[95vh] max-w-3xl flex-col gap-0 overflow-hidden border-border bg-card p-0">
                    {/* Hero image with image-id badge */}
                    <div className="relative shrink-0 bg-background">
                        <img
                            src={imageSource}
                            alt={`${roverName} ${cameraFullName}`}
                            loading="lazy"
                            className="mx-auto max-h-[60vh] w-auto max-w-full object-contain"
                        />
                    </div>

                    {/* Body */}
                    <div className="scrollbar-minimal flex flex-col gap-4 overflow-y-auto p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex flex-col gap-2">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                                    {roverName}
                                </span>
                                <DialogTitle className="text-2xl font-semibold leading-tight text-foreground">
                                    {cameraFullName}
                                </DialogTitle>
                                {description && (
                                    <DialogDescription className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                        {description}
                                    </DialogDescription>
                                )}
                            </div>
                            <DialogClose className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </DialogClose>
                        </div>

                        {/* Primary metadata box */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-lg border border-border p-4 sm:grid-cols-4">
                            <MetaField label="Earth Time" value={earthTimeFull ?? earthDate} />
                            <MetaField label="Mars Time" value={marsTime} />
                            <MetaField label="Sol" value={sol} />
                            <MetaField
                                label="Transit Time"
                                value={transitMs != null ? formatTransitLong(transitMs) : undefined}
                            />
                        </div>

                        {/* Secondary metadata */}
                        <div className="grid grid-cols-1 gap-x-6 gap-y-4 px-1 sm:grid-cols-3">
                            <MetaField label="Site" value={site} />
                            <MetaField label="Drive" value={drive} />
                        </div>

                        {/* Footer with attribution and actions */}
                        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                                {credit}
                            </span>
                            <div className="flex items-center gap-2">
                                <a
                                    href={imageSource}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md border border-border bg-transparent px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                >
                                    Open full-resolution
                                </a>
                                {saveable && !isSaved && (
                                    <form>
                                        <input type="hidden" name="dbId" value={dbId} />
                                        <FormButton
                                            action={saveAction}
                                            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            Save photo
                                        </FormButton>
                                    </form>
                                )}
                                {isSaved && (
                                    <span className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-accent">
                                        <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                                        Saved
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function MetaField({ label, value }: { label: string; value: React.ReactNode }) {
    const hasValue = value !== undefined && value !== null && value !== '';
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {label}
            </span>
            <span className="font-mono text-sm font-medium text-foreground">
                {hasValue ? value : <span className="text-muted-foreground">—</span>}
            </span>
        </div>
    );
}