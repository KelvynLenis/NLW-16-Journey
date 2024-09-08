import { MapPin, Calendar, Settings2, ArrowRight } from "lucide-react";
import { Button } from "../../../components/Button";

interface DestinationAndDateStepProps {
  openGuestsInput: () => void;
  closeGuestsInput: () => void;
  isGuestsInputOpen: boolean;
}

export function DestinationAndDateStep({ openGuestsInput, closeGuestsInput, isGuestsInputOpen }: DestinationAndDateStepProps ) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className='flex items-center gap-2 flex-1'>
        <MapPin className="size-5 text-zinc-400" />
        <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1" />
      </div>

      <div className='flex items-center gap-2'>
        <Calendar className="size-5 text-zinc-400" />
        <input disabled={isGuestsInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder:text-zinc-400 w-48 outline-none flex-1" />
      </div>

      <div className='w-px h-6 bg-zinc-700' />

      {
        isGuestsInputOpen ? (
          <Button variant="secondary" onClick={closeGuestsInput}>
            Alterar local/data
            <Settings2 className='size-5' />
          </Button>
        ) : (
          <Button variant="primary" onClick={openGuestsInput}>
            Continuar
            <ArrowRight className='size-5' />
          </Button>
        )
      }
    </div>
  )
}