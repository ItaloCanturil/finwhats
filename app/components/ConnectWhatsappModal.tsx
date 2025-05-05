'use client'

import { useState } from "react"

export const ConnectWhatsappModal = () => {
    const [showModal, setShowModal] = useState(false)

    const handlemodal = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement

        if (!showModal) {
            modal.showModal();
            setShowModal(true)
        } else {
            modal.close();
            setShowModal(false);
        }
    }

	return (
        <>
            <button className="btn bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors" onClick={handlemodal}>Conecte o seu Whatsapp</button>
            <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>
               

                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click on ✕ button to close</p>

                {/* // todo QR CODE image */}
                </form>
            </div>
            </dialog>
        </>
	)
}