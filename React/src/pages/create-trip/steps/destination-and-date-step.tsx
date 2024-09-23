import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from 'date-fns';

interface DestinationAndDateStepProps {
	openGuestsInput: () => void;
	closeGuestsInput: () => void;
	isGuestsInputOpen: boolean;
	setDestination: (destination: string) => void;
	setEventStartAndEndDates: (eventStartAndEndDates: DateRange | undefined) => void;
	eventStartAndEndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
	openGuestsInput,
	closeGuestsInput,
	isGuestsInputOpen,
	setDestination,
	setEventStartAndEndDates,
	eventStartAndEndDates
}: DestinationAndDateStepProps) {
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	const displayedDate = eventStartAndEndDates?.from && eventStartAndEndDates?.to ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL")) : null;

	function openDatePicker() {
		setIsDatePickerOpen(true);
	}

	function closeDatePicker() {
		setIsDatePickerOpen(false);
	}

	return (
		<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
			<div className="flex items-center gap-2 flex-1">
				<MapPin className="size-5 text-zinc-400" />
				<input
					disabled={isGuestsInputOpen}
					type="text"
					placeholder="Para onde você vai?"
					onChange={(event) => setDestination(event.target.value)}
					className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
				/>
			</div>

			<button
				onClick={openDatePicker}
				disabled={isGuestsInputOpen}
				type="button"
				className="flex items-center gap-2 text-left w-[240px]"
			>
				<Calendar className="size-5 text-zinc-400" />
				<span className="text-lg text-zinc-400 w-48 flex-1">{displayedDate || 'Quando?'}</span>
			</button>

			{isDatePickerOpen && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
					<div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold">Selecione a data</h2>
								<button type="button" className="" onClick={closeDatePicker}>
									<X className="size-5 text-zinc-400" />
								</button>
							</div>
						</div>

						<DayPicker
							mode="range"
							selected={eventStartAndEndDates}
							onSelect={setEventStartAndEndDates}
						/>
					</div>
				</div>
			)}

			<div className="w-px h-6 bg-zinc-700" />

			{isGuestsInputOpen ? (
				<Button variant="secondary" onClick={closeGuestsInput}>
					Alterar local/data
					<Settings2 className="size-5" />
				</Button>
			) : (
				<Button variant="primary" onClick={openGuestsInput}>
					Continuar
					<ArrowRight className="size-5" />
				</Button>
			)}
		</div>
	);
}
