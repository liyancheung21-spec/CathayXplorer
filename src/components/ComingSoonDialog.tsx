import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface ComingSoonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoHome?: () => void;
}

export function ComingSoonDialog({ open, onOpenChange, onGoHome }: ComingSoonDialogProps) {
  const handleGoBack = () => {
    onOpenChange(false);
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Coming Soon</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Feature currently under development.
            <br />
            Thank you for your support!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-2 sm:gap-2">
          <AlertDialogAction
            onClick={handleGoBack}
            className="flex-1 bg-transparent border-2 border-black text-black hover:bg-black/5"
          >
            Return
          </AlertDialogAction>
          <AlertDialogAction
            onClick={handleGoHome}
            className="flex-1"
            style={{ backgroundColor: 'var(--cathay-jade)', color: 'white' }}
          >
            Home
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
