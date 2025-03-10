import { useEffect, useRef } from "react";
interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children?: React.ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
	const modalRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (isOpen) {
			modalRef.current?.showModal();
		} else {
			modalRef.current?.close();
		}
	}, [isOpen]);

	return (
		<dialog ref={modalRef} className="modal" onClose={onClose}>
			<div className="modal-box max-w-3/4 fixed top-1/12">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
				</form>
				{children}
			</div>
		</dialog>
	);
}
