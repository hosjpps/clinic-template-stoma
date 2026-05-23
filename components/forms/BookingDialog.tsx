'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import BookingForm from './BookingForm';

interface BookingDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerLabel?: string;
  triggerClassName?: string;
}

export default function BookingDialog({
  open: controlledOpen,
  onOpenChange: controlledSetOpen,
  triggerLabel = 'Записаться',
  triggerClassName,
}: BookingDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledSetOpen ?? setInternalOpen;

  return (
    <>
      <Button className={triggerClassName} onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-primary text-2xl">
              Запись на консультацию
            </DialogTitle>
            <DialogDescription>
              Перезвоним в течение 5 минут.
            </DialogDescription>
          </DialogHeader>
          <BookingForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
