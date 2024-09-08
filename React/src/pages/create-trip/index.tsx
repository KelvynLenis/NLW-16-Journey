import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestStep } from './steps/invite-guests-step';

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState([]);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestModalOpen(true);
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: React.FormEvent<HTMLFormElement> ) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;

    if (emailsToInvite.includes(email)) {
      alert('Este e-mail já foi adicionado!');
      event.currentTarget.reset();
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(email: string) {
    const newEmailsToInvite = emailsToInvite.filter(invite => invite !== email);
    setEmailsToInvite(newEmailsToInvite);
  }

  function createTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate('/trips/1');
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 ">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>
          <DestinationAndDateStep 
            openGuestsInput={openGuestsInput} 
            closeGuestsInput={closeGuestsInput} 
            isGuestsInputOpen={isGuestsInputOpen}
          />

          {
            isGuestsInputOpen && (
              <InviteGuestStep 
                openGuestModal={openGuestModal} 
                openConfirmTripModal={openConfirmTripModal} 
                emailsToInvite={emailsToInvite}
              />
            )
          }
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="" className="text-zinc-300 underline">termos de uso</a> e <a href="" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>

      {
        isGuestModalOpen && (
          <InviteGuestsModal 
            emailsToInvite={emailsToInvite} 
            removeEmailFromInvites={removeEmailFromInvites} 
            addNewEmailToInvite={addNewEmailToInvite} 
            closeGuestModal={closeGuestModal}
          />
        )
      }

      {
        isConfirmTripModalOpen && (
          <ConfirmTripModal 
            closeConfirmTripModal={closeConfirmTripModal} 
            createTrip={createTrip}
          />
        )
      }

    </div>
  )
}