import { X, User } from "lucide-react";
import { Button } from "../../components/Button";

interface ConfirmTripModalProps {
	closeConfirmTripModal: () => void;
	createTrip: (event: React.FormEvent<HTMLFormElement>) => void;
	setOwnerName: (ownerName: string) => void;
	setOwnerEmail: (ownerEmail: string) => void;
}

export function ConfirmTripModal({
	closeConfirmTripModal,
	createTrip,
	setOwnerName,
	setOwnerEmail
}: ConfirmTripModalProps) {
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">
							Confirmar criação de viagem
						</h2>
						<button type="button" className="" onClick={closeConfirmTripModal}>
							<X className="size-5 text-zinc-400" />
						</button>
					</div>

					<p className="text-sm text-zinc-400">
						Para concluir a criação da viagem para{" "}
						<span className="font-semibold text-zinc-100">Florianópolis</span>,
						Brasil nas datas de{" "}
						<span className="font-semibold text-zinc-100">
							16 a 27 de Agosto de 2024
						</span>{" "}
						preencha seus dados abaixo:
					</p>
				</div>

				<form className="space-y-3" onSubmit={createTrip}>
					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
						<User className="size-5 text-zinc-400" />
						<input
							name="name"
							placeholder="Seu nome completo"
							onChange={(event) => setOwnerName(event.target.value)}
							className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
						/>
					</div>

					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
						<User className="size-5 text-zinc-400" />
						<input
							type="email"
							name="email"
							placeholder="Seu email"
							onChange={(event) => setOwnerEmail(event.target.value)}
							className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
						/>
					</div>

					<Button variant="primary" type="submit" size="full">
						Confirmar viagem
					</Button>
				</form>
			</div>
		</div>
	);
}
